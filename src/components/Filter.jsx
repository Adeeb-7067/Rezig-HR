// FilterComponent.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
import SearchIcon from "../Assets/Searchicon.png";

const FilterComponent = ({
  // Configuration props
  filterConfig = [],
  initialActiveFilters = {},
  initialVisibleFilters = {},
  dropdownData = {},
  
  // Callbacks
  onFilterChange,
  onFilterApply,
  onFilterReset,
  
  // UI customization
  placeholder = "Search here",
  applyButtonText = "Apply",
  resetButtonText = "Reset",
  filterButtonText = "Filter",
  showSearch = true,
  showActiveTags = true,
  
  // Style customization
  primaryColor = "#8629DF",
  textColor = "text-gray-700",
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  className = "",
}) => {
  // State management
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState(initialActiveFilters);
  const [activeVisibleFilters, setActiveVisibleFilters] = useState(initialVisibleFilters);
  
  // Temporary states for dropdown
  const [tempFilterValues, setTempFilterValues] = useState({});
  const [tempVisibleFilters, setTempVisibleFilters] = useState({});
  
  // Track open dropdowns
  const [openDropdowns, setOpenDropdowns] = useState({});
  
  // Refs
  const dropdownRef = useRef(null);
  const filterDropdownRefs = useRef({});

  // Initialize states from props
  useEffect(() => {
    setActiveFilters(initialActiveFilters);
    setActiveVisibleFilters(initialVisibleFilters);
  }, [initialActiveFilters, initialVisibleFilters]);

  // Initialize temp states when dropdown opens
  useEffect(() => {
    if (open) {
      setTempFilterValues({ ...activeFilters });
      setTempVisibleFilters({ ...activeVisibleFilters });
      setTempSearchQuery(searchQuery);
    }
  }, [open]);

  // Click outside handler for main dropdown
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

  // Handle temporary checkbox changes
  const handleTempCheckboxChange = useCallback((key, checked) => {
    setTempVisibleFilters((prev) => ({ ...prev, [key]: checked }));
    
    if (!checked) {
      setTempFilterValues((prev) => ({ ...prev, [key]: [] }));
    }
  }, []);

  // Apply filters from dropdown
  const handleApplyFilters = useCallback(() => {
    setActiveVisibleFilters({ ...tempVisibleFilters });
    setActiveFilters({ ...tempFilterValues });
    setSearchQuery(tempSearchQuery);
    
    // Notify parent component
    onFilterApply?.({
      filters: tempFilterValues,
      visibleFilters: tempVisibleFilters,
      searchQuery: tempSearchQuery,
    });
    
    // Apply filters immediately
    onFilterChange?.(tempFilterValues, tempSearchQuery);
    
    setOpen(false);
  }, [tempFilterValues, tempVisibleFilters, tempSearchQuery, onFilterApply, onFilterChange]);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    const resetFilterValues = {};
    const resetVisibleFilters = {};
    
    filterConfig.forEach(filter => {
      resetFilterValues[filter.key] = [];
      resetVisibleFilters[filter.key] = false;
    });
    
    setTempFilterValues(resetFilterValues);
    setTempVisibleFilters(resetVisibleFilters);
    setActiveFilters(resetFilterValues);
    setActiveVisibleFilters(resetVisibleFilters);
    setSearchQuery("");
    setTempSearchQuery("");
    
    // Notify parent component
    onFilterReset?.();
    onFilterChange?.(resetFilterValues, "");
  }, [filterConfig, onFilterReset, onFilterChange]);

  // Remove individual active filter
  const handleRemoveFilter = useCallback((key) => {
    const newFilters = { ...activeFilters, [key]: [] };
    const newVisibleFilters = { ...activeVisibleFilters, [key]: false };
    
    setActiveFilters(newFilters);
    setActiveVisibleFilters(newVisibleFilters);
    
    onFilterChange?.(newFilters, searchQuery);
  }, [activeFilters, activeVisibleFilters, searchQuery, onFilterChange]);

  // Remove specific filter value
  const handleRemoveFilterValue = useCallback((filterKey, value) => {
    const newFilterValues = {
      ...activeFilters,
      [filterKey]: activeFilters[filterKey].filter((item) => item !== value),
    };
    
    setActiveFilters(newFilterValues);
    onFilterChange?.(newFilterValues, searchQuery);
  }, [activeFilters, searchQuery, onFilterChange]);

  // Toggle dropdown open/close
  const toggleDropdown = useCallback((key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Close specific dropdown
  const closeDropdown = useCallback((key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  // Handle dropdown item selection (multi-select)
  const handleDropdownItemClick = useCallback((filterKey, item) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterKey] || [];
      
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
  }, []);

  // Handle select all for a filter
  const handleSelectAll = useCallback((filterKey) => {
    const allValues = dropdownData[filterKey] || [];
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: [...allValues],
    }));
  }, [dropdownData]);

  // Handle clear all for a filter
  const handleClearAll = useCallback((filterKey) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: [],
    }));
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFilterChange?.(activeFilters, value);
  }, [activeFilters, onFilterChange]);

  // Handle temp search input change
  const handleTempSearchChange = useCallback((e) => {
    setTempSearchQuery(e.target.value);
  }, []);

  // Dropdown Component with click outside functionality
  const FilterDropdown = React.memo(({ filterKey, label }) => {
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
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          // Check if click is on any of the other dropdown buttons
          const isClickOnOtherDropdownButton = Object.keys(
            filterDropdownRefs.current
          ).some((key) => {
            if (key === filterKey) return false;
            const otherButton = document.querySelector(
              `[data-filter-button="${key}"]`
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

    if (!activeVisibleFilters[filterKey]) return null;

    const isOpen = openDropdowns[filterKey];
    const currentValues = activeFilters[filterKey] || [];
    const allValues = dropdownData[filterKey] || [];
    const isAllSelected = currentValues.length === allValues.length;

    return (
      <div ref={dropdownRef} className="relative flex flex-col">
        <button
          data-filter-button={filterKey}
          onClick={() => toggleDropdown(filterKey)}
          className={`border ${borderColor} px-5 py-2 rounded-full w-fit text-[0.7rem] flex justify-between items-center gap-2 min-w-[140px] ${bgColor} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
          style={{ borderColor: primaryColor }}
        >
          <div className="flex flex-col items-start">
            <span className={`${textColor} text-[0.7rem] font-medium`}>
              {label}
            </span>
          </div>
          <span className="text-gray-500 mt-1">
            {isOpen ? (
              <IoMdArrowDropdown className="w-4 h-4" />
            ) : (
              <IoMdArrowDropup className="w-4 h-4" />
            )}
          </span>
        </button>

        {isOpen && (
          <div className="absolute mt-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-50 w-48 max-h-80 overflow-y-auto top-full">
            <div className="p-3 no-scrollbar">
              {/* Select All / Clear All */}
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() => isAllSelected ? handleClearAll(filterKey) : handleSelectAll(filterKey)}
                  className="text-sm font-medium"
                  style={{ color: primaryColor }}
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
                    className="flex items-center gap-3 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-50 cursor-pointer rounded"
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center border rounded ${
                        currentValues.includes(item)
                          ? "border-transparent"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: currentValues.includes(item) ? primaryColor : 'transparent',
                      }}
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
                    <span className="text-[0.7rem] font-semibold">
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
  });

  FilterDropdown.displayName = 'FilterDropdown';

  // Active Filter Tags Component
  const ActiveFilterTags = useMemo(() => {
    if (!showActiveTags) return null;

    const hasActiveFilters = Object.values(activeFilters).some(
      (values) => values && values.length > 0
    );

    if (!hasActiveFilters) return null;

    return (
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, values]) => {
            if (!values || values.length === 0 || !activeVisibleFilters[key]) return null;
            
            return values.map((value, index) => (
              <div
                key={`${key}-${value}-${index}`}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm text-[0.7rem] flex items-center gap-2 border border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-900 dark:text-gray-300 text-[0.7rem]">
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
          
          {Object.entries(activeVisibleFilters).some(([key, visible]) => 
            visible && activeFilters[key] && activeFilters[key].length > 0
          ) && (
            <button
              onClick={handleResetFilters}
              className="text-[0.7rem] text-red-500 hover:text-red-700 px-2 py-1 border border-red-200 rounded-sm"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    );
  }, [activeFilters, activeVisibleFilters, showActiveTags, handleRemoveFilterValue, handleResetFilters]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Search Input */}
        {showSearch && (
          <div className="flex-1">
            <div
              className={`flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border ${borderColor} dark:border-gray-500 dark:bg-gray-800 w-full h-[35px] focus-within:shadow-md transition-all`}
              style={{
                borderColor: searchQuery ? primaryColor : undefined,
              }}
            >
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-3 py-2 w-full text-xs md:text-[0.8rem] outline-none bg-transparent"
              />
              <IoMdSearch className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        )}

        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="text-white cursor-pointer text-xs md:text-[0.7rem] px-4 py-2 min-w-[100px] rounded-sm flex items-center justify-center gap-1"
            style={{ backgroundColor: primaryColor }}
          >
            <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
            {filterButtonText}{" "}
            {open ? (
              <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />
            ) : (
              <IoMdArrowDropup className="w-3 mt-0.5 h-3" />
            )}
          </button>

          {/* Filter Dropdown Modal */}
          {open && (
            <div className="fixed inset-0 z-50 flex items-start justify-center md:justify-end md:items-start md:top-20 md:right-4 mt-16 md:mt-0">
              <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
              <div
                ref={dropdownRef}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm md:max-w-md mx-4 md:mx-0 p-4 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 pb-2 border-b">
                  Filters
                </h2>

                {/* Search inside filter dropdown */}
                <div className="mb-4">
                  <div className="flex gap-2 rounded-sm px-3 items-center border border-gray-300 dark:border-gray-600 w-full h-[35px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={tempSearchQuery}
                      onChange={handleTempSearchChange}
                      className="px-3 py-2 w-full text-sm outline-none bg-transparent"
                    />
                    <IoMdSearch className="w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {/* Filter Options */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                  {filterConfig.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          style={{ accentColor: primaryColor }}
                          checked={tempVisibleFilters[filter.key] || false}
                          onChange={(e) =>
                            handleTempCheckboxChange(filter.key, e.target.checked)
                          }
                        />
                        {filter.label}
                      </label>
                      
                      {/* Show selected values preview */}
                      {tempVisibleFilters[filter.key] && tempFilterValues[filter.key]?.length > 0 && (
                        <div className="ml-6 text-xs text-gray-500">
                          Selected: {tempFilterValues[filter.key].length} item(s)
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center justify-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm flex-1"
                  >
                    <LuRefreshCw className="w-4 h-4" />
                    {resetButtonText}
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex items-center justify-center gap-1 cursor-pointer text-white px-3 py-2 rounded-md shadow hover:opacity-90 text-sm flex-1"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <img src={SearchIcon} className="w-4 h-4" alt="apply" />
                    {applyButtonText}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Dropdowns */}
      <div className="flex gap-3 flex-wrap">
        {filterConfig.map((filter) => (
          <FilterDropdown
            key={filter.key}
            filterKey={filter.key}
            label={filter.label}
          />
        ))}
      </div>

      {/* Active Filter Tags */}
      {ActiveFilterTags}
    </div>
  );
};

FilterComponent.defaultProps = {
  filterConfig: [
    { key: "unitName", label: "Unit Name" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location - Unit" },
    { key: "designation", label: "Designation" },
    { key: "grade", label: "Grade" },
    { key: "level", label: "Level" },
  ],
  initialActiveFilters: {
    unitName: [],
    department: [],
    location: [],
    designation: [],
    grade: [],
    level: [],
  },
  initialVisibleFilters: {
    unitName: false,
    department: false,
    location: false,
    designation: false,
    grade: false,
    level: false,
  },
  dropdownData: {
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
  },
};

export default FilterComponent;