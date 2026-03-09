import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import SelectField from "../../../../components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const PayheadSection = () => {
    const [partOfGross, setPartOfGross] = useState(false);
    const [partOfRateGross, setPartOfRateGross] = useState(false);
    const [runtime, setRuntime] = useState(false);

    const [rounding, setRounding] = useState("");
    const [formula, setFormula] = useState("");

    return (
        <div className="
      bg-gray-50 dark:bg-gray-900
      p-6
      rounded-xl
      border border-gray-200 dark:border-gray-700
      space-y-6
      transition-colors
    ">
            {/* Title */}
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
                Payhead
            </h3>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Prorate as per paid days"
                    unSelectLabel="Paid Days"
                    options={[
                        { value: "paid", label: "Paid Days" },
                        { value: "calendar", label: "Calendar Days" },
                    ]}
                />

                <SelectField
                    label="Prorate as of DOJ/DOL"
                    unSelectLabel="Doj/Dol"
                    options={[
                        { value: "doj", label: "DOJ" },
                        { value: "dol", label: "DOL" },
                    ]}
                />
            </div>

            {/* Row 2 (Switch Row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VariableTypeRow
                    label="Part of Gross"
                    checked={partOfGross}
                    onCheckedChange={setPartOfGross}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Variable Type"
                />

                <VariableTypeRow
                    label="Part of Rate Gross"
                    checked={partOfRateGross}
                    onCheckedChange={setPartOfRateGross}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Variable Type"
                />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Formula"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    unSelectLabel="Select Formula"
                    options={[
                        { value: "basic", label: "Basic" },
                        { value: "esi", label: "ESI" },
                        { value: "hra", label: "HRA" },
                    ]}
                />

                <InputField
                    label="Amount"
                    placeholder="Enter Amount"
                />
            </div>

            {/* Row 4 (Switch + Select) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VariableTypeRow
                    label="Calculate at Runtime"
                    checked={runtime}
                    onCheckedChange={setRuntime}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Calculate at Runtime"
                />

                <SelectField
                    label="Rounding"
                    value={rounding}
                    onChange={(e) => setRounding(e.target.value)}
                    unSelectLabel="Select Pay Head Name"
                    options={[
                        { value: "roundup", label: "Round Up" },
                        { value: "rounddown", label: "Round Down" },
                    ]}
                />
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Pay Head Calculation Order"
                    placeholder="63"
                />

                <InputField
                    label="Pay Slip / Register Sort Order"
                    placeholder="63"
                />
            </div>
        </div>
    );
};

export default PayheadSection;