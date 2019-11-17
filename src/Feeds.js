import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import Feed from './Feed';
import './Feeds.css';

const feeds = [
  {
    key: 'humidity',
    decimals: 0,
  },
  {
    key: 'temperature',
    decimals: 1,
  },
  {
    key: 'pressure',
    decimals: 0,
  }
];

const bufferAsFloat = (buffer) =>
  Number.parseFloat(buffer.toString());

const Feeds = ({ connectionSettings }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    function handleMessage(feed, message) {
      console.log('message', feed, message.toString());
      setData(d => ({
        ...d,
        [feed]: (d[feed] || [])
          .concat([bufferAsFloat(message)]),
      }));
    }

    console.log('connecting', connectionSettings);

    if (!connectionSettings.user || !connectionSettings.key || !connectionSettings.host) {
      return;
    }

    const client = mqtt.connect(`mqtts://${connectionSettings.host}`, { username: connectionSettings.user, password: connectionSettings.key });

    client.on('error', (e) => {
      console.log('ERROR', e);
    })

    client.on('connect', function () {
      console.log('connected to Adafruit.IO', new Date());
      feeds.forEach((feed) => {
        const key = `${connectionSettings.user}/f/${feed.key}`;
        client.subscribe(key);
        client.publish(`${key}/get`);
      })
    });

    client.on('message', handleMessage);

    return function() {
      console.log('disconnect');
      client.end();
    };
  }, [
    connectionSettings,
    connectionSettings.host,
    connectionSettings.user,
    connectionSettings.key,
  ]);

  return (
    <div className="feeds">
      {Object.keys(data).map((feed) => {
        const feedData = data[feed];

        return (<Feed key={feed} name={feed} data={feedData} />);
      })}
    </div>
  );
}

export default Feeds;
