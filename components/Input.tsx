// An input component typeically has interaction with the user e.g useState and useEffect hooks 
// Typically it would therefore need to be a client component and have 'useClient' at the top of the page
// The below component however doesn't have any useState or useEffect - this is managed by the form component 
// This input component can therefore remain a server component as the required data is passed in as props

import clsx from "clsx";

export default function Input({ className, ...props }){
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
};
