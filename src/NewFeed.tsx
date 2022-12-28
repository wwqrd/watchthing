import { MouseEventHandler, useContext } from "react";
import useForm from "./hooks/useForm";
import useToggle from "./hooks/useToggle";
import { Input } from "./Input";
import "./NewFeed.scss";
import { SettingsContext } from "./Settings";

const initialFeed = {
  feed: "",
  unit: "",
  decimals: 0,
};

const NewFeed = ({ onSave }: { onSave: (value: any) => void }) => {
  const { settings } = useContext(SettingsContext);
  const [isOpen, , handleOpen, handleClose] = useToggle(false);
  const [form, setForm, handleChange] = useForm(initialFeed);

  const handleSave: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    onSave({
      ...form,
      feed: `${settings.connection.user}/feeds/${form.feed}`,
    });
    setForm(initialFeed);
    handleClose();
  };

  const className = isOpen ? "new-feed new-feed--is-open" : "new-feed";

  return (
    <div className={className}>
      <div className="form">
        <form>
          <label>
            <span>Feed</span>
            <Input
              name="feed"
              placeholder="feed"
              prepend={`${settings.connection.user}/feeds/`}
              value={form.feed}
              onChange={handleChange}
              style={{ width: 150 }}
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
            <button className="cancel" type="button" onClick={handleClose}>
              Cancel
            </button>
          </label>
        </form>
      </div>

      <div className="open">
        <button onClick={handleOpen}>Add new feed</button>
      </div>
    </div>
  );
};

export default NewFeed;
