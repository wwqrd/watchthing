import React from 'react';
import Feed from './Feed';
import NewFeed from './NewFeed';
import useMQTTData from './useMQTTData';
import './Feeds.css';

const Feeds = ({ connectionSettings, feeds, updateFeeds }) => {
  const [data] = useMQTTData({ connectionSettings, topics: feeds });

  const handleNewFeed = (feedOptions) => {
    console.log(feeds);

    const newFeeds = [
      ...feeds,
      feedOptions,
    ];

    updateFeeds(newFeeds);
  };

  return (
    <div className="feeds">
      {Object.keys(data).sort().map((feed) => {
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

Feeds.defaultProps = {
  feeds: [],
};

export default Feeds;
