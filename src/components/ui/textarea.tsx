import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
import { ValidationError } from "./validationError"

function Textarea({
  className,
  label,
  error,
  ...props
}: React.ComponentProps<"textarea"> & { label?: string; error?: string }) {
  const errorId = props.id ? `${props.id}-error` : `${label}-error`

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
      <textarea
        data-slot="textarea"
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
      <ValidationError id={errorId} className="mt-1" error={error} />
    </div>
  )
}

export { Textarea }
