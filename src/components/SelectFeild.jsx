import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Info } from "lucide-react";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  className = "",
  info = null,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);

  // Position tooltip when shown
  useEffect(() => {
    if (showTooltip && iconRef.current && tooltipRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      const top = iconRect.top + scrollTop - tooltipRect.height - 8;
      const left = iconRect.left + scrollLeft + (iconRect.width / 2) - (tooltipRect.width / 2);

      tooltipRef.current.style.top = `${Math.max(4, top)}px`;
      tooltipRef.current.style.left = `${Math.max(4, left)}px`;
    }
  }, [showTooltip]);

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
      <div className="flex items-center gap-1 mb-1">
        {info && (
          <div className="relative">
            <Info
              ref={iconRef}
              size={12}
              className="text-[#8629DF] cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div
                ref={tooltipRef}
                className="fixed z-[99999] w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
                style={{
                  transform: 'translateX(0)',
                }}
              >
                {info}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        )}
        <label className="block text-[0.7rem] font-semibold text-gray-500 dark:text-gray-200">
          {label}
        </label>
      </div>

      {/* Rest of the component remains the same */}
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
          className,
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
            "max-h-40 overflow-y-auto transition-all duration-150 ease-in-out no-scrollbar",
          )}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-all duration-150 ease-in-out",
                "hover:bg-[#9853F9]/15 hover:text-[#9853F9] dark:text-gray-50",
                value === opt.value &&
                  "bg-[#9853F9]/20 text-[#9853F9] font-medium",
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