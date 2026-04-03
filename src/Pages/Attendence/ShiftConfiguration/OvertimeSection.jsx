;

import { Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import InputField from "@/components/inputfeild";

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
                <Info size={14} className="ds-text-primary" />
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
          focus:ring-ds-primary
        "
            />
        </div>
    );

    return (
       <div
      className="
      bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2"
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">
                Overtime Configuration
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <InputField
                info={'Overtime will Start after time'}
                    label="Overtime will Start after time"
                    name="otStart"
                    value={form.otStart}
                    onChange={handleChange}
                />

                <InputField
                    label="Min Work Hrs./Min. for OT"
                    info="Min Work Hrs./Min. for OT"
                    name="minWork"
                    value={form.minWork}
                    onChange={handleChange}
                />

                <InputField
                    label="First Break After Overtime Hours"

                    info="First Break After Overtime Hours"
                    name="firstBreakAfter"
                    value={form.firstBreakAfter}
                    onChange={handleChange}
                />

                <InputField
                    label="OT Round-Off (Hours/Minutes)"

                    info="OT Round-Off (Hours/Minutes)"
                    name="roundOff"
                    value={form.roundOff}
                    onChange={handleChange}
                />

                <InputField
                    label="Duration of First OT Break"

                    info="Duration of First OT Break"
                    name="firstBreakDuration"
                    value={form.firstBreakDuration}
                    onChange={handleChange}
                />

                <InputField
                    label="Gap Before Second OT Break"
                    info="Gap Before Second OT Break"
                    name="gapBeforeSecond"
                    value={form.gapBeforeSecond}
                    onChange={handleChange}
                />

                <InputField

                    label="Duration of Second OT Break"
                    info="Duration of Second OT Break"
                    name="secondBreakDuration"
                    value={form.secondBreakDuration}
                    onChange={handleChange}
                />

                <InputField
                    label="Define OT Cycle"
                    info="Define OT Cycle"
                    name="otCycle"
                    value={form.otCycle}
                    onChange={handleChange}
                />

                <InputField
                    label="Maximum Allowed OT Hours"
                    info="Maximum Allowed OT Hours"
                    name="maxOT"
                    value={form.maxOT}
                    onChange={handleChange}
                />

                <InputField
                    label="Add Minutes for OT Cycle"
                    info="Add Minutes for OT Cycle"
                    name="addMinutes"
                    value={form.addMinutes}
                    onChange={handleChange}
                />

            </div>
        </div>
    );
};

export default OvertimeSection;