import FieldsColumnSelectorPanel from "./FieldsColumnSelectorPanel";

const ColumnFieldsSelector = ({ title, fields }) => {


    return (

        <div>

            <h4 className="text-sm font-semibold mb-3">
                {title}
            </h4>

            <FieldsColumnSelectorPanel fields={fields} />

        </div>

    );

};

export default ColumnFieldsSelector;