import React, { useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useLocalState, createLocalState, LocalState } from '../src/index';

let container: HTMLElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('initData-undefined', () => {
  const Component01 = ({ localState }: { localState: LocalState<undefined> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Component02 = ({ localState }: { localState: LocalState<undefined> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Component03 = ({ localState }: { localState: LocalState<undefined> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Parent = () => {
    const localState = createLocalState();
    return (
      <>
        <Component01 localState={localState} />
        <Component02 localState={localState} />
        <Component03 localState={localState} />
      </>
    );
  };
  act(() => {
    render(<Parent />, container);
  });
  expect(container.childNodes).toMatchSnapshot();
});

it('initData-normal', () => {
  const Component01 = ({ localState }: { localState: LocalState<number> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Component02 = ({ localState }: { localState: LocalState<number> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Component03 = ({ localState }: { localState: LocalState<number> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Parent = () => {
    const localState = createLocalState(100);
    return (
      <>
        <Component01 localState={localState} />
        <Component02 localState={localState} />
        <Component03 localState={localState} />
      </>
    );
  };
  act(() => {
    render(<Parent />, container);
  });

  expect(container.childNodes).toMatchSnapshot();
});

it('useEffect', () => {
  const Component01 = ({ localState }: { localState: LocalState<number | string> }) => {
    const [value] = useLocalState(localState);
    return <>{value ?? 'undefined'}</>;
  };
  const Component02 = ({ localState }: { localState: LocalState<number | string> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue(3);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };
  const Component03 = ({ localState }: { localState: LocalState<number | string> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue('Effect');
    }, []);
    return <>{value ?? 'undefined'}</>;
  };

  const Parent = () => {
    const localState = createLocalState<number | string>(100);
    return (
      <>
        <Component01 localState={localState} />
        <Component02 localState={localState} />
        <Component03 localState={localState} />
      </>
    );
  };
  act(() => {
    render(<Parent />, container);
  });

  expect(container.childNodes).toMatchSnapshot();
});

it('add', () => {
  const Component01 = ({ localState }: { localState: LocalState<number> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue((v) => v + 1);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };
  const Component02 = ({ localState }: { localState: LocalState<number> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue((v) => v + 1);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };
  const Component03 = ({ localState }: { localState: LocalState<number> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue((v) => v);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };

  const Parent = () => {
    const localState = createLocalState<number>(100);
    return (
      <>
        <Component01 localState={localState} />
        <Component02 localState={localState} />
        <Component03 localState={localState} />
      </>
    );
  };
  act(() => {
    render(<Parent />, container);
  });

  expect(container.childNodes).toMatchSnapshot();
});

it('init-function', () => {
  const Component01 = ({ localState }: { localState: LocalState<number> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue((v) => v + 1);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };
  const Component02 = ({ localState }: { localState: LocalState<number> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue((v) => v + 1);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };
  const Component03 = ({ localState }: { localState: LocalState<number> }) => {
    const [value, setValue] = useLocalState(localState);
    useEffect(() => {
      setValue((v) => v);
    }, []);
    return <>{value ?? 'undefined'}</>;
  };

  const Parent = () => {
    const localState = createLocalState<number>(() => 100);
    return (
      <>
        <Component01 localState={localState} />
        <Component02 localState={localState} />
        <Component03 localState={localState} />
      </>
    );
  };
  act(() => {
    render(<Parent />, container);
  });

  expect(container.childNodes).toMatchSnapshot();
});
