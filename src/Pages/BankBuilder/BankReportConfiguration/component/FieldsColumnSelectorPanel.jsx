import { Plus, ChevronUp } from "lucide-react";
import { useState } from "react";
import FieldsColumnSelectorTable from "./FieldsColumnSelectorTable";

const FieldsColumnSelectorPanel = ({ fields = [] }) => {

    const [selected, setSelected] = useState([]);

    const addField = (field) => {
        setSelected((prev) =>
            prev.includes(field) ? prev : [...prev, field]
        );
    };

    const removeField = (field) => {
        setSelected((prev) => prev.filter((f) => f !== field));
    };

    return (

        <div className="overflow-x-auto md:overflow-x-visible">

            <div className="grid grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] gap-3 min-w-[650px] md:min-w-0">

                {/* ALL FIELDS */}

                <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">

                    {/* HEADER */}

                    <div
                        className="bg-primary dark:bg-purple-700 
  text-white px-3 py-2 text-xs font-medium 
  flex justify-between items-center"
                    >

                        <span className="text-sm font-semibold">
                            All Fields
                        </span>

                        <button
                            className="
    w-10 h-7 flex items-center justify-center
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-md shadow-sm
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition
    "
                        >
                            <ChevronUp
                                size={16}
                                className="text-primary dark:text-purple-300"
                            />
                        </button>

                    </div>

                    {/* SUB HEADER */}

                    <div className="flex justify-between px-5 py-2 text-xs font-medium 
          bg-gray-100 dark:bg-gray-800 
          text-gray-600 dark:text-gray-300">

                        <span>Columns</span>
                        <span>Add</span>

                    </div>

                    {/* LIST */}

                    <div className="max-h-[220px] overflow-y-auto table-scroll">

                        {fields.map((field) => {

                            const isSelected = selected.includes(field);

                            return (
                                <div
                                    key={field}
                                    className="flex items-center justify-between px-3 py-2 border-b text-xs
                  border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300"
                                >

                                    <span>{field}</span>

                                    <button
                                        onClick={() => addField(field)}
                                        disabled={isSelected}
                                        className={`w-7 h-7 flex items-center justify-center rounded transition
                    ${isSelected
                                                ? "bg-primary text-white dark:bg-purple-600"
                                                : "bg-purple-100 text-primary hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800"
                                            }`}
                                    >
                                        <Plus size={14} />
                                    </button>

                                </div>
                            );
                        })}

                    </div>

                </div>


                {/* SELECTED TABLE */}

                <FieldsColumnSelectorTable
                    fields={fields}
                    selected={selected}
                    removeField={removeField}
                />

            </div>

        </div>

    );
};

export default FieldsColumnSelectorPanel;