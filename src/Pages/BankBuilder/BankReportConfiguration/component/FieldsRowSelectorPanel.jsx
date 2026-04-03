import { Plus, ChevronUp } from "lucide-react";
import { useState } from "react";
import FieldsRowSelectorTable from "./FieldsRowSelectorTable";

const FieldsRowSelectorPanel = ({ fields = [], headerRow = "Row" }) => {
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

                {/* LEFT : ALL FIELDS */}

                <div className="border rounded-sm overflow-hidden bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">

                    {/* Header */}

                    <div
                        className="ds-bg-primary dark:bg-purple-700 
  text-white px-3 py-1.5 ds-text-xs font-medium 
  flex justify-between items-center"
                    >

                        <span className="font-normal ds-text-xs uppercase tracking-wider">
                            All Fields
                        </span>

                        <button
                            className="
    w-8 mx-3 h-5 flex items-center justify-center
    bg-white dark:bg-gray-800/40
    border border-white/30 dark:border-gray-700
    rounded-xs shadow-sm
    hover:bg-white/30 dark:hover:bg-gray-700
    transition
    "
                        >
                            <ChevronUp
                                size={16}
                                className="ds-text-primary dark:text-purple-300"
                            />
                        </button>

                    </div>

                    {/* Sub Header */}

                    <div className="flex justify-between px-3 py-1  font-semibold uppercase tracking-tighter bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-300 text-[0.8rem]">{headerRow}</span>
                        <span className="text-gray-600 dark:text-gray-300 text-[0.8rem] mx-3">Add</span>
                    </div>

                    {/* Fields List */}

                    <div className="max-h-[150px] overflow-y-auto table-scroll">

                        {fields.map((field) => {
                            const isSelected = selected.includes(field);

                            return (
                                <div
                                    key={field}
                                    className="flex items-center justify-between px-3 py-1 border-b ds-text-xs border-gray-50 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="font-medium">{field}</span>

                                    <button
                                        onClick={() => addField(field)}
                                        disabled={isSelected}
                                        className={`w-8 h-6 flex items-center justify-center rounded-sm transition cursor-pointer
                    ${isSelected
                                                ? "ds-bg-primary text-white opacity-50 cursor-not-allowed"
                                                : "bg-purple-50 ds-text-primary ds-hover-bg-primary hover:text-white dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-ds-primary"
                                            }`}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            );
                        })}

                    </div>
                </div>

                {/* RIGHT TABLE */}

                <FieldsRowSelectorTable
                    fields={fields}
                    selected={selected}
                    removeField={removeField}
                />

            </div>

        </div>
    );
};

export default FieldsRowSelectorPanel;