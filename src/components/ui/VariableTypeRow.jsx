

import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const VariableTypeRow = ({
    label,
    checked,
    onCheckedChange,
    info = null,
    containerClass,
    leftClass,
    labelClass,
    switchClass,
    gapClass = "justify-between",
    showIcon = true,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const iconRef = useRef(null);
    const tooltipRef = useRef(null);

    // Same positioning logic as ToggleField
    useEffect(() => {
        if (showTooltip && iconRef.current && tooltipRef.current) {
            const iconRect = iconRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft;

            const top = iconRect.top + scrollTop - tooltipRect.height - 8;
            const left =
                iconRect.left +
                scrollLeft +
                iconRect.width / 2 -
                tooltipRect.width / 2;

            tooltipRef.current.style.top = `${Math.max(4, top)}px`;
            tooltipRef.current.style.left = `${Math.max(4, left)}px`;
        }
    }, [showTooltip]);

    return (
        <div
            className={cn(
                "w-full flex items-center mt-5",
                gapClass,
                containerClass
            )}
        >
            {/* Left Side */}
            <div className={cn("flex items-center gap-2", leftClass)}>
                {showIcon && info && (
                    <div className="relative">
                        <Info
                            ref={iconRef}
                            size={14}
                            className="ds-text-primary cursor-help"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        />

                        {showTooltip && (
                            <div
                                ref={tooltipRef}
                                className="fixed z-[99999] w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
                            >
                                {info}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        )}
                    </div>
                )}

                <span
                    className={cn(
                        "ds-text-xs font-semibold text-gray-500 dark:text-gray-200",
                        labelClass
                    )}
                >
                    {label}
                </span>
            </div>

            {/* Right Side */}
            {/* <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                className={switchClass}
            /> */}
            <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                className={cn(
                    "bg-gray-300",
                    "data-[state=checked]:bg-ds-primary data-[state=checked]:border-ds-primary",
                    "transition-all duration-300",
                    switchClass
                )}
            />
        </div>
    );
};

export default VariableTypeRow;