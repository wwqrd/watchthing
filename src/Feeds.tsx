import React, { FC } from 'react';
import Feed from './Feed';
import NewFeed from './NewFeed';
import useFeedData from './hooks/useFeedData';
import './Feeds.css';

type FeedsProps = {
  connectionSettings: any;
  feeds: any[];
  updateFeeds: any;
}

const Feeds:FC<FeedsProps> = ({ connectionSettings, feeds, updateFeeds }) => {
  const topics = feeds.map(({ feed }) => feed);
  const [data] = useFeedData(connectionSettings, topics);

  const handleNewFeed = (feedOptions: any) => {

    const newFeeds = [
      ...feeds.filter(({ feed }) => feed !== feedOptions.feed),
      feedOptions,
    ];

    updateFeeds(newFeeds);
  };


  return (
    <div className="feeds">
      {Object.keys(data).sort().map((feed) => {
        const feedData: any = (data as any)[feed];
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
