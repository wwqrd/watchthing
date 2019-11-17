import React, { useState } from 'react';
import './NewFeed.scss';

const initialFeed = {
  feed: '',
  unit: '',
  decimals: 0,
};

const NewFeed = ({ onSave }) => {
  const [feedOptions, setFeedOptions] = useState(initialFeed);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.getAttribute('name');
    const type = target.getAttribute('type');
    const value = type === 'number' ?
      parseInt(target.value) :
      target.value;

    setFeedOptions((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(feedOptions);
    setFeedOptions(initialFeed);
  }

  return (
    <div className="new-feed">
      <label>
        Feed
        <input type="text" placeholder="feed" value={feedOptions.feed} name="feed" onChange={handleChange} />
      </label>
      <label>
        Units
        <input type="text" placeholder="unit" value={feedOptions.unit} name="unit" onChange={handleChange} />
      </label>
      <label>
        Decimals
        <input type="number" placeholder="decimals" value={feedOptions.decimals} name="decimals" onChange={handleChange} />
      </label>
      <button type="button" onClick={handleSave}>Add</button>
    </div>
  );
}

export default NewFeed;
