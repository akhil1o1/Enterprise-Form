import { cn } from "@/lib/utils";

export const ValidationError = ({
   id,
   error,
   className,
}: {
   id: string;
   error?: string;
   className?: string;
}) => {
   return (
      <p
         id={id}
         className={cn(
            `text-red-500 text-sm`,
            `${error ? "block" : "hidden"}`,
            className
         )}
      >
         {error}
      </p>
   );
};
