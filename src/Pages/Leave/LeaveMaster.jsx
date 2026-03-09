;
import React, { useState } from "react";
import InputField from "@/components/inputfeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import SelectField from "@/components/SelectFeild";
import SwitchStartVariable from "@/components/ui/SwitchStartVariable";

const initialState = {
    credit: false,
    template: "",
    formula: "",
    proportionateTo1: "",
    assignTo1: "",
    proportionateTo2: "",
    assignTo2: "",
    minDaysBefore: "",
    maxLeaveLimit: "",
    creditCycle: "Monthly",
    creditBasedOn: "LWD",
    condition: "=",
};

const LeaveMaster = () => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleToggle = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen p-6">

            <h1 className="text-Title font-[500] text-gray-700 dark:text-gray-200">
                Leave Configuration
            </h1>

            {/* ================= MAIN CARD ================= */}
            <div className="bg-[#EFEFEF] dark:bg-gray-800 rounded-lg p-6 space-y-8 border border-gray-200 dark:border-gray-700">

                <h3 className="text-Header font-[500] text-gray-700 dark:text-gray-200">
                    Leave Master
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">

                    <SelectField
                        label="Select Template"
                        name="template"
                        value={form.template}
                        onChange={handleChange}
                        unSelectLabel="Select Template"
                        options={[
                            { value: "temp1", label: "Template 1" },
                            { value: "temp2", label: "Template 2" },
                        ]}
                        info="Select Template"
                    />

                    <InputField label="Leave Duration" info="Leave Duration" />
                    <InputField label="Leave Code" info="Leave Code" />
                    <InputField label="Leave Description" info="Leave Description" />

                    <VariableTypeRow label="Do Not Club Weekly-Off" info="Do Not Club Weekly-Off" />
                    <VariableTypeRow label="Do Not Club Holiday" info />

                    <InputField label="Limit In Month" info="Limit In Month" />
                    <InputField label="Maximum Leave" info="Maximum Leave" />

                    <VariableTypeRow label="Allow Negative Balance" info="Allow Negative Balance" />
                    <VariableTypeRow label="Encashable" info="Encashable" />

                    <InputField label="Max Limit Per Request" info="Max Limit Per Request" />
                    <InputField label="Max no. of requests per year" info="Max no. of requests per year" />

                    <VariableTypeRow label="Transfer Balance Annually" info="Transfer Balance Annually" />
                    <VariableTypeRow label="Transfer Annual Balance Limit" info="Transfer Annual Balance Limit" />

                    <InputField label="Min Limit Per Request" info="Min Limit Per Request" />

                    <SelectField
                        label="Formula"
                        name="formula"
                        value={form.formula}
                        onChange={handleChange}
                        unSelectLabel="Select Formula"
                        options={[
                            { value: "formula1", label: "Formula 1" },
                            { value: "formula2", label: "Formula 2" },
                        ]}
                        info="Formula"
                    />

                    <VariableTypeRow label="Compensatory off" info="Compensatory off" />
                    <VariableTypeRow label="Display Leave on ESS" info="Display Leave on ESS" />

                    <SelectField
                        label="Leave Proportionate According To"
                        name="proportionateTo1"
                        value={form.proportionateTo1}
                        onChange={handleChange}
                        unSelectLabel="Date of Joining"
                        options={[
                            { value: "doj", label: "Date of Joining" },
                        ]}
                        info="Leave Proportionate According To"
                    />

                    <SelectField
                        label="Assign To"
                        name="assignTo1"
                        value={form.assignTo1}
                        onChange={handleChange}
                        unSelectLabel="Select Formula"
                        options={[
                            { value: "all", label: "All" },
                            { value: "both", label: "Both" },
                        ]}
                        info="Assign To"
                    />

                    <VariableTypeRow label="For Confirmed Employees" info="For Confirmed Employees" />
                    <VariableTypeRow label="Display Leave on ESS" info="Display Leave on ESS" />

                    <SelectField
                        label="Leave Proportionate According To"
                        name="proportionateTo2"
                        value={form.proportionateTo2}
                        onChange={handleChange}
                        unSelectLabel="Date of Joining"
                        options={[
                            { value: "doj", label: "Date of Joining" },
                        ]}
                        info="Leave Proportionate According To"
                    />

                    <SelectField
                        label="Assign To"
                        name="assignTo2"
                        value={form.assignTo2}
                        onChange={handleChange}
                        unSelectLabel="Both"
                        options={[
                            { value: "both", label: "Both" },
                        ]}
                        info="Assign To"
                    />

                    <VariableTypeRow label="Probation Leave" info="Probation Leave" />
                    <VariableTypeRow label="Auto-assign on confirm" info="Auto-assign on confirm" />
                    <VariableTypeRow label="For Confirmed Employees" info="For Confirmed Employees" />
                    <VariableTypeRow label="First-time leave assign" info="First-time leave assign" />

                    <VariableTypeRow label="On confirmation Adjust Probation Leave" info="On confirmation Adjust Probation Leave" />
                    <VariableTypeRow label="Proportionate till DOC" info="Proportionate till DOC" />
                    <h1></h1><h1></h1>
                    <VariableTypeRow label="Do not combine with other leaves" info="Do not combine with other leaves" />
                    <VariableTypeRow label="Do not allow leave for ESIC Employee" info="Do not allow leave for ESIC Employee" />

                    <SelectField
                        label="Min. Days Before"
                        name="minDaysBefore"
                        value={form.minDaysBefore}
                        onChange={handleChange}
                        unSelectLabel="Select Days"
                        options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                        ]}
                        info="Min. Days Before"
                    />

                    <SelectField
                        label="Maximum Leave Limit"
                        name="maxLeaveLimit"
                        value={form.maxLeaveLimit}
                        onChange={handleChange}
                        unSelectLabel="Select Limit"
                        options={[
                            { value: "10", label: "10" },
                            { value: "20", label: "20" },
                        ]}
                        info="Maximum Leave Limit"
                    />

                </div>
            </div>

            {/* ================= CREDIT SECTION ================= */}
            <div className="bg-[#EFEFEF] dark:bg-gray-800 rounded-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700">

                <SwitchStartVariable
                    label="Do you want to Credit Leave"
                    checked={form.credit}
                    onCheckedChange={(val) => handleToggle("credit", val)}

                />
                {form.credit && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 pt-4">

                        <InputField label="No. of Credit Leave" info="No. of Credit Leave" />
                        <InputField label="Maximum Leave Credit Per Month" info="Maximum Leave Credit Per Month" />
                        <h1 /><h1 />
                        <SelectField
                            label="Credit Cycle"
                            name="creditCycle"
                            value={form.creditCycle}
                            onChange={handleChange}
                            options={[
                                { value: "Monthly", label: "Monthly" },
                                { value: "Quarterly", label: "Quarterly" },
                            ]}
                        />

                        <SelectField
                            label="Credit Based On Days"
                            name="creditBasedOn"
                            value={form.creditBasedOn}
                            onChange={handleChange}
                            options={[
                                { value: "LWD", label: "LWD" },
                                { value: "Calendar", label: "Calendar" },
                            ]}
                        />

                        <SelectField
                            label="Condition"
                            name="condition"
                            value={form.condition}
                            onChange={handleChange}
                            options={[
                                { value: "=", label: "=" },
                                { value: ">", label: ">" },
                                { value: "<", label: "<" },
                            ]}
                        />

                        <InputField label="Value" />

                    </div>
                )}
            </div>

            {/* ================= FOOTER ================= */}
            <div className="flex justify-end gap-4">
                <button className="px-5 py-1.5 border border-purple-600 text-purple-600 rounded-md text-xs hover:bg-purple-600 hover:text-white transition">
                    Reset
                </button>

                <button className="px-5 py-1.5 bg-purple-600 text-white rounded-md text-xs shadow hover:opacity-90 transition">
                    Update
                </button>
            </div>

        </div>
    );
};

export default LeaveMaster;