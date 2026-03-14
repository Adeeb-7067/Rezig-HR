

import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import EmployeeCard from "./components/EmployeeCard";
import AttendanceStats from "./components/AttendanceStats";
import DateFilter from "./components/DateFilter";
import StatusLegend from "./components/StatusLegend";
import AttendanceCalendar from "./components/AttendanceCalendar";
import { Switch } from "@/components/ui/switch";
import EmployeeBadge from "./components/EmployeeBadge";
import AttendanceRegularizeModal from "./components/AttendanceRegularizeModal";
import AttendanceBulkRegularizeModal from "./components/AttendanceBulkRegularizeModal";

const AttendanceRegularisation = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [openFilter, setOpenFilter] = useState(false);

    const [multipleCorrection, setMultipleCorrection] = useState(false);

    const [selectedDays, setSelectedDays] = useState([]);
    const [openBulkModal, setOpenBulkModal] = useState(false);
    const searchRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const openSingleModal = (day) => {
        setSelectedDay(day);
        setOpenModal(true);
    };
    const employees = [
        { id: 1, name: "Amit Sharma", dept: "Senior Developer", location: "Delhi" },
        { id: 2, name: "Amit Pandey", dept: "HR Department", location: "Delhi" },
        { id: 3, name: "Amit Paul", dept: "HR Department", location: "Delhi" },
        { id: 4, name: "Amit Shah", dept: "HR Department", location: "Delhi" }
    ];

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="p-3 md:p-5 space-y-5">
            <h1 className="text-xl font-semibold text-gray-700 mb-4 dark:text-white ">
                Attendance Regularisation
            </h1>

            {/* SEARCH BAR */}
            <div className="grid grid-cols-2 md:flex gap-2">

                {/* SEARCH */}
                <div ref={searchRef} className="relative w-full md:w-[90%]">

                    <div className="flex gap-2 rounded-sm px-3 items-center border border-gray-300 dark:border-gray-500 dark:bg-gray-800
    focus-within:border-[#9853F9] focus-within:border-2">

                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchDropdown(true);
                            }}
                            className="px-3 py-2 w-full text-Secondary outline-none bg-transparent"
                        />

                        <IoMdSearch className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* SEARCH DROPDOWN */}
                    {showSearchDropdown && filteredEmployees.length > 0 && (
                        <div className="absolute z-50 top-full mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg">
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

                {/* FILTER BUTTON */}
                <div className="relative">
                    <button
                        onClick={() => setOpenFilter((prev) => !prev)}
                        className="bg-[#8629DF] text-white px-4 py-2 rounded-sm flex items-center gap-1 text-Primary"
                    >
                        <HiAdjustmentsHorizontal />
                        Filter

                        {openFilter ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </button>
                </div>

            </div>
            {/* AFTER EMPLOYEE SELECTED */}
            {selectedEmployee && (

                <>
                    <div className="grid grid-cols-1 lg:grid-cols-9 gap-3">


                        {/* Employee Card */}
                        <div className="lg:col-span-4">
                            <EmployeeCard employee={selectedEmployee} />
                        </div>

                        {/* Stats */}
                        <div className="lg:col-span-5">
                            <AttendanceStats />
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                        <DateFilter
                            fromDate={fromDate}
                            toDate={toDate}
                            setFromDate={setFromDate}
                            setToDate={setToDate}
                        />

                        <EmployeeBadge employee={selectedEmployee} />

                    </div>

                    <StatusLegend />
                    <div className="flex justify-end">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <span>Enable Multiple Correction</span>
                            <Switch
                                checked={multipleCorrection}
                                onCheckedChange={(val) => {
                                    setMultipleCorrection(val);
                                    setSelectedDays([]);
                                }}
                            />
                        </div>
                    </div>
                    <AttendanceCalendar
                        multipleCorrection={multipleCorrection}
                        selectedDays={selectedDays}
                        setSelectedDays={setSelectedDays}
                        openSingleModal={openSingleModal}
                    />

                    {/* <div className="flex justify-end">
                        <button className="bg-[#8629DF] text-white px-6 py-2 rounded">
                            Process
                        </button>
                    </div> */}

                    {/* <AttendanceRegularizeModal
                        open={openBulkModal}
                        onClose={() => setOpenBulkModal(false)}
                        selectedDays={selectedDays}
                    /> */}



                    <div className="flex justify-end gap-2">

                        {multipleCorrection && selectedDays.length > 0 && (
                            <button
                                onClick={() => setOpenBulkModal(true)}
                                className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md text-sm"
                            >
                                Continue
                            </button>
                        )}

                        <button className="bg-[#8629DF] text-white px-6 py-2 rounded">
                            Process
                        </button>
                        {/* SINGLE DAY MODAL */}
                        <AttendanceRegularizeModal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            day={selectedDay}
                        />

                        {/* MULTIPLE DAY MODAL */}
                        <AttendanceBulkRegularizeModal
                            open={openBulkModal}
                            onClose={() => setOpenBulkModal(false)}
                            selectedDays={selectedDays}
                        />

                    </div>
                </>

            )}

        </div>
    );
};

export default AttendanceRegularisation;