import { Sun, Moon } from "lucide-react";

const AttendanceTooltip = ({ data, column }) => {

    if (!data) return null;

    const isRightSide = column >= 6;

    return (
        <div
            className={`absolute z-50 top-2 w-[260px]
            ${isRightSide ? "right-14" : "left-14"}
        `}

        >

            {/* Arrow */}
            <div
                className={`absolute top-5 w-3 h-3 rotate-45
                bg-white dark:bg-gray-800 border-l border-b
                border-gray-200 dark:border-gray-700
                ${isRightSide ? "-right-2" : "-left-2"}
            `}
            />

            <div className="bg-white dark:bg-gray-800 shadow-xl border
            border-gray-200 dark:border-gray-700 rounded-xl p-4">

                {/* Header */}
                <div className="flex justify-between items-center mb-3">

                    <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                        Thu, 1st May 2025
                    </p>

                    {data?.icon === "sun" && (
                        <div className="bg-yellow-400 rounded p-1">
                            <Sun size={14} className="text-white" />
                        </div>
                    )}

                    {data?.icon === "moon" && (
                        <div className="bg-gray-700 rounded p-1">
                            <Moon size={14} className="text-white" />
                        </div>
                    )}

                </div>

                {/* Body */}
                <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">

                    <p>
                        <span className="text-gray-500 dark:text-gray-400">Shift :- </span>
                        Gurugram Office
                    </p>

                    <p>
                        <span className="text-gray-500 dark:text-gray-400">In Date :- </span>
                        22 May 2025
                    </p>

                    <p>
                        <span className="text-gray-500 dark:text-gray-400">In Time :- </span>
                        {data.in || "--"}
                    </p>

                    <p>
                        <span className="text-gray-500 dark:text-gray-400">Out Date :- </span>
                        22 May 2025
                    </p>

                    <p>
                        <span className="text-gray-500 dark:text-gray-400">Out Time :- </span>
                        {data.out || "--"}
                    </p>

                    <p>
                        <span className="text-gray-500 dark:text-gray-400">Status :- </span>
                        <span className="text-yellow-500 font-medium">
                            Missed Punch
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default AttendanceTooltip;