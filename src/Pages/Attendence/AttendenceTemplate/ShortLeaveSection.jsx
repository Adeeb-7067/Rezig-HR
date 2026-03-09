;

import { useState } from "react";
import InputField from "@/components/inputfeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const ShortLeaveSection = () => {
    const [toggles, setToggles] = useState({
        allowShort: false,
        allowMultiple: false,
    });

    const handleToggle = (key, val) =>
        setToggles((prev) => ({ ...prev, [key]: val }));

    return (
        <div
            className="
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
                Short Leave Configuration
            </h4>

            {/* Row 1 - Switches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                <VariableTypeRow
                    label="Allow employee to request Short Leave"
                    checked={toggles.allowShort}
                    onCheckedChange={(val) => handleToggle("allowShort", val)}
                />

                <VariableTypeRow
                    label="Allow multiple Short Leave in 1 Day"
                    checked={toggles.allowMultiple}
                    onCheckedChange={(val) => handleToggle("allowMultiple", val)}
                />

            </div>

            {/* Row 2 - Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <InputField
                    label="No. of Short Leave allow in 1 Month"
                    placeholder="0"
                />

                <InputField
                    label="No. of Hrs. in Short Leave one slot"
                    placeholder="0"
                />

            </div>
        </div>
    );
};

export default ShortLeaveSection;