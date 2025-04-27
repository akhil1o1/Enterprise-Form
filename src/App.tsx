import { useState } from "react";

import { Plus, Send, X, TriangleAlert } from "lucide-react";

import { Input } from "./components/ui/input";
import { DatePicker } from "./components/ui/datePicker";
import { Button } from "./components/ui/button";
import { CustomSelect } from "./components/ui/customSelect";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import { Hint } from "./components/ui/hint";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";

import "./App.css";

type TabOption = "application" | "workUpdate";

const TABS = [
   { value: "application", title: "Application" },
   { value: "workUpdate", title: "Work Update" },
];

export const App = () => {
   const [activeTab, setActiveTab] = useState<TabOption>("application");

   return (
      <>
         <main>
            <section className="h-44 bg-cyan-100 flex gap-3 items-center justify-between">
               <div className="flex flex-col gap-3 items-start justify-center">
                  <h1 className="text-2xl font-semibold">Shady Corporation</h1>
                  <div>
                     <p className="text-lg">Job Application</p>
                     <p className="text-sm">
                        Frontend Development / Over Time / WFO
                     </p>
                  </div>
               </div>
               <Tabs defaultValue={activeTab}>
                  <TabsList>
                     {TABS.map(({ value, title }) => (
                        <TabsTrigger
                           key={value}
                           value={value}
                           onClick={() => setActiveTab(value as TabOption)}
                        >
                           {title}
                        </TabsTrigger>
                     ))}
                  </TabsList>
               </Tabs>
            </section>
            <section>
               <form action="">
                  <FormSection title={"Basic Details"}>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Full Name"
                           required
                           placeholder="Enter your full name"
                        />
                     </div>

                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Email"
                           type="email"
                           required
                           placeholder="Enter your email address"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Phone"
                           required
                           placeholder="Enter your phone number"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Current Location"
                           required
                           placeholder="Enter your current location"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Currrent Company"
                           required
                           placeholder="Enter your current company name"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <CustomSelect
                           id="role"
                           label="Role Applying for"
                           required
                           options={[
                              { value: "1", label: "Software Developer React" },
                              {
                                 value: "2",
                                 label: "Software Developer Angular",
                              },
                              {
                                 value: "3",
                                 label: "Software Developer React Native",
                              },
                           ]}
                           //  value=""
                           placeholder="Select Role"
                           onChange={(value) => console.log(value)}
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           type="number"
                           label="Total Experience"
                           required
                           min={0}
                           placeholder="Enter your total experience in years"
                        />
                     </div>
                  </FormSection>
                  <FormSection title="Links">
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Github"
                           placeholder="Enter your Github profile link"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="LinkedIn"
                           placeholder="Enter your LinkedIn profile link"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Portfolio"
                           placeholder="Enter your portfolio link"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Other"
                           placeholder="Enter any other relevant link"
                        />
                     </div>
                  </FormSection>
                  <FormSection title="Experience 1">
                     <div className="col-span-12 md:col-span-6">
                        <DatePicker
                           id="startDate"
                           label="Start Date"
                           value={undefined}
                           onChange={() => null}
                           required
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <DatePicker
                           id="endDate"
                           label="End Date"
                           value={undefined}
                           onChange={() => null}
                           required
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Company"
                           required
                           placeholder="Enter the company name"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           label="Role"
                           required
                           placeholder="Enter your role in the company"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Textarea
                           label="Description"
                           required
                           placeholder="Describe your responsibilities and achievements"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6 flex items-center justify-start gap-4">
                        <Button variant={"secondary"} type="button">
                           <Plus /> Add Another Experience
                        </Button>
                        <Button variant={"outline"} type="button">
                           <X /> Remove Experience
                        </Button>
                     </div>
                  </FormSection>
                  <FormSection title="Additional Information">
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           type="number"
                           label="Notice Period"
                           required
                           placeholder="Enter notice period in days"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           type="number"
                           label="Current CTC in INR"
                           required
                           placeholder="Enter your current CTC in INR"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           type="number"
                           label="Expected CTC in INR"
                           required
                           placeholder="Enter your expected CTC in INR"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Input
                           placeholder="Upload File (PDF only)"
                           type="file"
                           accept=".pdf"
                           required
                           label="Resume/CV"
                        />
                     </div>
                     <div className="col-span-12 md:col-span-6">
                        <Textarea
                           label="Cover Letter"
                           required
                           placeholder="Write a brief cover letter"
                        />
                     </div>
                     <div className="col-span-12 pt-4 flex items-center gap-2">
                        <Checkbox
                           label="Accept terms and conditions"
                           required
                        />
                        <Hint
                           description={
                              <>
                                 1. You are willing to work 10 hours a day, 6 days a
                                 week.
                                 <br />
                                 2. You are willing to sign a 2 year bond.
                                 <br />
                                 3. You are comfortable with a 3 month notice
                                 period.
                                 <br />
                                 4. You are willing to be available on weekends.
                                 <br />
                              </>
                           }
                           side={"right"}
                        >
                           <TriangleAlert className="h-[16px] w-[16px]" />
                        </Hint>
                     </div>
                  </FormSection>
                  <div className="py-8 w-full text-center">
                     <Button size={"lg"}>
                        <Send /> Submit
                     </Button>
                  </div>
               </form>
            </section>
            <footer className="h-44 bg-cyan-100 flex flex-col gap-3 items-center justify-center">
               <p>Built Under Pressure ⏰ by Akhil Panwar</p>
            </footer>
         </main>
      </>
   );
};

function FormSection({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) {
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-semibold pt-8">{title}</h2>
         <div className="grid grid-cols-12 space-y-3 gap-x-6">{children}</div>
      </div>
   );
}

export default App;
