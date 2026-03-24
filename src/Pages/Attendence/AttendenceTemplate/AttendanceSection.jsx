import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import { useState } from "react";

const AttendanceSection = () => {
  const [toggles, setToggles] = useState({
    weeklyOff: false,
    sanctionLeave: false,
    holiday: false,
  });

  const handleToggle = (key, val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  return (
    <div
      className="
bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg      "
    >
                <h1 className="text-base font-semibold mb-1 text-gray-500">
        Attendance
      </h1>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1.5">
        <InputField label="Template ID" placeholder="Select ID" />
        <InputField label="Template Name :" placeholder="Enter Name" />
      </div>

      {/* Row 2 (Full Width) */}
      <div className="mb-1.5">
        <SelectField
          label="Dividing Factor By"
          unSelectLabel="0"
          options={[
            {
              label: "0",
              value: "0",
            },
          ]}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Deduct Weekly-Off"
          checked={toggles.weeklyOff}
          onCheckedChange={(val) => handleToggle("weeklyOff", val)}
        />
        <InputField label="Dividing Factor" placeholder="0" />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        <VariableTypeRow
          label="Deduct Sanction Leave"
          checked={toggles.sanctionLeave}
          onCheckedChange={(val) => handleToggle("sanctionLeave", val)}
        />
        <InputField label="Attendance Cut-Off Day" />
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Deduct Holiday"
          checked={toggles.holiday}
          onCheckedChange={(val) => handleToggle("holiday", val)}
        />
        <InputField label="Weekly Off and Holiday Priority" placeholder="0" />
      </div>
    </div>
  );
};

export default AttendanceSection;
