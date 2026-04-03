import SelectField from "@/components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import ColumnFieldsSelector from "./component/ColumnFieldsSelector";
import { useState } from "react";

const NonSummaryConfiguration = () => {
    const fields = [
        "Employee Code ",
        "Employee Name",
        "Cost Center",
        "Location"
    ];

    const [form, setForm] = useState({
        nonSummaryPosition: "",
    });

    const [toggles, setToggles] = useState({
        configureNonSummary: false,
        activeConsolidate: false,
        considerHoldEmployee: false,
        considerNegativeEmployee: false,
        considerZeroSalaried: false,
        considerFNF: false,
        considerNameInBank: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggle = (key, val) =>
        setToggles((prev) => ({ ...prev, [key]: val }));
    return (

        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-4 rounded-sm space-y-4">

            {/* Title */}

            <h3 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                Configure Non-Summary Sheet
            </h3>

            {/* Enable Toggle */}

            <VariableTypeRow 
                label="Do you want to configure non-summary sheet"
                checked={toggles.configureNonSummary}
                onCheckedChange={(val) => handleToggle("configureNonSummary", val)}
            />


            {/* Configuration Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">

                <SelectField
                    name="nonSummaryPosition"
                    label="Non-Summary Sheet Position"
                    value={form.nonSummaryPosition}
                    onChange={handleChange}
                    unSelectLabel="Select Fields"
                    className="h-7.5 ds-text-xs"
                    options={[
                        { label: "field1", value: "fields1" },
                        { label: "field2", value: "field2" }
                    ]}
                />

                <VariableTypeRow 
                    label="Active Consolidate Sheet"
                    checked={toggles.activeConsolidate}
                    onCheckedChange={(val) => handleToggle("activeConsolidate", val)}
                    containerClass="justify-between"
                />


                <VariableTypeRow 
                    label="Consider Hold Employee(s)"
                    checked={toggles.considerHoldEmployee}
                    onCheckedChange={(val) => handleToggle("considerHoldEmployee", val)}
                    containerClass="justify-between"
                />


                <VariableTypeRow 
                    label="Consider (-ve Employee(s))"
                    checked={toggles.considerNegativeEmployee}
                    onCheckedChange={(val) => handleToggle("considerNegativeEmployee", val)}
                    containerClass="justify-between"
                />


                <VariableTypeRow 
                    label="Consider Zero Salaried Employee(s)"
                    checked={toggles.considerZeroSalaried}
                    onCheckedChange={(val) => handleToggle("considerZeroSalaried", val)}
                    containerClass="justify-between"
                />


                <VariableTypeRow 
                    label="Consider FNF Employee(s)"
                    checked={toggles.considerFNF}
                    onCheckedChange={(val) => handleToggle("considerFNF", val)}
                    containerClass="justify-between"
                />


                <VariableTypeRow 
                    label="Consider Name in Bank"
                    checked={toggles.considerNameInBank}
                    onCheckedChange={(val) => handleToggle("considerNameInBank", val)}
                    containerClass="justify-between"
                />

            </div>


            {/* Column Fields Section */}

            {toggles.configureNonSummary && (
                <ColumnFieldsSelector title="List Of Fields (Columns)" fields={fields} />
            )}

        </div>

    );

};

export default NonSummaryConfiguration;