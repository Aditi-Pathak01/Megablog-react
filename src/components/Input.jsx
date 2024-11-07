import React, { useId } from "react"; //(1)use  iD AND forward ref
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props }, //(2) 5 parameters:-  label,type,classname,props and ref
  ref
) {
  const id = useId(); //id
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});
export default Input;
