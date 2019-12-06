import { useState } from 'react';

const useToggle = (initialValue) => {
  const [state, setValue] = useState(initialValue);

  const toggle = (newState) => {
    if (!newState) { setValue(!state); }
    setValue(newState);
  };

  const on = () => setValue(true);

  const off = () => setValue(false);

  return [state, toggle, on, off];
};

export default useToggle;
