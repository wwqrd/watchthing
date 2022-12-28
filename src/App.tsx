import React, { useCallback, useContext } from "react";
import { SettingsContext } from "./Settings";
import Welcome from "./Welcome";
import Reset from "./Reset";
import Feeds from "./Feeds";
import "./App.scss";

export const App = () => {
  const { settings, updateSettings, resetSettings } =
    useContext(SettingsContext);

  const handleUpdateConnection = useCallback(
    (value: any) => updateSettings({ connection: value }),
    [updateSettings]
  );

  const handleUpdateFeeds = useCallback(
    (value: any) => updateSettings({ feeds: value }),
    [updateSettings]
  );

  const showWelcome = !settings?.connection?.user || !settings?.connection?.key;

  return (
    <div className="App">
      {showWelcome ? (
        <Welcome
          connectionSettings={settings?.connection}
          onUpdateConnectionSettings={handleUpdateConnection}
        />
      ) : (
        <React.Fragment>
          <Reset resetSettings={resetSettings} />
          <Feeds
            connectionSettings={settings?.connection}
            feeds={settings?.feeds}
            updateFeeds={handleUpdateFeeds}
          />
        </React.Fragment>
      )}
    </div>
  );
};
