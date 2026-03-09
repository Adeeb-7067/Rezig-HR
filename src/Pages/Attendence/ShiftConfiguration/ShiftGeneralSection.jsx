;

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
            className="
        w-full
        rounded-2xl
        p-6
       bg-[#EFEFEF]/70
        dark:bg-gray-800
        border border-gray-200
        dark:border-gray-700
        shadow-sm
        transition-colors
      "
        >
            {/* Title */}
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Shift Configuration
            </h4>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

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