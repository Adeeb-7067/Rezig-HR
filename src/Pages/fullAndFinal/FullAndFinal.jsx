import { useState, useRef, useEffect } from "react";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import PersonalDetails from "./component/PersonalDetails";
import EmployeeCardFull from "./component/EmployeeCardFull";
import LoanDetails from "./component/LoanDetails";


export default function FullAndFinal({ onNext }) {

    const searchRef = useRef(null);
    const dropdownRef = useRef(null);
    const filterDropdownRefs = useRef({});

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    // Active filter values (applied)
    const [activeFilters, setActiveFilters] = useState({
        unitName: [],
        department: [],
        location: [],
        designation: [],
        grade: [],
        level: [],
    });

    // Which filters are visible in the UI (applied)
    const [activeVisibleFilters, setActiveVisibleFilters] = useState({
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
    });

    // Temporary states for the dropdown (not applied yet)
    const [tempVisibleFilters, setTempVisibleFilters] = useState({
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
    });

    // Track which filter chip dropdowns are open
    const [openDropdowns, setOpenDropdowns] = useState({
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
    });

    const employees = [
        { id: 1, name: "Amit Sharma", dept: "Senior Developer", location: "Delhi" },
        { id: 2, name: "Amit Pandey", dept: "HR Department", location: "Delhi" },
        { id: 3, name: "Amit Paul", dept: "HR Department", location: "Delhi" },
        { id: 4, name: "Amit Shah", dept: "HR Department", location: "Delhi" },
    ];

    const filterOptions = [
        { key: "unitName", label: "Unit Name" },
        { key: "department", label: "Department" },
        { key: "location", label: "Location - Unit" },
        { key: "designation", label: "Designation" },
        { key: "grade", label: "Grade" },
        { key: "level", label: "Level" },
    ];

    const dropdownData = {
        unitName: ["Kajal Thakur", "Finance Unit", "Tech Unit"],
        department: [
            "Human Resources", "Finance", "Operations",
            "Sales", "Marketing", "IT/ Technology",
            "Customer Support", "Procurement",
        ],
        location: ["Bhopal", "Indore", "Delhi"],
        designation: ["UX/UI Designer", "Developer", "Manager"],
        grade: ["G1", "G2", "G3"],
        level: ["L1", "L2", "L3"],
    };

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isAnyFilterChecked = Object.values(tempVisibleFilters).some(Boolean);

    // --- Handlers ---

    const handleTempCheckboxChange = (key, checked) => {
        setTempVisibleFilters((prev) => ({ ...prev, [key]: checked }));
    };

    const handleApplyFilters = () => {
        setActiveVisibleFilters({ ...tempVisibleFilters });
        setOpenFilter(false);
    };

    const handleResetFilters = () => {
        const resetValues = {
            unitName: [], department: [], location: [],
            designation: [], grade: [], level: [],
        };
        const resetVisible = {
            unitName: false, department: false, location: false,
            designation: false, grade: false, level: false,
        };
        setTempVisibleFilters(resetVisible);
        setActiveFilters(resetValues);
        setActiveVisibleFilters(resetVisible);
    };

    const handleRemoveFilterValue = (filterKey, value) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterKey]: prev[filterKey].filter((item) => item !== value),
        }));
    };

    const handleDropdownItemClick = (filterKey, item) => {
        setActiveFilters((prev) => {
            const currentValues = prev[filterKey];
            if (currentValues.includes(item)) {
                return { ...prev, [filterKey]: currentValues.filter((i) => i !== item) };
            } else {
                return { ...prev, [filterKey]: [...currentValues, item] };
            }
        });
    };

    const handleSelectAll = (filterKey) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterKey]: [...dropdownData[filterKey]],
        }));
    };

    const handleClearAll = (filterKey) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterKey]: [],
        }));
    };

    const closeDropdown = (key) => {
        setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
    };

    // --- Effects ---

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenFilter(false);
            }
        }
        if (openFilter) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openFilter]);

    useEffect(() => {
        if (openFilter) {
            setTempVisibleFilters({ ...activeVisibleFilters });
        }
    }, [openFilter]);

    // --- Filter Chip Dropdown Component ---

    const DropdownComponent = ({ filterKey, label }) => {
        const localRef = useRef(null);

        useEffect(() => {
            filterDropdownRefs.current[filterKey] = localRef;
            return () => { delete filterDropdownRefs.current[filterKey]; };
        }, [filterKey]);

        useEffect(() => {
            function handleClickOutside(event) {
                if (localRef.current && !localRef.current.contains(event.target)) {
                    const isClickOnOtherButton = Object.keys(filterDropdownRefs.current).some((key) => {
                        if (key === filterKey) return false;
                        const otherButton = document.querySelector(`[data-filter-button="${key}"]`);
                        return otherButton && otherButton.contains(event.target);
                    });
                    if (!isClickOnOtherButton) {
                        closeDropdown(filterKey);
                    }
                }
            }
            if (openDropdowns[filterKey]) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [filterKey, openDropdowns[filterKey]]);

        const handleToggleDropdown = (key) => {
            const newState = {
                unitName: false, department: false, location: false,
                designation: false, grade: false, level: false,
            };
            if (!openDropdowns[key]) {
                newState[key] = true;
            }
            setOpenDropdowns(newState);
        };

        if (!activeVisibleFilters[filterKey]) return null;

        const isOpen = openDropdowns[filterKey];
        const currentValues = activeFilters[filterKey];
        const allValues = dropdownData[filterKey];
        const isAllSelected = currentValues.length === allValues.length;

        return (
            <div ref={localRef} className="relative flex flex-col">
                <button
                    data-filter-button={filterKey}
                    onClick={() => handleToggleDropdown(filterKey)}
                    className="border border-gray-300 dark:border-gray-400 px-5 py-2 rounded-full w-fit text-[0.7rem] flex justify-between items-center gap-2 min-w-[140px] bg-white dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex flex-col items-start">
                        <span className="text-gray-700 dark:text-gray-50 text-[0.7rem] font-medium">
                            {label}
                        </span>
                    </div>
                    <span className="text-gray-500 mt-1">
                        {isOpen ? (
                            <IoMdArrowDropup className="w-4 h-4" />
                        ) : (
                            <IoMdArrowDropdown className="w-4 h-4" />
                        )}
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute mt-1 border border-gray-200 dark:border-gray-400 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-[100] w-48 max-h-80 overflow-y-auto top-full no-scrollbar">
                        <div className="p-3">
                            {/* Select All / Clear All */}
                            <div className="flex justify-between items-center mb-3">
                                <button
                                    onClick={() =>
                                        isAllSelected
                                            ? handleClearAll(filterKey)
                                            : handleSelectAll(filterKey)
                                    }
                                    className="text-sm text-[#8629DF] dark:text-[#8629DF] font-medium"
                                >
                                    {isAllSelected ? "Clear All" : "Select All"}
                                </button>
                            </div>

                            <hr className="mb-3" />

                            {/* Filter Items */}
                            <div className="space-y-1 max-h-58 overflow-y-auto pr-1 no-scrollbar">
                                {allValues.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => handleDropdownItemClick(filterKey, item)}
                                        className="flex items-center gap-3 px-2 py-1 hover:bg-[#8629DF]/80 text-gray-900 hover:text-white dark:text-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded"
                                    >
                                        <div
                                            className={`w-4 h-4 flex items-center justify-center border rounded ${currentValues.includes(item)
                                                ? "bg-[#8629DF] border-[#8629DF]"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            {currentValues.includes(item) && (
                                                <svg
                                                    className="w-2.5 h-2.5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="3"
                                                        d="M5 13l4 4L19 7"
                                                    ></path>
                                                </svg>
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
        <div className="space-y-4 min-h-screen">

            {/* SEARCH + FILTER */}
            <div className="grid grid-cols-2 md:flex md:justify-around gap-2 md:gap-2 w-full flex-wrap-reverse md:flex-nowrap">

                {/* SEARCH */}
                <div ref={searchRef} className="relative w-full md:w-[90%]">

                    <div className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full xl:h-[35px]
          focus-within:border-[#9853F9] focus-within:border-2 focus-within:shadow-md transition-all">

                        <input
                            type="text"
                            placeholder="Search by employee name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchDropdown(e.target.value.length > 0);
                            }}
                            onFocus={() => {
                                if (searchQuery.length > 0) setShowSearchDropdown(true);
                            }}
                            className="px-3 py-2 w-full text-xs md:text-[0.8rem] outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-50"
                        />

                        <IoMdSearch className="w-5 h-5 text-gray-500" />

                    </div>

                    {/* SEARCH DROPDOWN */}
                    {showSearchDropdown && filteredEmployees.length > 0 && (
                        <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg">
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
                                    <span className="text-[0.9rem] text-gray-800 dark:text-gray-200">{emp.name}</span>
                                    <span className="text-[0.7rem] text-gray-400 ml-2">
                                        • {emp.dept} • {emp.location}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                </div>


                {/* FILTER BUTTON */}
                <div className="relative min-w-[50%] md:min-w-[5rem] flex items-center justify-center gap-1">
                    <button
                        onClick={() => setOpenFilter((prev) => !prev)}
                        className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[0.7rem] px-4 p-1 md:p-0 min-w-[50%] md:min-w-[5rem] rounded-sm flex items-center justify-center gap-1 h-full"
                    >
                        <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
                        Filter{" "}
                        {openFilter ? (
                            <IoMdArrowDropup className="w-3 mt-0.5 h-3" />
                        ) : (
                            <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />
                        )}
                    </button>

                    {/* Filter Dropdown */}
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
                                                ? "bg-[#8629DF] hover:bg-[#8629DF]/70 text-white cursor-pointer"
                                                : "bg-[#8629DF]/80 opacity-50 cursor-not-allowed text-white"
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

            {/* Filter Chip Dropdowns */}
            <div className="flex gap-3 flex-wrap">
                {filterOptions.map((filter) => (
                    <DropdownComponent
                        key={filter.key}
                        filterKey={filter.key}
                        label={filter.label}
                    />
                ))}
            </div>

            {/* Active Filter Tags */}
            <div>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([key, values]) => {
                        if (values.length === 0 || !activeVisibleFilters[key]) return null;
                        return values.map((value, index) => (
                            <div
                                key={`${key}-${value}-${index}`}
                                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm text-[0.7rem] flex items-center gap-2 border border-gray-200 dark:border-gray-400"
                            >
                                <span className="text-gray-900 dark:text-gray-50 text-[0.7rem]">
                                    {value}
                                </span>
                                <button
                                    onClick={() => handleRemoveFilterValue(key, value)}
                                    className="text-gray-500 hover:text-red-500 text-lg cursor-pointer leading-none w-4 h-4 flex items-center justify-center"
                                >
                                    ×
                                </button>
                            </div>
                        ));
                    })}
                </div>
            </div>


            {selectedEmployee && (
                <>
                    <EmployeeCardFull employee={selectedEmployee} />

                    <PersonalDetails
                        onSave={() => {
                            onNext();
                        }}
                    />
                    <LoanDetails />
                </>
            )}

        </div>
    );
}