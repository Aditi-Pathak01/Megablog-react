import React from "react";
import { useId } from "react";
function Select({ label, options, className = "", ...props }, ref) {
  //5parameters!
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}></label>}
      <select className={`${className}`} {...props} ref={ref} id={id}>
        {options?.map(
          (
            opt /* ?=if options are present! then  only map it! =>if options are not present and mapping is done=crash! (conditional mapping)*/
          ) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    </div>
  );
}
export default React.forwardRef(Select);
/* */