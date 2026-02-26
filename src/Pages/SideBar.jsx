import React, { useState } from "react";
import { FiLayout, FiUser } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { GoTriangleRight } from "react-icons/go";
import { GrConfigure } from "react-icons/gr";

import { useNavigate } from "react-router-dom";

/* =========================
   MENU CONFIG (SCALABLE)
========================= */

const menuItems = [
  {
    name: "Dashboard",
    icon: <FiLayout className="h-5 w-5" />,
    path: "/dashboard",
  },
  {
    name: "Configuration",
    icon: <GrConfigure className="h-4.5 w-4.5" />,
    children: [
      {
        name: "PF Configuration",
        path: "/pfConfiguration",
      },
      {
        name: "Income Tax Configuration",
        path: "/incomeTax",
      },
      {
        name: "Payroll",
        children: [
          {
            name: "Statutory Configuration",
            path: "/statuoryConfiguration",
          },
          {
            name: "Income Tax and Tax Configuration",
            path: "/payroll/tax",
          },
          {
            name: "Pay code master and Formula",
            children: [
              {
                name: "Earnings",
                path: "/payroll/paycode/earnings",
              },
              {
                name: "Deductions",
                path: "/payroll/paycode/deductions",
              },
            ],
          },
        ],
      },
      {
        name: "Leave",
        path: "/leave",
      },
      {
        name: "OrganizationDetails",
        path: "/organizationDetails",
      },
    ],
  },
  {
    name: "Employee List",
    icon: <FiUser className="h-5 w-5" />,
    path: "/EmployeeList",
  },
  {
    name: "Attendance",
    icon: <HiOutlineDuplicate className="h-5 w-5" />,
    path: "/monthlyAttendance",
  },
];

/* =========================
   LEVEL 0 MENU ITEM (TOP LEVEL)
========================= */

const Level0MenuItem = ({ item, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between text-[0.7rem] p-2 rounded-sm font-semibold cursor-pointer transition-colors
        ${
          isActive
            ? "bg-[#8629DF] text-white dark:bg-[#8629DF] dark:text-white"
            : "text-[#111111]/90 hover:bg-[#8629DF] hover:text-white dark:text-gray-300 dark:hover:bg-[#8629DF] dark:hover:text-white"
        }`}
    >
      <div className="flex items-center gap-2">
        {item.icon}
        {item.name}
      </div>
    </div>
  );
};

/* =========================
   LEVEL 1 MENU ITEM (CONFIGURATION CHILDREN)
========================= */

const Level1MenuItem = ({ item, isActive, onClick, hasArrow }) => {
  return (
    <div className="relative ml-4">
      <div
        onClick={onClick}
        className={`relative flex items-center gap-2 text-[0.7rem] font-semibold cursor-pointer transition-all
          ${
            isActive
              ? "bg-[#F3E9FF] text-[#8629DF] dark:bg-gray-800 dark:text-[#A855F7] rounded-sm w-fit px-3 py-1"
              : "text-[#111111]/90 dark:text-gray-300 px-2 py-1 rounded-sm hover:bg-[#8629DF] hover:text-white dark:hover:bg-[#8629DF] dark:hover:text-white"
          }`}
      >
        {/* Left triangle indicator (ACTIVE ONLY) */}
        {isActive && (
          <span className="absolute -left-4.5 top-1/2 -translate-y-1/2 ">
            <GoTriangleRight className="h-5 w-5 text-[#8629DF] dark:text-[#A855F7]" />
          </span>
        )}

        <div className="flex items-center gap-2 whitespace-nowrap">
          {item.name}
        </div>
      </div>
    </div>
  );
};

/* =========================
   LEVEL 2 MENU ITEM (PAYROLL CHILDREN)
========================= */

const Level2MenuItem = ({ item, isActive, onClick, hasArrow }) => {
  return (
    <div className="relative ml-4">
      <div
        onClick={onClick}
        className={`relative flex items-center gap-2 text-[0.7rem] font-semibold cursor-pointer transition-all
          ${
            isActive
              ? "text-[#8629DF] dark:text-[#A855F7] rounded-sm w-fit px-3 py-1"
              : "text-[#111111]/90 dark:text-gray-300 px-2 py-1 rounded-sm hover:bg-[#8629DF] hover:text-white dark:hover:bg-[#8629DF] dark:hover:text-white"
          }`}
      >
        {/* Left triangle indicator (ACTIVE ONLY) */}
        {isActive && (
          <span className="absolute -left-4.5 top-1/2 -translate-y-1/2 ">
            <GoTriangleRight className="h-5 w-5 text-[#8629DF] dark:text-[#A855F7]" />
          </span>
        )}

        <div className="flex items-center text-[0.7rem] gap-2 whitespace-wrap">
          {item.name}
        </div>
      </div>
    </div>
  );
};

/* =========================
   LEVEL 3 MENU ITEM (PAY CODE CHILDREN)
========================= */

const Level3MenuItem = ({ item, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center text-[0.7rem] p-2 ml-12 rounded-sm font-semibold cursor-pointer transition-colors
        ${
          isActive
            ? "bg-[#8629DF] text-white dark:bg-[#8629DF] dark:text-white"
            : "text-[#111111]/90 hover:bg-[#8629DF] hover:text-white dark:text-gray-300 dark:hover:bg-[#8629DF] dark:hover:text-white"
        }`}
    >
      {item.name}
    </div>
  );
};

/* =========================
   CONFIGURATION MENU COMPONENT
========================= */

const ConfigurationMenu = ({ activeItem, setActiveItem }) => {
  const [openConfig, setOpenConfig] = useState(false);
  const [openPayroll, setOpenPayroll] = useState(false);
  const [openPayCode, setOpenPayCode] = useState(false);
  const configItem = menuItems.find((item) => item.name === "Configuration");
  const navigate = useNavigate();

  if (!configItem) return null;

  const isConfigActive = activeItem === "Configuration";
  const isConfigChildActive = [
    "OrganizationDetails",
    "Admin",
    "Attendance",
    "Payroll",
    "Leave",
    "Statutory Configuration",
    "Income Tax and Tax Configuration",
    "Pay code master and Formula",
    "Earnings",
    "Deductions",
  ].includes(activeItem);

  return (
    <div>
      <Level0MenuItem
        item={configItem}
        isActive={isConfigActive || isConfigChildActive}
        onClick={() => {
          setOpenConfig(!openConfig);
          setActiveItem("Configuration");
        }}
      />

      {openConfig && (
        <div className="mt-1 space-y-2">
          {/* Admin */}
          <Level1MenuItem
            item={configItem.children[0]}
            isActive={activeItem === "pfConfiguration"}
            onClick={() => {
              setActiveItem("pfConfiguration");
              navigate("/pfConfiguration");
            }}
            hasArrow={false}
          />

          {/* Attendance */}
          <Level1MenuItem
            item={configItem.children[1]}
            isActive={activeItem === "incomeTax"}
            onClick={() => {
              setActiveItem("incomeTax");
              navigate("/incomeTax");
            }}
            hasArrow={false}
          />

          {/* Payroll */}
          <div>
            <Level1MenuItem
              item={configItem.children[2]}
              isActive={
                activeItem === "Payroll" ||
                [
                  "Statutory Configuration",
                  "Income Tax and Tax Configuration",
                  "Pay code master and Formula",
                  "Earnings",
                  "Deductions",
                ].includes(activeItem)
              }
              onClick={() => {
                setOpenPayroll(!openPayroll);
                setActiveItem("Payroll");
              }}
              hasArrow={true}
            />

            {openPayroll && (
              <div className="mt-1 space-y-1.5">
                {/* Statutory Configuration */}
                <Level2MenuItem
                  item={configItem.children[2].children[0]}
                  isActive={activeItem === "Statutory Configuration"}
                  onClick={() => {
                    setActiveItem("Statutory Configuration");
                    navigate("/statuoryConfiguration");
                  }}
                  hasArrow={false}
                />

                {/* Income Tax and Tax Configuration */}
                <Level2MenuItem
                  item={configItem.children[2].children[1]}
                  isActive={activeItem === "Income Tax and Tax Configuration"}
                  onClick={() => {
                    setActiveItem("Income Tax and Tax Configuration");
                    navigate("/payroll/tax");
                  }}
                  hasArrow={false}
                />

                {/* Pay code master and Formula */}
                <div>
                  <Level2MenuItem
                    item={configItem.children[2].children[2]}
                    isActive={
                      activeItem === "Pay code master and Formula" ||
                      ["Earnings", "Deductions"].includes(activeItem)
                    }
                    onClick={() => {
                      setOpenPayCode(!openPayCode);
                      setActiveItem("Pay code master and Formula");
                    }}
                    hasArrow={true}
                  />

                  {openPayCode && (
                    <div className="mt-1">
                      {/* Earnings */}
                      <Level3MenuItem
                        item={configItem.children[2].children[2].children[0]}
                        isActive={activeItem === "Earnings"}
                        onClick={() => {
                          setActiveItem("Earnings");
                          navigate("/payroll/paycode/earnings");
                        }}
                      />

                      {/* Deductions */}
                      <Level3MenuItem
                        item={configItem.children[2].children[2].children[1]}
                        isActive={activeItem === "Deductions"}
                        onClick={() => {
                          setActiveItem("Deductions");
                          navigate("/payroll/paycode/deductions");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Leave */}
          <Level1MenuItem
            item={configItem.children[3]}
            isActive={activeItem === "Leave"}
            onClick={() => {
              setActiveItem("Leave");
              navigate("/leave");
            }}
            hasArrow={false}
          />

          {/* OrganizationDetails */}
          <Level1MenuItem
            item={configItem.children[4]}
            isActive={activeItem === "OrganizationDetails"}
            onClick={() => {
              setActiveItem("OrganizationDetails");
              navigate("/organizationDetails");
            }}
            hasArrow={false}
          />
        </div>
      )}
    </div>
  );
};

/* =========================
   SIDEBAR COMPONENT
========================= */

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col gap-1 mt-3 mx-4 h-120 overflow-y-auto no-scrollbar">
      {/* Dashboard */}
      <Level0MenuItem
        item={menuItems[0]}
        isActive={activeItem === "Dashboard"}
        onClick={() => {
          setActiveItem("Dashboard");
          navigate("/dashboard");
        }}
      />

      {/* Configuration Menu */}
      <ConfigurationMenu
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Employee List */}
      <Level0MenuItem
        item={menuItems[2]}
        isActive={activeItem === "Employee List"}
        onClick={() => {
          setActiveItem("Employee List");
          navigate("/EmployeeList");
        }}
      />

      {/* Attendance */}
      <Level0MenuItem
        item={menuItems[3]}
        isActive={activeItem === "Attendance"}
        onClick={() => {
          setActiveItem("Attendance");
          navigate("/monthlyAttendance");
        }}
      />
    </div>
  );
};

export default SideBar;