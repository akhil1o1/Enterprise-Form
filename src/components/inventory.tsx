import { Plus, Send } from "lucide-react";

import { itemOptions } from "./constants";
import { Input } from "./ui/input";
import { CustomSelect } from "./ui/customSelect";
import { Button } from "./ui/button";

export const Inventory = () => {
   return (
      <section>
         <form>
            <table className="w-full border-collapse border border-gray-300">
               <thead>
                  <tr className="bg-gray-100">
                     <th className="border border-gray-300 p-2">Item</th>
                     <th className="border border-gray-300 p-2">Quantity</th>
                     <th className="border border-gray-300 p-2">Price</th>
                     <th className="border border-gray-300 p-2">Discount</th>
                     <th className="border border-gray-300 p-2">Total</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td className="border border-gray-300 p-2">
                        <CustomSelect
                           id="item"
                           options={itemOptions}
                           value={""}
                           placeholder="Select Item"
                           onChange={() => null}
                        />
                     </td>
                     <td className="border border-gray-300 p-2">
                        <Input placeholder="Enter Quantity" type="number" min={0} />
                     </td>
                     <td className="border border-gray-300 p-2">
                        <Input placeholder="Enter Price" type="number" min={0} />
                     </td>
                     <td className="border border-gray-300 p-2">
                        <Input placeholder="Enter Discount" type="number" min={0} />
                     </td>
                     <td className="border border-gray-300 p-2">
                        total
                     </td>
                     <td className="border border-gray-300 p-2">
                        <Button size={"icon"}>
                           <Plus />
                        </Button>
                     </td>
                  </tr>
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
