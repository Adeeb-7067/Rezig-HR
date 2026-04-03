import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { CiExport, CiImport } from "react-icons/ci";
import { ChevronDown } from "lucide-react";

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
    location: [],
  });
  const [activeVisibleFilters, setActiveVisibleFilters] = useState({
    department: false,
    location: false,
  });
  const [tempVisibleFilters, setTempVisibleFilters] = useState({
    department: false,
    location: false,
  });
  const [tempFilterValues, setTempFilterValues] = useState({
    department: [],
    location: [],
  });
  const [openDropdowns, setOpenDropdowns] = useState({
    department: false,
    location: false,
  });

  const filterDropdownRefs = useRef({});
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const filterOptions = [
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
  ];

  const dropdownData = {
    department: ["Senior Developer", "HR Department", "Finance", "Operations"],
    location: ["Delhi", "Indore", "Bhopal"],
  };

  const handleTempCheckboxChange = (key, checked) => {
    setTempVisibleFilters((prev) => ({ ...prev, [key]: checked }));
    if (!checked) {
      setTempFilterValues((prev) => ({ ...prev, [key]: [] }));
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
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey].filter((item) => item !== value),
    }));
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => {
      const newState = { department: false, location: false };
      if (!prev[key]) newState[key] = true;
      return newState;
    });
  };

  const closeDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
  };

  const handleDropdownItemClick = (filterKey, item) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterKey];
      if (currentValues.includes(item)) {
        return {
          ...prev,
          [filterKey]: currentValues.filter((i) => i !== item),
        };
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
    setActiveFilters((prev) => ({ ...prev, [filterKey]: [] }));
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
    { id: 4, name: "Amit Shah", dept: "HR Department", location: "Delhi" },
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDept =
      activeFilters.department.length === 0 ||
      activeFilters.department.includes(emp.dept);
    const matchesLocation =
      activeFilters.location.length === 0 ||
      activeFilters.location.includes(emp.location);
    return matchesSearch && matchesDept && matchesLocation;
  });

  const DropdownComponent = ({ filterKey, label }) => {
    const localDropdownRef = useRef(null);

    useEffect(() => {
      filterDropdownRefs.current[filterKey] = localDropdownRef;
      return () => {
        delete filterDropdownRefs.current[filterKey];
      };
    }, [filterKey]);

    useEffect(() => {
      function handleClickOutside(event) {
        if (
          localDropdownRef.current &&
          !localDropdownRef.current.contains(event.target)
        ) {
          const isClickOnOtherDropdownButton = Object.keys(
            filterDropdownRefs.current,
          ).some((key) => {
            if (key === filterKey) return false;
            const otherButton = document.querySelector(
              `[data-filter-button="${key}"]`,
            );
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
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
          className="border border-gray-300 dark:border-gray-400 px-4 py-2 rounded-full w-fit ds-text-xs flex justify-between items-center gap-2 min-w-[120px] sm:min-w-[140px] bg-white dark:bg-gray-800 dark:text-gray-50 hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-gray-700 dark:text-gray-50 ds-text-xs font-medium">
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
          <div className="absolute mt-1 border border-gray-200 dark:border-gray-400 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-[100] w-44 sm:w-48 max-h-80 overflow-y-auto top-full no-scrollbar">
            <div className="p-3">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() =>
                    isAllSelected
                      ? handleClearAll(filterKey)
                      : handleSelectAll(filterKey)
                  }
                  className="text-sm ds-text-primary font-medium"
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
                    className="flex items-center gap-3 px-2 py-1 hover:bg-ds-primary/80 text-gray-900 hover:text-white dark:text-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded"
                  >
                    <div
                      className={`w-4 h-4 flex-shrink-0 flex items-center justify-center border rounded ${currentValues.includes(item) ? "ds-bg-primary ds-border-primary" : "border-gray-300"}`}
                    >
                      {currentValues.includes(item) && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="ds-text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Shared button styles
  const baseBtn =
    "font-semibold text-xs py-1 px-4 rounded-sm flex-1 sm:flex-none sm:min-w-[6rem]";

  return (
    <div className="p-3 sm:p-4 md:p-5 space-y-4 sm:space-y-5">
      {/* PAGE HEADER */}
      <div className="flex flex-row justify-between gap-3 mt-2 mb-6 sm:mb-8 w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#252C58] dark:text-gray-50">
          Attendance Regularisation
        </h1>
      </div>

      {/* SEARCH + FILTER ROW */}
      <div className="flex flex-row gap-2 w-full">
        {/* SEARCH — takes remaining space, dropdown anchored correctly */}
        <div ref={searchRef} className="relative flex-1 min-w-0">
          <div className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full h-9 sm:h-[35px] focus-within:border-ds-primary focus-within:border-2 focus-within:shadow-md transition-all">
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              className="px-1 py-2 w-full text-xs sm:text-[0.8rem] outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-50 dark:text-gray-50"
            />
            <IoMdSearch className="w-5 h-5 text-gray-500 flex-shrink-0" />
          </div>

          {/* SEARCH DROPDOWN — now correctly positioned under search bar */}
          {showSearchDropdown && filteredEmployees.length > 0 && (
            <div className="absolute z-50 top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg">
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
                  <span className="text-[0.85rem] text-gray-800 dark:text-gray-200 block sm:inline">
                    {emp.name}
                  </span>
                  <span className="ds-text-xs text-gray-400 sm:ml-2 block sm:inline">
                    • {emp.dept} • {emp.location}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FILTER BUTTON — fixed width, no stretching */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setOpenFilter((prev) => !prev)}
            className="ds-bg-primary dark:border dark:border-gray-500 text-white cursor-pointer text-xs px-3 sm:px-4 rounded-sm flex items-center justify-center gap-1 h-9 sm:h-[35px] whitespace-nowrap"
          >
            <HiAdjustmentsHorizontal className="w-4 h-4" />
            <span>Filter</span>
            {openFilter ? (
              <IoMdArrowDropup className="w-3 h-3" />
            ) : (
              <IoMdArrowDropdown className="w-3 h-3" />
            )}
          </button>

          {/* FILTER DROPDOWN */}
          {openFilter && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-full mt-1 z-[100] shadow-lg"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-44 sm:w-48 p-4 border border-gray-200 dark:border-gray-400">
                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-50 mb-3 border-b-2 pb-2">
                  Filter
                </h2>

                <div className="space-y-1 max-h-40 overflow-y-auto pr-1 no-scrollbar">
                  {filterOptions.map((f) => (
                    <label
                      key={f.key}
                      className="flex items-center gap-2 ds-text-xs text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-ds-primary"
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
                    className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold ds-text-xs py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
                    >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    disabled={!isAnyFilterChecked}
                    className={`font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white
                      ${isAnyFilterChecked
                                          ? "ds-bg-primary hover:bg-ds-primary/70 text-white cursor-pointer"
                                          : "bg-ds-primary/80 opacity-50 cursor-not-allowed text-white"
                                        }
                    `}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECONDARY FILTER DROPDOWNS */}
      {Object.values(activeVisibleFilters).some(Boolean) && (
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {filterOptions.map((option) => (
            <DropdownComponent
              key={option.key}
              filterKey={option.key}
              label={option.label}
            />
          ))}
        </div>
      )}

      {/* ACTIVE FILTER TAGS */}
      {Object.values(activeFilters).some((v) => v.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterKey, values]) =>
            values.map((value) => (
              <div
                key={`${filterKey}-${value}`}
                className="bg-gray-100 dark:bg-gray-800 dark:border-gray-400 px-3 py-1 rounded-sm ds-text-xs flex items-center gap-2 border border-gray-200"
              >
                <span className="text-gray-900 dark:text-gray-50 ds-text-xs">
                  {value}
                </span>
                <button
                  onClick={() => handleRemoveFilterValue(filterKey, value)}
                  className="text-gray-500 hover:text-red-500 text-lg cursor-pointer leading-none w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            )),
          )}
        </div>
      )}

      {/* AFTER EMPLOYEE SELECTED */}
      {selectedEmployee && (
        <>
          {/* Employee Card + Stats — stacks on mobile, side-by-side on large */}
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-3">
            <div className="lg:col-span-4">
              <EmployeeCard employee={selectedEmployee} />
            </div>
            <div className="lg:col-span-5">
              <AttendanceStats />
            </div>
          </div>

          {/* Date Filter + Badge — stacks on mobile */}
          <div className="flex flex-col flex-wrap gap-3  md:flex-row md:items-center md:justify-between">
            <DateFilter
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
            />
            <EmployeeBadge employee={selectedEmployee} />
          </div>

          <StatusLegend />

          {/* Multiple Correction Toggle */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <span className="text-right leading-tight">
                Enable Multiple
                <br className="sm:hidden" /> Correction
              </span>
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

          {/* Action Buttons — full-width on mobile, auto-width on larger */}
          <div className="flex flex-row justify-end w-full gap-2 mt-4">
            <button
              onClick={() => {
                setSelectedEmployee(null);
              }}
              type="button"
                    className="font-semibold text-xs sm:text-[0.7rem] py-1.5 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary"
            >
              Back
            </button>
            {multipleCorrection && selectedDays.length > 0 && (
              <button
                onClick={() => setOpenBulkModal(true)}
                type="button"
                className="font-semibold text-xs sm:text-[0.7rem] py-1.5 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary"
                >
                Continue
              </button>
            )}

            <button
              className={`btn-primary-half ds-bg-primary text-white hover:bg-ds-primary/80 ${baseBtn}`}
            >
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
