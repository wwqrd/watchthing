import React from "react";
import "./Input.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // onChange: () => void;
  prepend: string;
};

export const Input: React.FC<InputProps> = ({ prepend, ...rest }) => (
  <div className="Input">
    <span>{prepend}</span>
    <input type="text" {...rest} />
  </div>
);
