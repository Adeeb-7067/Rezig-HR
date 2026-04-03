import React from "react";

const StatusLegend = () => {
    const items = [
        { label: "P - Present", color: "#34C759" },
        { label: "A - Absent", color: "#FF383C" },
        { label: "W - Week Off", color: "#A0A0A0" },
        { label: "H - Holiday", color: "#6155F5" },
        { label: "M - Miss Punch", color: "#FFCC00" },
        { label: "S - Special Day", color: "#CB30E0" },
    ];

    return (
        <div className="w-full mt-1 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2  bg-white dark:bg-gray-800">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-8 ds-text-xs font-semibold text-gray-600 dark:text-gray-300">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusLegend;