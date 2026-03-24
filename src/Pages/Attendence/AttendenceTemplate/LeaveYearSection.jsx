import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import DatePickerField from "@/components/ui/datePicker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LeaveYearSection = () => {
  const [form, setForm] = useState({
    fromDate: undefined,
    toDate: undefined,
  });

  return (
    <div
      className="
      bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg   
      "
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">Leave Year</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* From Date */}
        <DatePickerField
          label="From Date"
          onChange={(date) => setForm((prev) => ({ ...prev, fromDate: date }))}
          placeholder="Select a date"
        />

        {/* To Date */}
        <DatePickerField
          label="To Date"
          onChange={(date) => setForm((prev) => ({ ...prev, toDate: date }))}
          placeholder="Select a date"
        />
      </div>
    </div>
  );
};

export default LeaveYearSection;
