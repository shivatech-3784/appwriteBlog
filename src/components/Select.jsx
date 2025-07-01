// import React from 'react'
// import { useId } from 'react'

// function Select({
//     options,
//     label,
//     classname,
//     ...props
// }, ref) {
//     const id = useId();
//     return (
//         <div className='w-full'>
//             {label && <label htmlFor={id}></label>}
//             <select
//                 {...props}
//                 id = {id}
//                 ref = {ref}
//                 className = {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
//                 >
//                 {options?.map((option)=> (
//                     <option>
//                         {option}
//                     </option>
//                 ))}
//             </select> 
//         </div>
//     )
// }

// export default React.forwardRef(Select)


// Select.jsx
import React, { forwardRef, useId } from "react";

/**
 * options can be either:
 *   ["India", "USA"]                     // array of strings
 *   or
 *   [{ value: "in", label: "India" }]    // array of objects
 */
const Select = forwardRef(
  ({ options = [], label, className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block mb-1 font-medium">
            {label}
          </label>
        )}

        <select
          id={id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
        >
          {options.map((opt, idx) => {
            // allow both string and { value, label } formats
            const value = typeof opt === "object" ? opt.value : opt;
            const text  = typeof opt === "object" ? opt.label : opt;

            return (
              <option key={value ?? idx} value={value}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);

export default Select;

