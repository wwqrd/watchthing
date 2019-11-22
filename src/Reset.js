import React from 'react';
import './Reset.scss';

const Reset = ({ resetSettings }) => {
  const handleReset = () => {
    if (!window.confirm('Are you sure you want to reset the app?')) { return; }
    resetSettings();
  };
  return (
    <button
      onClick={handleReset}
      type="button"
      className="reset"
    >Reset</button>
  );
};

export default Reset;
