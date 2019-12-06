import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const bufferAsFloat = (buffer) =>
  Number.parseFloat(buffer.toString());

const useFeedData = (connectionSettings, topics) => {
  const { host, user, key } = Object.assign({}, connectionSettings);

  const topicKey = topics.sort().join(':');

  const [data, setData] = useState({});

  useEffect(() => {
    if (topics.length === 0 || !host || !user || !key) {
      return;
    };

    console.log(`Connecting to ${host}`);
    const client = mqtt.connect(`mqtts://${host}`, { username: user, password: key });

    client.on('error', (e) => {
      console.log('ERROR', e);
      client.end();
    })

    const disconnect = function() {
      console.log('disconnect');
      client.end();
    };

    function handleMessage(topic, message) {
      console.log('message', topic, message.toString());

      setData(d => ({
        ...d,
        [topic]: (d[topic] || [])
          .concat([bufferAsFloat(message)]),
      }));
    }

    client.on('connect', function () {
      console.log(`Connected to ${host}`);

      topics.forEach((topic) => {
        console.log(`subscribe to ${topic}`);
        client.subscribe(topic);
        client.publish(`${topic}/get`);
      })
    });

    client.on('message', handleMessage);

    return disconnect;
  }, [ host, user, key, topicKey ]);

  return [data];
};

export default useFeedData;
