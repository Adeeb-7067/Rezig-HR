// LoanAssignment.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";

import LoanAssignmentDetail from "./loanAssigmentDetails";

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
          className={`transition-transform ${open ? "rotate-180 text-[#9853F9]" : "text-gray-400"
            }`}
        />
      </button>

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
                ${value === opt.value
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

const LoanAssignment = () => {
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

  const [activeVisibleFilters, setActiveVisibleFilters] = useState({
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
  });

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

  const [openDropdowns, setOpenDropdowns] = useState({
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutsideSearch(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideSearch);
  }, []);

  // Sample data grouped by employee name (matching your screenshot)
  const loanAssignments = [
    {
      id: 1,
      employeeName: "Amit Sharma",
      department: "Senior Developer",
      location: "Delhi",
      assignments: [
        {
          id: 101,
          loanType: "Home Loan",
          amount: "25,00,000",
          date: "15 Mar 2024",
          status: "Active",
        },
        {
          id: 102,
          loanType: "Car Loan",
          amount: "8,00,000",
          date: "10 Jan 2024",
          status: "Active",
        },
      ],
    },
    {
      id: 2,
      employeeName: "Amit Sharma",
      department: "HR Department",
      location: "Delhi",
      assignments: [
        {
          id: 103,
          loanType: "Personal Loan",
          amount: "3,00,000",
          date: "20 Feb 2024",
          status: "Pending",
        },
      ],
    },
    {
      id: 3,
      employeeName: "Amit Pandey",
      department: "HR Department",
      location: "Delhi",
      assignments: [
        {
          id: 104,
          loanType: "Education Loan",
          amount: "12,00,000",
          date: "05 Mar 2024",
          status: "Active",
        },
      ],
    },
    {
      id: 4,
      employeeName: "Amit Paul",
      department: "HR Department",
      location: "Delhi",
      assignments: [
        {
          id: 105,
          loanType: "Home Loan",
          amount: "35,00,000",
          date: "12 Dec 2023",
          status: "Active",
        },
      ],
    },
    {
      id: 5,
      employeeName: "Amit Shah",
      department: "HR Department",
      location: "Delhi",
      assignments: [
        {
          id: 106,
          loanType: "Personal Loan",
          amount: "2,50,000",
          date: "28 Feb 2024",
          status: "Completed",
        },
      ],
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

  const handleTempCheckboxChange = (key, checked) => {
    setTempVisibleFilters((prev) => ({ ...prev, [key]: checked }));
    if (!checked) {
      setTempFilterValues((prev) => ({ ...prev, [key]: [] }));
    }
  };

  const handleApplyFilters = () => {
    setActiveVisibleFilters({ ...tempVisibleFilters });
    setActiveFilters({ ...tempFilterValues });
    setOpen(false);
  };

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

  const handleRemoveFilter = (key) => {
    setActiveFilters((prev) => ({ ...prev, [key]: [] }));
    setActiveVisibleFilters((prev) => ({ ...prev, [key]: false }));
  };

  const handleRemoveFilterValue = (filterKey, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey].filter((item) => item !== value),
    }));
  };

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

  const closeDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const isAnyFilterChecked = Object.values(tempVisibleFilters).some(Boolean);

  const handleDropdownItemClick = (filterKey, item) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterKey];
      if (currentValues.includes(item)) {
        return {
          ...prev,
          [filterKey]: currentValues.filter((i) => i !== item),
        };
      } else {
        return {
          ...prev,
          [filterKey]: [...currentValues, item],
        };
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

  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(id)) {
        return prev.filter((empId) => empId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllEmployees = () => {
    if (selectedEmployees.length === filteredData.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredData.map((item) => item.id));
    }
  };

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

  useEffect(() => {
    if (open) {
      setTempFilterValues({ ...activeFilters });
      setTempVisibleFilters({ ...activeVisibleFilters });
    }
  }, [open]);

  const filteredData = loanAssignments.filter((item) => {
    const matchesSearch = item.employeeName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilters = Object.entries(activeFilters).every(
      ([key, values]) => {
        if (values.length === 0) return true;

        if (key === "department") {
          return values.some((value) =>
            item.department.toLowerCase().includes(value.toLowerCase()),
          );
        }

        if (key === "location") {
          return values.some((value) =>
            item.location.toLowerCase().includes(value.toLowerCase()),
          );
        }

        return true;
      },
    );

    return matchesSearch && matchesFilters;
  });

  const DropdownComponent = ({ filterKey, label }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
      filterDropdownRefs.current[filterKey] = dropdownRef;
      return () => {
        delete filterDropdownRefs.current[filterKey];
      };
    }, [filterKey]);

    useEffect(() => {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
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

    const handleToggleDropdown = (key) => {
      const newOpenDropdowns = {
        unitName: false,
        department: false,
        location: false,
        designation: false,
        grade: false,
        level: false,
      };

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
          <div className="absolute mt-1 border border-gray-200 dark:border-gray-400 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-[100] w-48 max-h-80 overflow-y-auto top-full no-scrollbar">
            <div className="p-3">
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
    <>
      {selectedEmployee && (
        <LoanAssignmentDetail
          employee={selectedEmployee}
          onBack={() => {
            setSelectedEmployee(null);
            setSearchQuery("");
          }}
        />
      )}
      {!selectedEmployee && (
        <div className="p-3 min-h-screen sm:p-4 md:p-5 w-full min-w-0 max-w-full overflow-x-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-2 mb-6 sm:mb-8 w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#252C58] dark:text-gray-50 truncate">
              Loan Assigment
            </h1>
            <div className="flex gap-2 sm:gap-3 shrink-0">
              <div className="bg-[#8629DF] text-white text-[0.7rem] px-3 sm:px-4 rounded-sm flex justify-center items-center gap-1 py-2 sm:py-1.5 min-w-[120px] sm:min-w-0">
                <Link
                  to="/addLoan"
                  className="flex items-center justify-center gap-1 text-[0.7rem] sm:text-[0.8rem]"
                >
                  <AiOutlinePlus className="w-4 h-4 font-semibold shrink-0" />
                  Add Loan
                </Link>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="grid grid-cols-2 md:flex gap-2 w-full">
            <div ref={searchRef} className="relative w-full md:w-[90%]">
              <div
                className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full xl:h-[44px] 
    focus-within:border-[#9853F9] focus-within:border-2 focus-within:shadow-md transition-all"
              >
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

              {showSearchDropdown && filteredData.length > 0 && (
                <div className="absolute z-50 top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-sm shadow-lg">
                  {filteredData.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchQuery(item.employeeName);
                        setShowSearchDropdown(false);
                        setSelectedEmployee(item);
                      }}
                      className="px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.employeeName}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {" "}
                        • {item.department} • {item.location}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[1.2rem] px-4 py-2 md:py-1.5 min-w-[80px] md:min-w-[5rem] rounded-sm flex items-center justify-center gap-1 h-[36px] md:h-[44px] w-full sm:w-auto"
              >
                <HiAdjustmentsHorizontal className="md:w-6 md:h-6" />
                Filter{" "}
                {open ? (
                  <IoMdArrowDropup className="w-3 mt-0.5 h-3" />
                ) : (
                  <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />
                )}
              </button>

              {open && (
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

            {/* <button className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-[0.7rem] md:text-[0.7rem] px-4 p-2 md:p-0 min-w-full md:min-w-[8.5rem] rounded-sm flex items-center justify-center gap-2">
          <CiImport className="md:w-4 md:h-4" />
          Bulk Export
        </button>

        <button className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-[0.7rem] md:text-[0.7rem] px-4 p-2 md:p-0 min-w-full md:min-w-[8.5rem] rounded-sm flex items-center justify-center gap-2">
          <CiExport className="md:w-4 md:h-4" />
          Bulk Import
        </button> */}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-2 sm:gap-3 flex-wrap my-4">
            {filterOptions.map((filter) => (
              <DropdownComponent
                key={filter.key}
                filterKey={filter.key}
                label={filter.label}
              />
            ))}
          </div>

          {/* Active Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, values]) => {
              if (values.length === 0 || !activeVisibleFilters[key])
                return null;
              return values.map((value, index) => (
                <div
                  key={`${key}-${value}-${index}`}
                  className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm text-[0.7rem] flex items-center gap-2 border border-gray-200 dark:border-gray-600"
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
      )}
    </>
  );
};

export default LoanAssignment;
