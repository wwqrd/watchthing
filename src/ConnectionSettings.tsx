import React, { FC } from 'react';
import useForm from './hooks/useForm';

type ConnectionSettingsProps = {
  settings: any;
  onSave: (values: any) => void;
};

const ConnectionSettings:FC<ConnectionSettingsProps> = ({ settings: initialSettings, onSave }) => {
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
      <label>
        <button type="button" onClick={handleSave}>Save</button>
      </label>
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
