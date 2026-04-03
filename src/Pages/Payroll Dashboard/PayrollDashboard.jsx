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
      bg-white dark:bg-gray-800 border-l-3 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 w-full min-w-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer 
      p-3"
      style={{ borderLeftColor: borderColor }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[4px] rounded-l-lg flex-shrink-0"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 pl-1">
        <span className="text-lg sm:text-[1.2rem] md:text-[1.3rem] font-semibold text-ds-primary leading-none truncate">
          {value}
        </span>
        <span className="text-[0.65rem] sm:text-[0.7rem] text-gray-500 dark:text-gray-400 mt-1 truncate font-bold">
          {title}
        </span>
      </div>

      {/* Right Icon Section */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mr-8"
          style={{ backgroundColor: iconBg }}
        >
          {typeof Icon === "string" ? (
            <img src={Icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <Icon size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
          )}
        </div>
        <div className="p-1 sm:p-1.5 rounded-bl-sm bg-purple-100 dark:bg-ds-primary/30 absolute top-0 right-0">
          <FiDownload
            size={14}
            className="sm:w-4 sm:h-4 text-[#7B2CBF] dark:text-ds-primary cursor-pointer hover:scale-110 transition"
          />
        </div>
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
  const [isTabAnimating, setIsTabAnimating] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [showCards, setShowCards] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [reportSelected, setReportSelected] = useState([]);

  const reportItems = [
    { id: 1, name: "Monthly Register", lastGen: "12 Jan 4:22 PM", icon: DrawerIcon1 },
    { id: 2, name: "PF Report", lastGen: "12 Jan 4:22 PM", icon: DrawerIcon2 },
    { id: 3, name: "ESI Report", lastGen: "12 Jan 4:22 PM", icon: DrawerIcon3 },
    { id: 4, name: "Income Tax Report", lastGen: "12 Jan 4:22 PM", icon: DrawerIcon4 },
    { id: 5, name: "Bank File", lastGen: "12 Jan 4:22 PM", icon: DrawerIcon5 },
    { id: 6, name: "LWP Report", lastGen: "12 Jan 4:22 PM", icon: DrawerIcon6 },
    { id: 7, name: "PT Report", lastGen: null, icon: DrawerIcon7 },
  ];

  const toggleCards = () => {
    setShowCards(!showCards);
  };
  const tabs = [
    { label: "Employee Variance", value: "employee" },
    { label: "Salary Variance", value: "salary" },
    { label: "Statutory Summary", value: "statutory" },
  ];

  const [activeFilters, setActiveFilters] = useState({
    employeeName: [],
    department: [],
    location: [],
    designation: [],
    payGroup: [],
    employeeStatus: [],
  });

  const [activeVisibleFilters, setActiveVisibleFilters] = useState({
    employeeName: false,
    department: false,
    location: false,
    designation: false,
    payGroup: false,
    employeeStatus: false,
  });

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

  // ─── Tab-specific variance card data ───
  const varianceCardsData = {
    employee: [
      { title: "Total Processed", nov: "1,000", dec: "1,200", difference: "+200", percentage: "+20.0%", positive: true },
      { title: "New Joiners", nov: "45", dec: "60", difference: "+15", percentage: "+33.3%", positive: true },
      { title: "Resignations", nov: "30", dec: "22", difference: "-8", percentage: "-26.6%", positive: false },
      { title: "Attendance", nov: "120", dec: "150", difference: "+30", percentage: "+25.0%", positive: false },
      { title: "Total CTC", nov: "950", dec: "1,020", difference: "+70", percentage: "+7.3%", positive: true },
      { title: "Overtime Cost", nov: "80", dec: "65", difference: "-15", percentage: "-18.7%", positive: true },
      { title: "Bonus Payout", nov: "150", dec: "200", difference: "+50", percentage: "+33.3%", positive: true },
      { title: "PF Contribution", nov: "90", dec: "95", difference: "+5", percentage: "+5.5%", positive: true },
      { title: "ESI Contribution", nov: "40", dec: "38", difference: "-2", percentage: "-5.0%", positive: false },
      { title: "Salary Hold", nov: "12", dec: "18", difference: "+6", percentage: "+50.0%", positive: false },
      { title: "Net Pay", nov: "820", dec: "890", difference: "+70", percentage: "+8.5%", positive: true },
      { title: "Reimbursements", nov: "25", dec: "32", difference: "+7", percentage: "+28.0%", positive: true },
    ],
    salary: [
      { title: "Basic Salary", nov: "5,20,000", dec: "5,45,000", difference: "+25,000", percentage: "+4.8%", positive: true },
      { title: "HRA", nov: "2,08,000", dec: "2,18,000", difference: "+10,000", percentage: "+4.8%", positive: true },
      { title: "Conveyance", nov: "38,400", dec: "40,200", difference: "+1,800", percentage: "+4.7%", positive: true },
      { title: "Special Allowance", nov: "1,10,000", dec: "1,05,000", difference: "-5,000", percentage: "-4.5%", positive: false },
      { title: "Medical Allowance", nov: "62,500", dec: "64,000", difference: "+1,500", percentage: "+2.4%", positive: true },
      { title: "LTA", nov: "45,000", dec: "45,000", difference: "0", percentage: "0.0%", positive: true },
      { title: "Performance Bonus", nov: "1,50,000", dec: "2,00,000", difference: "+50,000", percentage: "+33.3%", positive: true },
      { title: "Overtime Pay", nov: "80,000", dec: "65,000", difference: "-15,000", percentage: "-18.7%", positive: false },
      { title: "Arrears", nov: "12,000", dec: "28,000", difference: "+16,000", percentage: "+133%", positive: true },
      { title: "Total Gross", nov: "12,26,000", dec: "13,10,200", difference: "+84,200", percentage: "+6.9%", positive: true },
      { title: "Total Deductions", nov: "3,18,000", dec: "3,25,000", difference: "+7,000", percentage: "+2.2%", positive: false },
      { title: "Net Salary", nov: "9,08,000", dec: "9,85,200", difference: "+77,200", percentage: "+8.5%", positive: true },
    ],
    statutory: [
      { title: "PF (Employee)", nov: "62,400", dec: "65,400", difference: "+3,000", percentage: "+4.8%", positive: true },
      { title: "PF (Employer)", nov: "62,400", dec: "65,400", difference: "+3,000", percentage: "+4.8%", positive: true },
      { title: "ESI (Employee)", nov: "5,850", dec: "5,500", difference: "-350", percentage: "-6.0%", positive: false },
      { title: "ESI (Employer)", nov: "24,375", dec: "22,900", difference: "-1,475", percentage: "-6.0%", positive: false },
      { title: "Professional Tax", nov: "25,600", dec: "25,600", difference: "0", percentage: "0.0%", positive: true },
      { title: "TDS Deducted", nov: "1,42,000", dec: "1,58,000", difference: "+16,000", percentage: "+11.3%", positive: false },
      { title: "LWF (Employee)", nov: "1,280", dec: "1,280", difference: "0", percentage: "0.0%", positive: true },
      { title: "LWF (Employer)", nov: "3,840", dec: "3,840", difference: "0", percentage: "0.0%", positive: true },
         { title: "LWF (Employee)", nov: "1,280", dec: "1,280", difference: "0", percentage: "0.0%", positive: true },
      { title: "LWF (Employer)", nov: "3,840", dec: "3,840", difference: "0", percentage: "0.0%", positive: true },
      { title: "Gratuity Provision", nov: "25,000", dec: "26,200", difference: "+1,200", percentage: "+4.8%", positive: true },
      { title: "Total Statutory Cost", nov: "3,52,745", dec: "3,74,120", difference: "+21,375", percentage: "+6.1%", positive: false },
    ],
  };

  const varianceCards = varianceCardsData[activeTab] || varianceCardsData.employee;

  const handleTabSwitch = (tabValue) => {
    if (tabValue === activeTab) return;
    setIsTabAnimating(true);
    setTimeout(() => {
      setActiveTab(tabValue);
      setTimeout(() => setIsTabAnimating(false), 50);
    }, 200);
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
      employeeName: [], department: [], location: [],
      designation: [], payGroup: [], employeeStatus: [],
    };
    const resetVisible = {
      employeeName: false, department: false, location: false,
      designation: false, payGroup: false, employeeStatus: false,
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
        employeeName: false, department: false, location: false,
        designation: false, payGroup: false, employeeStatus: false,
      };
      newState[key] = !prev[key];
      return newState;
    });
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
    setActiveFilters((prev) => ({ ...prev, [filterKey]: [...dropdownData[filterKey]] }));
  };

  const handleClearAll = (filterKey) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: [] }));
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
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTempFilterValues({ ...activeFilters });
      setTempVisibleFilters({ ...activeVisibleFilters });
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      const isClickInsideDropdown = Object.values(filterDropdownRefs.current)
        .some((ref) => ref.current && ref.current.contains(event.target));
      const isClickOnDropdownButton = event.target.closest("[data-filter-button]");
      if (!isClickInsideDropdown && !isClickOnDropdownButton) {
        setOpenDropdowns({
          employeeName: false, department: false, location: false,
          designation: false, payGroup: false, employeeStatus: false,
        });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  const generateLast12Months = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = date.toLocaleString("default", { month: "short", year: "numeric" });
      months.push({ label, value: label });
    }
    return months;
  };

  const monthOptions = generateLast12Months();

  const DropdownComponent = ({ filterKey, label }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
      filterDropdownRefs.current[filterKey] = dropdownRef;
      return () => { delete filterDropdownRefs.current[filterKey]; };
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
            <span className="text-gray-700 dark:text-gray-50 ds-text-xs font-medium">{label}</span>
          </div>
          <span className="text-gray-500 mt-1">
            {isOpen ? <IoMdArrowDropup className="w-4 h-4" /> : <IoMdArrowDropdown className="w-4 h-4" />}
          </span>
        </button>

        {isOpen && (
          <div className="absolute mt-1 border border-gray-200 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 drop-shadow-xl shadow-lg z-[100] w-48 max-h-80 overflow-y-auto top-full no-scrollbar">
            <div className="p-3">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() => isAllSelected ? handleClearAll(filterKey) : handleSelectAll(filterKey)}
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
                    className="flex items-center gap-3 px-2 py-1 hover:bg-ds-primary/80 text-gray-900 hover:text-white cursor-pointer rounded"
                  >
                    <div className={`w-4 h-4 flex items-center justify-center border rounded ${currentValues.includes(item) ? "ds-bg-primary ds-border-primary" : "border-gray-300"}`}>
                      {currentValues.includes(item) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="ds-text-xs dark:text-gray-50 font-semibold">{item}</span>
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
            className="w-full sm:w-fit min-w-0 border-2 ds-border-primary"
            options={monthOptions}
            unSelectLabel={`${new Date().toLocaleString("default", { month: "short" })}-${new Date().getFullYear()}`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row justify-between gap-2 sm:p-3">
        <div className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full min-w-0 sm:max-w-[400px] md:flex-1 md:max-w-none xl:h-[36px] focus-within:border-[#9853F9] focus-within:border-2 focus-within:shadow-md transition-all">
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
            className="ds-bg-primary dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[0.7rem] px-4 py-2 md:py-1.5 min-w-[80px] md:min-w-[5rem] rounded-sm flex items-center justify-center gap-1 h-[36px] w-full sm:w-auto"
          >
            <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
            Filter
            {open ? <IoMdArrowDropup className="w-3 mt-0.5 h-3" /> : <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />}
          </button>

          {open && (
            <div ref={dropdownRef} className="absolute right-0 top-full mt-1 z-[100] shadow-lg h-fit">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-48 p-4 overflow-y-auto border border-gray-200 dark:border-gray-400 no-scrollbar">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-3 border-b-2 pb-2">Filter</h2>
                <div className="space-y-1 h-fit max-h-42 overflow-y-auto pr-2 no-scrollbar">
                  {filterOptions.map((f) => (
                    <label key={f.key} className="flex items-center gap-2 ds-text-xs text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-ds-primary"
                        checked={tempVisibleFilters[f.key]}
                        onChange={(e) => handleTempCheckboxChange(f.key, e.target.checked)}
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex gap-2 pt-3 border-t">
                  <button
                    onClick={handleResetFilters}
                    className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
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

      {/* Filter Chips Row */}
      <div className="flex gap-2 sm:gap-3 flex-wrap my-2">
        {filterOptions.map((filter) => (
          <DropdownComponent key={filter.key} filterKey={filter.key} label={filter.label} />
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
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-sm ds-text-xs flex items-center gap-2 border border-gray-200 dark:border-gray-500"
              >
                <span className="text-gray-900 dark:text-gray-50 ds-text-xs">{value}</span>
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
          <StatCard title="Total Headcount" value="1,000" icon={Users} iconBg="#E9F3FF" borderColor="#0088FF" />
          <StatCard title="Attendance Process" value="900" icon={Clock} iconBg="#EBF9EE" borderColor="#34C759" />
          <StatCard title="Total CTC" value="1,000" icon={Wallet} iconBg="#FAEAFC" borderColor="#CB30E0" />
          <StatCard title="Total Hold" value="1,000" icon={HandCoins} iconBg="#FFF4EA" borderColor="#FF8D28" />

          <button
            onClick={() => setShowVarianceUI(!showVarianceUI)}
            className="flex items-center justify-center gap-2 
                 ds-bg-primary cursor-pointer
                 text-white font-bold w-full sm:min-w-fit h-fit p-3 sm:mt-3
                 px-4 rounded-sm shadow-md text-[0.7rem]
                 hover:opacity-90 transition col-span-1 sm:col-span-2 lg:col-span-1"
          >
            {showVarianceUI ? <SlReload size={18} /> : <FaPlay size={18} />}
            {showVarianceUI ? "Re-Run Payroll" : "Run Payroll"}
          </button>
        </div>
      </div>

   {showVarianceUI && (
        <div className="mt-6 sm:mt-8">
          {/* ===== TOP STATS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-700 overflow-hidden">
            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-ds-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BsFillPeopleFill className="text-purple-600 dark:text-ds-primary" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Processed</p>
                <p className="text-[1.1rem] font-bold text-gray-800 dark:text-gray-100 leading-tight">
                  128{" "}
                  <span className="text-[0.65rem] font-normal text-gray-400 dark:text-gray-500">Employee</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-ds-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HiOutlineCurrencyRupee className="text-purple-600 dark:text-ds-primary" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Gross Pay</p>
                <p className="text-[1.1rem] font-bold text-gray-800 dark:text-gray-100 leading-tight">₹84,50,000</p>
              </div>
            </div>

            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-ds-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MdRemove className="text-purple-600 dark:text-ds-primary" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Deduction</p>
                <p className="text-[1.1rem] font-bold text-gray-800 dark:text-gray-100 leading-tight">₹18,75,000</p>
              </div>
            </div>

            <div className="flex gap-3 p-4 items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-ds-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <IoCheckmark className="text-purple-600 dark:text-ds-primary" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Net Pay</p>
                <p className="text-[1.1rem] font-bold text-gray-800 dark:text-gray-100 leading-tight">₹65,75,000</p>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 rounded-md flex flex-col-reverse lg:flex-row items-stretch">
            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-1 min-w-0 transition-all duration-300 order-2 lg:order-1">
              <div
                className="flex justify-between items-center cursor-pointer ds-bg-primary rounded-tl-sm rounded-tr-sm   mt-5 lg:mt-0"
                onClick={toggleCards}
              >
          <h1 className="text-white  text-xl md:text-[1.2rem] font-normal px-2 ">
                  Payroll Variance</h1>
                <button className="flex items-center justify-center m-1 px-1 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded-sm cursor-pointer transition-all duration-300">
                  <span className={`transition-transform duration-300 ${showCards ? "" : "rotate-180"}`}>
                    <MdOutlineKeyboardArrowDown size={20} className="text-white" />
                  </span>
                </button>
              </div>

              {showCards && (
                <div className="bg-white dark:bg-gray-800 rounded-b-md pb-4 pt-2">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => handleTabSwitch(tab.value)}
                        className={`px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${activeTab === tab.value
                            ? "ds-text-primary border-b-2 ds-border-primary -mb-[2px]"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 px-1 transition-all duration-200 ease-in-out ${
                      isTabAnimating
                        ? "opacity-0 translate-y-2"
                        : "opacity-100 translate-y-0"
                    }`}
                  >
                    {varianceCards.map((card, index) => (
                      <div
                        key={`${activeTab}-${index}`}
                        className={`rounded-md w-full p-3 border bg-white dark:bg-gray-800 ${card.positive ? "border-green-400 dark:border-green-500/60" : "border-red-400 dark:border-red-500/60"}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[0.8rem] font-bold ds-text-primary leading-tight">{card.title}</span>
                          <span className={`text-[0.65rem] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ml-1 ${card.positive ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"}`}>
                            {card.positive ? "+2.0%" : "-2.0%"}
                          </span>
                        </div>
                        <div className="text-[0.72rem] text-gray-600 dark:text-gray-400 space-y-1.5">
                          <div className="flex justify-between">
                            <span>Nov 2025</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{card.nov}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dec 2025</span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{card.dec}</span>
                          </div>
                          <hr className="border-gray-100 dark:border-gray-700" />
                          <div className="flex justify-between font-semibold pt-0.5">
                            <span className="text-gray-700 dark:text-gray-300">Difference :</span>
                            <span className={`flex items-center gap-0.5 ${card.positive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                              {card.positive ? <FaArrowUp size={9} /> : <FaArrowDown size={9} />}
                              {card.difference}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-5 px-1">
                    <button className="ds-bg-primary hover:bg-ds-primary/90 text-white text-xs font-medium py-1.5 px-5 rounded-sm cursor-pointer transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* ===== REMARKS ===== */}
              <div className="mt-3 bg-white dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <BiSolidMessageEdit className="ds-text-primary h-5 w-5" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-50">Remarks</span>
                </div>
                <div className="px-4 pt-1 pb-2">
                  <p className="ds-text-xs text-gray-400 dark:text-gray-500 py-2">
                    Add remarks for payroll processing or approval reference.
                  </p>
                  <div className="relative">
                    <textarea
                      maxLength={300}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Example: Attendance finalized, PF updated, 3 employees on hold"
                      className="w-full h-24 resize-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-md p-3 text-xs focus:outline-none focus:ring-1 focus:ring-ds-primary placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                    <span className="absolute bottom-2 right-3 text-[10px] text-gray-300 dark:text-gray-600">
                      {remarks.length}/300
                    </span>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button className="px-4 py-1.5 text-xs border ds-border-primary ds-text-primary rounded-md hover:bg-purple-50 dark:hover:bg-ds-primary/20 cursor-pointer transition-colors">
                      Mark as Completed
                    </button>
                    <button className="px-4 py-1.5 text-xs ds-bg-primary text-white rounded-md hover:bg-ds-primary/90 cursor-pointer transition-colors">
                      Send for Approval
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT DRAWER SYSTEM ================= */}
            <div className="flex flex-col lg:flex-row flex-shrink-0 lg:h-full self-stretch order-1 lg:order-2 relative">

              {/* Mobile overlay */}
              {showDrawer && (
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden z-30"
                  onClick={() => setShowDrawer(false)}
                />
              )}

              {/* REPORT DRAWER */}
              <div
                className={[
                  "bg-white dark:bg-gray-800 overflow-hidden flex-shrink-0 transition-all duration-300",
                  "fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl",
                  showDrawer ? "max-h-[85vh]" : "max-h-0",
                  "lg:static lg:rounded-none lg:max-h-none",
                  "lg:border lg:border-gray-200 lg:dark:border-gray-700 lg:mx-2 lg:z-auto",
                  showDrawer ? "lg:w-[220px]" : "lg:w-0 lg:border-0",
                ].join(" ")}
              >
                <div className="w-full lg:w-[220px]">

                  <div className="flex items-center justify-between bg-[#F7F2FD] dark:bg-gray-700 px-3 py-2">
                    <div className="lg:hidden w-full flex justify-center">
                      <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-500" />
                    </div>
                    <FaArrowRight
                      className="hidden lg:block w-6 h-6 rounded-full text-white ds-bg-primary p-1 cursor-pointer"
                      onClick={() => setShowDrawer(false)}
                    />
                    <button
                      className="lg:hidden text-xs text-gray-500 dark:text-gray-400 underline cursor-pointer"
                      onClick={() => setShowDrawer(false)}
                    >
                      Close
                    </button>
                  </div>

                  {/* Drawer Header */}
                  <div className="flex justify-between items-center px-3 py-2 sm:py-1.5 ds-bg-primary rounded-t-sm">
                    <span className="text-white font-semibold text-sm">Report</span>
                    <button className="text-white/80 hover:text-white">
                      <MdOutlineKeyboardArrowDown size={18} className="bg-white dark:bg-gray-600 text-gray-400 dark:text-gray-300 rounded-xs" />
                    </button>
                  </div>

                  {/* Select All Row */}
                  <div className="flex justify-between items-center px-3 py-2 sm:py-1.5 my-2 sm:my-3 border-b border-gray-100 dark:border-gray-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 accent-ds-primary"
                        checked={reportSelected.length === reportItems.length}
                        onChange={() =>
                          setReportSelected(
                            reportSelected.length === reportItems.length
                              ? []
                              : reportItems.map((r) => r.id)
                          )
                        }
                      />
                      <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">Select All</span>
                    </label>
                    <button className="flex items-center gap-1 ds-bg-primary text-white text-[10px] px-2 py-1 rounded-sm hover:bg-ds-primary/90 cursor-pointer">
                      <FiDownload size={10} />
                      Download
                    </button>
                  </div>

                  {/* Report Items */}
                  <div className="overflow-y-auto max-h-[60vh] lg:max-h-[calc(100vh-180px)] no-scrollbar">
                    {reportItems.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center gap-2 px-2 py-2.5 border-2 border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 drop-shadow-xs rounded-sm transition-colors"
                      >
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 bg-purple-50 dark:bg-ds-primary/30">
                          <img
                            src={r.icon}
                            alt={r.name}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-100 leading-tight truncate">{r.name}</p>
                          <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                            {r.lastGen ? `Last Generated : ${r.lastGen}` : "Not generated yet."}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 accent-ds-primary flex-shrink-0"
                          checked={reportSelected.includes(r.id)}
                          onChange={() =>
                            setReportSelected((prev) =>
                              prev.includes(r.id)
                                ? prev.filter((x) => x !== r.id)
                                : [...prev, r.id]
                            )
                          }
                        />
                        <button className="w-5 h-5 rounded-sm ds-bg-primary flex items-center justify-center flex-shrink-0 hover:bg-ds-primary/90 cursor-pointer">
                          <FiDownload size={10} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ICON SIDEBAR */}
              <div
                className={[
                  "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
                  "fixed bottom-0 left-0 right-0 z-20",
                  "flex flex-row items-center gap-3 px-4 py-2 border-t",
                  showDrawer ? "hidden" : "flex",
                  "lg:static lg:z-auto lg:flex-col lg:items-center lg:gap-4 lg:py-4 lg:px-0 lg:space-y-2",
                  "lg:rounded-r-sm lg:border-t-0 lg:border-l-0",
                  showDrawer ? "lg:w-0 lg:overflow-hidden lg:border-0" : "lg:w-[60px]",
                ].join(" ")}
              >
                {/* Toggle button */}
                <button
                  onClick={() => setShowDrawer((p) => !p)}
                  className="w-10 h-10 rounded-full ds-bg-primary flex items-center justify-center text-white hover:bg-ds-primary/90 lg:mb-4 cursor-pointer transition-colors shadow-md flex-shrink-0"
                >
                  {showDrawer ? (
                    <FaArrowRight className="w-3 h-3 text-white" />
                  ) : (
                    <FaArrowLeft className="w-4 h-4 text-white" />
                  )}
                </button>

                {[
                  <img src={DrawerIcon1} alt="calendar" className="w-5 h-5" />,
                  <img src={DrawerIcon2} alt="money" className="w-5 h-5" />,
                  <img src={DrawerIcon3} alt="document" className="w-5 h-5" />,
                  <img src={DrawerIcon4} alt="settings" className="w-5 h-5" />,
                  <img src={DrawerIcon5} alt="help" className="w-5 h-5" />,
                  <img src={DrawerIcon6} alt="notification" className="w-5 h-5" />,
                  <img src={DrawerIcon7} alt="profile" className="w-5 h-5" />,
                ].map((icon, i) => (
                  <button
                    key={i}
                    onClick={() => setShowDrawer(true)}
                    className="w-10 h-10 p-2 rounded-lg flex items-center justify-center border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm hover:shadow-md hover:bg-purple-50 dark:hover:bg-ds-primary/20 transition-all cursor-pointer flex-shrink-0"
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* Spacer so the fixed mobile bottom bar doesn't overlap page content */}
              <div className="h-16 lg:hidden" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollDashboard;