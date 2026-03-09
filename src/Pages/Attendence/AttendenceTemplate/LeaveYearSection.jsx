;

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
        w-full rounded-xl p-6 space-y-6
        bg-[#EFEFEF]/70 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        transition-colors
      "
        >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Leave Year
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* From Date */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className="
                w-full h-[32px] px-3
                flex items-center
                rounded-md
                border border-gray-300 dark:border-gray-700
                bg-[#E0E4E7] dark:bg-gray-700
                text-[0.75rem]
                text-left
              "
                        >
                            <span className="truncate text-gray-700 dark:text-gray-100">
                                {form.fromDate
                                    ? format(form.fromDate, "PPP")
                                    : "Select a date"}
                            </span>

                            <CalendarIcon className="ml-auto h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={form.fromDate}
                            onSelect={(date) =>
                                setForm((prev) => ({ ...prev, fromDate: date }))
                            }
                            captionLayout="dropdown"
                            fromYear={1950}
                            toYear={2050}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* To Date */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className="
                w-full h-[32px] px-3
                flex items-center
                rounded-md
                border border-gray-300 dark:border-gray-700
                bg-[#E0E4E7] dark:bg-gray-700
                text-[0.75rem]
                text-left
              "
                        >
                            <span className="truncate text-gray-700 dark:text-gray-100">
                                {form.toDate
                                    ? format(form.toDate, "PPP")
                                    : "Select a date"}
                            </span>

                            <CalendarIcon className="ml-auto h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={form.toDate}
                            onSelect={(date) =>
                                setForm((prev) => ({ ...prev, toDate: date }))
                            }
                            captionLayout="dropdown"
                            fromYear={1950}
                            toYear={2050}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

            </div>

            {/* Note */}
            <p className="text-xs text-gray-600 dark:text-gray-400">
                Note : First create Attendance template then you can create Leave Year!
            </p>
        </div>
    );
};

export default LeaveYearSection;