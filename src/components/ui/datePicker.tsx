import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";
import { ValidationError } from "./validationError";

interface DatePickerProps {
   id: string;
   label?: string;
   required?: boolean;
   value: Date | undefined;
   disabled?: boolean;
   minDate?: Date | undefined;
   maxDate?: Date | undefined;
   onChange: (date: Date | undefined) => void;
   placeholder?: string;
   error?: string;
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
   (
      {
         id,
         label,
         required,
         value,
         disabled,
         minDate,
         maxDate,
         onChange,
         placeholder = "Pick a date",
         error,
      },
      ref
   ) => {
      const errorId = id ? `${id}-error` : `${label}-error`;

      return (
         <div ref={ref}>
            {label && (
               <Label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 mb-2"
               >
                  {label} {required && <span className="text-red-950">*</span>}
               </Label>
            )}
            <Popover>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     disabled={disabled}
                     className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        disabled && "opacity-50 cursor-not-allowed"
                     )}
                  >
                     <CalendarIcon className="mr-2 h-4 w-4" />
                     {value ? format(value, "PPP") : <span>{placeholder}</span>}
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0">
                  <Calendar
                     mode="single"
                     selected={value}
                     onSelect={onChange}
                     disabled={disabled}
                     fromDate={minDate}
                     toDate={maxDate}
                     initialFocus
                  />
               </PopoverContent>
            </Popover>
            <ValidationError id={errorId} className="mt-1" error={error} />
         </div>
      );
   }
);

DatePicker.displayName = "DatePicker";
