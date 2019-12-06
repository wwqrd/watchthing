import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValue] = useState(initialValues);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.getAttribute('name');
    const type = target.getAttribute('type');
    const value = type === 'number' ?
      parseInt(target.value) :
      target.value;

    setValue(prev => ({ ...prev, [name]: value }));
  };

  return [values, handleChange];
};

export default useForm;
