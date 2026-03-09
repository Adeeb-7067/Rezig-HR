import { Switch } from "@/components/ui/switch";
import SelectField from "@/components/SelectFeild";
import ColumnFieldsSelector from "./component/ColumnFieldsSelector";
import RowFieldsSelector from "./component/RowFieldsSelector";

const SummaryConfiguration = () => {
    const fields = [
        "S.No",
        "Reconciliation Details",
        "Employee Count",
        "Blank Column",
        "S.No",
        "Reconciliation Details",
        "Employee Count",
        "Blank Column"
    ];
    const fieldsrow = [
        "Cash",
        "Cheque",
        "Draft",
        "NEFT",
        "Cash",
        "Cheque",
        "Draft",
        "NEFT"
    ];
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 space-y-6">

            {/* Title */}
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                Configure Summary / Reconciliation Sheet
            </h3>

            {/* Main Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                <span className="text-sm text-gray-600 dark:text-gray-300">
                    Do you want to configure summary / reconciliation sheet
                </span>

                <Switch />

            </div>

            {/* Settings Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

                {/* Select */}
                <SelectField
                    label="Summary Sheet Position"
                    name="summaryPosition"
                    unSelectLabel="Select"
                    options={[
                        { label: "First", value: "first" },
                        { label: "Last", value: "last" }
                    ]}
                />

                {/* Switch */}
                <div className="flex items-center justify-between sm:justify-start gap-3 mt-4 sm:mt-6">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Show Live and FNF Count in Summary Sheet
                    </span>

                    <Switch />

                </div>

                {/* Switch */}
                <div className="flex items-center justify-between sm:justify-start gap-3 mt-4 sm:mt-6">

                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Show Previous Month Summary
                    </span>

                    <Switch />

                </div>

            </div>

            {/* Columns Selector */}
            <ColumnFieldsSelector title="List Of Fields (Columns)" fields={fields} />

            {/* Rows Selector */}
            <RowFieldsSelector title="List Of Fields (Rows)" fields={fieldsrow} />

        </div>
    );
};

export default SummaryConfiguration;