import React, { useState, useEffect, useRef } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import SearchIcon from "../Assets/Searchicon.png";
import {
  Download,
  Import,
  ImportIcon,
  Recycle,
  RefreshCcw,
  Upload,
} from "lucide-react";
import SelectField from "@/components/SelectFeild";
import DragandUpload from "@/components/ui/DragandUpload";

const MonthlyAttendanceImport = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const filterDropdownRefs = useRef({});
  const fileInputRef = useRef(null);

  // Active filters that are currently applied
  const [activeFilters, setActiveFilters] = useState({
    unitName: [],
    department: [],
    location: [],
    designation: [],
    grade: [],
    level: [],
    employeeType: [],
    employeeStatus: [],
  });

  // Which filters are visible in the UI (checkboxes)
  const [activeVisibleFilters, setActiveVisibleFilters] = useState({
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
    employeeType: false,
    employeeStatus: false,
  });

  // Temporary states for the dropdown (not applied yet)
  const [tempVisibleFilters, setTempVisibleFilters] = useState({
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
    employeeType: false,
    employeeStatus: false,
  });

  const [tempFilterValues, setTempFilterValues] = useState({
    unitName: [],
    department: [],
    location: [],
    designation: [],
    grade: [],
    level: [],
    employeeType: [],
    employeeStatus: [],
  });

  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState({
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
    employeeType: false,
    employeeStatus: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [fileName, setFileName] = useState("");
  const [importing, setImporting] = useState(false);
  const [monthYear, setMonthYear] = useState("2025-04");
  const isAnyFilterChecked = Object.values(tempVisibleFilters).some(Boolean);

  const filterOptions = [
    { key: "unitName", label: "Unit Name" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location - Unit" },
    { key: "designation", label: "Designation" },
    { key: "grade", label: "Grade" },
    { key: "level", label: "Level" },
    { key: "employeeType", label: "Employee Type" },
    { key: "employeeStatus", label: "Employee Status" },
  ];

  const dropdownData = {
    unitName: ["Finance Unit", "Tech Unit"],
    department: ["HR", "Finance", "IT", "Sales"],
    location: ["Bhopal", "Indore", "Delhi"],
    designation: ["Developer", "Manager", "Designer", "Analyst"],
    grade: ["G1", "G2", "G3", "G4"],
    level: ["L1", "L2", "L3"],
    employeeType: ["Full-time", "Part-time", "Intern", "Contract"],
    employeeStatus: ["Active", "Inactive", "On Leave"],
  };

  // Handle temporary checkbox changes (not applied yet)
  const handleTempCheckboxChange = (key, checked) => {
    setTempVisibleFilters((prev) => ({ ...prev, [key]: checked }));
    // If unchecking, also clear the temporary filter value
    if (!checked) {
      setTempFilterValues((prev) => ({ ...prev, [key]: [] }));
    }
  };

  // Apply filters - copy all temporary states to active states
  const handleApplyFilters = () => {
    setActiveVisibleFilters({ ...tempVisibleFilters });
    setActiveFilters({ ...tempFilterValues });
    setOpen(false);
  };

  // Reset filters - clear everything
  const handleResetFilters = () => {
    const resetValues = {
      unitName: [],
      department: [],
      location: [],
      designation: [],
      grade: [],
      level: [],
      employeeType: [],
      employeeStatus: [],
    };

    const resetVisible = {
      unitName: false,
      department: false,
      location: false,
      designation: false,
      grade: false,
      level: false,
      employeeType: false,
      employeeStatus: false,
    };

    setTempFilterValues(resetValues);
    setTempVisibleFilters(resetVisible);
    setActiveFilters(resetValues);
    setActiveVisibleFilters(resetVisible);
  };

  // Remove individual active filter
  const handleRemoveFilter = (key) => {
    setActiveFilters((prev) => ({ ...prev, [key]: [] }));
    setActiveVisibleFilters((prev) => ({ ...prev, [key]: false }));
  };

  // Remove specific filter value
  const handleRemoveFilterValue = (filterKey, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey].filter((item) => item !== value),
    }));
  };

  // Toggle dropdown open/close
  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => {
      const newState = {
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
        employeeType: false,
        employeeStatus: false,
      };
      newState[key] = !prev[key];
      return newState;
    });
  };

  // Close specific dropdown
  const closeDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  // Handle dropdown item selection (multi-select)
  const handleDropdownItemClick = (filterKey, item) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterKey];
      if (currentValues.includes(item)) {
        // Remove item if already selected
        return {
          ...prev,
          [filterKey]: currentValues.filter((i) => i !== item),
        };
      } else {
        // Add item if not selected
        return {
          ...prev,
          [filterKey]: [...currentValues, item],
        };
      }
    });
  };

  // Handle select all for a filter
  const handleSelectAll = (filterKey) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: [...dropdownData[filterKey]],
    }));
  };

  // Handle clear all for a filter
  const handleClearAll = (filterKey) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: [],
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleImport = () => {
    if (!fileName) {
      alert("Please select a file first");
      return;
    }

    setImporting(true);
    // Simulate import process
    setTimeout(() => {
      alert(`File "${fileName}" imported successfully!`);
      setImporting(false);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 1500);
  };

  // Effect for main filter dropdown click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Initialize temp states when dropdown opens
  useEffect(() => {
    if (open) {
      setTempFilterValues({ ...activeFilters });
      setTempVisibleFilters({ ...activeVisibleFilters });
    }
  }, [open]);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const isClickInsideDropdown = Object.values(
        filterDropdownRefs.current,
      ).some((ref) => ref.current && ref.current.contains(event.target));

      const isClickOnDropdownButton = event.target.closest(
        "[data-filter-button]",
      );

      if (!isClickInsideDropdown && !isClickOnDropdownButton) {
        setOpenDropdowns({
          unitName: false,
          department: false,
          location: false,
          designation: false,
          grade: false,
          level: false,
          employeeType: false,
          employeeStatus: false,
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dropdown Component with click outside functionality
  const DropdownComponent = ({ filterKey, label }) => {
    const dropdownRef = useRef(null);

    // Store ref in parent's ref object
    useEffect(() => {
      filterDropdownRefs.current[filterKey] = dropdownRef;
      return () => {
        delete filterDropdownRefs.current[filterKey];
      };
    }, [filterKey]);

    if (!activeVisibleFilters[filterKey]) return null;

    const isOpen = openDropdowns[filterKey];
    const currentValues = activeFilters[filterKey];
    const allValues = dropdownData[filterKey];
    const isAllSelected = currentValues.length === allValues.length;

    return (
      <div ref={dropdownRef} className="relative flex flex-col">
        <button
          data-filter-button={filterKey}
          onClick={() => toggleDropdown(filterKey)}
          className="border border-gray-300 dark:border-gray-500 px-5 py-2 rounded-full w-fit text-[0.7rem] flex justify-between items-center gap-2 min-w-[140px] bg-white dark:bg-gray-800 hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-gray-700 dark:text-gray-50 text-[0.7rem] font-medium">
              {label}
            </span>
            {/* {currentValues.length > 0 && (
              <span className="text-gray-500 text-xs mt-0.5">
                {currentValues.length} selected
              </span>
            )} */}
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
          <div className="absolute mt-1 border border-gray-200 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-[100] w-48 max-h-80 overflow-y-auto top-full no-scrollbar">
            <div className="p-3">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() =>
                    isAllSelected
                      ? handleClearAll(filterKey)
                      : handleSelectAll(filterKey)
                  }
                  className="text-sm text-[#8629DF] font-medium"
                >
                  {isAllSelected ? "Clear All" : "Select All"}
                </button>
              </div>

              <hr className="mb-3" />

              {/* Filter Items */}
              <div className="space-y-1 max-h-58 overflow-y-auto pr-1">
                {allValues.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleDropdownItemClick(filterKey, item)}
                    className="flex items-center gap-3 px-2 py-1 hover:bg-[#8629DF]/80 text-gray-900 hover:text-white cursor-pointer rounded"
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center border rounded ${
                        currentValues.includes(item)
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
                    <span className="text-[0.7rem] dark:text-gray-50 font-semibold">
                      {item}
                    </span>
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
    <div className="p-2 sm:p-4">
      {/* Top Actions */}
      <div className="flex flex-row sm:flex-row justify-between gap-3 mt-2 mb-6 sm:mb-8 w-full">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-[#252C58] dark:text-gray-50 truncate">
            Import Monthly Attendance
          </h1>
        </div>
      </div>
      {/* Search and Filter Bar */}
      <div className="grid grid-cols-2 md:flex gap-2 w-full">
        <div
          className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full md:w-[90%] xl:h-[35px] 
       focus-within:border-[#9853F9] focus-within:border-2 focus-within:shadow-md transition-all"
        >
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-full text-xs md:text-[0.8rem] outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-50"
          />
          <IoMdSearch className="w-5 h-5 text-gray-500" />
        </div>

        <div className="relative min-w-[50%] md:min-w-[5rem] flex items-center justify-center gap-1 ">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[0.7rem] px-4 p-1 md:p-0 min-w-[50%] md:min-w-[5rem] rounded-sm flex items-center justify-center gap-1 h-full"
          >
            <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
            Filter{" "}
            {open ? (
              <IoMdArrowDropup className="w-3 mt-0.5 h-3" />
            ) : (
              <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />
            )}
          </button>

          {/* Filter Dropdown - Fixed positioning */}
          {open && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-full mt-1 z-[100] shadow-lg h-fit"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-48 p-4 overflow-y-auto border border-gray-200 dark:border-gray-400 no-scrollbar">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-3  border-b-2 pb-2">
                  Filter
                </h2>

                <div className="space-y-1 h-fit max-h-42 overflow-y-auto pr-2  no-scrollbar">
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
                    {/* <LuRefreshCw className="w-3 h-3" />  */}
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    disabled={!isAnyFilterChecked}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm transition-all duration-200
         ${
           isAnyFilterChecked
             ? "bg-[#8629DF] hover:bg-[#8629DF]/70 text-white cursor-pointer"
             : "bg-[#8629DF]/80 opacity-50 cursor-not-allowed text-white"
         }
       `}
                  >
                    {/*     <img src={SearchIcon} className="w-4 h-4" /> */}
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Chips Row */}
      <div className="flex gap-3 flex-wrap my-4">
        {filterOptions.map((filter) => (
          <DropdownComponent
            key={filter.key}
            filterKey={filter.key}
            label={filter.label}
          />
        ))}
      </div>

      {/* Active Filter Tags */}
      <div className="mt-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, values]) => {
            if (values.length === 0 || !activeVisibleFilters[key]) return null;
            return values.map((value, index) => (
              <div
                key={`${key}-${value}-${index}`}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm text-[0.7rem] flex items-center gap-2 border border-gray-200 dark:border-gray-500"
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

      <hr className="text-gray-500" />

      <div className="bg-white dark:bg-gray-900  border border-gray-200 dark:border-gray-400 rounded-sm px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-10">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 justify-between w-full">
              <label
                htmlFor="Month -Year"
                className="text-[0.7rem] w-[50%] mt-3 dark:text-gray-200"
              >
                Leave Template ID
              </label>

              <SelectField
                name={"Leave Template Id"}
                value={"Select Id"}
                className="lg:w-[70%]  "
                options={[
                  { value: "", label: "Select Title" },
                  { value: "monthly", label: "Monthly." },
                ]}
              />
            </div>

            <div className="flex flex-col gap-2 justify-between w-full">
              <label
                htmlFor="Month -Year"
                className="text-[0.7rem] w-[50%] mt-3 dark:text-gray-200"
              >
                Month - Year
              </label>

              <SelectField
                name={"Month - Year "}
                value={"Select Type"}
                className="lg:w-[70%] "
                options={[
                  { value: "", label: "Select Title" },
                  { value: "monthly", label: "Monthly" },
                  { value: "Year", label: "Year" },
                ]}
              />
            </div>

            {/* Action buttons */}
            {/* <div className="flex gap-2 pt-1">
              <button className="flex items-center gap-1 bg-[#8629DF] text-white text-xs py-2 px-4 rounded-sm hover:bg-purple-700">
                <Download className="h-4 w-4" /> Export
              </button>

              <button className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs py-2 px-4 border border-gray-300 rounded-sm hover:bg-gray-200">
                <RefreshCcw className="h-4 w-4 " /> Reset
              </button>
            </div> */}
          </div>
          <div className="hidden lg:block bg-gray-200 dark:bg-gray-500 w-px"></div>
          {/* RIGHT SIDE */}
          {/* <div className="space-y-4 items-center flex flex-col">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Select Attendance Excel File
              </label>

              <div className="flex items-center gap-2">
                <label className="border border-gray-300 px-3 py-2 text-xs cursor-pointer hover:bg-gray-50">
                  Choose File
                  <input type="file" className="hidden" />
                </label>
                <span className="text-xs text-gray-400">No file chosen</span>
              </div>
            </div>

            <button className="flex items-center gap-1 bg-[#8629DF] text-white text-xs p-3 rounded-sm hover:bg-purple-700">
              <Upload className="h-4 w-4" /> Import and Save.
            </button>
          </div> */}
          <div>
            <DragandUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendanceImport;
