import React from 'react';
import Settings, { SettingsContext } from './Settings';
import ConnectionSettings from './ConnectionSettings';
import Feeds from './Feeds';
import './App.css';

const Reset = ({ resetSettings }) =>
  <button onClick={() => resetSettings()} type="button">Reset</button>;

function App() {
  return (
    <Settings>
      <div className="App">
        <SettingsContext.Consumer>
          {({ settings, updateSettings, resetSettings }) => {
            const { connection } = settings;
            const handleSaveConnectionSettings = connectionSettings =>
              updateSettings({ connection: connectionSettings });

            if (!connection.user || !connection.key) {
              return (
                <div>
                  <h2>First run</h2>
                  <p><em>Settings are saved in localStorage</em></p>
                  { connection &&
                    <ConnectionSettings
                      connectionSettings={connection}
                      onSave={handleSaveConnectionSettings}
                    />
                  }
                  <p>Or configure app with query string:</p>
                  <p>{'/?connection.user={ADAFRUIT_USER}&amp;connection.key={ADAFRUIT_KEY}'}</p>

                </div>
              );
            }

            return (
              <div>
                <Reset resetSettings={resetSettings} />
                <Feeds connectionSettings={settings.connection} />
              </div>
            );
          }}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
