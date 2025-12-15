import DatePickerField from "@/components/ui/datePicker";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import SelectField from "@/components/SelectFeild";
// Reusable Input Component
const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  className = "",
  ...props
}) => (
  <div>
    <label className="block text-gray-500 font-semibold dark:text-gray-50 text-[0.7rem]  mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-7.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9853F9] focus:ring-inset rounded-sm px-4 py-1.5 ${className}`}
    />
  </div>
);
// Reusable Select Component
// const SelectField = ({
//   label,
//   name,
//   value,
//   onChange,
//   children,
//   className = "",
// }) => {
//   return (
//     <div className="w-full">
//       {/* Label */}
//       <label className="block text-[0.7rem] font-semibold text-gray-500 dark:text-gray-200 mb-1">
//         {label}
//       </label>

//       {/* Select */}
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={cn(
//           "w-full h-7.5 px-4 py-1.5 rounded-sm text-[0.7rem] font-normal",
//           "bg-white dark:bg-gray-800",
//           "border border-gray-300 dark:border-gray-700",
//           "text-gray-600 dark:text-gray-100",
//           "shadow-sm focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:outline-none",
//           "hover:border-gray-400 dark:hover:border-gray-500",
//           "transition-all duration-200 ease-in-out",
// "dark:focus:ring-2 dark:focus:ring-[#9853F9] dark:focus:ring-inset",

//           className
//         )}
//       >
//         {children}
//       </select>
//     </div>
//   );
// };


// Reusable Textarea Component
const TextareaField = ({ label, name, value, onChange, className = "", ...props }) => (
  <div>
    <label className="block text-gray-600 dark:text-gray-50 mt-2 text-[0.8rem] font-medium ">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full bg-white text-[.7rem] dark:bg-gray-800 border border-gray-300  focus:border-2 focus:border-[#9853F9] dark:border-gray-700 rounded-sm px-4 py-2 ${className}`}
      {...props}
    />
  </div>
);

// Reusable Checkbox Component
const CheckboxField = ({ label, name, checked, onChange, className = "" }) => (
  <div className="flex gap-2">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 mt-1 dark:bg-gray-700 ${className}`}
    />
    <p className=" text-gray-500 dark:text-gray-50 text-sm">{label}</p>
  </div>
);
const ToggleField = ({ label, name, value, onChange, className = "" }) => {
  return (
    <div className={`flex items-center justify-between  gap-3 mr-4 py-2 ${className}`}>
      <Label
        htmlFor={name}
        className="text-gray-500 dark:text-gray-50  text-[0.7rem] font-semibold"
      >
        {label}
      </Label>
      <Switch
        id={name}
        checked={value === "Yes"}
        onCheckedChange={(checked) =>
          onChange({
            target: { name, value: checked ? "Yes" : "No" },
          })
        }
        className="data-[state=checked]:bg-violet-600  data-[state=unchecked]:bg-gray-300 "
      />
    </div>
  );
};
const StatutoryDetails = ({ onNext,onPrev }) => {
  const [formData, setFormData] = useState({
    // Statutory Details
    pfApplicable: "",
    pfLimit: "",
    pfNumber: "",
    pensionApplicable: "",
    pensionLimit: "",
    esiApplicable: "",
    esiNumber: "",
    lwfApplicable: "",
    vpfApplicable: "",
    profTaxApplicable: "",
    otApplicable: "",
    gratuityDate: "",
    conformationDate: "",
    dateOfTransfer: "",
    
    // FNF Details
    projectedDate: "",
    resignationDate: "",
    leavingDate: "",
    lastWorkingDay: "",
    settlementDate: "",
    reason: "",
    leavingRemark: "",
    suspended: false,
    
    // Bank Details
    salaryBankName: "",
    salaryIfscCode: "",
    salaryAccountNumber: "",
    salaryPaymentMethod: "",
    
    // Reimbursement Account
    reimbursementBankName: "",
    reimbursementIfscCode: "",
    reimbursementAccountNumber: "",
    reimbursementPaymentMethod: "",
    
    // Other Details
    tdsCertifiesNumber: "",
    director: "",
    otherPensionLimit: "",
    currencyCode: "",
    handicapped: false,
    
    // Identification Details
    aadharNumber: "",
    uanNumber: "",
    drivingLicenseNumber: "",
    passportNumber: "",
    passportIssueOffice: "",
    passportIssueDate: "",
    passportExpiryDate: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
      <div className="col-span-1">
        {/* Statutory Details */}
      <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 rounded-lg">
  <h1 className="text-sm text-gray-500 font-semibold mb-1">Statutory Details</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    {/* LEFT COLUMN - All Toggles */}
    <div className="space-y-6 mt-4">
      <ToggleField
        label="PF Applicable"
        name="pfApplicable"
        value={formData.pfApplicable}
        onChange={handleChange}
      />
      <ToggleField
        label="Pension Applicable"
        name="pensionApplicable"
        value={formData.pensionApplicable}
        onChange={handleChange}
      />
      <ToggleField
        label="ESI Applicable"
        name="esiApplicable"
        value={formData.esiApplicable}
        onChange={handleChange}
      />
      <ToggleField
        label="LWF Applicable"
        name="lwfApplicable"
        value={formData.lwfApplicable}
        onChange={handleChange}
      />
      <ToggleField
        label="VPF Applicable"
        name="vpfApplicable"
        value={formData.vpfApplicable}
        onChange={handleChange}
      />
      <ToggleField
        label="Prof Tax Applicable"
        name="profTaxApplicable"
        value={formData.profTaxApplicable}
        onChange={handleChange}
      />
      <ToggleField
        label="OT Applicable"
        name="otApplicable"
        value={formData.otApplicable}
        onChange={handleChange}
      />
    </div>

    {/* RIGHT COLUMN - All Inputs & Dates */}
    <div className="space-y-2">
      <InputField
        label="PF Limit"
        name="pfLimit"
        value={formData.pfLimit}
        onChange={handleChange}
      />
      <InputField
        label="PF Number"
        name="pfNumber"
        value={formData.pfNumber}
        onChange={handleChange}
      />
      <InputField
        label="Pension Limit"
        name="pensionLimit"
        value={formData.pensionLimit}
        onChange={handleChange}
      />
      <InputField
        label="ESI Number"
        name="esiNumber"
        value={formData.esiNumber}
        onChange={handleChange}
      />
      <DatePickerField
        label="Gratuity Date"
        type="date"
        name="gratuityDate"
        value={formData.gratuityDate}
        onChange={handleChange}
      />
      <DatePickerField
        label="Conformation Date"
        type="date"
        name="conformationDate"
        value={formData.conformationDate}
        onChange={handleChange}
      />
      <DatePickerField
        label="Date of Transfer"
        type="date"
        name="dateOfTransfer"
        value={formData.dateOfTransfer}
        onChange={handleChange}
      />
    </div>
  </div>
</div>


        {/* FNF Details */}
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 rounded-lg mt-3">
          <h1 className="text-sm text-gray-500 font-semibold mb-1">FNF (Full & Final) Date</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <DatePickerField
              label="Projected Date"
              type="date"
              name="projectedDate"
              value={formData.projectedDate}
              onChange={handleChange}
            />
            <DatePickerField
              label="Resignation Date"
              type="date"
              name="resignationDate"
              value={formData.resignationDate}
              onChange={handleChange}
            />
            <DatePickerField
              label="Leaving Date"
              type="date"
              name="leavingDate"
              value={formData.leavingDate}
              onChange={handleChange}
            />
            <DatePickerField
              label="Last Working Day (LWD)"
              type="date"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
            />
            <DatePickerField
              label="Settlement Date"
              type="date"
              name="settlementDate"
              value={formData.settlementDate}
              onChange={handleChange}
            />
            <SelectField
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            >
              <option>Terminated</option>
              <option>Yes</option>
              <option>No</option>
            </SelectField>
          </div>
        
          <TextareaField
            label="Leaving Remark"
            name="leavingRemark"
            value={formData.leavingRemark}
            onChange={handleChange}
            className="h-[114px] mt-1"
          />
          <CheckboxField
            label="Suspended"
            name="suspended"
            checked={formData.suspended}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-span-1">
        {/* Bank Details */}
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 rounded-lg">
          <h1 className="text-xl text-gray-500  font-semibold mb-2">Bank Details</h1>
          <p className="text-sm  text-gray-500 font-semibold mb-1">Salary Account</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Bank Name"
              name="salaryBankName"
              value={formData.salaryBankName}
              onChange={handleChange}
            />
            <InputField
              label="IFSC Code"
              name="salaryIfscCode"
              value={formData.salaryIfscCode}
              onChange={handleChange}
            />
            <InputField
              label="Bank Account Number"
              name="salaryAccountNumber"
              value={formData.salaryAccountNumber}
              onChange={handleChange}
            />
            <SelectField
              label="Payment Method"
              name="salaryPaymentMethod"
              value={formData.salaryPaymentMethod}
              onChange={handleChange}
              options={[
                
                {value:'UPI',label:'UPI'},
              ]}
            >
              {/* <option>UPI</option>
              <option>Net Banking</option> */}
            </SelectField>
          </div>
        </div>

        {/* Reimbursement Account */}
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 rounded-lg mt-3">
          <h1 className="text-sm text-gray-500 font-semibold mb-1">Reimbursement Account</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Bank Name"
              name="reimbursementBankName"
              value={formData.reimbursementBankName}
              onChange={handleChange}
            />
            <InputField
              label="IFSC Code"
              name="reimbursementIfscCode"
              value={formData.reimbursementIfscCode}
              onChange={handleChange}
            />
            <InputField
              label="Bank Account Number"
              name="reimbursementAccountNumber"
              value={formData.reimbursementAccountNumber}
              onChange={handleChange}
            />
            <SelectField
              label="Payment Method"
              name="reimbursementPaymentMethod"
              value={formData.reimbursementPaymentMethod}
              onChange={handleChange}
            >
              <option>UPI</option>
              <option>Net Banking</option>
            </SelectField>
          </div>
        </div>

        {/* Other Details */}
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 rounded-lg mt-3">
          <h1 className="text-sm text-gray-500 font-semibold mb-1">Other Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="TDS Certifies Number"
              name="tdsCertifiesNumber"
              value={formData.tdsCertifiesNumber}
              onChange={handleChange}
            />
            <ToggleField
             label="Director"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
            <InputField
              label="Pension Limit"
              name="otherPensionLimit"
              value={formData.otherPensionLimit}
              onChange={handleChange}
            />
            <InputField
              label="Currency Code"
              name="currencyCode"
              value={formData.currencyCode}
              onChange={handleChange}
            />
            <CheckboxField
              label="Handicapped"
              name="handicapped"
              checked={formData.handicapped}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Identification Details */}
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 rounded-lg mt-3">
          <h1 className="text-sm font-semibold text-gray-500 mb-1">Add Identification Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <InputField
              label="Aadhar Number"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
            />
            <InputField
              label="UAN Number"
              name="uanNumber"
              value={formData.uanNumber}
              onChange={handleChange}
            />
            <InputField
              label="Driving License Number"
              name="drivingLicenseNumber"
              value={formData.drivingLicenseNumber}
              onChange={handleChange}
            />
            <div></div>
            <InputField
              label="Passport Number"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
            />
            <InputField
              label="Passport Issue Office"
              name="passportIssueOffice"
              value={formData.passportIssueOffice}
              onChange={handleChange}
            />
            <DatePickerField
              label="Passport Issue Date"
              type="date"
              name="passportIssueDate"
              value={formData.passportIssueDate}
              onChange={handleChange}
            />
            <InputField
              label="Passport Expiry Date"
              name="passportExpiryDate"
              value={formData.passportExpiryDate}
              onChange={handleChange}
            />
          </div>
        </div>

      </div>


    </div>
        {/* Buttons */}
         <div className="flex justify-end mt-1 w-full gap-2  ">
           <button
            onClick={()=>onPrev()}
className="bg-white dark:bg-[#E4E6EB]/10 border-1 text-[#8629DF] font-semibold text-[0.7rem] border-[#8629DF] py-1 rounded-sm w-1/9 my-3 ">              Previous
            </button>
            <button className="bg-white dark:bg-[#E4E6EB]/10 border-1 text-[#8629DF] font-semibold text-[0.7rem] border-[#8629DF] py-1 rounded-sm w-1/9 my-3 ">
              Reset
            </button>
            <button
              onClick={() => onNext()}
              className="bg-[#8629DF] text-white font-semibold text-[0.7rem] w-1/9 py-1 my-3 cursor-pointer  rounded-sm"
            >
              Next
            </button>
          </div>
    </div>
  );
};

export default StatutoryDetails;