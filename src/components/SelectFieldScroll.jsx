import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const SelectFieldScroll = ({
    label,
    name,
    value,
    onChange,
    options = [],
    className = "",
    unSelectLabel = "Select",
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange({ target: { name, value: val } });
        setOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>

            {label && (
                <label className="block text-[0.7rem] font-semibold text-gray-500 dark:text-gray-200 mb-1">
                    {label}
                </label>
            )}

            {/* Select Button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "w-full h-8 px-3 rounded-md text-[0.75rem]",
                    "flex items-center justify-between",
                    "bg-white dark:bg-gray-800",
                    "border border-gray-300 dark:border-gray-700",
                    "text-gray-700 dark:text-gray-100",
                    "transition-all duration-150",
                    "focus:ring-2 focus:ring-[#8629DF] focus:outline-none",
                    className
                )}
            >
                <span className={cn("truncate", !value && "text-gray-400")}>
                    {options.find((o) => o.value === value)?.label || unSelectLabel}
                </span>

                <ChevronDown
                    size={14}
                    className={cn(
                        "transition-transform duration-200",
                        open ? "rotate-180 text-[#8629DF]" : "text-gray-400"
                    )}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <ul
                    className={cn(
                        "absolute left-0 z-50 mt-1 w-full",
                        "rounded-md shadow-lg",
                        "border border-gray-200 dark:border-gray-700",
                        "bg-white dark:bg-gray-800",
                        "text-[0.75rem]",
                        "max-h-52 overflow-y-auto dropdown-scroll"
                    )}
                >
                    {options.map((opt) => {
                        const active = value === opt.value;

                        return (
                            <li
                                key={opt.value}
                                onClick={() => handleSelect(opt.value)}
                                className={cn(
                                    "px-3 py-1.5 cursor-pointer",
                                    "transition-colors duration-150",
                                    "hover:bg-[#8629DF]/10 hover:text-[#8629DF]",
                                    active &&
                                    "bg-[#8629DF]/20 text-[#8629DF] font-medium"
                                )}
                            >
                                {opt.label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SelectFieldScroll;