import React from "react";

const StatusLegend = () => {
    const items = [
        { label: "P - Present", color: "bg-green-500" },
        { label: "A - Absent", color: "bg-red-500" },
        { label: "W - Week Off", color: "bg-gray-400" },
        { label: "H - Holiday", color: "bg-blue-500" },
        { label: "M - Miss Punch", color: "bg-yellow-500" },
        { label: "S - Special Day", color: "bg-purple-500" },
    ];

    return (
        <div className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 bg-white dark:bg-gray-800">
            <div className="flex flex-wrap gap-5 sm:gap-20 text-sm text-gray-600 dark:text-gray-300">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.color}`} />
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusLegend;