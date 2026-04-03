import DatePickerField from "@/components/ui/datePicker";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
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
    <label className="block text-gray-500 dark:text-gray-50 ds-text-xs font-semibold mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-7.5 ds-text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-ds-primary focus:ring-inset rounded-sm px-4 py-1.5 ${className}`}
      {...props}
    />
  </div>
);

const FamilyDetail = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    spouseName: "",
    spouseDob: "",
    childrenCount: "",
    dependentsCount: "",
    schoolChildren: "",
    hostelChildren: "",
    firstNominee: "",
    firstNomineeRelation: "Spouse",
    emergency1Name: "",
    emergency1Relation: "Select Your Relationship",
    emergency1Mobile: "",
    emergency1Email: "",
    emergency1Address: "",
    emergency1Telephone: "",
    firstChildName: "",
    firstChildDob: "",
    secondChildName: "",
    secondChildDob: "",
    fatherOccupation: "",
    motherOccupation: "",
    religion: "",
    bloodGroup: "A+",
    secondNominee: "",
    secondNomineeRelation: "Spouse",
    emergency2Name: "",
    emergency2Relation: "Spouse",
    emergency2Mobile: "",
    emergency2Email: "",
    emergency2Address: "",
    emergency2Telephone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleReset = () => {
    setFormData({
      spouseName: "",
      spouseDob: "",
      childrenCount: "",
      dependentsCount: "",
      schoolChildren: "",
      hostelChildren: "",
      firstNominee: "",
      firstNomineeRelation: "Spouse",
      emergency1Name: "",
      emergency1Relation: "Select Your Relationship",
      emergency1Mobile: "",
      emergency1Email: "",
      emergency1Address: "",
      emergency1Telephone: "",
      firstChildName: "",
      firstChildDob: "",
      secondChildName: "",
      secondChildDob: "",
      fatherOccupation: "",
      motherOccupation: "",
      religion: "",
      bloodGroup: "A+",
      secondNominee: "",
      secondNomineeRelation: "Spouse",
      emergency2Name: "",
      emergency2Relation: "Spouse",
      emergency2Mobile: "",
      emergency2Email: "",
      emergency2Address: "",
      emergency2Telephone: "",
    });
  };

  const relationOptions = [
    { label: "Spouse", value: "Spouse" },
    { label: "Child", value: "Child" },
    { label: "Parent", value: "Parent" },
    { label: "Sibling", value: "Sibling" },
  ];

  const emergencyRelationOptions = [
    { label: "Select Your Relationship", value: "Select Your Relationship" },
    { label: "Spouse", value: "Spouse" },
    { label: "Child", value: "Child" },
    { label: "Parent", value: "Parent" },
    { label: "Sibling", value: "Sibling" },
  ];

  const bloodGroupOptions = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div className="col-span-1">
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
          <h1 className="text-base font-semibold mb-1 text-gray-500 text-xl">
            Family Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Spouse Name"
              name="spouseName"
              value={formData.spouseName}
              onChange={handleChange}
              className="mb-2"
            />
            <DatePickerField
              label="Spouse Date of Birth"
              type="Date"
              name="spouseDob"
              value={formData.spouseDob}
              onChange={(date) => handleDateChange("spouseDob", date)}
              className="mb-2"
            />
            <InputField
              label="Total No.of Children"
              name="childrenCount"
              value={formData.childrenCount}
              onChange={handleChange}
              className="mb-2"
            />
            <InputField
              label="Total No. of Dependents"
              name="dependentsCount"
              value={formData.dependentsCount}
              onChange={handleChange}
              className="mb-2"
            />
            <InputField
              label="Number of Child Going to School"
              name="schoolChildren"
              value={formData.schoolChildren}
              onChange={handleChange}
            />
            <InputField
              label="No. of Children in Hostel"
              name="hostelChildren"
              value={formData.hostelChildren}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
          <InputField
            label="First Nominee Name"
            name="firstNominee"
            value={formData.firstNominee}
            onChange={handleChange}
          />
          <SelectField
            label="Relation (with First Nominee)"
            name="firstNomineeRelation"
            value={formData.firstNomineeRelation}
            onChange={handleChange}
            options={relationOptions}
          />
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg mt-3">
          <h1 className="text-base font-semibold mb-1 text-gray-500 text-sm">
            Emergency Contact Details 1
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Name"
              name="emergency1Name"
              value={formData.emergency1Name}
              onChange={handleChange}
            />
            <SelectField
              label="RelationShip"
              name="emergency1Relation"
              value={formData.emergency1Relation}
              onChange={handleChange}
              options={emergencyRelationOptions}
            />
            <InputField
              label="Mobile Number"
              name="emergency1Mobile"
              value={formData.emergency1Mobile}
              onChange={handleChange}
            />
            <InputField
              label="Email ID"
              name="emergency1Email"
              value={formData.emergency1Email}
              onChange={handleChange}
            />
            <InputField
              label="Address"
              name="emergency1Address"
              value={formData.emergency1Address}
              onChange={handleChange}
            />
            <InputField
              label="TelePhone Number"
              name="emergency1Telephone"
              value={formData.emergency1Telephone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2">
          <InputField
            label="First Child Name"
            name="firstChildName"
            value={formData.firstChildName}
            onChange={handleChange}
          />
          <DatePickerField
            label="Date of Birth (First Child)"
            type="Date"
            name="firstChildDob"
            value={formData.firstChildDob}
            onChange={(date) => handleDateChange("firstChildDob", date)}
          />
          <InputField
            label="Second Child Name"
            name="secondChildName"
            value={formData.secondChildName}
            onChange={handleChange}
          />
          <InputField
            label="Date of Birth (Second Child)"
            name="secondChildDob"
            value={formData.secondChildDob}
            onChange={handleChange}
          />
          <InputField
            label="Father's Occupation"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
          />
          <InputField
            label="Mother's Occupation"
            name="motherOccupation"
            value={formData.motherOccupation}
            onChange={handleChange}
          />
          <InputField
            label="Religion Name"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
          />
          <SelectField
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            options={bloodGroupOptions}
          />
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
          <InputField
            label="Second Nominee Name"
            name="secondNominee"
            value={formData.secondNominee}
            onChange={handleChange}
          />
          <SelectField
            label="Relation (with Second Nominee)"
            name="secondNomineeRelation"
            value={formData.secondNomineeRelation}
            onChange={handleChange}
            options={relationOptions}
          />
        </div>
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg mt-3">
          <h1 className="text-base font-semibold mb-1 text-gray-500 text-sm">
            Contact Details 2
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Name"
              name="emergency2Name"
              value={formData.emergency2Name}
              onChange={handleChange}
            />
            <SelectField
              label="RelationShip"
              name="emergency2Relation"
              value={formData.emergency2Relation}
              onChange={handleChange}
              options={emergencyRelationOptions}
            />
            <InputField
              label="Mobile Number"
              name="emergency2Mobile"
              value={formData.emergency2Mobile}
              onChange={handleChange}
            />
            <InputField
              label="Email ID"
              name="emergency2Email"
              value={formData.emergency2Email}
              onChange={handleChange}
            />
            <InputField
              label="Address"
              name="emergency2Address"
              value={formData.emergency2Address}
              onChange={handleChange}
            />
            <InputField
              label="TelePhone Number"
              name="emergency2Telephone"
              value={formData.emergency2Telephone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-2">
           <button
          onClick={()=>{window.history.back()}}
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
        >
          Back
        </button>
          <button
            onClick={onPrev}
            className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
          >
            Previous
          </button>
          <button
            onClick={handleReset}
            className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
          >
            Reset
          </button>
          <button
            onClick={onNext}
            className="bg-ds-primary text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetail;