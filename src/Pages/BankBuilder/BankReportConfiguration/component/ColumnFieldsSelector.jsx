import FieldsColumnSelectorPanel from "./FieldsColumnSelectorPanel";

const ColumnFieldsSelector = ({ title, fields }) => {

    return (

        <div className="space-y-1">

            <h4 className="text-[0.8rem] font-medium text-gray-500 dark:text-gray-400 px-1  tracking-tight">
                {title}
            </h4>

            <FieldsColumnSelectorPanel fields={fields} />

        </div>

    );

};

export default ColumnFieldsSelector;