import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { ValidationError } from "./validationError";

function Input({
   className,
   label,
   error,
   type,
   ...props
}: React.ComponentProps<"input"> & { label?: string; error?: string }) {
   
   const errorId = props.id ? `${props.id}-error` : `${label}-error`;

   return (
      <div>
         {label && (
            <Label
               htmlFor={props.id}
               className="block text-sm font-medium text-gray-700 mb-2"
            >
               {label}{" "}
               {props.required && <span className="text-red-950">*</span>}
            </Label>
         )}
         <input
            type={type}
            data-slot="input"
            aria-describedby={error ? errorId : undefined}
            className={cn(
               "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
               "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
               "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
               className
            )}
            {...props}
         />
         <ValidationError id={errorId} className="mt-1" error={error} />
      </div>
   );
}

export { Input };
