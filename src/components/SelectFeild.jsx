import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; 
import { ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setOpen(false);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-[0.7rem] font-semibold text-gray-500 dark:text-gray-200 mb-1">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full h-7.5 px-4 py-1.5 rounded-sm text-[0.7rem] font-normal flex items-center justify-between",
          "bg-white dark:bg-gray-800",
          "border border-gray-300 dark:border-gray-700",
          "text-gray-600 dark:text-gray-100",
          "shadow-sm focus:ring-2 focus:ring-[#9853F9] focus:ring-inset focus:outline-none",
          "hover:border-gray-400 dark:hover:border-gray-500",
          "transition-all duration-200 ease-in-out",
          className
        )}
      >
        <span className={value ? "" : "text-gray-400 dark:text-gray-500"}>
          {value || "Select an option"}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${
            open ? "rotate-180 text-[#9853F9]" : "text-gray-400"
          }`}
        />
      </button>

      {open && (
        <ul
          className={cn(
            "absolute z-10 mt-1 w-full rounded-sm shadow-lg border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-800 text-[0.7rem]",
            "max-h-40 overflow-y-auto transition-all duration-150 ease-in-out no-scrollbar"
          )}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-all duration-150 ease-in-out",
                "hover:bg-[#9853F9]/15 hover:text-[#9853F9]",
                value === opt.value &&
                  "bg-[#9853F9]/20 text-[#9853F9] font-medium"
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
