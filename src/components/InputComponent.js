import React from "react";

const InputComponent = ({ placeholder, value, setValue }) => {
  return (
    <input
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default InputComponent;
