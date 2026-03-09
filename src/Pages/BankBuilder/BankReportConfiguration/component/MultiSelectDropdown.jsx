import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const MultiSelectDropdown = ({ label, options = [] }) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dropdownRef = useRef(null);

    const toggleOption = (value) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const selectAll = () => {
        setSelected(options.map((o) => o.value));
    };

    const reset = () => setSelected([]);

    /* ---------- CLOSE ON OUTSIDE CLICK ---------- */

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <div ref={dropdownRef} className="relative w-full">

            {/* LABEL */}

            <label className="text-xs text-gray-600 dark:text-gray-300 mb-1 block">
                {label}
            </label>


            {/* TRIGGER */}

            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center border rounded-sm px-3 py-1.5 text-xs
        bg-white dark:bg-gray-800
        border-gray-300 dark:border-gray-700
        text-gray-600 dark:text-gray-200
        cursor-pointer hover:border-purple-500 transition"
            >
                <span className={`${selected.length ? "" : "text-gray-400 dark:text-gray-500"}`}>
                    {selected.length ? `${selected.length} Selected` : "Select Fields"}
                </span>

                <ChevronDown
                    size={14}
                    className={`transition-transform ${open ? "rotate-180 text-purple-600" : "text-gray-400"}`}
                />
            </div>


            {/* DROPDOWN */}

            {open && (

                <div
                    className="absolute z-50 mt-1 w-full rounded-md shadow-lg
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700 p-3"
                >

                    {/* HEADER */}

                    <div className="flex justify-between text-xs mb-2">

                        <span className="font-medium text-gray-700 dark:text-gray-200">
                            {label}
                        </span>

                        <button
                            onClick={selectAll}
                            className="text-purple-600 hover:underline text-xs"
                        >
                            Select All
                        </button>

                    </div>


                    {/* OPTIONS */}

                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">

                        {options.map((item) => (

                            <label
                                key={item.value}
                                className="flex items-center gap-2 text-xs cursor-pointer
                text-gray-700 dark:text-gray-200
                hover:text-purple-600"
                            >

                                <input
                                    type="checkbox"
                                    checked={selected.includes(item.value)}
                                    onChange={() => toggleOption(item.value)}
                                    className="accent-purple-600"
                                />

                                {item.label}

                            </label>

                        ))}

                    </div>


                    {/* FOOTER */}

                    <div className="flex justify-between mt-3">

                        <button
                            onClick={reset}
                            className="text-xs px-3 py-1 rounded
              bg-gray-200 dark:bg-gray-700
              text-gray-700 dark:text-gray-200"
                        >
                            Reset
                        </button>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-xs px-4 py-1 rounded
              bg-purple-600 text-white hover:bg-purple-700"
                        >
                            Apply
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
};

export default MultiSelectDropdown;