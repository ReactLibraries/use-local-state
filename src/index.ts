/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Type for State control
 *
 * @export
 * @interface LocalState
 * @template T The type of value to use for state
 */
export interface LocalState<T> {
  dispatches: React.Dispatch<T>[];
  value: T;
}

/**
 * Create a state
 *
 * @export
 * @template T The type of value to use for state
 * @param {(T | (() => T))} value Initial value
 * @return Instances of state
 */
export const useLocalStateCreate: {
  <T>(value: T | (() => T)): LocalState<T>;
  <T = undefined>(value?: T): LocalState<T>;
} = <T>(value: T | (() => T)) => {
  return useRef<LocalState<T>>({
    dispatches: [],
    value: typeof value === 'function' ? (<() => T>value)() : value,
  }).current;
};
export const useCreateLocalState = useLocalStateCreate;

/**
 * Perform the same action as useState
 *
 * @export
 * @template T The type of value to use for state
 * @param {LocalState<T>} state The type of value to use for state
 * @return [value,dispatch]
 */
export const useLocalState = <T = undefined>(
  state: LocalState<T>
): [T, (value: T | ((value: T) => T)) => void] => {
  const [, dispatch] = useState<T>();
  useEffect(() => {
    state.dispatches = [...state.dispatches, dispatch];
    return () => {
      state.dispatches = state.dispatches.filter((d) => d !== dispatch);
    };
  }, [state]);
  const setState = useCallback(
    (value: T | ((value: T) => T)) => mutateLocalState(state, value),
    [state]
  );
  return [state.value, setState];
};

/**
 * Select and retrieve the value of state
 *
 * @export
 * @template T The type of value to use for state
 * @template K Type of the selected value
 * @param {LocalState<T>} state The type of value to use for state
 * @param {(value: T) => K} callback callbak to select the target state.
 * @return {*}  {K} Selected state
 */
export const useLocalSelector = <T, K>(state: LocalState<T>, callback: (value: T) => K): K => {
  const [value, setValue] = useState(() => callback(state.value));
  const dispatch = useCallback((value: T) => setValue(callback(value)), []);
  useEffect(() => {
    state.dispatches = [...state.dispatches, dispatch];
    return () => {
      state.dispatches = state.dispatches.filter((d) => d !== dispatch);
    };
  }, [state]);
  return value;
};

/**
 * Write a value to state
 *
 * @export
 * @template T The type of value to use for state
 * @param {LocalState<T>} state The type of value to use for state
 * @param {(T | ((value: T) => T))} value A value to set for state or a callback to set
 */
export const mutateLocalState = <T>(state: LocalState<T>, value: T | ((value: T) => T)) => {
  state.value = typeof value === 'function' ? (<(value: T) => T>value)(state.value) : value;
  state.dispatches.forEach((dispatch) => dispatch(state.value));
};

/**
 * Reducer to manipulate the state.
 *
 * @export
 * @template T The type of value to use for state
 * @template R Reducer
 * @template K Action
 * @param {LocalState<T>} state
 * @param {R} reducer
 * @return {*} dispatch
 */
export const useLocallReducer = <
  T,
  R extends (state: T, action: any) => T,
  K extends Parameters<R>[1]
>(
  state: LocalState<T>,
  reducer: R
) => {
  return useCallback(
    (action: K) => mutateLocalState(state, reducer(state.value, action)),
    [state, reducer]
  );
};
