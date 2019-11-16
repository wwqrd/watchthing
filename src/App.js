import React from 'react';
import Settings, { SettingsContext } from './Settings';
import './App.css';

function App() {
  return (
    <Settings>
      <div className="App">
        Hello world
        <SettingsContext.Consumer>
          {(foo) => (
            <div>{JSON.stringify(foo)}</div>
          )}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
