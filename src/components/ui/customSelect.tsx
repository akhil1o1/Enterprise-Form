import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Label } from "./label";
import { ValidationError } from "./validationError";

interface CustomSelectProps {
   id: string;
   label?: string;
   options: { value: string; label: string }[];
   required?: boolean;
   value: string;
   disabled?: boolean;
   onChange: (value: string) => void;
   placeholder?: string;
   error?: string;
}

export const CustomSelect = ({
   id,
   label,
   required,
   options,
   value,
   disabled,
   onChange,
   placeholder,
   error,
}: CustomSelectProps) => {
   const errorId = id ? `${id}-error` : `${label || placeholder}-error`;

   return (
      <div>
         {label && (
            <Label
               htmlFor={id}
               className="block text-sm font-medium text-gray-700 mb-2"
            >
               {label} {required && <span className="text-red-950">*</span>}
            </Label>
         )}
         <Select onValueChange={onChange} value={value} disabled={disabled}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {options.map((option, index) => (
                     <SelectItem
                        key={option.value + index}
                        value={option.value}
                     >
                        {option.label}
                     </SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
         <ValidationError id={errorId} className="mt-1" error={error} />
      </div>
   );
};
