import { useState } from "react";
import SelectField from "@/components/SelectFeild";

const ShiftGeneralSection = () => {
  const [shiftCategory, setShiftCategory] = useState("");
  const [shiftName, setShiftName] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "category") setShiftCategory(e.target.value);
    if (e.target.name === "shift") setShiftName(e.target.value);
  };

  return (
    <div
      className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2"
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">
        Shift Configuration
      </h1>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SelectField
          label="Shift Category"
          name="category"
          value={shiftCategory}
          onChange={handleChange}
          unSelectLabel="Select Category"
          options={[
            { value: "general", label: "General" },
            { value: "night", label: "Night" },
          ]}    
        />

        <SelectField
          label="Shift Name"
          name="shift"
          value={shiftName}
          onChange={handleChange}
          unSelectLabel="Select Shift"
          options={[
            { value: "morning", label: "Morning Shift" },
            { value: "evening", label: "Evening Shift" },
          ]}
        />
      </div>
    </div>
  );
};

export default ShiftGeneralSection;
