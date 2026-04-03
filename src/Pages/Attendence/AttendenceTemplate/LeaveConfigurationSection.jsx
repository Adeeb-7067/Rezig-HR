import { useState } from "react";
import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import DatePickerField from "@/components/ui/datePicker";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
const LeaveConfigurationSection = () => {
  const [form, setForm] = useState({
    leaveBasedOn: "Day",
    proportionate: "",
    leaveBasedDate: null,
    lastWorkingDate: null,
  });

  const [toggles, setToggles] = useState({
    displayUnauthorized: false,
    displayUnauthorizedAlt: false,
    displayLWPPortal: false,
    displayLWPForm: false,
    employeePunch: false,
    allowTour: false,
    displayLateComing: false,
    longLeaveFlag: false,
    noClubWeeklyLWP: false,
    noClubHolidayLWP: false,
    noLeaveAfterSalary: false,
    approveRejectEmail: false,
    yearToDateCredit: false,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleToggle = (key, val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
      <h1 className="text-base font-semibold mb-1 text-gray-500">
        Leave Configuration
      </h1>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-1.5">
        <SelectField
          label="Leave Based on"
          name="leaveBasedOn"
          value={form.leaveBasedOn}
          onChange={handleChange}
          unSelectLabel="Select"
          options={[
            { value: "Day", label: "Day" },
            { value: "Month", label: "Month" },
          ]}
        />

        <DatePickerField 
          name="leaveBasedDate" 
          label="Leave Based on "
          value={form.leaveBasedDate}
          onChange={(date) => setForm({ ...form, leaveBasedDate: date })}
        />

        {/* <div className="flex flex-col">
          <label className="text-xs font-medium  text-gray-700 dark:text-gray-200 mb-1">
            Leave Based On
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <button
                className="
      w-full h-[32px] px-3 flex items-center
      rounded-md
      border border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-700
      text-xs text-left
      text-gray-700 dark:text-gray-200
      hover:border-purple-500
      transition-colors
    "
              >
                <span className="truncate">
                  {form.leaveBasedDate
                    ? format(form.leaveBasedDate, "dd MMM yyyy")
                    : "Select a date"}
                </span>

                <CalendarIcon className="ml-auto h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto  p-0" align="start">
              <Calendar
                mode="single"
                selected={form.leaveBasedDate}
                onSelect={(date) =>
                  setForm((prev) => ({ ...prev, leaveBasedDate: date }))
                }
                captionLayout="dropdown"
                fromYear={1950}
                toYear={2050}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div> */}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SelectField
          label="Proportionate with Joining Date"
          name="proportionate"
          value={form.proportionate}
          onChange={handleChange}
          unSelectLabel="Select"
          options={[
            { value: "pro1", label: "Proportionate will not consider" },
            { value: "pro2", label: "Consider Proportionate" },
          ]}
        />

        <DatePickerField
          name="lastWorkingDate"
          label="Last Working Day (LWD)"
          value={form.lastWorkingDate}
          onChange={(date) => setForm({ ...form, lastWorkingDate: date })}
        />
        {/* <div className="flex flex-col">
          <label className="text-xs font-medium  text-gray-700 dark:text-gray-200 mb-1">
            Last Working Day (LWD)
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <button
                className="
      w-full h-[32px] px-3 flex items-center
      rounded-md
      border border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-700
      text-xs text-left
      text-gray-700 dark:text-gray-200
      hover:border-purple-500
      transition-colors
    "
              >
                <span className="truncate">
                  {form.lastWorkingDate
                    ? format(form.lastWorkingDate, "dd MMM yyyy")
                    : "Select a date"}
                </span>

                <CalendarIcon className="ml-auto h-4 w-4 text-gray-500 dark:text-gray-300" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.lastWorkingDate}
                onSelect={(date) =>
                  setForm((prev) => ({ ...prev, lastWorkingDate: date }))
                }
                captionLayout="dropdown"
                fromYear={1950}
                toYear={2050}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div> */}
      </div>

      {/* Toggle Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Display Unauthorized Leave Sanction Form"
          checked={toggles.displayUnauthorized}
          onCheckedChange={(val) => handleToggle("displayUnauthorized", val)}
        />

        <VariableTypeRow
          label="Display Unauthorized Leave Sanction Form"
          checked={toggles.displayUnauthorizedAlt}
          onCheckedChange={(val) => handleToggle("displayUnauthorizedAlt", val)}
        />

        <VariableTypeRow
          label="Display LWP on Employee Self-Service portal"
          checked={toggles.displayLWPPortal}
          onCheckedChange={(val) => handleToggle("displayLWPPortal", val)}
        />

        <VariableTypeRow
          label="Display LWP on Leave Sanction Form"
          checked={toggles.displayLWPForm}
          onCheckedChange={(val) => handleToggle("displayLWPForm", val)}
        />

        <VariableTypeRow
          label="Employee Punch Capture on ESS"
          checked={toggles.employeePunch}
          onCheckedChange={(val) => handleToggle("employeePunch", val)}
        />

        <VariableTypeRow
          label="Allow employee to request Tour"
          checked={toggles.allowTour}
          onCheckedChange={(val) => handleToggle("allowTour", val)}
        />

        <VariableTypeRow
          label="Display Late Coming on Leave Sanction Form"
          checked={toggles.displayLateComing}
          onCheckedChange={(val) => handleToggle("displayLateComing", val)}
        />

        {/* <InputField
                    label="Late Coming Days"
                    disabled
                    className="bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                /> */}
        <InputField
          label="Late Coming Days"
          disabled
          className="!bg-[#E0E4E7] dark:!bg-gray-600 cursor-not-allowed text-gray-800 dark:text-gray-200"
        />
        <VariableTypeRow
          label="Long Leave Applicable Flag"
          checked={toggles.longLeaveFlag}
          onCheckedChange={(val) => handleToggle("longLeaveFlag", val)}
        />

        {/* <InputField
                    label="Leave Flag"
                    disabled
                    className="bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                /> */}
        <InputField
          label="Leave Flag"
          disabled
          className="!bg-[#E0E4E7] dark:!bg-gray-600 cursor-not-allowed text-gray-800 dark:text-gray-200"
        />
        {/* <InputField
                    label="No of Days After Which Weekly Off and Holiday will be Clubbed"
                    placeholder="0"
                />

                <InputField
                    label="No. of days after which employee can send attendance regularization (OD/Tour/Mispunch etc)"
                    placeholder="0"
                /> */}

        <div className="mt-4">
          <InputField
            name="            No of Days After Which Weekly Off and Holiday will be Clubbed"
            label={
              "  No of Days After Which Weekly Off and Holiday will be Clubbed"
            }
            type="text"
            placeholder="0"
            className="h-[30px] px-3 rounded-md border  text-gray-700 dark:text-gray-200 text-sm "
          />
        </div>

        <InputField
          name={
            " No. of days after which employee can send attendance regularization (OD/Tour/Mispunch etc)"
          }
          label={
            "No. of days after which employee can send attendance regularization (OD/Tour/Mispunch etc)"
          }
          type="text"
          placeholder="0"
          className="h-[30px] px-3 rounded-md border text-gray-700 dark:text-gray-200 text-sm"
        />
        <VariableTypeRow
          label="Do not Club Weekly Off with LWP"
          checked={toggles.noClubWeeklyLWP}
          onCheckedChange={(val) => handleToggle("noClubWeeklyLWP", val)}
        />

        <VariableTypeRow
          label="Do not Club Holiday with LWP"
          checked={toggles.noClubHolidayLWP}
          onCheckedChange={(val) => handleToggle("noClubHolidayLWP", val)}
        />

        <VariableTypeRow
          label="Do not allow Leave(s) after Salary Process"
          checked={toggles.noLeaveAfterSalary}
          onCheckedChange={(val) => handleToggle("noLeaveAfterSalary", val)}
        />

        <VariableTypeRow
          label="Option to Approve/Reject Leave/OD/Tour/Mispunch via Emails"
          checked={toggles.approveRejectEmail}
          onCheckedChange={(val) => handleToggle("approveRejectEmail", val)}
        />
      </div>

      {/* Full Width Field */}
      <InputField
        label="Number of days for which attendance regularization (OD/Tour/Mispunch etc) will be blocked after attendance cutoff days"
        placeholder="0"
        className="h-[30px] mt-2"
      />

      {/* Last Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Year To Date Credit Leave"
          checked={toggles.yearToDateCredit}
          onCheckedChange={(val) => handleToggle("yearToDateCredit", val)}
        />

        <InputField label="Mispunch limit in a month" />
      </div>
    </div>
  );
};

export default LeaveConfigurationSection;
