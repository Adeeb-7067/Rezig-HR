import DatePickerField from "@/components/ui/datePicker";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";
import toast from "react-hot-toast";
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
// "focus:ring-2 focus:ring-[#9853F9] focus:ring-inset ",
// "dark:focus:ring-2 dark:focus:ring-[#9853F9] dark:focus:ring-inset",

//           className
//         )}
//       >
//         {children}
//       </select>
//     </div>
//   );
// };
const FamilyDetail = ({onNext,onPrev}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className="col-span-1">
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
          <h1 className="text-xl font-semibold  mb-1 text-gray-500">Family Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Spouse Name"
              name="spouseName"
              className="mb-2"
            />
            <DatePickerField
              label="Spouse Date of Birth"
              type="Date"
              name="spouseDob"
              className="mb-2"
            />
            <InputField
              label="Total No.of Children"
              name="childrenCount"
              className="mb-2"
            />
            <InputField
              label="Total No. of Dependents"
              name="dependentsCount"
              className="mb-2"
            />
            <InputField
              label="Number of Child Going to School"
              name="schoolChildren"
            />
            <InputField
              label="No. of Children in Hostel"
              name="hostelChildren"
            />
          </div>
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  p-2 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg mt-3">
          <InputField
            label="First Nominee Name"
            name="firstNominee"
             
          />
          <SelectField
            label="Relation (with First Nominee)"
            name="firstNomineeRelation"
          >
            <option>Spouse</option>
            <option>Child</option>
            <option>Parent</option>
            <option>Sibling</option>
          </SelectField>
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-3">
          <h1 className="text-sm font-semibold text-gray-500 mb-1">Emergency Contact Details 1</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Name"
              name="emergency1Name"
               
            />
            <SelectField
              label="RelationShip"
              name="emergency1Relation"
            >
              <option>Select Your Relationship</option>
              <option>Child</option>
              <option>Parent</option>
              <option>Sibling</option>
            </SelectField>
            <InputField
              label="Mobile Number"
              name="emergency1Mobile"
               
            />
            <InputField
              label="Email ID"
              name="emergency1Email"
               
            />
            <InputField
              label="Address"
              name="emergency1Address"
               
            />
            <InputField
              label="TelePhone Number"
              name="emergency1Telephone"
               
            />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 grid grid-cols-1 md:grid-cols-2 rounded-lg">
          <InputField
            label="First Child Name"
            name="firstChildName"
             
          />
          <DatePickerField
            label="Date of Birth (First Child)"
            type="Date"
            name="firstChildDob"
             
          />
          <InputField
            label="Second Child Name"
            name="secondChildName"
             
          />
          <InputField
            label="Date of Birth (Second Child)"
            name="secondChildDob"
             
          />
          <InputField
            label="Father's Occupation"
            name="fatherOccupation"
             
          />
          <InputField
            label="Mother's Occupation"
            name="motherOccupation"
             
          />
          <InputField
            label="Religion Name"
            name="religion"
             
          />
          <SelectField
            label="Blood Group"
            name="bloodGroup"
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </SelectField>
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  p-2 grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg mt-3">
          <InputField
            label="Second Nominee Name"
            name="secondNominee"
             
          />
          <SelectField
            label="Relation (with Second Nominee)"
            name="secondNomineeRelation"
          >
            <option>Spouse</option>
            <option>Child</option>
            <option>Parent</option>
            <option>Sibling</option>
          </SelectField>
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-3">
          <h1 className="text-sm font-semibold mb-1 text-gray-500">Contact Details 2</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Name"
              name="emergency2Name"
               
            />
            <SelectField
              label="RelationShip"
              name="emergency2Relation"
            >
              <option>Spouse</option>
              <option>Child</option>
              <option>Parent</option>
              <option>Sibling</option>
            </SelectField>
            <InputField
              label="Mobile Number"
              name="emergency2Mobile"
               
            />
            <InputField
              label="Email ID"
              name="emergency2Email"
               
            />
            <InputField
              label="Address"
              name="emergency2Address"
               
            />
            <InputField
              label="TelePhone Number"
              name="emergency2Telephone"
               
            />
          </div>
        </div>
        <div className="flex justify-end mt-1 w-full gap-2  ">
          <button 
            onClick={()=>onPrev()}
            className="bg-white dark:bg-[#E4E6EB]/10 border text-[#8629DF] font-semibold cursor-pointer text-[0.7rem] border-[#8629DF] py-1 rounded-sm w-1/5 my-3 ">
              Previous
            </button>
            <button 
            className="bg-white dark:bg-[#E4E6EB]/10 border text-[#8629DF] font-semibold text-[0.7rem] border-[#8629DF] py-1 rounded-sm w-1/5 my-3 ">
              Reset
            </button>
            <button
              onClick={() => {toast.success('Submit completed')
                window.location.reload()
                }}
              className="bg-[#8629DF] text-white font-semibold text-[0.7rem] w-1/5 py-1 my-3  cursor-pointer rounded-sm"
            >
              Submit
            </button>
          </div>
      </div>
    </div>
  );
};

export default FamilyDetail;