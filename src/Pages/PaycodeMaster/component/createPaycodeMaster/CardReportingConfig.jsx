import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import VariableTypeRow from "../../../../components/ui/VariableTypeRow";

const CardReportingConfiguration = () => {
    const [salarySheet, setSalarySheet] = useState(false);
    const [paySlip, setPaySlip] = useState(false);
    const [partOfCTC, setPartOfCTC] = useState(false);
    const [hideOnEss, setHideOnEss] = useState(false);

    return (
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg space-y-4">
            {/* Title */}
            <h1 className="text-base font-semibold mb-1 text-gray-500">
                Card Reporting Configuration
            </h1>

            {/* Toggle Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Payhead Help Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputField
                        label="Payhead Help"
                        placeholder="Enter help text"
                    />
                </div>
            </div>
        </div>
    );
};

export default CardReportingConfiguration;