import React from 'react';
import Settings, { SettingsContext } from './Settings';
import Feeds from './Feeds';
import './App.css';

function App() {
  return (
    <Settings>
      <div className="App">
        <SettingsContext.Consumer>
          {(connectionSettings) => (
            <Feeds connectionSettings={connectionSettings} />
          )}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
