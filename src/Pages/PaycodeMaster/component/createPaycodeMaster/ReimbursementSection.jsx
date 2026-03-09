import React, { useState } from "react";
import SelectField from "../../../../components/SelectFeild";
import VariableTypeRow from "../../../../components/ui/VariableTypeRow";

const ReimbursementSection = () => {
    const [usedForClaim, setUsedForClaim] = useState(false);
    const [type, setType] = useState("finyear");

    return (
        <div
            className="
        bg-gray-50 dark:bg-gray-900
        p-4 sm:p-6
        rounded-xl
        border border-gray-200 dark:border-gray-700
        space-y-6
        transition-colors
      "
        >
            {/* Title */}
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                Reimbursement
            </h3>

            {/* Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                {/* Left - Toggle */}
                <VariableTypeRow
                    label="Used For Reimb. Claim"
                    checked={usedForClaim}
                    onCheckedChange={setUsedForClaim}
                    gapClass="justify-between"
                    showIcon
                    info="Calculate at Runtime"
                />

                {/* Right - Select */}
                <SelectField
                    label="Reimbursement Type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    unSelectLabel="Fin Yr Wise"
                    options={[
                        { value: "finyear", label: "Fin Yr Wise" },
                        { value: "monthly", label: "Monthly" },
                    ]}
                />

            </div>
        </div>
    );
};

export default ReimbursementSection;