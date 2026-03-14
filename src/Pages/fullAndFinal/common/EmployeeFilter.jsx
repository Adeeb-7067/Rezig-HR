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
        <div className="  w-[240px] bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 z-50">

            <h3 className="text-sm font-semibold mb-3">Filter</h3>

            <div className="space-y-2 text-sm">

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.unitName}
                        onChange={() => handleChange("unitName")}
                    />
                    Unit Name
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.department}
                        onChange={() => handleChange("department")}
                    />
                    Department
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.location}
                        onChange={() => handleChange("location")}
                    />
                    Location - Unit
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.designation}
                        onChange={() => handleChange("designation")}
                    />
                    Designation
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.grade}
                        onChange={() => handleChange("grade")}
                    />
                    Grade
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.level}
                        onChange={() => handleChange("level")}
                    />
                    Level
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.employeeType}
                        onChange={() => handleChange("employeeType")}
                    />
                    Employee Type
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox"
                        checked={filters.employeeStatus}
                        onChange={() => handleChange("employeeStatus")}
                    />
                    Employee Status
                </label>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-4">

                <button
                    onClick={handleReset}
                    className="px-3 py-1 text-sm border rounded"
                >
                    Reset
                </button>

                <button
                    onClick={() => onApply(filters)}
                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded"
                >
                    Apply
                </button>

            </div>

        </div>
    );
}