import React from "react";

const EmployeeBadge = ({ employee }) => {
    if (!employee) return null;

    return (
        <div className=" flex items-center gap-2 border border-ds-primary/30 dark:border-ds-primary rounded-sm px-3 py-1.5 bg-white dark:bg-gray-800 shadow-sm">

            <img
                src="https://i.pravatar.cc/40"
                alt="emp"
                className="w-7 h-7 rounded-full object-cover"
            />

            <span className="text-sm font-semibold text-gray-600 dark:text-gray-200 whitespace-nowrap">
                2341421 | {employee.name}
            </span>

        </div>
    );
};

export default EmployeeBadge;