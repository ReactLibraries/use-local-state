import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface LocalState<T> {
  dispatches: React.Dispatch<T>[];
  value: T;
}

export const createLocalState: {
  <T>(value: T | (() => T)): LocalState<T>;
  <T = undefined>(value?: T): LocalState<T>;
} = <T>(value: T | (() => T)) => {
  return useRef<LocalState<T>>({
    dispatches: [],
    value: typeof value === 'function' ? (<() => T>value)() : value,
  }).current;
};

export const useLocalState = <T = undefined>(
  stateKey: LocalState<T>
): [T, (value: T | ((value: T) => T)) => void] => {
  const [, dispatch] = useState<T>();
  useEffect(() => {
    stateKey.dispatches = [...stateKey.dispatches, dispatch];
    return () => {
      stateKey.dispatches = stateKey.dispatches.filter((d) => d !== dispatch);
    };
  }, [stateKey]);
  const setState = useMemo(() => {
    return (value: T | ((value: T) => T)) => mutateLocalState(stateKey, value);
  }, [stateKey]);
  return [stateKey.value, setState];
};

export const useLocalSelector = <T, K>(stateKey: LocalState<T>, callback: (value: T) => K): K => {
  const [value, setValue] = useState(() => callback(stateKey.value));
  const dispatch = useCallback((value: T) => setValue(callback(value)), []);
  useEffect(() => {
    stateKey.dispatches = [...stateKey.dispatches, dispatch];
    return () => {
      stateKey.dispatches = stateKey.dispatches.filter((d) => d !== dispatch);
    };
  }, [stateKey]);
  return value;
};

export const mutateLocalState = <T = undefined>(
  stateKey: LocalState<T>,
  value: T | ((value: T) => T)
) => {
  stateKey.value = typeof value === 'function' ? (<(value: T) => T>value)(stateKey.value) : value;
  stateKey.dispatches.forEach((dispatch) => dispatch(stateKey.value));
};
