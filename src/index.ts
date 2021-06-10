import { useEffect, useMemo, useRef, useState } from 'react';

export interface LocalState<T> {
  dispatches: React.Dispatch<{}>[];
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
  const [, dispatch] = useState<{}>();
  useEffect(() => {
    stateKey.dispatches = [...stateKey.dispatches, dispatch];
    return () => {
      stateKey.dispatches = stateKey.dispatches.filter((d) => d !== dispatch);
    };
  }, [stateKey]);
  const setState = useMemo(() => {
    return (value: T | ((value: T) => T)) => mutate(stateKey, value);
  }, [stateKey]);
  return [stateKey.value, setState];
};

export const mutate = <T = undefined>(stateKey: LocalState<T>, value: T | ((value: T) => T)) => {
  const v = typeof value === 'function' ? (<(value: T) => T>value)(stateKey.value) : value;
  if (stateKey.value !== v) {
    stateKey.value = v;
    stateKey.dispatches.forEach((dispatch) => dispatch({}));
  }
};
