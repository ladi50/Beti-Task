import React from "react";

const Input: React.FC<Input> = ({
  onChange,
  value,
  label = "",
  placeholder = "",
  type = "text",
  id
}) => {
  return (
    <>
      {label ? <label htmlFor={id}>{label}</label> : null}

      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
