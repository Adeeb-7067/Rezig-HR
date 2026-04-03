import React, { useState, useEffect, useMemo } from "react";
import { GoTriangleRight } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import { ICONS } from "@/lib/constant";

/* =========================
   MENU CONFIG
========================= */

const menuItems = [
  {
    name: "Dashboard",
    icon: <img src={ICONS.dashboard} alt="dashboard" className="h-5 w-5 object-contain" />,
    path: "/dashboard",
  },
  {
    name: "Configuration",
    icon: <img src={ICONS.configuration} alt="configuration" className="h-5 w-5 object-contain" />,
    children: [
      { name: "Organization Details", path: "/organizationdetails" },
      { name: "Statutory Configuration", path: "/pfconfiguration" },
      { name: "Income Tax Configuration", path: "/incometax" },
      { name: "Pay Code Master and Formula", path: "/paycodemaster" },
      { name: "Attendance Configuration", path: "/attendence-configuration" },
      { name: "Leave Configuration", path: "/leave" },
    ],
  },
  {
    name: "Employee List",
    icon: <img src={ICONS.employee} alt="employee" className="h-5 w-5 object-contain" />,
    path: "/EmployeeList",
  },
  {
    name: "Attendance",
    icon: <img src={ICONS.attendance} alt="attendance" className="h-5 w-5 object-contain" />,
    path: "/monthlyAttendance",
  },
  {
    name: "Attendance Regularization",
    icon: <img src={ICONS.AttendanceRegularization} alt="attendanceRegularization" className="h-5 w-5 object-contain" />,
    path: "/attendance-regularization",
  },
  {
    name: "Loan Assignment",
    icon: <img src={ICONS.LoanAssignment} alt="loanAssignment" className="h-5 w-5 object-contain" />,
    path: "/loanassignment",
  },
  {
    name: "Payroll Dashboard",
    icon: <img src={ICONS.payrollDashboard} alt="payrollDashboard" className="h-5 w-5 object-contain" />,
    path: "/payrolldashboard",
  },
  {
    name: "Employee Dashboard",
    icon: <img src={ICONS.employeeDashboard} alt="employeeDashboard" className="h-5 w-5 object-contain" />,
    path: "/employee-dashboard",
  },
  {
    name: "Reports",
    icon: <img src={ICONS.report} alt="report" className="h-5 w-5 object-contain" />,
    children: [
      { name: "Report Builder", path: "/report-builder" },
      { name: "Bank Builder", path: "/bank-builder" },
    ],
  },
  {
    name: "Full and Final Individual",
    icon: <img src={ICONS.fullAndFinal} alt="fullAndFinal" className="h-5 w-5 object-contain" />,
    path: "/full-final",
  },
];

/* =========================
   PATH MAP BUILDER
   Maps every path to { name, parent }
   so we can derive active state from URL
========================= */

function buildPathMap(items) {
  const map = {};
  items.forEach((item) => {
    if (item.path) {
      map[item.path.toLowerCase()] = { name: item.name, parent: null };
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.path) {
          map[child.path.toLowerCase()] = { name: child.name, parent: item.name };
        }
      });
    }
  });
  return map;
}

/* =========================
   LEVEL 0 ITEM
========================= */

const Level0MenuItem = ({ item, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 p-2 text-[0.7rem] font-semibold rounded cursor-pointer transition whitespace-nowrap
      ${active
        ? "ds-bg-primary text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-ds-primary hover:text-white"
      }`}
  >
    {item.icon}
    {item.name}
  </div>
);

/* =========================
   LEVEL 1 ITEM
========================= */

const Level1MenuItem = ({ item, active, onClick }) => (
  <div className="ml-6 relative">
    <div
      onClick={onClick}
      className={`flex items-center text-[0.7rem] font-medium px-2 py-1 cursor-pointer rounded transition whitespace-nowrap
        ${active
          ? "bg-ds-primary/10 ds-text-primary dark:bg-ds-primary/30 dark:text-ds-primary"
          : "text-gray-700 dark:text-gray-300 hover:bg-ds-primary hover:text-white"
        }`}
    >
      {active && (
        <GoTriangleRight className="absolute -left-4 ds-text-primary dark:text-ds-primary" />
      )}
      {item.name}
    </div>
  </div>
);

/* =========================
   SIDEBAR
========================= */

const SideBar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);

  // Build path lookup once
  const pathMap = useMemo(() => buildPathMap(menuItems), []);

  // ✅ Derive active item & parent directly from current URL
  const currentPath = location.pathname.toLowerCase();
  const currentEntry = pathMap[currentPath] || null;
  const activeName = currentEntry?.name || "";
  const activeParent = currentEntry?.parent || "";

  // ✅ Auto-open parent menu when URL matches a child route
  // Works on: page refresh, direct URL, browser back/forward
  useEffect(() => {
    if (activeParent && !openMenus.includes(activeParent)) {
      setOpenMenus((prev) => [...prev, activeParent]);
    }
  }, [activeParent]);

  const handleNavigation = (name, path) => {
    if (path) navigate(path);
    // Close mobile sidebar
    if (setSidebarOpen) setSidebarOpen(false);
  };

  // ✅ Multiple menus can be open at once
  const toggleMenu = (menuName) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((m) => m !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col gap-1 overflow-y-auto rounded-lg p-2 no-scrollbar">
      {menuItems.map((item) => {
        const isOpen = openMenus.includes(item.name);

        // ✅ Parent with children
        if (item.children) {
          // Parent is active if a child is active OR parent itself is active
          const isParentActive = activeParent === item.name || activeName === item.name;

          return (
            <div key={item.name}>
              <Level0MenuItem
                item={item}
                active={isParentActive}
                onClick={() => toggleMenu(item.name)}
              />
              {isOpen && (
                <div className="mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Level1MenuItem
                      key={child.name}
                      item={child}
                      active={activeName === child.name}
                      onClick={() => handleNavigation(child.name, child.path)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Simple item
        return (
          <Level0MenuItem
            key={item.name}
            item={item}
            active={activeName === item.name}
            onClick={() => handleNavigation(item.name, item.path)}
          />
        );
      })}
    </div>
  );
};

export default SideBar;