import React, { Component } from 'react';
import * as R from 'ramda';

const STORAGE_KEY = 'watchthing';

const settings = [
  'connection.host',
  'connection.port',
  'connection.user',
  'connection.key',
];

const defaultSettings = {
  connection: {
    host: 'io.adafruit.com',
    port: '8883',
  },
};

const SettingsContext = React.createContext({
  settings: null,
  updateSettings: () => {},
});

const loadSetting = (name) => {
  const settingsQuery = new URLSearchParams(window.location.search);
  const storedSettings = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');

  const namePath = R.lensPath(name.split('.'));
  const storedSetting = R.view(namePath, storedSettings);
  const setting = settingsQuery.get(name) || storedSetting;

  if (!setting) { return null; }

  return setting;
};

const loadSettings = (initialSettings = defaultSettings) =>
  settings.reduce(
    (acc, key) => {
      const path = key.split('.');
      const value = loadSetting(key);
      if (!value) { return acc; }
      return R.assocPath(path, value, acc);
    },
    initialSettings,
  );

const saveSettings = settings =>
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { ...defaultSettings };
  }

  componentDidMount() {
    const settings = loadSettings();
    this.setState(settings);
  }

  updateSettings = (settings) => {
    this.setState(prevSettings => {
      const newSettings = R.mergeDeepRight(prevSettings, settings);
      saveSettings(newSettings);
    });
  }

  render() {
    return (
      <SettingsContext.Provider value={{
        settings: this.state,
        updateSettings: this.updateSettings,
      }}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export { SettingsContext };

export default Settings;
