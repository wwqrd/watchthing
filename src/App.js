import React from 'react';
import Settings, { SettingsContext } from './Settings';
import Feeds from './Feeds';
import './App.css';

function App() {
  return (
    <Settings>
      <div className="App">
        <SettingsContext.Consumer>
          {(connectionSettings) => {
            if (!connectionSettings.user || !connectionSettings.key) {
              return (
                <div>
                  <h2>First run</h2>
                  <p>Configure app with query string:</p>
                  <p>{'/?user={ADAFRUIT_USER}&amp;key={ADAFRUIT_KEY}'}</p>
                  <p><em>Key will be saved in localStorage</em></p>
                </div>
              );
            }

            return <Feeds connectionSettings={connectionSettings} />;
          }}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
