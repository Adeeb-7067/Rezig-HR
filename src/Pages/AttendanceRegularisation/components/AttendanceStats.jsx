import React from "react";

const stats = [
    { label: "Total Present", color: "border-green-500 text-green-600" },
    { label: "Total Absent", color: "border-red-500 text-red-500" },
    { label: "Week Off", color: "border-gray-400 text-gray-500" },
    { label: "Total Holiday", color: "border-blue-500 text-blue-600" },
    { label: "Total Miss Punch", color: "border-yellow-500 text-yellow-600" },
    { label: "Total Special Day", color: "border-purple-500 text-purple-600" },
];

const AttendanceStats = () => {
    return (
        <div className="grid grid-cols-2  md:grid-cols-3 gap-4 w-full space-y-2">

            {stats.map((item, i) => (
                <div
                    key={i}
                    className={`border-b-4 ${item.color} bg-white dark:bg-gray-800 shadow-sm rounded-lg h-[70px] flex flex-col justify-center items-center`}
                >
                    <p className={`text-lg font-semibold ${item.color}`}>
                        1,000
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.label}
                    </p>
                </div>
            ))}

        </div>
    );
};

export default AttendanceStats;