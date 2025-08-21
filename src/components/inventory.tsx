import {
   useForm,
   useFieldArray,
   Controller,
   FieldErrors,
   Control,
   useWatch,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus, Send, Trash } from "lucide-react";

import { itemOptions } from "./constants";
import { Input } from "./ui/input";
import { CustomSelect } from "./ui/customSelect";
import { Button } from "./ui/button";
import { toast } from "sonner";

const inventorySchema = z.object({
   items: z.array(
      z
         .object({
            itemId: z.string(),
            quantity: z.number(),
            price: z.number(),
            discount: z.number(),
         })
         .superRefine((data, ctx) => {
            // if itemId is selected, price and quantity must be greater than 0
            if (data.itemId && data.itemId.trim() !== "") {
               if (data.quantity <= 0) {
                  ctx.addIssue({
                     code: "custom",
                     path: ["quantity"],
                     message: "Quantity must be greater than 0",
                  });
               }
               if (data.price <= 0) {
                  ctx.addIssue({
                     code: "custom",
                     path: ["price"],
                     message: "Price must be greater than 0",
                  });
               }
               // discount must not be more than price * quantity
               const maxDiscount = data.price * data.quantity;
               if (data.discount > maxDiscount) {
                  ctx.addIssue({
                     code: "custom",
                     path: ["discount"],
                     message: `Discount cannot exceed ${maxDiscount} (price x quantity)`,
                  });
               }
            }
         })
   ),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

const tableHeaders = [
   "Item",
   "Quantity",
   "Price",
   "Discount",
   "Total",
];

const initialItems = Array(3) // 3 rows by default
   .fill(null)
   .map(() => ({
      itemId: "",
      quantity: 0,
      price: 0,
      discount: 0,
   }));

export const Inventory = () => {
   const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm<InventoryFormData>({
      resolver: zodResolver(inventorySchema),
      mode: "onSubmit",
      defaultValues: {
         items: initialItems,
      },
   });
   console.log(errors);

   const { fields, append, remove } = useFieldArray({
      control,
      name: "items",
   });

   const addItem = () => {
      if (fields.length <= 12) {
         append({
            itemId: "",
            quantity: 0,
            price: 0,
            discount: 0,
         });
      }
   };

   const removeItem = (index: number) => {
      if (fields.length > 1) {
         remove(index);
      }
   };

   const onSubmit = (data: InventoryFormData) => {
      console.log("Form submitted", data);
      if (data.items.every((item) => item.itemId.trim() === "")) {
         toast.warning("Please select an item to add.");
      } else {
         toast.success("Items added successfully!");
         reset({
            items: initialItems, // reset to initial state
         });
      }
   };

   return (
      <section>
         <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full border-collapse border border-gray-300">
               <thead>
                  <tr className="bg-gray-100">
                     {tableHeaders.map((header) => (
                        <th className="border border-gray-300 p-2" key={header}>
                           {header}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {fields.map((field, index) => (
                     <ItemFieldsRow
                        key={field.id}
                        index={index}
                        control={control}
                        errors={errors}
                        totalFields={fields.length}
                        remove={() => removeItem(index)}
                        add={addItem}
                     />
                  ))}
               </tbody>
            </table>
            <div className="w-full text-center pt-8">
               <Button size={"lg"} type="submit">
                  <Send /> Submit
               </Button>
            </div>
         </form>
      </section>
   );
};

const ItemFieldsRow = ({
   index,
   control,
   errors,
   add,
   remove,
   totalFields,
}: {
   index: number;
   control: Control<InventoryFormData>;
   errors: FieldErrors<InventoryFormData>;
   add: () => void;
   remove: () => void;
   totalFields: number;
}) => {
   // watch values for calculations and field state
   const { itemId, quantity, price, discount } = useWatch({
      control,
      name: `items.${index}`,
   });

   // total
   const total = quantity * price - discount;

   // field state conditions
   const isItemSelected = itemId && itemId.trim() !== "";
   const isPriceQuantityValid = price > 0 && quantity > 0;

   return (
      <tr>
         <td className="border border-gray-300 p-2">
            <Controller
               name={`items.${index}.itemId`}
               control={control}
               render={({ field }) => (
                  <CustomSelect
                     id={`itemid-${index}`}
                     options={itemOptions}
                     value={field.value}
                     placeholder="Select Item"
                     onChange={field.onChange}
                     error={errors.items?.[index]?.itemId?.message}
                  />
               )}
            />
         </td>
         <td className="border border-gray-300 p-2">
            <Controller
               name={`items.${index}.quantity`}
               control={control}
               render={({ field }) => (
                  <Input
                     placeholder="Enter Quantity"
                     type="number"
                     min={0}
                     value={field.value}
                     onChange={(e) => field.onChange(Number(e.target.value))}
                     error={errors.items?.[index]?.quantity?.message}
                     disabled={!isItemSelected}
                  />
               )}
            />
         </td>
         <td className="border border-gray-300 p-2">
            <Controller
               name={`items.${index}.price`}
               control={control}
               render={({ field }) => (
                  <Input
                     placeholder="Enter Price"
                     type="number"
                     min={0}
                     value={field.value}
                     onChange={(e) => field.onChange(Number(e.target.value))}
                     error={errors.items?.[index]?.price?.message}
                     disabled={!isItemSelected}
                  />
               )}
            />
         </td>
         <td className="border border-gray-300 p-2">
            <Controller
               name={`items.${index}.discount`}
               control={control}
               render={({ field }) => (
                  <Input
                     placeholder="Enter Discount"
                     type="number"
                     min={0}
                     max={price * quantity || 0}
                     value={field.value}
                     onChange={(e) => field.onChange(Number(e.target.value))}
                     error={errors.items?.[index]?.discount?.message}
                     disabled={!isItemSelected || !isPriceQuantityValid}
                  />
               )}
            />
         </td>
         <td className="border border-gray-300 p-2">
            {isItemSelected && isPriceQuantityValid ? total.toFixed(2) : "0.00"}
         </td>
         <td className="border border-gray-300 p-2">
            {index === totalFields - 1 ? (
               <Button
                  type="button"
                  size={"icon"}
                  onClick={add}
                  disabled={totalFields === 12}
               >
                  <Plus />
               </Button>
            ) : (
               <Button
                  type="button"
                  size={"icon"}
                  variant={"destructive"}
                  onClick={remove}
               >
                  <Trash />
               </Button>
            )}
         </td>
      </tr>
   );
};
