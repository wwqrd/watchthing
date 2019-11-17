import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import './Feed.scss';

const getRandomRange = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const getRandomColor = () =>
`rgb(${getRandomRange(50, 150)}, ${getRandomRange(50, 150)}, ${getRandomRange(50, 150)})`;

const Feed = ({ name, data }) => {
  const [color, setColor] = useState({});

  useEffect(() => {
    setColor(getRandomColor());
  }, [name]);

  return (
    <div className="feed" style={{ backgroundColor: color }}>
      <div className="reading">
        <div className="value">{data[data.length - 1]}</div>
        <div className="unit">c</div>
      </div>
      <div className="name">{name}</div>
      <Chart data={data} />
    </div>
  );
}

export default Feed;
