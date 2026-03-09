import React, { useState } from "react";
import { FiLayout, FiUser } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { GoTriangleRight } from "react-icons/go";
import { GrConfigure } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { ICONS } from "@/lib/constant";


/* =========================
   MENU CONFIG (SCALABLE)
========================= */

const menuItems = [
  {
    name: "Dashboard",
    icon: (
      <img
        src={ICONS.dashboard}
        alt="dashboard"
        className="h-5 w-5 object-contain"
      />
    ),
    path: "/dashboard",
  },
  // {
  //   name: "Configuration",
  //   icon: <GrConfigure className="h-4.5 w-4.5" />,
  //   children: [
  //     {
  //       name: "PF Configuration",
  //       path: "/pfConfiguration",
  //     },
  //     {
  //       name: "Income Tax Configuration",
  //       path: "/incomeTax",
  //     },
  //     {
  //       name: "Payroll",
  //       children: [
  //         {
  //           name: "Statutory Configuration",
  //           path: "/statuoryConfiguration",
  //         },
  //         {
  //           name: "Income Tax and Tax Configuration",
  //           path: "/payroll/tax",
  //         },
  //         {
  //           name: "Pay code master and Formula",
  //           children: [
  //             {
  //               name: "Earnings",
  //               path: "/payroll/paycode/earnings",
  //             },
  //             {
  //               name: "Deductions",
  //               path: "/payroll/paycode/deductions",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       name: "Leave",
  //       path: "/leave",
  //     },
  //     {
  //       name: "OrganizationDetails",
  //       path: "/organizationDetails",
  //     },
  //   ],
  // },

  {
    name: "Configuration",
    icon: (<img
      src={ICONS.configuration}
      alt="configuration"
      className="h-5 w-5 object-contain"
    />),
    children: [
      {
        name: "Organization Details",
        path: "/organizationdetails",
      },
      {
        name: "Statutory Configuration",
        path: "/pfconfiguration",
      },
      {
        name: "Income Tax Configuration",
        path: "/incometax",
      },
      {
        name: "Pay Code Master and Formula",
        path: "/paycodemaster",
      },
      {
        name: "Attendance Configuration",
        path: "/attendence-configuration",
      },
      {
        name: "Leave Configuration",
        path: "/leave",
      },
    ],
  },

  {
    name: "Employee List",
    icon: (<img
      src={ICONS.employee}
      alt="employee"
      className="h-5 w-5 object-contain"
    />),
    path: "/EmployeeList",
  },
  {
    name: "Attendance",
    icon: (<img
      src={ICONS.attendance}
      alt="attendance"
      className="h-5 w-5 object-contain"
    />),
    path: "/monthlyAttendance",
  },

  //add
  {
    name: "Attendance Regularization",
    icon: (<img
      src={ICONS.AttendanceRegularization}
      alt="attendanceRegularization"
      className="h-5 w-5 object-contain"
    />),
    path: "/attendance-regularization",
  },

  {
    name: "Loan Assignment",
    icon: (<img
      src={ICONS.LoanAssignment}
      alt="loanAssignment"
      className="h-5 w-5 object-contain"
    />),
    path: "/loan-assignment",
  },

  {
    name: "Payroll Dashboard",
    icon: (<img
      src={ICONS.payrollDashboard}
      alt="payrollDashboard"
      className="h-5 w-5 object-contain"
    />),
    path: "/payroll-dashboard",
  },

  {
    name: "Employee Dashboard",
    icon: (<img
      src={ICONS.employeeDashboard}
      alt="employeeDashboard"
      className="h-5 w-5 object-contain"
    />),
    path: "/employee-dashboard",
  },

  {
    name: "Reports",
    icon: (<img
      src={ICONS.report}
      alt="report"
      className="h-5 w-5 object-contain"
    />),
    children: [
      {
        name: "Report Builder",
        path: "/report-builder",
      },
      {
        name: "Bank Builder",
        path: "/bank-builder",
      },
    ],
  },

  {
    name: "Full and Final Individual",
    icon: (<img
      src={ICONS.fullAndFinal}
      alt="fullAndFinal"
      className="h-5 w-5 object-contain"
    />),
    path: "/full-final",
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
        ${isActive
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
          ${isActive
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
          ${isActive
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
        ${isActive
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

      {/* {openConfig && (
        <div className="mt-1 space-y-2">
     
          <Level1MenuItem
            item={configItem.children[0]}
            isActive={activeItem === "pfConfiguration"}
            onClick={() => {
              setActiveItem("pfConfiguration");
              navigate("/pfConfiguration");
            }}
            hasArrow={false}
          />

   
          <Level1MenuItem
            item={configItem.children[1]}
            isActive={activeItem === "incomeTax"}
            onClick={() => {
              setActiveItem("incomeTax");
              navigate("/incomeTax");
            }}
            hasArrow={false}
          />

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
             
                <Level2MenuItem
                  item={configItem.children[2].children[0]}
                  isActive={activeItem === "Statutory Configuration"}
                  onClick={() => {
                    setActiveItem("Statutory Configuration");
                    navigate("/statuoryConfiguration");
                  }}
                  hasArrow={false}
                />

                
                <Level2MenuItem
                  item={configItem.children[2].children[1]}
                  isActive={activeItem === "Income Tax and Tax Configuration"}
                  onClick={() => {
                    setActiveItem("Income Tax and Tax Configuration");
                    navigate("/payroll/tax");
                  }}
                  hasArrow={false}
                />

             
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
                 
                      <Level3MenuItem
                        item={configItem.children[2].children[2].children[0]}
                        isActive={activeItem === "Earnings"}
                        onClick={() => {
                          setActiveItem("Earnings");
                          navigate("/payroll/paycode/earnings");
                        }}
                      />

          
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

 
          <Level1MenuItem
            item={configItem.children[3]}
            isActive={activeItem === "Leave"}
            onClick={() => {
              setActiveItem("Leave");
              navigate("/leave");
            }}
            hasArrow={false}
          />

        
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
      )} */}

      {openConfig && (
        <div className="mt-1 space-y-2">
          {configItem.children.map((child) => (
            <Level1MenuItem
              key={child.name}
              item={child}
              isActive={activeItem === child.name}
              onClick={() => {
                setActiveItem(child.name);
                navigate(child.path);
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
};


const ReportsMenu = ({ activeItem, setActiveItem }) => {

  const [openReports, setOpenReports] = useState(false);
  const reportsItem = menuItems.find((item) => item.name === "Reports");
  const navigate = useNavigate();

  if (!reportsItem) return null;

  return (
    <div>

      {/* Main Reports */}
      <Level0MenuItem
        item={reportsItem}
        isActive={activeItem === "Reports"}
        onClick={() => {
          setOpenReports(!openReports);
          setActiveItem("Reports");
        }}
      />

      {/* Children */}
      {openReports && (
        <div className="mt-1 space-y-2">

          {reportsItem.children.map((child) => (
            <Level1MenuItem
              key={child.name}
              item={child}
              isActive={activeItem === child.name}
              onClick={() => {
                setActiveItem(child.name);
                navigate(child.path);
              }}
            />
          ))}

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
      {/* <Level0MenuItem
        item={menuItems[2]}
        isActive={activeItem === "Employee List"}
        onClick={() => {
          setActiveItem("Employee List");
          navigate("/EmployeeList");
        }}
      /> */}

      {/* Attendance */}
      {/* <Level0MenuItem
        item={menuItems[3]}
        isActive={activeItem === "Attendance"}
        onClick={() => {
          setActiveItem("Attendance");
          navigate("/monthlyAttendance");
        }}
      /> */}

      {/* Other menu items */}
      {menuItems.slice(2).map((item) => {

        if (item.name === "Reports") {
          return (
            <ReportsMenu
              key={item.name}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          );
        }

        return (
          <Level0MenuItem
            key={item.name}
            item={item}
            isActive={activeItem === item.name}
            onClick={() => {
              setActiveItem(item.name);
              if (item.path) navigate(item.path);
            }}
          />
        );

      })}

    </div>
  );
};

export default SideBar;