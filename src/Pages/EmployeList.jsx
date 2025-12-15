import React, { useEffect, useState } from "react";
import { BsEye, BsPlusSquareFill } from "react-icons/bs";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import {
  HiAdjustmentsHorizontal,
  HiOutlineDocument,
  HiOutlineEye,
} from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import ViewIcon from "../Assets/ViewIcon.png";
import EditIcon from "../Assets/EditIcon.png";
import DeleteIcon from "../Assets/DeleteIcon.png";
import SearchIcon from "../Assets/Searchicon.png";
import { MdArrowDropDown } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CiExport, CiImport } from "react-icons/ci";
import { Delete, Eye, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EmployeList = () => {
  const [open, setOpen] = useState(false);
  
  // Active filters that are currently applied to the table
  const [activeFilters, setActiveFilters] = useState({
    unitName: "",
    department: "",
    location: "",
    designation: "",
    grade: "",
    level: "",
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
    unitName: "",
    department: "",
    location: "",
    designation: "",
    grade: "",
    level: "",
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
    department: ["IT", "Design", "Marketing"],
    location: ["Bhopal", "Indore", "Delhi"],
    designation: ["UX/UI Designer", "Developer", "Manager"],
    grade: ["G1", "G2", "G3"],
    level: ["L1", "L2", "L3"],
  };

  // Handle temporary changes in the dropdown (not applied yet)
  const handleTempFilterChange = (key, value) => {
    setTempFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  // Handle temporary checkbox changes (not applied yet)
  const handleTempCheckboxChange = (key, checked) => {
    setTempVisibleFilters((prev) => ({ ...prev, [key]: checked }));
    // If unchecking, also clear the temporary filter value
    if (!checked) {
      setTempFilterValues((prev) => ({ ...prev, [key]: "" }));
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
      unitName: "",
      department: "",
      location: "",
      designation: "",
      grade: "",
      level: "",
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
    setActiveFilters((prev) => ({ ...prev, [key]: "" }));
    setActiveVisibleFilters((prev) => ({ ...prev, [key]: false }));
  };

  // Initialize temp states when dropdown opens
  useEffect(() => {
    if (open) {
      setTempFilterValues({ ...activeFilters });
      setTempVisibleFilters({ ...activeVisibleFilters });
    }
  }, [open]);

  // Filter data based on search query and active filters
  const filterData = employees.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if item matches all active filters
    const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true; // No filter applied for this field
      
      // For department filter, check if item's department includes the filter value
      if (key === 'department') {
        return item.department.toLowerCase().includes(value.toLowerCase());
      }
      
      // For other filters, you might need to adjust based on your data structure
      return String(item[key] || '').toLowerCase().includes(value.toLowerCase());
    });
    
    return matchesSearch && matchesFilters;
  });

  // Render dropdowns based on ACTIVE visible filters (not temporary)
  const renderDropdown = (key, label) => {
    if (!activeVisibleFilters[key]) return null;

    return (
      <div className="flex flex-col">
        <select
          className="border-2 px-2 py-1 rounded-4xl w-fit text-[0.7rem]"
          value={activeFilters[key]}
          onChange={(e) => {
            // This now directly updates active filters since dropdowns are outside the filter panel
            setActiveFilters(prev => ({ ...prev, [key]: e.target.value }));
          }}
        >
          <option className="text-[0.7rem]" value="">
            {label}
          </option>
          {dropdownData[key].map((item) => (
            <option className="text-[0.7rem]" key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
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
          <div className="bg-[#8629DF] text-white text-[0.7rem] px-4  w-full rounded-sm flex justify-center items-center gap-1 py-1  ">
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
            className="px-3 py-2 w-full text-xs md:text-[0.8rem] outline-none bg-transparent"
          />
          <IoMdSearch className="w-5 h-5 text-gray-500" />
        </div>

        <button
          onClick={() => setOpen(prev => !prev)}
          className="bg-[#8629DF]  dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[0.7rem] px-4 p-1 md:p-0  min-w-[50%]  md:min-w-[5rem]  rounded-sm flex items-center justify-center gap-1"
        >
          <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
          Filter  {open ? (<>
          <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />
          </>) : (<>
          <IoMdArrowDropup className="w-3 mt-0.5 h-3" />
          </>)}
        </button>
        
        <button className="bg-[#8629DF]  dark:border dark:border-gray-500 text-white cursor-pointer text-[0.7rem] md:text-[0.7rem] px-4 p-2 md:p-0 min-w-full md:min-w-[8.5rem] rounded-sm flex items-center justify-center gap-2">
          <CiImport className="md:w-4 md:h-4" />
          Bulk Export
        </button>
        
        <button className="bg-[#8629DF]  dark:border dark:border-gray-500 text-white cursor-pointer text-[0.7rem] md:text-[0.7rem] px-4 p-2  md:p-0 min-w-full md:min-w-[8.5rem] rounded-sm flex items-center justify-center gap-2">
          <CiExport className="md:w-4 md:h-4" />
          Bulk Import
        </button>
      </div>

      {/* Active Filter Dropdowns (shown based on ACTIVE visible filters) */}
      <div className="flex gap-4 flex-wrap my-4">
        {renderDropdown("unitName", "Unit")}
        {renderDropdown("department", "Department")}
        {renderDropdown("location", "Location")}
        {renderDropdown("designation", "Designation")}
        {renderDropdown("grade", "Grade")}
        {renderDropdown("level", "Level")}
      </div>
      
      {/* Active Filter Tags */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 ">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value) return null;
            return (
              <div
                key={key}
                className="bg-gray-200/60 px-3 py-1 rounded-sm text-xs flex items-center gap-2"
              >
                <span className="font-semibold text-[0.7rem]">{value}</span>
                <button
                  onClick={() => handleRemoveFilter(key)}
                  className="text-gray-700 hover:text-red-500 text-lg cursor-pointer leading-none"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employee Table */}
      <div className="rounded-sm mt-5 shadow drop-shadow-xs  border border-gray-200 dark:border-gray-600">
        <div className="overflow-x-auto no-scrollbar">
          <div
            className="text-[0.7rem] min-w-[1050px] sm:min-w-full sm:text-[0.8rem]  font-semibold text-white dark:text-gray-50 rounded-t-md  dark:border-gray-700 bg-[#8629DF] dark:bg-gray-900 py-1 px-4 min-h-[40px] "
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
              className="min-w-[1050px] sm:min-w-full  text-[0.7rem] sm:text-[0.7.2rem] py-2 px-3 border-b border-gray-100 dark:border-gray-700  dark:text-gray-400 hover:bg-gray-200/30 dark:hover:bg-gray-500/30 dark:bg-[#A1A1AA]/5 "
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
        <div className="flex flex-col sm:flex-row justify-end items-center mt-6 mx-4 text-xs sm:text-sm text-gray-600 gap-3 flex-wrap">
          {/* Left: Pagination numbers */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-3 py-1 border rounded border-[#8629DF] hover:bg-[#8629DF] hover:text-white">
              &lt; Back
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 border rounded ${num === 1
                  ? "bg-[#8629DF] text-white border-[#8629DF]"
                  : "border-[#8629DF] hover:bg-[#8629DF] hover:text-white"
                  }`}
              >
                {num}
              </button>
            ))}

            <span className="px-2">...</span>

            <button className="px-3 py-1 border rounded border-[#8629DF] hover:bg-[#8629DF] hover:text-white">
              25
            </button>

            <button className="px-3 py-1 border rounded border-[#8629DF] hover:bg-[#8629DF] hover:text-white">
              Next &gt;
            </button>
          </div>

          {/* Right: Result per page */}
          <div className="flex gap-1.5">
            <p className="text-black dark:text-gray-400 mt-1">
              Results per page{" "}
            </p>
            <select className="border rounded px-2 py-1 dark:bg-gray-800">
              <option>50</option>
              <option>100</option>
              <option>150</option>
            </select>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end w-full text-black dark:text-gray-400 text-xs sm:text-sm mt-3 p-4">
          1-50 of 125
        </div>
      </div>

      {/* Filter Dropdown */}
      {open && (
        <div className="fixed inset-0 flex justify-end top-55 right-5 z-50 overflow-auto no-scrollbar ">
          <div className="bg-white rounded-xs shadow-xl w-full max-w-xs p-6 overflow-y-auto h-[550px]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter</h2>

            <div className="space-y-2 border-b pb-4">
              {filterOptions.map((f) => (
                <label key={f.key} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#9376CA]"
                    checked={tempVisibleFilters[f.key]}
                    onChange={(e) => handleTempCheckboxChange(f.key, e.target.checked)}
                  />
                  {f.label}
                </label>
              ))}
            </div>

            {/* Filter Dropdowns (TEMPORARY - shown based on TEMP visible filters) */}
            {/* <div className="mt-4 space-y-3">
              {filterOptions.map((f) => 
                tempVisibleFilters[f.key] && (
                  <div key={f.key} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{f.label}</label>
                    <select
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={tempFilterValues[f.key]}
                      onChange={(e) => handleTempFilterChange(f.key, e.target.value)}
                    >
                      <option value="">Select {f.label}</option>
                      {dropdownData[f.key].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              )}
            </div> */}
            <div className="mt-6 flex flex-col gap-3">
              <button 
                onClick={handleApplyFilters}
                className="flex items-center justify-center gap-2 bg-[#9376CA] text-white px-5 py-2 rounded-md shadow hover:bg-[#7a5fb8]"
              >
                <img src={SearchIcon} className="w-5 h-5" /> Apply
              </button>

              <button 
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-2 bg-gray-200 border px-5 py-2 rounded-md shadow text-gray-700 hover:bg-gray-300"
              >
                <LuRefreshCw /> Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeList;