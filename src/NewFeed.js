import React, { useState } from 'react';
import './NewFeed.scss';

const initialFeed = {
  feed: '',
  unit: '',
  decimals: 0,
};

const NewFeed = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleCancel = () => {
    setIsOpen(false);
  }

  const className = isOpen ? 'new-feed new-feed--is-open' : 'new-feed';

  return (
    <div className={className}>
      <div className="form">
        <label>
          <span>Feed</span>
          <input
            type="text"
            placeholder="feed"
            value={feedOptions.feed}
            name="feed"
            onChange={handleChange}
            style={{ width: 250 }}
          />
        </label>
        <label>
          <span>Units</span>
          <input
            type="text"
            placeholder="unit"
            value={feedOptions.unit}
            name="unit"
            onChange={handleChange}
            style={{ width: 50 }}
          />
        </label>
        <label>
          <span>Decimals</span>
          <input
          type="number"
          placeholder="decimals"
          value={feedOptions.decimals}
          name="decimals"
          onChange={handleChange}
          style={{ width: 50 }}
        />
        </label>
        <div className="controls">
          <button type="button" onClick={handleSave}>Add Feed</button>
          <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      <div className="open">
        <button type="button" onClick={handleOpen}>Add new feed</button>
      </div>
    </div>
  );
}

export default NewFeed;
