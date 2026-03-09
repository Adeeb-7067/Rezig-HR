import SelectField from "@/components/SelectFeild";
import { Switch } from "@/components/ui/switch";
import ColumnFieldsSelector from "./component/ColumnFieldsSelector";

const NonSummaryConfiguration = () => {
    const fields = [
        "Employee Code ",
        "Employee Name",
        "Cost Center",
        "Location"
    ];
    return (

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6">

            {/* Title */}

            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Configure Non-Summary Sheet
            </h3>

            {/* Enable Toggle */}

            <div className="flex items-center gap-3">

                <span className="text-sm text-gray-600 dark:text-gray-300">
                    Do you want to configure non-summary sheet
                </span>

                <Switch />

            </div>


            {/* Configuration Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">

                <SelectField
                    name="nonSummaryPosition"
                    // value={formData.reportVisibility}
                    //  onChange={handleChange}
                    label="Non-Summary Sheet Position"
                    unSelectLabel="Select Fields"
                    options={[
                        { label: "field1", value: "fields1" },
                        { label: "field2", value: "field2" }
                    ]}
                />

                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Active Consolidate Sheet
                    </span>

                    <Switch />

                </div>


                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Consider Hold Employee(s)
                    </span>

                    <Switch />

                </div>


                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Consider (-ve Employee(s))
                    </span>

                    <Switch />

                </div>


                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Consider Zero Salaried Employee(s)
                    </span>

                    <Switch />

                </div>


                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Consider FNF Employee(s)
                    </span>

                    <Switch />

                </div>


                <div className="flex items-center justify-between gap-2">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Consider Name in Bank
                    </span>

                    <Switch />

                </div>

            </div>


            {/* Column Fields Section */}

            <ColumnFieldsSelector title="List Of Fields (Columns)" fields={fields} />

        </div>

    );

};

export default NonSummaryConfiguration;