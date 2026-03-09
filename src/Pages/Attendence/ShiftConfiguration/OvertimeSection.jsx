;

import { Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const OvertimeSection = () => {
    const [form, setForm] = useState({
        otStart: "",
        minWork: "",
        firstBreakAfter: "",
        roundOff: "",
        firstBreakDuration: "",
        gapBeforeSecond: "",
        secondBreakDuration: "",
        otCycle: "",
        maxOT: "",
        addMinutes: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const Field = ({ label, name }) => (
        <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
                <Info size={14} className="text-[#8629DF]" />
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            </div>

            <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder="Select Shift"
                className="
          h-9
          px-3
          rounded-md
          border border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-700
          text-xs
          text-gray-700
          dark:text-gray-200
          focus:outline-none
          focus:ring-1
          focus:ring-[#8629DF]
        "
            />
        </div>
    );

    return (
        <div
            className="
        w-full
        rounded-xl
        p-5
        space-y-5
        bg-[#EFEFEF]/70
        dark:bg-gray-800
        border border-gray-200
        dark:border-gray-700
        transition-colors
      "
        >
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Overtime Configuration
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                <Field
                    label="Overtime will Start after time"
                    name="otStart"
                />

                <Field
                    label="Min Work Hrs./Min. for OT"
                    name="minWork"
                />

                <Field
                    label="First Break After Overtime Hours"
                    name="firstBreakAfter"
                />

                <Field
                    label="OT Round-Off (Hours/Minutes)"
                    name="roundOff"
                />

                <Field
                    label="Duration of First OT Break"
                    name="firstBreakDuration"
                />

                <Field
                    label="Gap Before Second OT Break"
                    name="gapBeforeSecond"
                />

                <Field
                    label="Duration of Second OT Break"
                    name="secondBreakDuration"
                />

                <Field
                    label="Define OT Cycle"
                    name="otCycle"
                />

                <Field
                    label="Maximum Allowed OT Hours"
                    name="maxOT"
                />

                <Field
                    label="Add Minutes for OT Cycle"
                    name="addMinutes"
                />

            </div>
        </div>
    );
};

export default OvertimeSection;