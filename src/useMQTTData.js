import { useState } from 'react';
import useMQTT from './useMQTT';

const bufferAsFloat = (buffer) =>
  Number.parseFloat(buffer.toString());

const useMQTTData = ({ connectionSettings, topics }) => {
  const [data, setData] = useState({});
  const [client, disconnect] = useMQTT(connectionSettings);

  if (topics.length === 0) {
    return;
  }

  function handleMessage(topic, message) {
    console.log('message', topic, message.toString());

    setData(d => ({
      ...d,
      [topic]: (d[topic] || [])
        .concat([bufferAsFloat(message)]),
    }));
  }

  console.log(topics);

  client.on('connect', function () {
    topics.forEach(({ topic }) => {
      console.log(`subscribe to ${topic}`);
      client.subscribe(topic);
      client.publish(`${topic}/get`);
    })
  });

  client.on('message', handleMessage);

  return [data];
};

export default useMQTTData;
