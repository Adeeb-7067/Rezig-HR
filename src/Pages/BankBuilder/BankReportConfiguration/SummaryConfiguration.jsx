import { Switch } from "@/components/ui/switch";
import SelectField from "@/components/SelectFeild";
import ColumnFieldsSelector from "./component/ColumnFieldsSelector";
import RowFieldsSelector from "./component/RowFieldsSelector";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

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
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-4 rounded-sm space-y-4">

            {/* Title */}
            <h3 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                Configure Summary / Reconciliation Sheet
            </h3>

            {/* Main Toggle */}
            <VariableTypeRow name='Do you want to configure summary / reconciliation sheet' label={'Do you want to configure summary / reconciliation sheet'}/>

            {/* Settings Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

                {/* Select */}
                <SelectField
                    label="Summary Sheet Position"
                    name="summaryPosition"
                    unSelectLabel="Select"
                    className="h-7.5 text-[0.7rem]"
                    options={[
                        { label: "First", value: "first" },
                        { label: "Last", value: "last" }
                    ]}
                />

                {/* Switch */}
               <VariableTypeRow name='Show Live and FNF Count in Summary Sheet' label={'Show Live and FNF Count in Summary Sheet'}/>

             <VariableTypeRow name='Show Previous Month Summary' label={'Show Previous Month Summary'}/>

            </div>

            {/* Columns Selector */}
            <ColumnFieldsSelector title="List Of Fields (Columns)" fields={fields} />

            {/* Rows Selector */}
            <RowFieldsSelector title="List Of Fields (Rows)" fields={fieldsrow} />

        </div>
    );
};

export default SummaryConfiguration;