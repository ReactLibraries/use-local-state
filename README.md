# @react-libraries/use-local-state

## What is this

Simplify communication between React's child components

## usage

- `createLocalState(initData)`
- `useLocalState(localState)`
- `useLocalSelector(localState,selector)`
- `mutateLocalState(localState,value)`

### Sample(useLocalState)

https://user-images.githubusercontent.com/54426986/121639775-0325a200-cac8-11eb-8e17-5345086a3923.mp4

```tsx
import React from 'react';
import {
  createLocalState,
  LocalState,
  useLocalState,
  mutateLocalState,
} from '@react-libraries/use-local-state';

const Component1 = ({ localState }: { localState: LocalState<number> }) => {
  const [value, setValue] = useLocalState(localState);
  console.log('Component1(send)');
  return (
    <div>
      <div>Component1</div>
      <div>{value}</div>
      <button onClick={() => setValue(value + 1)}>BUTTON</button>
    </div>
  );
};
const Component2 = ({ localState }: { localState: LocalState<number> }) => {
  const [value, setValue] = useLocalState(localState);
  console.log('Component2(send)');
  return (
    <div>
      <div>Component2</div>
      <div>{value}</div>
      <button onClick={() => setValue(value + 1)}>BUTTON</button>
    </div>
  );
};
const Component3 = ({ localState }: { localState: LocalState<number> }) => {
  console.log('Component3(recv)');
  return (
    <div>
      <div>Component3</div>
      <button onClick={() => mutateLocalState(localState, (v) => v + 1)}>BUTTON</button>
    </div>
  );
};
const App = () => {
  const localState = createLocalState(0);
  console.log('Parent');
  return (
    <>
      <div>Parent</div>
      <Component1 localState={localState} />
      <Component2 localState={localState} />
      <Component3 localState={localState} />
    </>
  );
};

export default App;
```

### Sample(useLocalSelector)

```tsx
import React, { VFC } from 'react';
import {
  createLocalState,
  LocalState,
  useLocalState,
  mutateLocalState,
  useLocalSelector,
} from '@react-libraries/use-local-state';

interface LocalStateType {
  tall: number;
  weight: number;
}
interface ChildProps {
  localState: LocalState<LocalStateType>;
}

export const Tall: VFC<ChildProps> = ({ localState }) => {
  console.log('Tall');
  const tall = useLocalSelector(localState, (v) => v.tall);
  return (
    <div>
      Tall:
      <input
        value={tall}
        onChange={(e) => {
          mutateLocalState(localState, (v) => ({ ...v, tall: Number(e.target.value) }));
        }}
      />
    </div>
  );
};
export const Weight: VFC<ChildProps> = ({ localState }) => {
  console.log('Weight');
  const weight = useLocalSelector(localState, (v) => v.weight);
  return (
    <div style={{ display: 'flex' }}>
      Weight:
      <input
        value={weight}
        onChange={(e) => {
          mutateLocalState(localState, (v) => ({ ...v, weight: Number(e.target.value) }));
        }}
      />
    </div>
  );
};

export const Bmi: VFC<ChildProps> = ({ localState }) => {
  console.log('Bmi');
  const [{ tall, weight }] = useLocalState(localState);
  return (
    <div>
      {isNaN(Number(tall)) || isNaN(Number(weight))
        ? 'Error'
        : `BMI:${Math.floor((Number(weight) / Math.pow(Number(tall) / 100, 2)) * 100) / 100}`}
    </div>
  );
};

const App = () => {
  const localState = createLocalState<LocalStateType>({ tall: 170, weight: 60 });
  console.log('Parent');
  return (
    <>
      <Bmi localState={localState} />
      <Tall localState={localState} />
      <Weight localState={localState} />
    </>
  );
};

export default App;
```



