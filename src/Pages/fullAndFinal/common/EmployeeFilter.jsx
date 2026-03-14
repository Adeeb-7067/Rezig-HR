import { useState } from "react";

export default function EmployeeFilter({ onApply }) {

    const options = [
        "Unit Name",
        "Department",
        "Location - Unit",
        "Designation",
        "Grade",
        "Level",
        "Employee Type",
        "Employee Status"
    ];

    const [selected, setSelected] = useState([]);

    const toggleOption = (item) => {
        if (selected.includes(item)) {
            setSelected(selected.filter((i) => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    const resetFilter = () => {
        setSelected([]);
    };

    const applyFilter = () => {
        onApply(selected);
    };

    return (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 z-50">

            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Filter
            </h3>

            <div className="space-y-3">

                {options.map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

                        <input
                            type="checkbox"
                            checked={selected.includes(item)}
                            onChange={() => toggleOption(item)}
                            className="w-4 h-4"
                        />

                        {item}

                    </label>
                ))}

            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">

                <button
                    onClick={resetFilter}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                >
                    Reset
                </button>

                <button
                    onClick={applyFilter}
                    className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                    Apply
                </button>

            </div>

        </div>
    );
}