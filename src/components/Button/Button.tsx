import React from "react";

const Button: React.FC<Button> = ({ onClick, type = "button", title }) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
