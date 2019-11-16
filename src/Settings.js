import React, { Component } from 'react';

const defaultSettings = {
  host: 'io.adafruit.com',
  port: '8883',
  user: null, //window.localStorage.getItem('api_user'),
  key: null, // window.localStorage.getItem('api_key'),
};

const SettingsContext = React.createContext(defaultSettings);

const getSetting = (name) => {
  const settingsQuery = new URLSearchParams(window.location.search);

  if (settingsQuery.get(name)) {
    window.localStorage.setItem(name, settingsQuery.get(name));
  }

  return window.localStorage.getItem(name);
};

const asSettingObject = (name, value) => {
  if (!value) { return {}; }
  return { [name]: value };
}

const getSettingObject = name =>
  asSettingObject(name, getSetting(name));

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = { ...defaultSettings };
  }

  componentDidMount() {
    console.log('what');

    const user = getSettingObject('user');
    const key = getSettingObject('key');

    const settings = {
      ...defaultSettings,
      ...user,
      ...key,
    };

    this.setState(settings);
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export { SettingsContext };

export default Settings;
