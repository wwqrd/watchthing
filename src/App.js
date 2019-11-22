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
            const handleUpdate = key =>
              value =>
                updateSettings({ [key]: value });

            if (!settings.connection.user || !settings.connection.key) {
              return (
                <Welcome
                  connectionSettings={settings.connection}
                  onUpdateConnectionSettings={handleUpdate('connection')}
                />
              );
            }

            return (
              <React.Fragment>
                <Reset resetSettings={resetSettings} />
                <Feeds
                  connectionSettings={settings.connection}
                  feeds={settings.feeds}
                  updateFeeds={handleUpdate('feeds')}
                />
              </React.Fragment>
            );
          }}
        </SettingsContext.Consumer>
      </div>
    </Settings>
  );
}

export default App;
