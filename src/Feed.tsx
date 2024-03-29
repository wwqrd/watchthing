import { any } from 'ramda';
import React, { FC, useState, useEffect } from 'react';
import Chart from './Chart';
import './Feed.scss';

const getRandomRange = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const getRandomColor = () =>
`rgb(${getRandomRange(50, 150)}, ${getRandomRange(50, 150)}, ${getRandomRange(50, 150)})`;

type FeedProps = {
  feed: any;
  data: any;
  unit: any;
  decimals: any;
};

const Feed:FC<FeedProps> = ({ feed, data, unit, decimals }) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(getRandomColor());
  }, [feed]);

  const lastValue = data[data.length - 1];

  return (
    <div className="feed" style={{ backgroundColor: color }}>
      <div className="reading">
        <div className="value">{lastValue.toFixed(decimals)}</div>
        <div className="unit">{unit}</div>
      </div>
      <div className="name">{feed}</div>
      <Chart data={data} />
    </div>
  );
}

Feed.defaultProps = {
  unit: 'unit',
  decimals: 0,
};

export default Feed;
