import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormContent } from "./formContent";
import { toast } from "sonner";

const applicationSchema = z
   .object({
      // basic details
      fullName: z.string().min(1, "Full Name is required"),
      email: z.email({ message: "Invalid email address" }),
      phone: z
         .string()
         .min(10, "Phone number must be 10 digits")
         .max(10, "Phone number must be 10 digits")
         .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
      currentLocation: z.string().min(1, "Current location is required"),
      currentCompany: z.string().min(1, "Current company is required"),
      roleApplyingFor: z.string().min(1, "Role is required"),
      totalExperience: z.string().min(1, "Total experience is required"),

      // links
      github: z
         .string()
         .optional()
         .refine(
            (val) =>
               !val ||
               /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+(\/)?$/.test(val),
            { message: "Enter a valid GitHub profile URL" }
         ),
      linkedin: z
         .string()
         .optional()
         .refine(
            (val) =>
               !val ||
               /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+(\/)?$/.test(
                  val
               ),
            { message: "Enter a valid LinkedIn profile URL" }
         ),
      portfolio: z
         .string()
         .optional()
         .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), {
            message: "Enter a valid portfolio URL",
         }),
      other: z.string().optional(),

      // experience (dynamic array)
      experiences: z
         .array(
            z.object({
               startDate: z.string().min(1, "Start date is required"),
               endDate: z.string().min(1, "End date is required"),
               company: z.string().min(1, "Company name is required"),
               role: z.string().min(1, "Role is required"),
               description: z.string().min(1, "Description is required"),
            })
         )
         .min(1, "At least one experience is required"),

      // additional information
      noticePeriod: z.string().min(1, "Notice period is required"),
      currentCTC: z.string().min(1, "Current CTC is required"),
      expectedCTC: z.string().min(1, "Expected CTC is required"),
      resume: z.instanceof(File).refine((file) => file.size > 0, {
         message: "Resume is required",
      }),
      acceptTerms: z
         .boolean()
         .refine((val) => val === true, "You must accept terms and conditions"),
   })
   .superRefine((data, ctx) => {
      // validate minimum totalExperience as per role

      const roleExperienceMap: Record<string, number> = {
         "1": 3, // 3+years for React
         "2": 2, // 2+years for Angular
         "3": 1, // 1+years for React Native
      };

      const enteredExp = Number(data.totalExperience) || 0;
      const requiredExp = roleExperienceMap[data.roleApplyingFor];

      if (requiredExp !== undefined && enteredExp < requiredExp) {
         ctx.addIssue({
            code: "custom",
            path: ["totalExperience"],
            message: `Minimum experience required for this role is ${requiredExp} years`,
         });
      }
   });

export type ApplicationFormData = z.infer<typeof applicationSchema>;

const initialValues = {
   fullName: "",
   email: "",
   phone: "",
   currentLocation: "",
   currentCompany: "",
   roleApplyingFor: "",
   totalExperience: "",
   github: "",
   linkedin: "",
   portfolio: "",
   other: "",
   experiences: [
      {
         startDate: "",
         endDate: "",
         company: "",
         role: "",
         description: "",
      },
   ],
   noticePeriod: "",
   currentCTC: "",
   expectedCTC: "",
   resume: undefined,
   acceptTerms: false,
};

export const Application = () => {
   const methods = useForm<ApplicationFormData>({
      resolver: zodResolver(applicationSchema),
      mode: "all", // onBlur, onChange, onSubmit
      defaultValues: initialValues,
   });

   const {
      // control,
      handleSubmit,
      formState: { errors },
       reset, // reset form with new values
      // setValue, // set value for a field
      // clearErrors, // clear errors for a field
      // setError, // set error for a field
      // watch, // watch value of a field
   } = methods;
   console.log(errors);

   // const totalExperience  = watch("totalExperience");
   // const [totalExperience, roleApplyingFor] = watch(['totalExperience', 'roleApplyingFor']);

   const onSubmit = (data: ApplicationFormData) => {
      console.log("Form submitted", data);
      toast.success("Application submitted successfully!");

      // reset form after success successful submission
      reset(initialValues);
   };

   return (
      <section>
         <FormProvider {...methods}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
               <FormContent />
            </form>
         </FormProvider>
      </section>
   );
};

export default Application;
