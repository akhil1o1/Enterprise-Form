import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { ValidationError } from "./validationError";

function Checkbox({
   className,
   label,
   error,
   checked,
   onChange,
   ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
   label: string;
   error?: string;
   checked: boolean;
   onChange: (checked: boolean) => void;
}) {
   const errorId = props.id ? `${props.id}-error` : `${label}-error`;

   return (
      <div>
         <div className="flex items-center space-x-2">
            <CheckboxPrimitive.Root
               data-slot="checkbox"
               aria-describedby={error ? errorId : undefined}
               checked={checked}
               onCheckedChange={onChange}
               className={cn(
                  "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                  className
               )}
               {...props}
            >
               <CheckboxPrimitive.Indicator
                  data-slot="checkbox-indicator"
                  className="flex items-center justify-center text-current transition-none"
               >
                  <CheckIcon className="size-3.5" />
               </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <Label
               htmlFor={props.id}
               className="block text-sm font-medium text-gray-700"
            >
               {label}{" "}
               {props.required && <span className="text-red-950">*</span>}
            </Label>
         </div>
         <ValidationError id={errorId} className="mt-1" error={error} />
      </div>
   );
}

export { Checkbox };
