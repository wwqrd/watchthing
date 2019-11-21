import React from 'react';
import Settings, { SettingsContext } from './Settings';
import ConnectionSettings from './ConnectionSettings';
import Feeds from './Feeds';
import './App.css';

function App() {
  return (
    <Settings>
      <div className="App">
        <SettingsContext.Consumer>
          {({ settings, updateSettings }) => {
            const { connection } = settings;
            const handleSaveConnectionSettings = connectionSettings =>
              updateSettings({ connection: connectionSettings });

            if (!connection.user || !connection.key) {
              return (
                <div>
                  <h2>First run</h2>
                  { connection &&
                    <ConnectionSettings
                      connectionSettings={connection}
                      onSave={handleSaveConnectionSettings}
                    />
                  }
                  <p>Configure app with query string:</p>
                  <p>{'/?user={ADAFRUIT_USER}&amp;key={ADAFRUIT_KEY}'}</p>
                  <p><em>Key will be saved in localStorage</em></p>
                </div>
              );
            }

            return <Feeds connectionSettings={settings.connection} />;
          }}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
