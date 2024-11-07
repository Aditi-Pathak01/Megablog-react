import React from "react";
function Button({
  // 6 parameters!
  children, //text of btn
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button className={`px-4 ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  );
}
export default Button;
