# @react-libraries/use-local-state

## What is this

Simplify communication between React's child components

## Table of contents

### Interfaces link

- [LocalState](#localstatet)

### Functions link

- [mutateLocalState](#mutatelocalstate)
- [useCreateLocalState](#usecreatelocalstate)
- [useLocalSelector](#uselocalselector)
- [useLocalState](#uselocalstate)

### Samples link

- [useLocalState](#sampleuselocalstate)
- [useLocalSelector](#sampleuselocalselector)

## Interface

### LocalState<T\>

Type for State control

#### Properties

- dispatches
- value

## Functions

### mutateLocalState

▸ `Const` **mutateLocalState**<T\>(`state`, `value`): `void`

Write a value to state

**`export`**

#### Type parameters

| Name | Type              | Description                        |
| :--- | :---------------- | :--------------------------------- |
| `T`  | `T` = `undefined` | The type of value to use for state |

#### Parameters

| Name    | Type                                       | Description                                   |
| :------ | :----------------------------------------- | :-------------------------------------------- |
| `state` | [LocalState](#localstatet)<T\> | The type of value to use for state            |
| `value` | `T` \| (`value`: `T`) => `T`               | A value to set for state or a callback to set |

#### Returns

`void`
___

### useCreateLocalState

▸ `Const` **useCreateLocalState**<T\>(`value?`): [LocalState](#localstatet)<T\>

Create a state

**`export`**

#### Type parameters

| Name | Description                        |
| :--- | :--------------------------------- |
| `T`  | The type of value to use for state |

#### Parameters

| Name     | Type             | Description   |
| :------- | :--------------- | :------------ |
| `value?` | `T` \| () => `T` | Initial value |

#### Returns

[LocalState](#localstatet)<T\>

Instances of state

▸ `Const` **useCreateLocalState**<T\>(`value?`): [LocalState](#localstatet)<T\>

Create a state

**`export`**

#### Type parameters

| Name | Type              | Description                        |
| :--- | :---------------- | :--------------------------------- |
| `T`  | `T` = `undefined` | The type of value to use for state |

#### Parameters

| Name     | Type | Description   |
| :------- | :--- | :------------ |
| `value?` | `T`  | Initial value |

#### Returns

[LocalState](#localstatet)<T\>

Instances of state

___

### useLocalSelector

▸ `Const` **useLocalSelector**<T, K\>(`state`, `callback`): `K`

Select and retrieve the value of state

**`export`**

#### Type parameters

| Name | Description                        |
| :--- | :--------------------------------- |
| `T`  | The type of value to use for state |
| `K`  | Type of the selected value         |

#### Parameters

| Name       | Type                                       | Description                         |
| :--------- | :----------------------------------------- | :---------------------------------- |
| `state`    | [LocalState](#localstatet)<T\> | The type of value to use for state  |
| `callback` | (`value`: `T`) => `K`                      | callbak to select the target state. |

#### Returns

`K`

{K} Selected state

___

### useLocalState

▸ `Const` **useLocalState**<T\>(`state`): [`T`, (`value`: `T` \| (`value`: `T`) => `T`) => `void`]

Perform the same action as useState

**`export`**

#### Type parameters

| Name | Type              | Description                        |
| :--- | :---------------- | :--------------------------------- |
| `T`  | `T` = `undefined` | The type of value to use for state |

#### Parameters

| Name    | Type                                       | Description                        |
| :------ | :----------------------------------------- | :--------------------------------- |
| `state` | [LocalState](#localstatet)<T\> | The type of value to use for state |

#### Returns

[`T`, (`value`: `T` \| (`value`: `T`) => `T`) => `void`]

## Samples

### Sample(useLocalState)

```tsx
import React from 'react';
import {
  useCreateLocalState,
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
  const localState = useCreateLocalState(0);
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

![localhost_3000_index11 - Google Chrome 2021-06-11 15-09-30](https://user-images.githubusercontent.com/54426986/121656499-8223d600-cada-11eb-9332-13042658799a.gif)

### Sample(useLocalSelector)

```tsx
import React, { VFC } from 'react';
import {
  useCreateLocalState,
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
  const localState = useCreateLocalState<LocalStateType>({ tall: 170, weight: 60 });
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

![localhost_3000_index11 - Google Chrome 2021-06-11 15-09-30_1](https://user-images.githubusercontent.com/54426986/121656601-9cf64a80-cada-11eb-996f-37fe764feaea.gif)
