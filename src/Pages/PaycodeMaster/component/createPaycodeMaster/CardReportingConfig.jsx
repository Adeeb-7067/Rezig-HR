import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import VariableTypeRow from "../../../../components/ui/VariableTypeRow";

const CardReportingConfiguration = () => {
    const [salarySheet, setSalarySheet] = useState(false);
    const [paySlip, setPaySlip] = useState(false);
    const [partOfCTC, setPartOfCTC] = useState(false);
    const [hideOnEss, setHideOnEss] = useState(false);

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
                Card Reporting configuration
            </h3>

            {/* Toggle Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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