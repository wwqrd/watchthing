import React from 'react';
import ConnectionSettings from './ConnectionSettings';
import './Welcome.scss';

const Welcome = ({ connectionSettings, onUpdateConnectionSettings }: { connectionSettings: any, onUpdateConnectionSettings: any }) => (
  <div className="welcome">
    <h2>First run</h2>
    <p><em>Settings are saved in localStorage</em></p>
    { connectionSettings &&
      <ConnectionSettings
        connectionSettings={connectionSettings ?? {}}
        onSave={onUpdateConnectionSettings}
      />
    }
    <p>Or configure app with query string:</p>
    <p>{'/?connection.user={ADAFRUIT_USER}&amp;connection.key={ADAFRUIT_KEY}'}</p>
  </div>
);

export default Welcome;
