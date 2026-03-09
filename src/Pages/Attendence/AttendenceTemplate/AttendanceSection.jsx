;
import InputField from "@/components/inputfeild";
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
        <div className="
        w-full 
        rounded-xl 
        p-6 
        space-y-6
       bg-[#EFEFEF]/70
        dark:bg-gray-800
        border border-gray-200 
        dark:border-gray-700
        transition-colors
      "
        >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Attendance
            </h4>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Template ID" placeholder="Select ID" />
                <InputField label="Template Name :" placeholder="Enter Name" />
            </div>

            {/* Row 2 (Full Width) */}
            <div>
                <InputField label="Dividing Factor By" placeholder="0" />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <VariableTypeRow
                    label="Deduct Weekly-Off"
                    checked={toggles.weeklyOff}
                    onCheckedChange={(val) => handleToggle("weeklyOff", val)}
                />
                <InputField label="Dividing Factor" placeholder="0" />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <VariableTypeRow
                    label="Deduct Sanction Leave"
                    checked={toggles.sanctionLeave}
                    onCheckedChange={(val) => handleToggle("sanctionLeave", val)}
                />
                <InputField label="Attendance Cut-Off Day" />
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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