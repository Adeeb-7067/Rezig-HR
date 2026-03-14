import React, { useRef } from "react";
import { Calendar } from "lucide-react";

const DateFilter = ({ fromDate, toDate, setFromDate, setToDate }) => {
    const fromRef = useRef(null);
    const toRef = useRef(null);

    const openPicker = (ref) => {
        if (ref.current?.showPicker) {
            ref.current.showPicker();
        } else {
            ref.current.focus();
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">

            {/* From Date */}
            <div
                onClick={() => openPicker(fromRef)}
                className="relative w-full sm:w-40 cursor-pointer"
            >
                <div className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">

                    <span
                        className={`text-sm ${fromDate
                                ? "text-gray-800 dark:text-gray-200"
                                : "text-gray-500"
                            }`}
                    >
                        {fromDate || "From Date"}
                    </span>

                    <Calendar className="text-gray-600 dark:text-gray-400" size={16} />
                </div>

                <input
                    ref={fromRef}
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>

            {/* To Date */}
            <div
                onClick={() => openPicker(toRef)}
                className="relative w-full sm:w-40 cursor-pointer"
            >
                <div className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-800 flex items-center justify-between">

                    <span
                        className={`text-sm ${toDate
                                ? "text-gray-800 dark:text-gray-200"
                                : "text-gray-500"
                            }`}
                    >
                        {toDate || "To Date"}
                    </span>

                    <Calendar className="text-gray-600 dark:text-gray-400" size={16} />
                </div>

                <input
                    ref={toRef}
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>

        </div>
    );
};

export default DateFilter;