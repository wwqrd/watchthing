import React from 'react';
import useForm from './hooks/useForm';
import useToggle from './hooks/useToggle';
import './NewFeed.scss';

const initialFeed = {
  feed: '',
  unit: '',
  decimals: 0,
};

const NewFeed = ({ onSave }) => {
  const [isOpen,, open, close] = useToggle(false);
  const [form, setForm, inputHandler] = useForm(initialFeed);

  const handleSave = (e) => {
    e.preventDefault();

    onSave(form);
    setForm(initialFeed);
    close();
  }

  const handleOpen = open;
  const handleCancel = close;
  const handleChange = inputHandler;

  const className = isOpen ? 'new-feed new-feed--is-open' : 'new-feed';

  return (
    <div className={className}>
      <div className="form">
        <form>
          <label>
            <span>Feed</span>
            <input
              type="text"
              placeholder="feed"
              value={form.feed}
              name="feed"
              onChange={handleChange}
              style={{ width: 300 }}
            />
          </label>
          <label>
            <span>Units</span>
            <input
              type="text"
              placeholder="unit"
              value={form.unit}
              name="unit"
              onChange={handleChange}
              style={{ width: 80 }}
            />
          </label>
          <label>
            <span>Decimals</span>
            <input
            type="number"
            placeholder="decimals"
            value={form.decimals}
            name="decimals"
            onChange={handleChange}
            style={{ width: 80 }}
          />
          </label>
          <label>
            <button onClick={handleSave}>Add Feed</button>
            <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
          </label>
        </form>
      </div>

      <div className="open">
        <button onClick={handleOpen}>Add new feed</button>
      </div>
    </div>
  );
}

export default NewFeed;
