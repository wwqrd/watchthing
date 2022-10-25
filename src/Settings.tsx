import React, { Component, ReactNode } from 'react';
import * as R from 'ramda';

const STORAGE_KEY = 'watchthing';

const settings = [
  'connection.host',
  'connection.port',
  'connection.user',
  'connection.key',
  'feeds',
];

type SettingsState = {
  connection: {
    host: string;
    port: string;
  };
  feeds: string[]
}

type SettingsProps = {
  children: ReactNode,
};

const defaultSettings = {
  connection: {
    host: 'io.adafruit.com',
    port: '443',
  },
  feeds: [],
};

type SettingsContextType = {
  settings: null | any;
  updateSettings: (values: any, merge?: boolean) => void,
  resetSettings: (defaultValues?: any) => void;
}

const SettingsContext = React.createContext<SettingsContextType>({
  settings: null,
  updateSettings: () => {},
  resetSettings: () => {},
});

const loadSetting = (name: string) => {
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

const saveSettings = (settings: any) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  return settings;
};

class Settings extends Component<SettingsProps, SettingsState> {
  constructor(props: any) {
    super(props);

    this.state = { ...defaultSettings };
  }

  componentDidMount() {
    const settings = loadSettings();
    this.setState(settings);
  }

  updateSettings = (settings: any, merge = true) => {
    this.setState(prevSettings => {
      if (!merge) {
        return saveSettings(settings);
      }
      const newSettings = R.mergeDeepRight(prevSettings, settings);
      return saveSettings(newSettings);
    });
  }

  resetSettings = (settings = defaultSettings) => {
    this.updateSettings(settings, false);
  }

  render() {
    return (
      <SettingsContext.Provider value={{
        settings: this.state,
        updateSettings: this.updateSettings,
        resetSettings: this.resetSettings,
      }}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export { SettingsContext };

export default Settings;
