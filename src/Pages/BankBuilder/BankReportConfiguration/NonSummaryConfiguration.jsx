import SelectField from "@/components/SelectFeild";
import { Switch } from "@/components/ui/switch";
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

            <div className="flex items-center gap-3">

                <span className="text-[0.7rem] font-semibold text-gray-500 dark:text-gray-300">
                    Do you want to configure non-summary sheet
                </span>

                <Switch 
                    className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                    checked={toggles.configureNonSummary}
                    onCheckedChange={(val) => handleToggle("configureNonSummary", val)}
                />

            </div>


            {/* Configuration Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">

                <SelectField
                    name="nonSummaryPosition"
                    label="Non-Summary Sheet Position"
                    value={form.nonSummaryPosition}
                    onChange={handleChange}
                    unSelectLabel="Select Fields"
                    className="h-7.5 text-[0.7rem]"
                    options={[
                        { label: "field1", value: "fields1" },
                        { label: "field2", value: "field2" }
                    ]}
                />

                <div className="flex items-center justify-between gap-2  p-2 rounded-sm ">

                    <span className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-300 leading-tight">
                        Active Consolidate Sheet
                    </span>

                    <Switch 
                        className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                        checked={toggles.activeConsolidate}
                        onCheckedChange={(val) => handleToggle("activeConsolidate", val)}
                    />

                </div>


                <div className="flex items-center justify-between gap-2  p-2 rounded-sm">

                    <span className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-300 leading-tight">
                        Consider Hold Employee(s)
                    </span>

                    <Switch 
                        className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                        checked={toggles.considerHoldEmployee}
                        onCheckedChange={(val) => handleToggle("considerHoldEmployee", val)}
                    />

                </div>


                <div className="flex items-center justify-between gap-2  p-2 rounded-sm ">

                    <span className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-300 leading-tight">
                        Consider (-ve Employee(s))
                    </span>

                    <Switch 
                        className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                        checked={toggles.considerNegativeEmployee}
                        onCheckedChange={(val) => handleToggle("considerNegativeEmployee", val)}
                    />

                </div>


                <div className="flex items-center justify-between gap-2  p-2 rounded-sm">

                    <span className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-300 leading-tight">
                        Consider Zero Salaried Employee(s)
                    </span>

                    <Switch 
                        className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                        checked={toggles.considerZeroSalaried}
                        onCheckedChange={(val) => handleToggle("considerZeroSalaried", val)}
                    />

                </div>


                <div className="flex items-center justify-between gap-2  p-2 rounded-sm">

                    <span className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-300 leading-tight">
                        Consider FNF Employee(s)
                    </span>

                    <Switch 
                        className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                        checked={toggles.considerFNF}
                        onCheckedChange={(val) => handleToggle("considerFNF", val)}
                    />

                </div>


                <div className="flex items-center justify-between gap-2  p-2 rounded-sm">

                    <span className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-300 leading-tight">
                        Consider Name in Bank
                    </span>

                    <Switch 
                        className="scale-75 data-[state=checked]:bg-[#8629DF] data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                        checked={toggles.considerNameInBank}
                        onCheckedChange={(val) => handleToggle("considerNameInBank", val)}
                    />

                </div>

            </div>


            {/* Column Fields Section */}

            <ColumnFieldsSelector title="List Of Fields (Columns)" fields={fields} />

        </div>

    );

};

export default NonSummaryConfiguration;