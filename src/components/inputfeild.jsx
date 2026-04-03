import { Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  className = "",
  info = null,
  ...props
}) => {
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

      // Position tooltip above the icon
      const top = iconRect.top + scrollTop - tooltipRect.height - 8;
      const left = iconRect.left + scrollLeft + (iconRect.width / 2) - (tooltipRect.width / 2);

      tooltipRef.current.style.top = `${Math.max(4, top)}px`; // Keep at least 4px from top
      tooltipRef.current.style.left = `${Math.max(4, left)}px`;
    }
  }, [showTooltip]);

  return (
    <div>
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
                  transform: 'translateX(0)', // Remove the problematic -translate-x-1/2
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ds-text-xs h-7.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9853F9] focus:ring-inset rounded-sm px-4 py-1.5 ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;