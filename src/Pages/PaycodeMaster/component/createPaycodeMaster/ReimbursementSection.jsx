import React, { useState } from "react";
import SelectField from "../../../../components/SelectFeild";
import VariableTypeRow from "../../../../components/ui/VariableTypeRow";

const ReimbursementSection = () => {
    const [usedForClaim, setUsedForClaim] = useState(false);
    const [type, setType] = useState("finyear");

    return (
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 px-3 rounded-lg">
            {/* Title */}
            <h1 className="text-base font-semibold mb-1 text-gray-500 dark:text-gray-50">
                Reimbursement
            </h1>

            {/* Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">

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