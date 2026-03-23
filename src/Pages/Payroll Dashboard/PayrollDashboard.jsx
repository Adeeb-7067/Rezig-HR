import SelectField from "@/components/SelectFeild";
import React, { useState, useEffect, useRef } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from "react-icons/io";

import Clock from "../../Assets/Clock.png";
import Users from "../../Assets/user.png";
import Wallet from "../../Assets/wallet.png";
import HandCoins from "../../Assets/handcoins.png";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaPlay,
} from "react-icons/fa";
import { SlReload } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { BiSolidMessageEdit } from "react-icons/bi";
import { BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { MdRemove } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import DrawerIcon1 from "/DrawerIcons.png";
import DrawerIcon2 from "/DrawerIcons(1).png";
import DrawerIcon3 from "/DrawerIcons(2).png";
import DrawerIcon4 from "/DrawerIcons(3).png";
import DrawerIcon5 from "/DrawerIcons(4).png";
import DrawerIcon6 from "/DrawerIcons(5).png";
import DrawerIcon7 from "/DrawerIcons(6).png";
import DrawerIcon8 from "/DrawerIcons(7).png";

const StatCard = ({ title, value, icon: Icon, borderColor, iconBg, color }) => {
  return (
    <div
      className="relative flex items-center justify-between gap-2 sm:gap-3
      bg-white dark:bg-gray-800 border-l-3 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 w-full min-w-0
      p-3"
      style={{ borderLeftColor: borderColor }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[4px] rounded-l-lg flex-shrink-0"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 pl-1">
        <span className="text-lg sm:text-[1.2rem] md:text-[1.3rem] font-semibold text-[#7B2CBF] dark:text-purple-400 leading-none truncate">
          {value}
        </span>
        <span className="text-[0.65rem] sm:text-[0.7rem] text-gray-500 dark:text-gray-400 mt-1 truncate font-bold">
          {title}
        </span>
      </div>

      {/* Right Icon Section */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          {typeof Icon === "string" ? (
            <img src={Icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <Icon size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
          )}
        </div>
        {/* <div className="p-1 sm:p-1.5 rounded-sm bg-purple-100 dark:bg-purple-900/30">
          <FiDownload
            size={14}     
            className="sm:w-4 sm:h-4 text-[#7B2CBF] dark:text-purple-400 cursor-pointer hover:scale-110 transition"
          />
        </div> */}
      </div>
    </div>
  );
};

const PayrollDashboard = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const filterDropdownRefs = useRef({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showVarianceUI, setShowVarianceUI] = useState(false);
  const [activeTab, setActiveTab] = useState("employee");
  const [remarks, setRemarks] = useState("");

  const [showCards, setShowCards] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [reportSelected, setReportSelected] = useState([]);

  const reportItems = [
    { id: 1, name: "Monthly Register", lastGen: "12 Jan 4:22 PM", icon: "🗓️" },
    { id: 2, name: "PF Report", lastGen: "12 Jan 4:22 PM", icon: "👤" },
    { id: 3, name: "ESI Report", lastGen: "12 Jan 4:22 PM", icon: "🛡️" },
    { id: 4, name: "Income Tax Report", lastGen: "12 Jan 4:22 PM", icon: "📄" },
    { id: 5, name: "Bank File", lastGen: "12 Jan 4:22 PM", icon: "🏦" },
    { id: 6, name: "LWP Report", lastGen: "12 Jan 4:22 PM", icon: "🕐" },
    { id: 7, name: "PT Report", lastGen: null, icon: "🔍" },
    {
      id: 8,
      name: "Salary Variance Report",
      lastGen: "12 Jan 4:22 PM",
      icon: "📊",
    },
  ];

  const toggleCards = () => {
    setShowCards(!showCards);
  };
  const tabs = [
    { label: "Employee Variance", value: "employee" },
    { label: "Salary Variance", value: "salary" },
    { label: "Statutory Summary", value: "statutory" },
  ];

  // Active filters that are currently applied
  const [activeFilters, setActiveFilters] = useState({
    employeeName: [],
    department: [],
    location: [],
    designation: [],
    payGroup: [],
    employeeStatus: [],
  });

  // Which filters are visible in the UI (checkboxes)
  const [activeVisibleFilters, setActiveVisibleFilters] = useState({
    employeeName: false,
    department: false,
    location: false,
    designation: false,
    payGroup: false,
    employeeStatus: false,
  });

  // Temporary states for the dropdown (not applied yet)
  const [tempVisibleFilters, setTempVisibleFilters] = useState({
    employeeName: false,
    department: false,
    location: false,
    designation: false,
    payGroup: false,
    employeeStatus: false,
  });

  const [tempFilterValues, setTempFilterValues] = useState({
    employeeName: [],
    department: [],
    location: [],
    designation: [],
    payGroup: [],
    employeeStatus: [],
  });

  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState({
    employeeName: false,
    department: false,
    location: false,
    designation: false,
    payGroup: false,
    employeeStatus: false,
  });

  const isAnyFilterChecked = Object.values(tempVisibleFilters).some(Boolean);

  const filterOptions = [
    { key: "employeeName", label: "Employee Name" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
    { key: "designation", label: "Designation" },
    { key: "payGroup", label: "Pay Group" },
    { key: "employeeStatus", label: "Employee Status" },
  ];

  const dropdownData = {
    employeeName: [
      "John Doe",
      "Jane Smith",
      "Mike Johnson",
      "Sarah Williams",
      "David Brown",
    ],
    department: ["HR", "Finance", "IT", "Sales", "Marketing", "Operations"],
    location: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Miami",
      "Seattle",
    ],
    designation: [
      "Software Engineer",
      "Senior Manager",
      "HR Specialist",
      "Financial Analyst",
      "Sales Representative",
      "Product Manager",
    ],
    payGroup: ["Monthly", "Bi-Weekly", "Weekly", "Hourly"],
    employeeStatus: ["Active", "On Leave", "Terminated", "Probation"],
  };

  const varianceCards = [
    {
      title: "Total Processed",
      nov: "1,000",
      dec: "1,200",
      difference: "+200",
      percentage: "+20.0%",
      positive: true,
    },
    {
      title: "New Joiners",
      nov: "45",
      dec: "60",
      difference: "+15",
      percentage: "+33.3%",
      positive: true,
    },
    {
      title: "Resignations",
      nov: "30",
      dec: "22",
      difference: "-8",
      percentage: "-26.6%",
      positive: false,
    },
    {
      title: "Attendance ",
      nov: "120",
      dec: "150",
      difference: "+30",
      percentage: "+25.0%",
      positive: false,
    },
    {
      title: "Total CTC ",
      nov: "950",
      dec: "1,020",
      difference: "+70",
      percentage: "+7.3%",
      positive: true,
    },
    {
      title: "Overtime Cost",
      nov: "80",
      dec: "65",
      difference: "-15",
      percentage: "-18.7%",
      positive: true,
    },
    {
      title: "Bonus Payout",
      nov: "150",
      dec: "200",
      difference: "+50",
      percentage: "+33.3%",
      positive: true,
    },
    {
      title: "PF Contribution",
      nov: "90",
      dec: "95",
      difference: "+5",
      percentage: "+5.5%",
      positive: true,
    },
    {
      title: "ESIContribution",
      nov: "40",
      dec: "38",
      difference: "-2",
      percentage: "-5.0%",
      positive: false,
    },
    {
      title: "Salary Hold",
      nov: "12",
      dec: "18",
      difference: "+6",
      percentage: "+50.0%",
      positive: false,
    },
    {
      title: "Net Pay ",
      nov: "820",
      dec: "890",
      difference: "+70",
      percentage: "+8.5%",
      positive: true,
    },
    {
      title: "Reimbursements",
      nov: "25",
      dec: "32",
      difference: "+7",
      percentage: "+28.0%",
      positive: true,
    },
  ];

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
      employeeName: [],
      department: [],
      location: [],
      designation: [],
      payGroup: [],
      employeeStatus: [],
    };

    const resetVisible = {
      employeeName: false,
      department: false,
      location: false,
      designation: false,
      payGroup: false,
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
        employeeName: false,
        department: false,
        location: false,
        designation: false,
        payGroup: false,
        employeeStatus: false,
      };
      newState[key] = !prev[key];
      return newState;
    });
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
        filterDropdownRefs.current
      ).some((ref) => ref.current && ref.current.contains(event.target));

      const isClickOnDropdownButton = event.target.closest(
        "[data-filter-button]"
      );

      if (!isClickInsideDropdown && !isClickOnDropdownButton) {
        setOpenDropdowns({
          employeeName: false,
          department: false,
          location: false,
          designation: false,
          payGroup: false,
          employeeStatus: false,
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generateLast12Months = () => {
    const months = [];
    const now = new Date();

    for (let i = 0; i < 24; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      const label = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      months.push({
        label,
        value: label,
      });
    }

    return months;
  };

  const monthOptions = generateLast12Months();

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
          className="border border-gray-300 dark:border-gray-500 px-5 py-2 rounded-full w-fit text-[0.7rem] flex justify-between items-center gap-2 min-w-[140px] bg-white dark:bg-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
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
              <div className="space-y-1 max-h-58 overflow-y-auto pr-1 no-scrollbar">
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
    <div className="w-full min-w-0 max-w-full min-h-screen overflow-x-hidden p-3 sm:p-4 md:p-0">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-2 mb-6 sm:mb-8 w-full">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-[#252C58] dark:text-gray-50 truncate">
            Payroll Dashboard
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-fit sm:min-w-[18rem] items-stretch sm:items-center gap-2">
          <span className="text-lg text-gray-500 sm:text-base font-semibold shrink-0">
            Payroll Cycle :
          </span>
          <SelectField
            className="w-full sm:w-fit min-w-0 border-2 border-[#8629DF]"
            options={monthOptions}
            unSelectLabel={`${new Date().toLocaleString("default", {
              month: "short",
            })}-${new Date().getFullYear()}`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 p-2 sm:p-3">
        <div
          className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full min-w-0 sm:max-w-[400px] md:flex-1 md:max-w-none xl:h-[36px] 
               focus-within:border-[#9853F9] focus-within:border-2 focus-within:shadow-md transition-all"
        >
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-full text-xs md:text-[0.8rem] outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-50"
          />
          <IoMdSearch className="w-5 h-5 text-gray-500 shrink-0" />
        </div>

        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[0.7rem] px-4 py-2 md:py-1.5 min-w-[80px] md:min-w-[5rem] rounded-sm flex items-center justify-center gap-1 h-[36px] w-full sm:w-auto"
          >
            <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
            Filter
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
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-3 border-b-2 pb-2">
                  Filter
                </h2>

                <div className="space-y-1 h-fit max-h-42 overflow-y-auto pr-2 no-scrollbar">
                  {filterOptions.map((f) => (
                    <label
                      key={f.key}
                      className="flex items-center gap-2 text-[0.7rem] text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
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
                    className="flex-1 flex items-center justify-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-200 border px-3 py-2 rounded-md text-gray-700 hover:bg-gray-300 text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    disabled={!isAnyFilterChecked}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm transition-all duration-200
               ${
                 isAnyFilterChecked
                   ? "bg-[#8629DF] hover:bg-[#8629DF]/20 text-white cursor-pointer"
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
      </div>

      {/* Filter Chips Row */}
      <div className="flex gap-2 sm:gap-3 flex-wrap my-2">
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

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <StatCard
            title="Total Headcount"
            value="1,000"
            icon={Users}
            iconBg="#E9F3FF"
            borderColor="#0088FF"
          />

          <StatCard
            title="Attendance Process"
            value="900"
            icon={Clock}
            iconBg="#EBF9EE"
            borderColor="#34C759"
          />

          <StatCard
            title="Total CTC"
            value="1,000"
            icon={Wallet}
            iconBg="#FAEAFC"
            borderColor="#CB30E0"
          />

          <StatCard
            title="Total Hold"
            value="1,000"
            icon={HandCoins}
            iconBg="#FFF4EA"
            borderColor="#FF8D28"
          />

          {/* Run Payroll Button */}
          <button
            onClick={() => setShowVarianceUI(!showVarianceUI)}
            className="flex items-center justify-center gap-2 
                 bg-[#8629DF] dark:bg-[#8629DF] cursor-pointer
                 text-white font-bold w-full sm:min-w-fit h-fit p-3 sm:mt-3
                 px-4 rounded-sm shadow-md text-[0.7rem]
                 hover:opacity-90 transition col-span-1 sm:col-span-2 lg:col-span-1"
          >
          {showVarianceUI ?  <SlReload size={18} /> : <FaPlay size={18} />}
            {showVarianceUI ? "Re-Run Payroll" : "Run Payroll"}
          </button>
        </div>
      </div>
      {showVarianceUI && (
        <div className="mt-6 sm:mt-8">
          {/* ===== TOP STATS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700 overflow-hidden">
            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BsFillPeopleFill className="text-purple-600" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Processed</p>
                <p className="text-[1.1rem] font-bold text-gray-800 leading-tight">
                  128{" "}
                  <span className="text-[0.65rem] font-normal text-gray-400">
                    Employee
                  </span>
                </p>
              </div>
              <hr className="my-3" />
            </div>

            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HiOutlineCurrencyRupee className="text-purple-600" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Gross Pay</p>
                <p className="text-[1.1rem] font-bold text-gray-800 leading-tight">
                  ₹84,50,000
                </p>
              </div>
              <hr className=" my-3" />
            </div>

            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MdRemove className="text-purple-600" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Deduction</p>
                <p className="text-[1.1rem] font-bold text-gray-800 leading-tight">
                  ₹18,75,000
                </p>
              </div>
              <hr className=" my-3 " />
            </div>

            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <IoCheckmark className="text-purple-600" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Net Pay</p>
                <p className="text-[1.1rem] font-bold text-gray-800 leading-tight">
                  ₹65,75,000
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 rounded-md flex flex-col lg:flex-row items-stretch">
            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-1 min-w-0 transition-all duration-300 order-2 lg:order-1">
              {/* ===== PAYROLL VARIANCE HEADER ===== */}
              <div
                className="flex justify-between items-center cursor-pointer bg-[#8629DF] rounded-tl-sm lg:rounded-tr-none mt-5 lg:mt-0"
                onClick={toggleCards}
              >
                <h1 className="text-white font-semibold text-base px-4 py-2.5">
                  Payroll Variance
                </h1>
                <button className="flex items-center justify-center m-1.5 px-1 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded-sm cursor-pointer transition-all duration-300">
                  <span
                    className={`transition-transform duration-300 ${showCards ? "" : "rotate-180"}`}
                  >
                    <MdOutlineKeyboardArrowDown
                      size={20}
                      className="text-white"
                    />
                  </span>
                </button>
              </div>

              {/* ===== VARIANCE CARDS ===== */}
              {showCards && (
                <div className="bg-white rounded-b-md pb-4 pt-2">
                  {/* Tabs — matching Figma: underline style, "Employee Variance" active with purple underline */}
                  <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                          activeTab === tab.value
                            ? "text-[#8629DF] border-b-2 border-[#8629DF] -mb-[2px]"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Cards grid — 2 cols on mobile, 3 on md when drawer closed, adjusts when open */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 px-1">
                    {varianceCards.map((card, index) => (
                      <div
                        key={index}
                        className={`rounded-md w-full p-3 border bg-white ${
                          card.positive ? "border-green-400" : "border-red-400"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[0.8rem] font-bold text-[#8629DF] leading-tight">
                            {card.title}
                          </span>
                          <span
                            className={`text-[0.65rem] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ml-1 ${
                              card.positive
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {card.positive ? "+2.0%" : "-2.0%"}
                          </span>
                        </div>

                        <div className="text-[0.72rem] text-gray-600 space-y-1.5">
                          <div className="flex justify-between">
                            <span>Nov 2025</span>
                            <span className="font-medium">{card.nov}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dec 2025</span>
                            <span className="font-medium">{card.dec}</span>
                          </div>
                          <hr className="border-gray-100" />
                          <div className="flex justify-between font-semibold pt-0.5">
                            <span className="text-gray-700">Difference :</span>
                            <span
                              className={`flex items-center gap-0.5 ${card.positive ? "text-green-600" : "text-red-500"}`}
                            >
                              {card.positive ? (
                                <FaArrowUp size={9} />
                              ) : (
                                <FaArrowDown size={9} />
                              )}
                              {card.difference}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download button — right aligned */}
                  <div className="flex justify-end mt-5 px-1">
                    <button className="bg-[#8629DF] hover:bg-purple-700 text-white text-xs font-medium py-1.5 px-5 rounded-sm cursor-pointer transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* ===== REMARKS ===== */}
              <div className="mt-3 bg-white rounded-md">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                  <BiSolidMessageEdit className="text-[#8629DF] h-5 w-5" />
                  <span className="text-sm font-semibold text-gray-800">
                    Remarks
                  </span>
                </div>

                <div className="px-4 pt-1 pb-2">
                  <p className="text-[0.7rem] text-gray-400 py-2">
                    Add remarks for payroll processing or approval reference.
                  </p>
                  <div className="relative">
                    <textarea
                      maxLength={300}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Example: Attendance finalized, PF updated, 3 employees on hold"
                      className="w-full h-24 resize-none border border-gray-200 rounded-md p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#8629DF] placeholder:text-gray-300"
                    />
                    <span className="absolute bottom-2 right-3 text-[10px] text-gray-300">
                      {remarks.length}/30
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 mt-3">
                    <button className="px-4 py-1.5 text-xs border border-[#8629DF] text-[#8629DF] rounded-md hover:bg-purple-50 cursor-pointer transition-colors">
                      Mark as Completed
                    </button>
                    <button className="px-4 py-1.5 text-xs bg-[#8629DF] text-white rounded-md hover:bg-purple-700 cursor-pointer transition-colors">
                      Send for Approval
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT DRAWER SYSTEM ================= */}
            <div className="flex flex-col lg:flex-row flex-shrink-0 lg:h-full self-stretch order-1 lg:order-2">
              {/* REPORT DRAWER — slides open, pushes main content; on mobile full width when open */}
              <div
                style={{
                  width: showDrawer ? "220px" : "0px",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  flexShrink: 0,
                  maxWidth: "100%",
                }}
                className="bg-white dark:bg-gray-800 rounded-xs mx-0 lg:mx-2 border border-gray-200 dark:border-gray-700 lg:border-0"
              >
                <div style={{ width: "220px" }}>
                  <div className="flex bg-[#F7F2FD] p-1.5 py-2 mb-3  h-9">
                    <FaArrowRight
                      className="w-6 h-6 shadow-[#8629DF] rounded-full text-white bg-[#8629DF] p-1 cursor-pointer "
                      onClick={() => setShowDrawer((p) => !p)}
                    />
                  </div>
                  {/* Drawer Header */}
                  <div className="flex justify-between items-center px-3 py-1.5 bg-[#8629DF] rounded-t-sm">
                    <span className="text-white font-semibold text-sm">
                      Report
                    </span>
                    <button className="text-white/80 hover:text-white">
                      <MdOutlineKeyboardArrowDown
                        size={18}
                        className="bg-white text-gray-400 rounded-xs"
                      />
                    </button>
                  </div>

                  {/* Select All Row */}
                  <div className="flex justify-between items-center px-3 py-1.5 my-3 border-b border-gray-100 ">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 accent-[#8629DF]"
                        checked={reportSelected.length === reportItems.length}
                        onChange={() =>
                          setReportSelected(
                            reportSelected.length === reportItems.length
                              ? []
                              : reportItems.map((r) => r.id)
                          )
                        }
                      />
                      <span className="text-[12px] font-medium text-gray-700">
                        Select All
                      </span>
                    </label>
                    <button className="flex items-center gap-1 bg-[#8629DF] text-white text-[10px] px-2 py-1 rounded-sm hover:bg-purple-700 cursor-pointer">
                      <FiDownload size={10} />
                      Download
                    </button>
                  </div>

                  {/* Report Items */}
                  <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 130px)" }}
                  >
                    {reportItems.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center gap-2 px-1 py-2.5 border-2 border-gray-50 hover:bg-gray-50 drop-shadow-xs rounded-sm  transition-colors"
                      >
                        {/* Icon */}
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 bg-purple-50">
                          <span className="text-[15px]">{r.icon}</span>
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-gray-800 leading-tight truncate">
                            {r.name}
                          </p>
                          <p className="text-[9.5px] text-gray-400 mt-0.5 truncate">
                            {r.lastGen
                              ? `Last Generated : ${r.lastGen}`
                              : "Not generated yet."}
                          </p>
                        </div>

                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 accent-[#8629DF] flex-shrink-0"
                          checked={reportSelected.includes(r.id)}
                          onChange={() =>
                            setReportSelected((prev) =>
                              prev.includes(r.id)
                                ? prev.filter((x) => x !== r.id)
                                : [...prev, r.id]
                            )
                          }
                        />

                        {/* Download */}
                        <button className="w-5.5 h-5.5 rounded-xs bg-[#8629DF] flex items-center justify-center flex-shrink-0 hover:bg-purple-700 cursor-pointer">
                          <FiDownload size={10} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ICON SIDEBAR */}
              <div
                className="flex flex-col items-center gap-4 py-4 space-y-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-r-sm lg:border-l-0"
                style={{
                  width: showDrawer ? "0px" : "60px",
                  transition: "width 0.3s ease",
                  overflow: "hidden",
                  flexShrink: 0,
                  height: "100%",
                }}
              >
                {/* Toggle arrow button — purple, top */}
                <button
                  onClick={() => setShowDrawer((p) => !p)}
                  className="w-10 h-10 gap-4 rounded-full bg-[#8629DF] flex items-center justify-center text-white hover:bg-purple-700 mb-4 cursor-pointer transition-colors shadow-md"
                >
                  {showDrawer ? (
                    <FaArrowRight className="w-3 h-3 text-white" />
                  ) : (
                    <FaArrowLeft className="w-4 h-4 text-white" />
                  )}
                </button>

                {[
                  /* Calendar / Monthly Register */
                  <img src={DrawerIcon1} alt="calander" className="w-5 h-5" />,
                  <img src={DrawerIcon2} alt="money" className="w-5 h-5" />,
                  <img src={DrawerIcon3} alt="document" className="w-5 h-5" />,
                  <img src={DrawerIcon4} alt="settings" className="w-5 h-5" />,
                  <img src={DrawerIcon5} alt="help" className="w-5 h-5" />,
                  <img
                    src={DrawerIcon6}
                    alt="notification"
                    className="w-5 h-5"
                  />,
                  <img src={DrawerIcon7} alt="profile" className="w-5 h-5" />,
                ].map((icon, i) => (
                  <button
                    key={i}
                    onClick={() => setShowDrawer(true)}
                    className="w-10 h-10 p-2 rounded-lg flex items-center justify-center border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all cursor-pointer"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollDashboard;
