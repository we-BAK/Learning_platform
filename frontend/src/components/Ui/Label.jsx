// components/Ui/Label.jsx
import { forwardRef } from "react";
import { cn } from "../../lib/utils"; // Make sure you have a `cn` utility for merging classes

export const Label = forwardRef(function Label(
  { className, children, htmlFor, ...props },
  ref
) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});
