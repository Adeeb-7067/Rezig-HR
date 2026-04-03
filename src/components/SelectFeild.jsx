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
  unSelectLabel
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);

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
              className="ds-text-primary cursor-help"
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
        <label className="block text-gray-500 font-semibold dark:text-gray-50 ds-text-xs">
          {label}
        </label>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full h-7.5 px-4 py-1.5 rounded-sm ds-text-xs font-normal flex items-center justify-between",
          "bg-white dark:bg-gray-800",
          "border border-gray-300 dark:border-gray-700",
          "text-gray-600 dark:text-white",
          "focus:ring-2 focus:ring-ds-primary focus:ring-inset focus:outline-none",
          "transition-all duration-200",
          className,
        )}
      >
        <span
          className={`truncate ${value ? "text-gray-600 dark:text-gray-100" : "text-gray-400"}`}
        >
          {options.find((opt) => opt.value === value)?.label || unSelectLabel}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180 ds-text-primary" : "text-gray-400"}`}
        />
      </button>

      {open && (
        <ul
          className={cn(
            "absolute z-[999] mt-1 w-full rounded-sm shadow-lg border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-800 ds-text-xs",
            "max-h-40 overflow-y-auto transition-all duration-150 ease-in-out no-scrollbar",
          )}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-all duration-150 ease-in-out",
                "hover:bg-ds-primary/10 hover:text-ds-primary dark:text-gray-50",
                value === opt.value &&
                "bg-ds-primary/10 ds-text-primary font-medium",
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