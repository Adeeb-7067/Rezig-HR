import { useState } from "react";

export default function EmployeeFilter({ onApply }) {

    const [filters, setFilters] = useState({
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
        employeeType: false,
        employeeStatus: false
    });

    const handleChange = (key) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleReset = () => {
        setFilters({
            unitName: false,
            department: false,
            location: false,
            designation: false,
            grade: false,
            level: false,
            employeeType: false,
            employeeStatus: false
        });
    };

    return (
        <div className="w-[240px] bg-white dark:bg-gray-800 
        border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-3 z-50">

            <h3 className="text-[0.7rem] font-semibold text-gray-500 dark:text-gray-50 mb-2">Filter</h3>

            <div className="space-y-1.5 text-[0.7rem]">

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.unitName}
                        onChange={() => handleChange("unitName")}
                        className="h-3.5 w-3.5"
                    />
                    Unit Name
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.department}
                        onChange={() => handleChange("department")}
                        className="h-3.5 w-3.5"
                    />
                    Department
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.location}
                        onChange={() => handleChange("location")}
                        className="h-3.5 w-3.5"
                    />
                    Location - Unit
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.designation}
                        onChange={() => handleChange("designation")}
                        className="h-3.5 w-3.5"
                    />
                    Designation
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.grade}
                        onChange={() => handleChange("grade")}
                        className="h-3.5 w-3.5"
                    />
                    Grade
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.level}
                        onChange={() => handleChange("level")}
                        className="h-3.5 w-3.5"
                    />
                    Level
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.employeeType}
                        onChange={() => handleChange("employeeType")}
                        className="h-3.5 w-3.5"
                    />
                    Employee Type
                </label>

                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                    <input type="checkbox"
                        checked={filters.employeeStatus}
                        onChange={() => handleChange("employeeStatus")}
                        className="h-3.5 w-3.5"
                    />
                    Employee Status
                </label>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-3">

                <button
                    onClick={handleReset}
                    className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-[0.7rem] py-1 px-3 rounded-sm"
                >
                    Reset
                </button>

                <button
                    onClick={() => onApply(filters)}
                    className="bg-[#8629DF] text-white font-semibold text-[0.7rem] py-1 px-3 rounded-sm"
                >
                    Apply
                </button>

            </div>

        </div>
    );
}