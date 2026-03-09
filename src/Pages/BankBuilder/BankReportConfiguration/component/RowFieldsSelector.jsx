import FieldsRowSelectorPanel from "./FieldsRowSelectorPanel";

const RowFieldsSelector = ({ fields, title, headerRow }) => {



    return (

        <div className="space-y-3">

            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
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