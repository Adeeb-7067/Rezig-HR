import { useState, useRef, useEffect } from "react";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import EmployeeCard from "../AttendanceRegularisation/components/EmployeeCard";
import Stepper from "../Stepper";

export default function PersonalInfo({ onNext }) {

    const searchRef = useRef(null);

    const [step] = useState(0);   // ✅ Stepper step

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const employees = [
        { id: 1, name: "Amit Sharma", dept: "Senior Developer", location: "Delhi" },
        { id: 2, name: "Amit Pandey", dept: "HR Department", location: "Delhi" },
        { id: 3, name: "Amit Paul", dept: "HR Department", location: "Delhi" },
        { id: 4, name: "Amit Shah", dept: "HR Department", location: "Delhi" },
    ];

    const steps = [
        "Personal Info",
        "Attendance Adjustment",
        "Variable payment",
        "Compliance payment"
    ];

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="space-y-6">

            {/* STEPPER */}
            <Stepper steps={steps} currentStep={step} />

            {/* SEARCH + FILTER */}
            <div className="grid grid-cols-2 md:flex gap-2">

                <div ref={searchRef} className="relative w-full md:w-[90%]">

                    <div className="flex items-center gap-2 px-3 border rounded-sm
                    border-gray-300 dark:border-gray-500 dark:bg-gray-800
                    focus-within:border-[#9853F9] focus-within:border-2">

                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchDropdown(true);
                            }}
                            className="w-full py-2 outline-none bg-transparent text-sm"
                        />

                        <IoMdSearch className="w-5 h-5 text-gray-500" />

                    </div>

                    {showSearchDropdown && filteredEmployees.length > 0 && (
                        <div className="absolute top-full mt-1 w-full z-50
                        bg-white dark:bg-gray-800 border rounded shadow-lg">

                            {filteredEmployees.map((emp) => (
                                <div
                                    key={emp.id}
                                    onClick={() => {
                                        setSelectedEmployee(emp);
                                        setSearchQuery(emp.name);
                                        setShowSearchDropdown(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <span className="font-medium">{emp.name}</span>

                                    <span className="text-xs text-gray-400 ml-2">
                                        • {emp.dept} • {emp.location}
                                    </span>
                                </div>
                            ))}

                        </div>
                    )}

                </div>

                <button
                    onClick={() => setOpenFilter((prev) => !prev)}
                    className="flex items-center gap-1 px-4 py-2 rounded-sm
                    bg-[#8629DF] text-white text-sm"
                >
                    <HiAdjustmentsHorizontal />
                    Filter
                    {openFilter ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

            </div>

            {selectedEmployee && (
                <EmployeeCard employee={selectedEmployee} />
            )}

            <div className="flex justify-end gap-3">

                <button className="border px-5 py-2 rounded">
                    Reset
                </button>

                <button
                    onClick={onNext}
                    className="bg-purple-600 text-white px-6 py-2 rounded"
                >
                    Save
                </button>

            </div>

        </div>
    );
}