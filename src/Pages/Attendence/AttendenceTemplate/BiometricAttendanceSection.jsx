import { useState } from "react";
import SelectField from "@/components/SelectFeild";
import InputField from "@/components/inputfeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const BiometricAttendanceSection = () => {
  const [form, setForm] = useState({
    lateRule: "",
    leaveSequence: "LWP",
    combination: "",
    noOfLeave: "",
    leaveType: "",
    minWorkingDaysWeekly: "",
    minWorkingDaysHoliday: "",
  });

  const [toggles, setToggles] = useState({
    deductLateEarly: false,
    clubWeekly: false,
    clubHoliday: false,
    noClubWeekly: false,
    autoShift: false,
    compOff: false,
    holidayPolicy: false,
    autoCompProcess: false,
    compOffRequest: false,
    adjustLeave: false,
    holidayIncentive: false,
    noBenefits: false,
    displayWorkingHour: false,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleToggle = (key, val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  return (
    <div
      className="
           bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg"
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">
        Biometric Attendance
      </h1>

      <SelectField
        label="Late Coming / Early Out Deduction Rule"
        name="lateRule"
        value={form.lateRule}
        onChange={handleChange}
        unSelectLabel="Select"
        options={[
          { value: "rule1", label: "Rule 1" },
          { value: "rule2", label: "Rule 2" },
        ]}
      />
      <div className="mb-3">
        <VariableTypeRow
          label="Same Leave Deduction for All Late/Early Out"
          checked={toggles.deductLateEarly}
          onCheckedChange={(val) => handleToggle("deductLateEarly", val)}
        />
      </div>

      {/* Leave Deduction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <SelectField
          label="Late Coming / Early Out — Batch Completion Leave Deduction"
          name="leaveSequence"
          value={form.leaveSequence}
          onChange={handleChange}
          options={[
            { value: "LWP", label: "LWP" },
            { value: "CL", label: "CL" },
          ]}
        />

        <SelectField
          label="Deduct Leave on Direct Late Coming / Early Out"
          name="combination"
          value={form.combination}
          onChange={handleChange}
          unSelectLabel="LWP"
          options={[{ value: "all", label: "Select All" }]}
        />
        {/* 
        <InputField
          label="No. of Leave"
          name="noOfLeave"
          value={form.noOfLeave}
          onChange={handleChange}
          placeholder="0"
        />

        <SelectField
          label="Leave"
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
          unSelectLabel="Select All"
          options={[{ value: "all", label: "Select All" }]}
        /> */}
      </div>

      {/* Weekly & Holiday Eligibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 items-center">
        <VariableTypeRow
          label="Club Weekly off with absent"
          checked={toggles.clubWeekly}
          onCheckedChange={(val) => handleToggle("clubWeekly", val)}
        />

        <InputField 
          label="Minimum Working Days Required for Weekly Eligibility"
          name="minWorkingDaysWeekly"
          value={form.minWorkingDaysWeekly}
          onChange={handleChange}
        />

        <VariableTypeRow
          label="Club Holiday with absent"
          checked={toggles.clubHoliday}
          onCheckedChange={(val) => handleToggle("clubHoliday", val)}
        />

        <InputField 
          label="Minimum Working Days Required for Holiday Eligibility"
          name="minWorkingDaysHoliday"
          value={form.minWorkingDaysHoliday}
          onChange={handleChange}
        />
      </div>

      {/* Remaining Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Do not club Weekly Off"
          checked={toggles.noClubWeekly}
          onCheckedChange={(val) => handleToggle("noClubWeekly", val)}
        />

        <VariableTypeRow
          label="Auto Shift by Punch-in"
          checked={toggles.autoShift}
          onCheckedChange={(val) => handleToggle("autoShift", val)}
        />

        <VariableTypeRow
          label="Comp Off Applicable"
          checked={toggles.compOff}
          onCheckedChange={(val) => handleToggle("compOff", val)}
        />

        <VariableTypeRow
          label="Holiday & Week Off Policy"
          checked={toggles.holidayPolicy}
          onCheckedChange={(val) => handleToggle("holidayPolicy", val)}
        />

        <VariableTypeRow
          label="Auto Comp Off on Attendance Process"
          checked={toggles.autoCompProcess}
          onCheckedChange={(val) => handleToggle("autoCompProcess", val)}
        />

        <VariableTypeRow
          label="Compensatory Off Request"
          checked={toggles.compOffRequest}
          onCheckedChange={(val) => handleToggle("compOffRequest", val)}
        />

        <VariableTypeRow
          label="Adjust Leave"
          checked={toggles.adjustLeave}
          onCheckedChange={(val) => handleToggle("adjustLeave", val)}
        />

        <VariableTypeRow
          label="Holiday Incentive"
          checked={toggles.holidayIncentive}
          onCheckedChange={(val) => handleToggle("holidayIncentive", val)}
        />

        <VariableTypeRow
          label="No Benefits if No Leave Recorded including LWP"
          checked={toggles.noBenefits}
          onCheckedChange={(val) => handleToggle("noBenefits", val)}
        />

        <VariableTypeRow
          label="Display Working Hour on My Daily Attendance"
          checked={toggles.displayWorkingHour}
          onCheckedChange={(val) => handleToggle("displayWorkingHour", val)}
        />
      </div>
    </div>
  );
};

export default BiometricAttendanceSection;
