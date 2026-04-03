import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

const MultiSelectDropdown = ({ label, options = [], value = [], onChange }) => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOption = (optionValue) => {
        const newValue = value.includes(optionValue)
            ? value.filter((v) => v !== optionValue)
            : [...value, optionValue];
        onChange(newValue);
    };

    const selectAll = () => {
        onChange(options.map((o) => o.value));
    };

    const reset = () => onChange([]);

    const removeValue = (optionValue) => {
        onChange(value.filter((v) => v !== optionValue));
    };

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

        <div ref={dropdownRef} className="relative w-full space-y-1">

            {/* LABEL */}

            <div>
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
        cursor-pointer hover:border-purple-500 transition h-7.5"
                >
                    <span className={`${value.length ? "" : "text-gray-400 dark:text-gray-500"}`}>
                        {value.length ? `${value.length} Selected` : "Select Fields"}
                    </span>

                    <ChevronDown
                        size={14}
                        className={`transition-transform ${open ? "rotate-180 text-[#8629DF]" : "text-gray-400"}`}
                    />
                </div>
            </div>


            {/* DROPDOWN */}

            {open && (

                <div
                    className="absolute z-50 mt-1 w-full rounded-md shadow-lg
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700 p-3"
                    style={{ top: '100%' }}
                >

                    {/* HEADER */}

                    <div className="flex justify-between text-xs mb-2 border-b pb-1">

                        <span className="font-normal text-gray-700 dark:text-gray-200">
                            {label}
                        </span>

                        <button
                            onClick={selectAll}
                            className="text-[#8629DF] hover:underline text-xs cursor-pointer"
                        >
                            Select All
                        </button>

                    </div>


                    {/* OPTIONS */}

                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 table-scroll">

                        {options.map((item) => (

                            <label
                                key={item.value}
                                className="flex items-center gap-2 ds-text-xs cursor-pointer
                text-gray-700 dark:text-gray-200
                hover:text-[#8629DF]"
                            >

                                <input
                                    type="checkbox"
                                    checked={value.includes(item.value)}
                                    onChange={() => toggleOption(item.value)}
                                    className="accent-[#8629DF]"
                                />

                                {item.label}

                            </label>

                        ))}

                    </div>


                    {/* FOOTER */}

                    <div className="flex justify-between gap-2 mt-3 w-full">

                        <button
                            onClick={reset}
                            className="ds-text-xs w-[50%] px-3 py-1 rounded
              bg-gray-200 dark:bg-gray-700 cursor-pointer
              text-gray-700 dark:text-gray-200"
                        >
                            Reset
                        </button>

                        <button
                            onClick={() => setOpen(false)}
                            className="ds-text-xs w-[50%] px-4 py-1 rounded cursor-pointer
              bg-[#8629DF] text-white hover:bg-[#8629DF]/90"
                        >
                            Apply
                        </button>

                    </div>

                </div>

            )}

            {/* SELECTED CHIPS */}
            {value.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 animate-in fade-in duration-300">
                    {options
                        .filter((opt) => value.includes(opt.value))
                        .map((opt) => (
                            <div
                                key={opt.value}
                                className="flex items-center gap-1.5 px-2 py-0.5 
                                    border border-[#8629DF]/20 
                                    rounded-xs text-[0.62rem] text-gray-600 dark:text-gray-300
                                    hover:border-[#8629DF]/40 transition-colors shadow-sm"
                            >
                                <span className="font-medium">{opt.label}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeValue(opt.value);
                                    }}
                                    className="hover:bg-red-500/10 p-0.5 rounded-full transition-colors cursor-pointer group"
                                >
                                    <X size={10} className="text-black group-hover:text-red-500" />
                                </button>
                            </div>
                        ))}
                </div>
            )}

        </div>

    );
};

export default MultiSelectDropdown;