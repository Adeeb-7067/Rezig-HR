import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import SelectField from "../../../../components/SelectFeild";
import { Switch } from "@/components/ui/switch";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const PayheadMasterDetails = () => {
    const [variableType, setVariableType] = useState(false);
    const [mapping, setMapping] = useState("");
    const [salaryType, setSalaryType] = useState("");
    const [assignment, setAssignment] = useState("");

    return (
        <div
            className="
        bg-gray-50 dark:bg-gray-900
        p-6
        rounded-xl
        border border-gray-200 dark:border-gray-700
        space-y-6
        transition-colors
      "
        >
            {/* Title */}
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                Payhead Master Details
            </h3>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Code"
                    placeholder="Enter Code"
                />

                <SelectField
                    label="Pay Head Mapping"
                    name="mapping"
                    value={mapping}
                    onChange={(e) => setMapping(e.target.value)}
                    unSelectLabel="Select Pay Head Name"
                    options={[
                        { value: "basic", label: "Basic" },
                        { value: "hra", label: "HRA" },
                        { value: "allowance", label: "Allowance" },
                    ]}
                />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Display Caption"
                    placeholder="0"
                />

                <InputField
                    label="Description"
                    placeholder="Enter Description"
                />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Calculate Salary According To"
                    name="salaryType"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                    unSelectLabel="Select According to"
                    options={[
                        { value: "monthly", label: "Monthly" },
                        { value: "daily", label: "Daily" },
                    ]}
                />

                <SelectField
                    label="Assignment"
                    name="assignment"
                    value={assignment}
                    onChange={(e) => setAssignment(e.target.value)}
                    unSelectLabel="Select Assignment"
                    options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                    ]}
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <VariableTypeRow
                    label="Variable Type"
                    checked={variableType}
                    onCheckedChange={setVariableType}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Variable Type"
                />
            </div>
        </div>
    );
};

export default PayheadMasterDetails;