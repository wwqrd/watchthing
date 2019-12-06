import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const useMQTT = ({ user, key, host }) =>
  useEffect(() => {
    if (!user || !key || !host) {
      return;
    }

    console.log('connecting', { user, host });

    const client = mqtt.connect(`mqtts://${host}`, { username: user, password: key });

    client.on('error', (e) => {
      console.log('ERROR', e);
      client.end();
    })

    const disconnect = function() {
      console.log('disconnect');
      client.end();
    };

    return [client, disconnect];
  }, [
    host,
    user,
    key,
  ]);

export default useMQTT;
