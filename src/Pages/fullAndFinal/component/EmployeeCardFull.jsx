import React from "react";

const EmployeeCardFull = ({ employee }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 w-fit transition-colors">

            <div className="flex gap-4">

                {/* IMAGE */}
                <img
                    src="https://i.pravatar.cc/150"
                    alt={employee?.name || "employee"}
                    className="w-[110px] h-[110px] rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
                />

                {/* CONTENT */}
                <div className="flex-1">

                    {/* TOP ROW */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-[1rem] font-semibold text-gray-800 dark:text-gray-100">
                                {employee?.name || "Amit Sharma"}
                            </h2>
                            <p className="text-[0.8rem] text-gray-400 font-medium">
                                EMP1024
                            </p>
                        </div>
                    </div>

                    {/* TEMPLATE */}
                    <p className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-200 mt-2">
                        Leave Template
                    </p>

                    {/* POLICY */}
                    <p className="ds-text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Standard Full-Time Policy
                    </p>

                </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-2">
                {["Marking Department", "Senior Executive", "Gurugram Office"].map(
                    (tag) => (
                        <span
                            key={tag}
                            className="text-[#7B2CBF] text-[0.65rem] px-3 py-1 rounded-[4px]"
                        >
                            {tag}
                        </span>
                    )
                )}
            </div>

        </div>
    );
};

export default EmployeeCardFull;