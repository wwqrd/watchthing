import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import Feed from './Feed';
import NewFeed from './NewFeed';
import './Feeds.css';

const initialFeeds = [
];

const bufferAsFloat = (buffer) =>
  Number.parseFloat(buffer.toString());

const Feeds = ({ connectionSettings }) => {
  const [firstLoad, setFirstLoad] = useState(true);

  const [feeds, setFeeds] = useState(initialFeeds);

  useEffect(() => {
    if (!firstLoad) { return; }

    console.log('load feeds');

    setFirstLoad(false);

    const storedFeeds = window.localStorage.getItem('feeds') && JSON.parse(window.localStorage.getItem('feeds'));

    console.log(storedFeeds);

    if(!storedFeeds) { return; }

    console.log('setFeeds');

    setFeeds(storedFeeds);
  }, [firstLoad]);

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

    if (feeds.length === 0 || !connectionSettings.user || !connectionSettings.key || !connectionSettings.host) {
      return;
    }

    console.log('connecting', connectionSettings);

    const client = mqtt.connect(`mqtts://${connectionSettings.host}`, { username: connectionSettings.user, password: connectionSettings.key });

    client.on('error', (e) => {
      console.log('ERROR', e);
      client.end();
    })

    client.on('connect', function () {
      console.log('connected to Adafruit.IO', new Date());
      console.log(feeds);
      feeds.forEach(({ feed }) => {
        console.log(`subscribe to ${feed}`);
        client.subscribe(feed);
        client.publish(`${feed}/get`);
      })
    });

    client.on('message', handleMessage);

    return function() {
      console.log('disconnect');
      client.end();
    };
  }, [
    feeds,
    connectionSettings,
    connectionSettings.host,
    connectionSettings.user,
    connectionSettings.key,
  ]);

  const handleNewFeed = (feedOptions) => {
    console.log(feeds);

    const newFeeds = [
      ...feeds,
      feedOptions,
    ];

    setFeeds(newFeeds);
    window.localStorage.setItem('feeds', JSON.stringify(newFeeds));
  };

  return (
    <div className="feeds">
      {Object.keys(data).map((feed) => {
        const feedData = data[feed];
        const feedMeta = feeds.find(meta => meta.feed === feed);

        return (
          <Feed
            {...feedMeta}
            key={feed}
            data={feedData}
          />
        );
      })}
      <NewFeed onSave={handleNewFeed} />
    </div>
  );
}

export default Feeds;
