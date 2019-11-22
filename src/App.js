import React from 'react';
import Settings, { SettingsContext } from './Settings';
import Welcome from './Welcome';
import Reset from './Reset';
import Feeds from './Feeds';
import './App.scss';

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
                <Welcome
                  connectionSettings={connection}
                  onSaveConnectionSettings={handleSaveConnectionSettings}
                />
              );
            }

            return (
              <React.Fragment>
                <Reset resetSettings={resetSettings} />
                <Feeds connectionSettings={settings.connection} />
              </React.Fragment>
            );
          }}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
