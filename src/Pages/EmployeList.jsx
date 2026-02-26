import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const InlineSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-24">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-[4rem] h-7.5 px-3 py-1.5
          rounded-sm text-[0.7rem]
          flex items-center justify-between
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-700
          text-gray-600 dark:text-gray-100
          shadow-sm
          hover:border-gray-400 dark:hover:border-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#9853F9] focus:ring-inset
          transition-all duration-200
          ${className}
        `}
      >
        <span className={!value ? "text-gray-400 dark:text-gray-500" : ""}>
          {value || placeholder}
        </span>

        <ChevronDown
          size={14}
          className={`transition-transform ${
            open ? "rotate-180 text-[#9853F9]" : "text-gray-400"
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="
            absolute z-20 mt-1 w-full
            rounded-sm shadow-lg
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-[0.7rem]
            max-h-40 overflow-y-auto
          "
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`
                px-3 py-1.5 cursor-pointer
                transition-all duration-150
                hover:bg-[#9853F9]/15 hover:text-[#9853F9]
                dark:text-gray-100
                ${
                  value === opt.value
                    ? "bg-[#9853F9]/20 text-[#9853F9] font-medium"
                    : ""
                }
              `}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EmployeList = () => {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState("10");
  const dropdownRef = useRef(null);
  const filterDropdownRefs = useRef({});

  const [activeFilters, setActiveFilters] = useState({
    unitName: [],
    department: [],
    location: [],
    designation: [],
    grade: [],
    level: [],
  });

  // Which filters are visible in the UI (checkboxes)
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

  const [tempFilterValues, setTempFilterValues] = useState({
    unitName: [],
    department: [],
    location: [],
    designation: [],
    grade: [],
    level: [],
  });

  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState({
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const employees = [
    {
      id: "2341421",
      name: "Ahmed Rashdan",
      department: "IT Department",
      designation: "Help Desk Executive",
      doj: "29 July 2023",
      manager: "Ahmed Rashdan",
      profilePic: "https://i.pravatar.cc/106",
    },
    {
      id: "3411421",
      name: "Ali Alhamdan",
      department: "Marketing",
      designation: "Senior Executive",
      doj: "29 July 2023",
      manager: "Ahmed Rashdan",
      profilePic: "https://i.pravatar.cc/105",
    },
    {
      id: "2341121",
      name: "Mona Alghafar",
      department: "Design",
      designation: "Senior Manager",
      doj: "29 July 2023",
      manager: "Ahmed Rashdan",
      profilePic: "https://i.pravatar.cc/104",
    },
    {
      id: "2341421",
      name: "Moustafa Adel",
      department: "Development",
      designation: "Director",
      doj: "29 July 2023",
      manager: "Ahmed Rashdan",
      profilePic: "https://i.pravatar.cc/103",
    },
    {
      id: "2341421",
      name: "Jhon Neleson",
      department: "Sales",
      designation: "Director",
      doj: "29 July 2023",
      manager: "Ahmed Rashdan",
      profilePic: "https://i.pravatar.cc/102",
    },
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
      "Human Resources",
      "Finance",
      "Operations",
      "Sales",
      "Marketing",
      "IT/ Technology",
      "Customer Support",
      "Procurement",
    ],
    location: ["Bhopal", "Indore", "Delhi"],
    designation: ["UX/UI Designer", "Developer", "Manager"],
    grade: ["G1", "G2", "G3"],
    level: ["L1", "L2", "L3"],
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
    };

    const resetVisible = {
      unitName: false,
      department: false,
      location: false,
      designation: false,
      grade: false,
      level: false,
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

  // Update the toggleDropdown function in your component
  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => {
      const newState = {
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
      };

      if (!prev[key]) {
        newState[key] = true;
      }

      return newState;
    });
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({
      unitName: false,
      department: false,
      location: false,
      designation: false,
      grade: false,
      level: false,
    });
  };

  // Close specific dropdown
  const closeDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: false,
    }));
  };
  const isAnyFilterChecked = Object.values(tempVisibleFilters).some(Boolean);

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

  // Filter data based on search query and active filters
  const filterData = employees.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Check if item matches all active filters
    const matchesFilters = Object.entries(activeFilters).every(
      ([key, values]) => {
        if (values.length === 0) return true; // No filter applied for this field

        // For department filter, check if item's department matches any selected value
        if (key === "department") {
          return values.some((value) =>
            item.department.toLowerCase().includes(value.toLowerCase()),
          );
        }

        // For other filters, you might need to adjust based on your data structure
        // Assuming employees data has these fields
        return values.some((value) =>
          String(item[key] || "")
            .toLowerCase()
            .includes(value.toLowerCase()),
        );
      },
    );

    return matchesSearch && matchesFilters;
  });

  // Dropdown Component with click outside functionality
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

    // Click outside effect for this dropdown
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          // Check if click is on any of the other dropdown buttons
          const isClickOnOtherDropdownButton = Object.keys(
            filterDropdownRefs.current,
          ).some((key) => {
            if (key === filterKey) return false;
            const otherButton = document.querySelector(
              `[data-filter-button="${key}"]`,
            );
            return otherButton && otherButton.contains(event.target);
          });

          if (!isClickOnOtherDropdownButton) {
            closeDropdown(filterKey);
          }
        }
      }

      if (openDropdowns[filterKey]) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [filterKey, openDropdowns[filterKey]]);

    // Toggle dropdown with single-open functionality
    const handleToggleDropdown = (key) => {
      // Close all dropdowns first
      const newOpenDropdowns = {
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
      };

      // If the clicked dropdown wasn't already open, open it
      if (!openDropdowns[key]) {
        newOpenDropdowns[key] = true;
      }

      setOpenDropdowns(newOpenDropdowns);
    };

    if (!activeVisibleFilters[filterKey]) return null;

    const isOpen = openDropdowns[filterKey];
    const currentValues = activeFilters[filterKey];
    const allValues = dropdownData[filterKey];
    const isAllSelected = currentValues.length === allValues.length;

    return (
      <div ref={dropdownRef} className="relative flex flex-col">
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
          <div className="absolute mt-1 border border-gray-200  dark:border-gray-400 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-50 w-48 max-h-80 overflow-y-auto top-full">
            <div className="p-3 no-scrollbar">
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
    <div className="p-2 sm:p-4 ">
      {/* Top Actions */}
      <div className="flex flex-row sm:flex-row justify-between gap-3 mt-2 mb-8 w-full  ">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#252C58] dark:text-gray-50 ">
          Employee List
        </h1>

        {/* Buttons */}
        <div className="flex gap-0 sm:gap-3">
          <div className="bg-[#8629DF] text-white text-[0.7rem] px-2 md:px-4  w-full rounded-sm flex justify-center items-center gap-1 py-1  ">
            <Link
              to="/info"
              className="flex items-center justify-center gap-1 text-[0.7rem]  md:text-[0.8rem]"
            >
              <AiOutlinePlus className="md:w-4 md:h-4 font-semibold" />
              Add Employee
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:flex  md:justify-around  gap-2 md:gap-2 w-full flex-wrap-reverse md:flex-nowrap">
        <div
          className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full md:w-[70%] xl:h-[35px] 
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
              className="absolute right-0 top-full mt-1 z-50 shadow-lg h-fit"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-48 p-4 overflow-y-auto border border-gray-200 dark:border-gray-400">
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

        <button className="bg-[#8629DF]  dark:border dark:border-gray-500 text-white cursor-pointer text-[0.7rem] md:text-[0.7rem] px-4 p-2 md:p-0 min-w-full md:min-w-[8.5rem] rounded-sm flex items-center justify-center gap-2">
          <CiImport className="md:w-4 md:h-4" />
          Bulk Export
        </button>

        <button className="bg-[#8629DF]  dark:border dark:border-gray-500 text-white cursor-pointer text-[0.7rem] md:text-[0.7rem] px-4 p-2  md:p-0 min-w-full md:min-w-[8.5rem] rounded-sm flex items-center justify-center gap-2">
          <CiExport className="md:w-4 md:h-4" />
          Bulk Import
        </button>
      </div>

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
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, values]) => {
            if (values.length === 0 || !activeVisibleFilters[key]) return null;
            return values.map((value, index) => (
              <div
                key={`${key}-${value}-${index}`}
                className="bg-gray-100 dark:bg-gray-800 dark:borde-gray-400 px-3 py-1 rounded-sm text-[0.7rem] flex items-center gap-2 border border-gray-200"
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

      {/* Employee Table */}
      <div className="rounded-sm mt-5 shadow drop-shadow-xs  border border-gray-200 dark:border-gray-600">
        <div className="overflow-x-auto no-scrollbar">
          <div
            className="text-[0.7rem] min-w-[1050px] lg:min-w-full sm:text-[0.8rem]  font-semibold text-white dark:text-gray-50 rounded-t-md  dark:border-gray-700 bg-[#8629DF] dark:bg-gray-900 py-1 px-4 min-h-[40px] "
            style={{
              display: "grid",
              gridTemplateColumns:
                " 60px 90px 1.5fr 1.5fr 1.5fr 1.2fr 1.6fr 100px",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <div>Profile</div>
            <div>ID</div>
            <div>Employee</div>
            <div className="flex items-center">
              Department
              <MdArrowDropDown className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <div className="flex items-center">
              Designation
              <MdArrowDropDown className="w-4 h-4 text-gray-400 ml-1" />
            </div>
            <div>DOJ</div>
            <div>Reporting manager</div>
            <div className="text-center">Action</div>
          </div>

          {/* Rows */}
          {filterData.map((emp, index) => (
            <div
              key={index}
              className="min-w-[1050px] lg:min-w-full  text-[0.7rem] sm:text-[0.7.2rem] py-2 px-3 border-b border-gray-100 dark:border-gray-700  dark:text-gray-400 hover:bg-gray-200/30 dark:hover:bg-gray-500/30 dark:bg-[#A1A1AA]/5 "
              style={{
                display: "grid",
                gridTemplateColumns:
                  " 60px 90px 1.5fr 1.5fr 1.5fr 1.2fr 1.6fr 100px ",
                gap: "6px",
                alignItems: "center",
              }}
            >
              {/* Profile (Image or Initials) */}
              {emp.profilePic ? (
                <img
                  src={emp.profilePic}
                  alt={emp.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white dark:text-gray-400 font-semibold`}
                  style={{
                    backgroundColor: emp.bgColor || "#9376CA",
                  }}
                >
                  {emp.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}

              <div className="font-semibold text-md">{emp.id}</div>
              <div className="font-semibold text-md">{emp.name}</div>
              <div>{emp.department}</div>
              <div>{emp.designation}</div>
              <div>{emp.doj}</div>
              <div>{emp.manager}</div>

              <div className="flex justify-center gap-4 ">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center cursor-pointer">
                      <Eye className="h-4 w-4 text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transform transition-transform duration-300 hover:scale-110 hover:shadow-xl" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>View Details</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center cursor-pointer">
                      <Pencil className="h-4 w-4 text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-400 transform transition-transform duration-300 hover:scale-120 hover:shadow-xl" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center cursor-pointer">
                      <Trash2 className="h-4 w-4 text-red-500 hover:text-gray-600 dark:text-red-500 dark:hover:text-gray-400 transform transition-transform duration-300 hover:scale-120 hover:shadow-xl" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="flex flex-col lg:flex-row justify-between items-center mt-6 mx-4 text-xs sm:text-sm 
  text-gray-600 dark:text-gray-400 gap-4"
        >
          {/* Pagination numbers */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center lg:justify-end">
            <button
              className="px-2 sm:px-3 py-1 border rounded 
      border-[#8629DF] dark:border-[#A970FF]
      hover:bg-[#8629DF] hover:text-white"
            >
              &lt; Back
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                className={`px-2 sm:px-3 py-1 border rounded transition
          ${
            num === 1
              ? "bg-[#8629DF] text-white border-[#8629DF]"
              : "border-[#8629DF] dark:border-[#A970FF] text-gray-700 dark:text-gray-300 hover:bg-[#8629DF] hover:text-white"
          }`}
              >
                {num}
              </button>
            ))}

            <span className="px-1 sm:px-2 text-gray-500 dark:text-gray-400">
              ...
            </span>

            <button
              className="px-2 sm:px-3 py-1 border rounded 
      border-[#8629DF] dark:border-[#A970FF]
      text-gray-700 dark:text-gray-300
      hover:bg-[#8629DF] hover:text-white"
            >
              25
            </button>

            <button
              className="px-2 sm:px-3 py-1 border rounded 
      border-[#8629DF] dark:border-[#A970FF]
      hover:bg-[#8629DF] hover:text-white"
            >
              Next &gt;
            </button>
          </div>

          {/* Results per page */}
          <div className="flex items-center gap-2 justify-center lg:justify-end">
            <p className="text-gray-800 dark:text-gray-400">Results per page</p>

            <InlineSelect
              value={limit}
              onChange={setLimit}
              options={[
                { label: "50", value: "50" },
                { label: "100", value: "100" },
                { label: "150", value: "150" },
              ]}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex justify-end w-full text-xs sm:text-sm mt-3 p-4
  text-gray-800 dark:text-gray-400"
        >
          1–50 of 125
        </div>
      </div>

      {/* Filter Dropdown */}
      {/* {open && (
        <div className="fixed inset-0 flex justify-end top-50 md:top-52 md:right-55 z-50 overflow-auto no-scrollbar ">
          <div
            ref={dropdownRef}
            className="bg-white rounded-xl shadow-xl w-auto   p-3 overflow-y-auto h-fit  border  no-scrollbar"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-3 w-full border-b-2">
              Filter
            </h2>

            <div className="space-y-2">
              {filterOptions.map((f) => (
                <label
                  key={f.key}
                  className="flex items-center gap-2 text-[0.7rem] text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#9376CA]"
                    checked={tempVisibleFilters[f.key]}
                    onChange={(e) =>
                      handleTempCheckboxChange(f.key, e.target.checked)
                    }
                  />
                  {f.label}
                </label>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center text-sm justify-center gap-1  cursor-pointer bg-gray-200 border px-3 py-1 rounded-md shadow text-gray-700 hover:bg-gray-300"
              >
                <LuRefreshCw /> Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex items-center justify-center gap-1 cursor-pointer bg-[#9376CA] text-white text-sm px-3 py-1 rounded-md shadow hover:bg-[#7a5fb8]"
              >
                <img src={SearchIcon} className="w-4 h-4" /> Apply
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EmployeList;
