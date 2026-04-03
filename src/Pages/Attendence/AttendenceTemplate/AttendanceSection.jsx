import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import { useState } from "react";

const AttendanceSection = () => {
  const [form, setForm] = useState({
    templateId: "",
    templateName: "",
    dividingFactorBy: "",
    dividingFactor: "",
    attendanceCutOffDay: "",
    weeklyOffPriority: "",
  });

  const [toggles, setToggles] = useState({
    weeklyOff: false,
    sanctionLeave: false,
    holiday: false,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleToggle = (key, val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
      <h1 className="text-base font-semibold mb-1 text-gray-500">
        Attendance
      </h1>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1.5">
        <SelectField 
          label="Template ID" 
          name="templateId"
          value={form.templateId}
          onChange={handleChange}
          placeholder="Select ID"  
          unSelectLabel={'Select ID'} 
          options={[{
            label:'KSCKEW2',
            value:'KDISD'
          }]} 
        />
        <InputField 
          label="Template Name :" 
          name="templateName"
          value={form.templateName}
          onChange={handleChange}
          placeholder="Enter Name" 
        />
      </div>

      {/* Row 2 (Full Width) */}
      <div className="mb-1.5">
        <SelectField
          label="Dividing Factor By"
          name="dividingFactorBy"
          value={form.dividingFactorBy}
          onChange={handleChange}
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
        <InputField 
          label="Dividing Factor" 
          name="dividingFactor"
          value={form.dividingFactor}
          onChange={handleChange}
          placeholder="0" 
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        <VariableTypeRow
          label="Deduct Sanction Leave"
          checked={toggles.sanctionLeave}
          onCheckedChange={(val) => handleToggle("sanctionLeave", val)}
        />
        <InputField 
          label="Attendance Cut-Off Day" 
          name="attendanceCutOffDay"
          value={form.attendanceCutOffDay}
          onChange={handleChange}
        />
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Deduct Holiday"
          checked={toggles.holiday}
          onCheckedChange={(val) => handleToggle("holiday", val)}
        />
        <SelectField 
          name="weeklyOffPriority"
          value={form.weeklyOffPriority}
          onChange={handleChange}
          options={[{
            label:'1',value:'1'
          }]} 
          label="Weekly Off and Holiday Priority" 
          placeholder="0" 
        />
      </div>
    </div>
  );
};

export default AttendanceSection;
