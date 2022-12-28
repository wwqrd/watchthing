import React, { ReactNode, useCallback, useEffect, useState } from "react";
import * as R from "ramda";

const STORAGE_KEY = "watchthing";

const settings = [
  "connection.host",
  "connection.port",
  "connection.user",
  "connection.key",
  "feeds",
];

type SettingsState = {
  connection: {
    host: string;
    port: string;
  };
  feeds: string[];
};

type SettingsProps = {
  children: ReactNode;
};

const defaultSettings = {
  connection: {
    host: "io.adafruit.com",
    port: "443",
  },
  feeds: [],
};

type SettingsContextType = {
  settings: null | any;
  updateSettings: (values: any, merge?: boolean) => void;
  resetSettings: (defaultValues?: any) => void;
};

export const SettingsContext = React.createContext<SettingsContextType>({
  settings: null,
  updateSettings: () => {},
  resetSettings: () => {},
});

const loadSetting = (name: string) => {
  const settingsQuery = new URLSearchParams(window.location.search);
  const storedSettings = JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) || "{}"
  );

  const namePath = R.lensPath(name.split("."));
  const storedSetting = R.view(namePath, storedSettings);
  const setting = settingsQuery.get(name) || storedSetting;

  if (!setting) {
    return null;
  }

  return setting;
};

const loadSettings = (initialSettings = defaultSettings) =>
  settings.reduce((acc, key) => {
    const path = key.split(".");
    const value = loadSetting(key);
    if (!value) {
      return acc;
    }
    return R.assocPath(path, value, acc);
  }, initialSettings);

const saveSettings = (settings: any) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  return settings;
};

export const Settings: React.FC<SettingsProps> = ({ children }) => {
  const [state, setState] = useState<SettingsState>(defaultSettings);

  useEffect(() => {
    const settings = loadSettings();
    setState(settings);
  }, []);

  const updateSettings = useCallback(
    (settings: any, merge = true) => {
      setState((prevSettings) => {
        if (!merge) {
          return saveSettings(settings);
        }
        const newSettings = R.mergeDeepRight(prevSettings, settings);
        return saveSettings(newSettings);
      });
    },
    [setState]
  );

  const resetSettings = useCallback(
    (settings = defaultSettings) => {
      updateSettings(settings, false);
    },
    [updateSettings]
  );

  return (
    <SettingsContext.Provider
      value={{
        settings: state,
        updateSettings: updateSettings,
        resetSettings: resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
