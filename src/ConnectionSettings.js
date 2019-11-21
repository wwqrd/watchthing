import React, { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValue] = useState(initialValues);

  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;

    setValue(prev => ({ ...prev, [name]: value }));
  };

  return [values, handleInputChange];
};

const ConnectionSettings = ({ settings: initialSettings, onSave }) => {
  const [values, handleChange] = useForm(initialSettings);

  const handleSave = () => {
    onSave(values);
  }

  return (
    <div>
      <label>
        User:
        <input type="text" value={values.user || ''} name="user" onChange={handleChange} />
      </label>
      <label>
        Key:
        <input type="text" value={values.key || ''} name="key" onChange={handleChange} />
      </label>
      <button type="button" onClick={handleSave}>Save</button>
    </div>
  );
};

ConnectionSettings.defaultProps = {
  settings: {
    user: null,
    key: null,
  },
};

export default ConnectionSettings;
