import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const SelectField = ({ label, name, value, onChange, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Label */}
      <label className="block text-[0.7rem] font-normal text-black dark:text-gray-200 mb-1">
        {label}
      </label>

      {/* Dropdown trigger */}
      <div
        className={cn(
          "w-full px-4 py-1.5 rounded-sm text-[0.7rem] font-normal",
          "bg-white dark:bg-gray-800",
          "border border-gray-300 dark:border-gray-700",
          "text-gray-900 dark:text-gray-100",
          "shadow-sm focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:outline-none",
          "hover:border-gray-400 dark:hover:border-gray-500",
          "transition-all duration-200 ease-in-out",
          "cursor-pointer",
          "focus:border-2 focus:border-[#9853F9]",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select..."}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm shadow-sm max-h-40 overflow-y-auto">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => handleSelect(child.props.value),
              className:
                "px-4 py-1.5 text-[0.7rem] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
            })
          )}
        </div>
      )}
    </div>
  );
};

// Custom Option component
const Option = ({ value, children, onClick, className = "" }) => {
  return (
    <div onClick={onClick} className={cn(className)}>
      {children}
    </div>
  );
};

export default { SelectField, Option };
