import React from "react";
import { Plus, Send, X, TriangleAlert } from "lucide-react";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";

import { jobRoles } from "./constants";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/datePicker";
import { Button } from "./ui/button";
import { CustomSelect } from "./ui/customSelect";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Hint } from "./ui/hint";
import { ApplicationFormData } from "./application";

export const FormContent = () => {
   const {
      control,
      formState: { errors },
   } = useFormContext<ApplicationFormData>();

   const { fields, append, remove } = useFieldArray({
      control,
      name: "experiences",
   });

   return (
      <>
         <FormSection title={"Basic Details"}>
            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Full Name"
                        required
                        placeholder="Enter your full name"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.fullName?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Email"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.email?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Phone"
                        required
                        placeholder="Enter your phone number"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.phone?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="currentLocation"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Current Location"
                        required
                        placeholder="Enter your current location"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.currentLocation?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="currentCompany"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Current Company"
                        required
                        placeholder="Enter your current company name"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.currentCompany?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="roleApplyingFor"
                  control={control}
                  render={({ field }) => (
                     <CustomSelect
                        id="role"
                        label="Role Applying for"
                        required
                        options={jobRoles}
                        value={field.value}
                        placeholder="Select Role"
                        onChange={field.onChange}
                        error={errors.roleApplyingFor?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="totalExperience"
                  control={control}
                  render={({ field }) => (
                     <Input
                        type="number"
                        label="Total Experience"
                        required
                        min={0}
                        placeholder="Enter your total experience in years"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.totalExperience?.message}
                     />
                  )}
               />
            </div>
         </FormSection>

         <FormSection title="Links">
            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="github"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Github"
                        placeholder="Enter your Github profile link"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.github?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="linkedin"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="LinkedIn"
                        placeholder="Enter your LinkedIn profile link"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.linkedin?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="portfolio"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Portfolio"
                        placeholder="Enter your portfolio link"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.portfolio?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="other"
                  control={control}
                  render={({ field }) => (
                     <Input
                        label="Other"
                        placeholder="Enter any other relevant link"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.other?.message}
                     />
                  )}
               />
            </div>
         </FormSection>
     
         {fields.map((field, index) => (
            <FormSection key={field.id} title={`Experience ${index + 1}`}>
               <div className="col-span-12 md:col-span-6">
                  <Controller
                     name={`experiences.${index}.startDate`}
                     control={control}
                     render={({ field }) => (
                        <DatePicker
                           id={`startDate-${index}`}
                           label="Start Date"
                           value={
                              field.value ? new Date(field.value) : undefined
                           }
                           onChange={(date) =>
                              field.onChange(date?.toISOString() || "")
                           }
                           required
                           error={
                              errors.experiences?.[index]?.startDate?.message
                           }
                        />
                     )}
                  />
               </div>

               <div className="col-span-12 md:col-span-6">
                  <Controller
                     name={`experiences.${index}.endDate`}
                     control={control}
                     render={({ field }) => (
                        <DatePicker
                           id={`endDate-${index}`}
                           label="End Date"
                           value={
                              field.value ? new Date(field.value) : undefined
                           }
                           onChange={(date) =>
                              field.onChange(date?.toISOString() || "")
                           }
                           required
                           error={errors.experiences?.[index]?.endDate?.message}
                        />
                     )}
                  />
               </div>

               <div className="col-span-12 md:col-span-6">
                  <Controller
                     name={`experiences.${index}.company`}
                     control={control}
                     render={({ field }) => (
                        <Input
                           label="Company"
                           required
                           placeholder="Enter the company name"
                           value={field.value}
                           onChange={field.onChange}
                           error={errors.experiences?.[index]?.company?.message}
                        />
                     )}
                  />
               </div>

               <div className="col-span-12 md:col-span-6">
                  <Controller
                     name={`experiences.${index}.role`}
                     control={control}
                     render={({ field }) => (
                        <Input
                           label="Role"
                           required
                           placeholder="Enter your role in the company"
                           value={field.value}
                           onChange={field.onChange}
                           error={errors.experiences?.[index]?.role?.message}
                        />
                     )}
                  />
               </div>

               <div className="col-span-12 md:col-span-6">
                  <Controller
                     name={`experiences.${index}.description`}
                     control={control}
                     render={({ field }) => (
                        <Textarea
                           label="Description"
                           required
                           placeholder="Describe your responsibilities and achievements"
                           value={field.value}
                           onChange={field.onChange}
                           error={
                              errors.experiences?.[index]?.description?.message
                           }
                        />
                     )}
                  />
               </div>

               <div className="col-span-12 md:col-span-6 flex items-center justify-start gap-4 flex-wrap">
                  <Button
                     variant={"secondary"}
                     type="button"
                     onClick={() =>
                        append({
                           startDate: "",
                           endDate: "",
                           company: "",
                           role: "",
                           description: "",
                        })
                     }
                  >
                     <Plus /> Add Another Experience
                  </Button>
                  {fields.length > 1 && (
                     <Button
                        variant={"outline"}
                        type="button"
                        onClick={() => remove(index)}
                     >
                        <X /> Remove Experience
                     </Button>
                  )}
               </div>
            </FormSection>
         ))}

         <FormSection title="Additional Information">
            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="noticePeriod"
                  control={control}
                  render={({ field }) => (
                     <Input
                        type="number"
                        label="Notice Period"
                        required
                        placeholder="Enter notice period in days"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.noticePeriod?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="currentCTC"
                  control={control}
                  render={({ field }) => (
                     <Input
                        type="number"
                        label="Current CTC in INR"
                        required
                        placeholder="Enter your current CTC in INR"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.currentCTC?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="expectedCTC"
                  control={control}
                  render={({ field }) => (
                     <Input
                        type="number"
                        label="Expected CTC in INR"
                        required
                        placeholder="Enter your expected CTC in INR"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.expectedCTC?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 md:col-span-6">
               <Controller
                  name="resume"
                  control={control}
                  render={({ field }) => (
                     <Input
                        placeholder="Upload File (PDF only)"
                        type="file"
                        accept=".pdf,.docx,.doc"
                        required
                        label="Resume/CV"
                        multiple={false}
                        onChange={(e) =>
                           field.onChange(e.target.files?.[0] ?? null)
                        }
                        error={errors.resume?.message}
                     />
                  )}
               />
            </div>

            <div className="col-span-12 pt-4 flex items-center gap-2">
               <Controller
                  name="acceptTerms"
                  control={control}
                  render={({ field }) => (
                     <Checkbox
                        label="Accept terms and conditions"
                        required
                        checked={field.value}
                        onChange={(checked) => field.onChange(checked)}
                        error={errors.acceptTerms?.message}
                     />
                  )}
               />
               <Hint
                  description={
                     <>
                        1. You are willing to sign a 2 year bond.
                        <br />
                        2. You are comfortable with a 3 month notice period.
                        <br />
                        3. You are willing to be available on weekends.
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
            <Button size={"lg"} type="submit">
               <Send /> Submit
            </Button>
         </div>
      </>
   );
};

export const FormSection = ({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) => {
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-semibold pt-8">{title}</h2>
         <div className="grid grid-cols-12 space-y-3 gap-x-6">{children}</div>
      </div>
   );
};
