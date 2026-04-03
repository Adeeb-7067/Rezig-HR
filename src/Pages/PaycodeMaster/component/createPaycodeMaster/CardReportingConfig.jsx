import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import VariableTypeRow from "../../../../components/ui/VariableTypeRow";

const CardReportingConfiguration = () => {
    const [form, setForm] = useState({
        payheadHelp: "",
    });

    const [salarySheet, setSalarySheet] = useState(false);
    const [paySlip, setPaySlip] = useState(false);
    const [partOfCTC, setPartOfCTC] = useState(false);
    const [hideOnEss, setHideOnEss] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3">
            <h1 className="text-base font-semibold mb-1 text-gray-500 dark:text-gray-50">
                Card Reporting Configuration
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <VariableTypeRow
                    label="Show on Salary Sheet"
                    checked={salarySheet}
                    onCheckedChange={setSalarySheet}
                    gapClass="justify-between"
                    showIcon
                    info="Show on Salary Sheet"
                />

                <VariableTypeRow
                    label="Show on Pay Slip"
                    checked={paySlip}
                    onCheckedChange={setPaySlip}
                    gapClass="justify-between"
                    showIcon
                />

                <VariableTypeRow
                    label="Part of CTC"
                    checked={partOfCTC}
                    onCheckedChange={setPartOfCTC}
                    gapClass="justify-between"
                    showIcon
                    info="Part of CTC"
                />

                <VariableTypeRow
                    label="Do Not Display on ESS"
                    checked={hideOnEss}
                    onCheckedChange={setHideOnEss}
                    gapClass="justify-between"
                    showIcon
                    info="Do Not Display on ESS"
                />

                <InputField
                    label="Payhead Help"
                    name="payheadHelp"
                    value={form.payheadHelp}
                    onChange={handleChange}
                    placeholder="Enter help text"
                />
            </div>
        </div>
    );
};

export default CardReportingConfiguration;