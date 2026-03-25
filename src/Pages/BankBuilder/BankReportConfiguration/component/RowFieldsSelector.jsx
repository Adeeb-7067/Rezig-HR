import FieldsRowSelectorPanel from "./FieldsRowSelectorPanel";

const RowFieldsSelector = ({ fields, title, headerRow }) => {



    return (

        <div className="space-y-1">

            <h4 className="text-[0.8rem] font-medium text-gray-500 dark:text-gray-400 px-1  tracking-tight">
                {title}
            </h4>

            <FieldsRowSelectorPanel
                fields={fields}
                headerRow={headerRow}
            />

        </div>

    );
};

export default RowFieldsSelector;