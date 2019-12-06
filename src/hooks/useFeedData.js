import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import debug from 'debug';

const log = debug('watchthing:mqtt');
log.message = debug('watchthing:mqtt:message');
log.error = debug('watchthing:mqtt:error');

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

    log(`Connecting to ${host}`);
    const client = mqtt.connect(`mqtts://${host}`, { username: user, password: key });

    client.on('error', (e) => {
      log.error(e);
      // client.end();
    })

    const disconnect = function() {
      log('Disconnecting');
      client.end();
    };

    function handleMessage(topic, message) {
      log.message(`${topic}: ${message.toString()}`);

      setData(d => ({
        ...d,
        [topic]: (d[topic] || [])
          .concat([bufferAsFloat(message)]),
      }));
    }

    client.on('connect', function () {
      log(`Connected to ${host}`);

      topics.forEach((topic) => {
        log(`subscribe to ${topic}`);
        client.subscribe(topic);
        client.publish(`${topic}/get`);
      })
    });

    client.on('disconnect', () => {
      log(`Disconnected from ${host}`);
    });

    client.on('message', handleMessage);

    return disconnect;
  }, [ host, user, key, topicKey ]);

  return [data];
};

export default useFeedData;
