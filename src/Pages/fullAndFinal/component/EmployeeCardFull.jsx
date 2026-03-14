import React from "react";

const EmployeeCardFull = ({ employee }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl 
        bg-white dark:bg-gray-800 shadow-sm p-5 w-full transition-colors">

            <div className="flex gap-5 items-start">

                {/* IMAGE */}
                <img
                    src="https://i.pravatar.cc/120"
                    alt="employee"
                    className="w-[110px] h-[110px] rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
                />

                {/* DETAILS */}
                <div className="flex flex-col">

                    {/* NAME */}
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {employee?.name || "Amit Sharma"}
                    </h2>

                    {/* EMP ID */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        EMP1024
                    </p>

                    {/* TEMPLATE */}
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-3">
                        Leave Template
                    </p>

                    {/* POLICY */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Standard Full-Time Policy
                    </p>

                </div>

            </div>

            {/* TAGS */}
            <div className="flex gap-3 mt-4 flex-wrap">

                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-md">
                    Marking Department
                </span>

                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-md">
                    Senior Executive
                </span>

                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-md">
                    Gurugram Office
                </span>

            </div>

        </div>
    );
};

export default EmployeeCardFull;