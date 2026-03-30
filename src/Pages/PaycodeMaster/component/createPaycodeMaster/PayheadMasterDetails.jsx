import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import SelectField from "../../../../components/SelectFeild";
import { Switch } from "@/components/ui/switch";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const PayheadMasterDetails = () => {
    const [form, setForm] = useState({
        code: "",
        displayCaption: "",
        description: "",
    });

    const [variableType, setVariableType] = useState(false);
    const [mapping, setMapping] = useState("");
    const [salaryType, setSalaryType] = useState("");
    const [assignment, setAssignment] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
            <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 px-3 rounded-lg">
            {/* Title */}
              <h1 className="text-base font-semibold mb-1 text-gray-500 dark:text-gray-50">
                Payhead Master Details
            </h1>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputField
                    label="Code"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
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
                <InputField
                    label="Display Caption"
                    name="displayCaption"
                    value={form.displayCaption}
                    onChange={handleChange}
                    placeholder="0"
                />

                <InputField
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                />
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