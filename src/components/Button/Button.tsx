import React from "react";

const Button: React.FC<Button> = ({
  onClick,
  type = "button",
  title,
  disabled = false,
  className = ""
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
