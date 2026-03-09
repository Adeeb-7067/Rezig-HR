import React from "react";
import SelectField from "../../../components/SelectFeild";

const PaycodeFilters = ({
    payHeadType,
    setPayHeadType,
    variableType,
    setVariableType,
}) => {
    return (
        <div className="mb-6">
            {/* Title */}
            <h2 className="text-Title  text-gray-700 mb-4 dark:text-white">
                List Of Pay Head
            </h2>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">

                <SelectField
                    label="Show Pay Head Type"
                    unSelectLabel="Pay Head Type"
                    name="payHeadType"
                    value={payHeadType}
                    onChange={(e) => setPayHeadType(e.target.value)}
                    options={[
                        { value: "Addition", label: "Addition" },
                        { value: "Deduction", label: "Deduction" },
                    ]}
                />

                <SelectField
                    label="Show Variable Type"
                    unSelectLabel="Pay Type"
                    name="variableType"
                    value={variableType}
                    onChange={(e) => setVariableType(e.target.value)}
                    options={[
                        { value: "Fixed", label: "Fixed" },
                        { value: "Variable", label: "Variable" },
                    ]}
                />


            </div>
        </div>
    );
};

export default PaycodeFilters;