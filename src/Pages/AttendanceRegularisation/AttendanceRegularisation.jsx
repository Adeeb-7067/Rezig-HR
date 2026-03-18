

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
    const [activeFilters, setActiveFilters] = useState({
        department: [],
        location: []
    });
    const [activeVisibleFilters, setActiveVisibleFilters] = useState({
        department: false,
        location: false
    });
    const [tempVisibleFilters, setTempVisibleFilters] = useState({
        department: false,
        location: false
    });
    const [tempFilterValues, setTempFilterValues] = useState({
        department: [],
        location: []
    });
    const [openDropdowns, setOpenDropdowns] = useState({
        department: false,
        location: false
    });

    const filterDropdownRefs = useRef({});
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    const filterOptions = [
        { key: "department", label: "Department" },
        { key: "location", label: "Location" }
    ];

    const dropdownData = {
        department: ["Senior Developer", "HR Department", "Finance", "Operations"],
        location: ["Delhi", "Indore", "Bhopal"]
    };

    const handleTempCheckboxChange = (key, checked) => {
        setTempVisibleFilters(prev => ({ ...prev, [key]: checked }));
        if (!checked) {
            setTempFilterValues(prev => ({ ...prev, [key]: [] }));
        }
    };

    const handleApplyFilters = () => {
        setActiveVisibleFilters({ ...tempVisibleFilters });
        setActiveFilters({ ...tempFilterValues });
        setOpenFilter(false);
    };

    const handleResetFilters = () => {
        const resetValues = { department: [], location: [] };
        const resetVisible = { department: false, location: false };
        setTempFilterValues(resetValues);
        setTempVisibleFilters(resetVisible);
        setActiveFilters(resetValues);
        setActiveVisibleFilters(resetVisible);
    };

    const handleRemoveFilterValue = (filterKey, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterKey]: prev[filterKey].filter(item => item !== value)
        }));
    };

    const toggleDropdown = (key) => {
        setOpenDropdowns(prev => {
            const newState = { department: false, location: false };
            if (!prev[key]) newState[key] = true;
            return newState;
        });
    };

    const closeDropdown = (key) => {
        setOpenDropdowns(prev => ({ ...prev, [key]: false }));
    };

    const handleDropdownItemClick = (filterKey, item) => {
        setActiveFilters(prev => {
            const currentValues = prev[filterKey];
            if (currentValues.includes(item)) {
                return { ...prev, [filterKey]: currentValues.filter(i => i !== item) };
            } else {
                return { ...prev, [filterKey]: [...currentValues, item] };
            }
        });
    };

    const handleSelectAll = (filterKey) => {
        setActiveFilters(prev => ({ ...prev, [filterKey]: [...dropdownData[filterKey]] }));
    };

    const handleClearAll = (filterKey) => {
        setActiveFilters(prev => ({ ...prev, [filterKey]: [] }));
    };

    const isAnyFilterChecked = Object.values(tempVisibleFilters).some(Boolean);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenFilter(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (openFilter) {
            setTempFilterValues({ ...activeFilters });
            setTempVisibleFilters({ ...activeVisibleFilters });
        }
    }, [openFilter]);

    const [multipleCorrection, setMultipleCorrection] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [openBulkModal, setOpenBulkModal] = useState(false);
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

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = activeFilters.department.length === 0 || activeFilters.department.includes(emp.dept);
        const matchesLocation = activeFilters.location.length === 0 || activeFilters.location.includes(emp.location);
        return matchesSearch && matchesDept && matchesLocation;
    });

    const DropdownComponent = ({ filterKey, label }) => {
        const localDropdownRef = useRef(null);

        useEffect(() => {
            filterDropdownRefs.current[filterKey] = localDropdownRef;
            return () => { delete filterDropdownRefs.current[filterKey]; };
        }, [filterKey]);

        useEffect(() => {
            function handleClickOutside(event) {
                if (localDropdownRef.current && !localDropdownRef.current.contains(event.target)) {
                    const isClickOnOtherDropdownButton = Object.keys(filterDropdownRefs.current).some(key => {
                        if (key === filterKey) return false;
                        const otherButton = document.querySelector(`[data-filter-button="${key}"]`);
                        return otherButton && otherButton.contains(event.target);
                    });
                    if (!isClickOnOtherDropdownButton) closeDropdown(filterKey);
                }
            }

            if (openDropdowns[filterKey]) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [filterKey, openDropdowns[filterKey]]);

        if (!activeVisibleFilters[filterKey]) return null;

        const isOpen = openDropdowns[filterKey];
        const currentValues = activeFilters[filterKey];
        const allValues = dropdownData[filterKey];
        const isAllSelected = currentValues.length === allValues.length;

        return (
            <div ref={localDropdownRef} className="relative flex flex-col">
                <button
                    data-filter-button={filterKey}
                    onClick={() => toggleDropdown(filterKey)}
                    className="border border-gray-300 dark:border-gray-500 px-5 py-2 rounded-full w-fit text-[0.7rem] flex justify-between items-center gap-2 min-w-[140px] bg-white dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-50 transition-colors"
                >
                    <span className="font-medium">{label}</span>
                    {isOpen ? <IoMdArrowDropup className="w-4 h-4" /> : <IoMdArrowDropdown className="w-4 h-4" />}
                </button>

                {isOpen && (
                    <div className="absolute mt-1 border border-gray-200 dark:border-gray-400 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-[100] w-48 max-h-80 overflow-y-auto top-full no-scrollbar">
                        <div className="p-3">
                            <div className="flex justify-between items-center mb-3">
                                <button
                                    onClick={() => isAllSelected ? handleClearAll(filterKey) : handleSelectAll(filterKey)}
                                    className="text-sm text-[#8629DF] font-medium"
                                >
                                    {isAllSelected ? "Clear All" : "Select All"}
                                </button>
                            </div>
                            <hr className="mb-3" />
                            <div className="space-y-1 max-h-58 overflow-y-auto pr-1 no-scrollbar">
                                {allValues.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => handleDropdownItemClick(filterKey, item)}
                                        className="flex items-center gap-3 px-2 py-1 hover:bg-[#8629DF]/80 text-gray-900 hover:text-white dark:text-gray-50 cursor-pointer rounded"
                                    >
                                        <div className={`w-4 h-4 flex items-center justify-center border rounded ${currentValues.includes(item) ? "bg-[#8629DF] border-[#8629DF]" : "border-gray-300"}`}>
                                            {currentValues.includes(item) && (
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            )}
                                        </div>
                                        <span className="text-[0.7rem] font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

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
                        className="bg-[#8629DF] text-white px-4 py-2 rounded-sm flex items-center gap-1 text-Primary h-full"
                    >
                        <HiAdjustmentsHorizontal />
                        Filter
                        {openFilter ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </button>

                    {openFilter && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 top-full mt-1 z-[100] shadow-lg h-fit"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-48 p-4 overflow-y-auto border border-gray-200 dark:border-gray-400 no-scrollbar">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-3 border-b-2 pb-2">
                                    Filter
                                </h2>

                                <div className="space-y-1 h-fit max-h-42 overflow-y-auto pr-2 no-scrollbar">
                                    {filterOptions.map((f) => (
                                        <label
                                            key={f.key}
                                            className="flex items-center gap-2 text-[0.7rem] text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#8629DF]"
                                                checked={tempVisibleFilters[f.key]}
                                                onChange={(e) =>
                                                    handleTempCheckboxChange(f.key, e.target.checked)
                                                }
                                            />
                                            {f.label}
                                        </label>
                                    ))}
                                </div>

                                <div className="mt-4 flex gap-2 pt-3 border-t">
                                    <button
                                        onClick={handleResetFilters}
                                        className="flex-1 flex items-center justify-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-800 border px-3 py-2 rounded-md text-gray-700 dark:text-gray-50 dark:border-gray-400 hover:bg-gray-300 text-sm"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleApplyFilters}
                                        disabled={!isAnyFilterChecked}
                                        className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm transition-all duration-200
                                            ${isAnyFilterChecked
                                                ? "bg-[#8629DF] text-white hover:bg-[#8629DF]/90"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* SECONDARY FILTERS - DROPDOWNS FOR ACTIVE FILTERS */}
            <div className="flex flex-wrap gap-3">
                {filterOptions.map(option => (
                    <DropdownComponent
                        key={option.key}
                        filterKey={option.key}
                        label={option.label}
                    />
                ))}
            </div>

            {/* ACTIVE FILTER TAGS */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([filterKey, values]) =>
                    values.map(value => (
                        <div
                            key={`${filterKey}-${value}`}
                            className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-[#8629DF] dark:text-purple-300 px-2 py-1 rounded-md text-[0.7rem] font-medium border border-purple-200 dark:border-purple-800"
                        >
                            <span>{value}</span>
                            <button
                                onClick={() => handleRemoveFilterValue(filterKey, value)}
                                className="hover:text-purple-700 dark:hover:text-purple-100"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))
                )}
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