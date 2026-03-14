import React from "react";

const EmployeeCard = ({ employee }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm p-4 w-full">

            {/* TOP SECTION */}
            <div className="flex flex-col sm:flex-row gap-4">

                {/* IMAGE */}
                <img
                    src="https://i.pravatar.cc/120"
                    alt="employee"
                    className="w-30 h-30 sm:w-[130px] sm:h-[130px] rounded-xl object-cover bg-gray-100"
                />

                {/* RIGHT CONTENT */}
                <div className="flex-1">

                    {/* NAME + BADGE */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                        <div>
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white leading-none">
                                {employee?.name || "Amit Sharma"}
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                EMP1024
                            </p>
                        </div>

                        {/* BADGE */}
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full w-fit">
                            Missed Punch
                        </span>

                    </div>

                    {/* INFO BOX */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 mt-3 w-full sm:w-[185px]">

                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                            19 January 2026
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            In Time – 10:15 am
                        </p>

                        <p className="text-xs text-gray-500">
                            Out Time – 06:00 pm
                        </p>

                    </div>

                </div>

            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">

                <span className="bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-md">
                    Marking Department
                </span>

                <span className="bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-md">
                    Senior Executive
                </span>

                <span className="bg-purple-600 text-white text-xs sm:text-sm px-3 py-1 rounded-md">
                    Gurugram Office
                </span>

            </div>

        </div>
    );
};

export default EmployeeCard;