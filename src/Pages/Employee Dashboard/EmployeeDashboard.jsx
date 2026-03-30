import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Megaphone,
  Download,
  MessageCircle,
  Calendar as CalendarIcon,
  Gift,
  TrendingUp,
  TrendingDown,
  Eye,
  Upload,
  Search,
  Bell,
  X,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  BellDot,
  MessageSquareMore,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DatePickerField from "@/components/ui/datePicker";
import AttendanceCalendar from "@/Pages/AttendanceRegularisation/components/AttendanceCalendar";
import AttendanceRegularizeModal from "@/Pages/AttendanceRegularisation/components/AttendanceRegularizeModal";
import AttendanceBulkRegularizeModal from "@/Pages/AttendanceRegularisation/components/AttendanceBulkRegularizeModal";

/* ========== SALARY DETAILS ========== */
const salaryMonths = [
  {
    month: "Oct 2026",
    payPeriod: "1 Oct - 31 Oct 2026",
    paymentDate: "31 Oct 2026",
    netPay: "₹28,500",
    grossEarnings: "₹31,200",
    totalDeductions: "₹3,300",
    earnings: [
      { label: "Basic Salary", amount: "₹18,000" },
      { label: "HRA", amount: "₹7,200" },
      { label: "Conveyance Allowance", amount: "₹1,800" },
      { label: "Special Allowance", amount: "₹4,200" },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: "₹2,160" },
      { label: "Professional Tax (PT)", amount: "₹200" },
      { label: "Income Tax", amount: "₹940" },
    ],
  },
  {
    month: "Nov 2026",
    payPeriod: "1 Nov - 30 Nov 2026",
    paymentDate: "30 Nov 2026",
    netPay: "₹28,500",
    grossEarnings: "₹31,200",
    totalDeductions: "₹3,300",
    earnings: [
      { label: "Basic Salary", amount: "₹18,000" },
      { label: "HRA", amount: "₹7,200" },
      { label: "Conveyance Allowance", amount: "₹1,800" },
      { label: "Special Allowance", amount: "₹4,200" },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: "₹2,160" },
      { label: "Professional Tax (PT)", amount: "₹200" },
      { label: "Income Tax", amount: "₹940" },
    ],
  },
  {
    month: "Dec 2026",
    payPeriod: "1 Dec - 31 Dec 2026",
    paymentDate: "31 Dec 2026",
    netPay: "₹28,500",
    grossEarnings: "₹31,200",
    totalDeductions: "₹3,300",
    earnings: [
      { label: "Basic Salary", amount: "₹18,000" },
      { label: "HRA", amount: "₹7,200" },
      { label: "Conveyance Allowance", amount: "₹1,800" },
      { label: "Special Allowance", amount: "₹4,200" },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: "₹2,160" },
      { label: "Professional Tax (PT)", amount: "₹200" },
      { label: "Income Tax", amount: "₹940" },
    ],
  },
  {
    month: "Jan 2027",
    payPeriod: "1 Jan - 31 Jan 2027",
    paymentDate: "31 Jan 2027",
    netPay: "₹31,500",
    grossEarnings: "₹33,200",
    totalDeductions: "₹3,300",
    earnings: [
      { label: "Basic Salary", amount: "₹18,000" },
      { label: "HRA", amount: "₹7,200" },
      { label: "Conveyance Allowance", amount: "₹1,800" },
      { label: "Special Allowance", amount: "₹4,200" },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: "₹2,160" },
      { label: "Professional Tax (PT)", amount: "₹200" },
      { label: "Income Tax", amount: "₹940" },
    ],
  },
  {
    month: "Feb 2027",
    payPeriod: "1 Feb - 28 Feb 2027",
    paymentDate: "28 Feb 2027",
    netPay: "₹32,500",
    grossEarnings: "₹33,200",
    totalDeductions: "₹3,300",
    earnings: [
      { label: "Basic Salary", amount: "₹18,000" },
      { label: "HRA", amount: "₹7,200" },
      { label: "Conveyance Allowance", amount: "₹1,800" },
      { label: "Special Allowance", amount: "₹4,200" },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: "₹2,160" },
      { label: "Professional Tax (PT)", amount: "₹200" },
      { label: "Income Tax", amount: "₹940" },
    ],
  },
  {
    month: "Mar 2027",
    payPeriod: "1 Mar - 31 Mar 2027",
    paymentDate: "31 Mar 2027",
    netPay: "₹33,500",
    grossEarnings: "₹35,200",
    totalDeductions: "₹3,300",
    earnings: [
      { label: "Basic Salary", amount: "₹18,000" },
      { label: "HRA", amount: "₹7,200" },
      { label: "Conveyance Allowance", amount: "₹1,800" },
      { label: "Special Allowance", amount: "₹4,200" },
    ],
    deductions: [
      { label: "Provident Fund (PF)", amount: "₹2,160" },
      { label: "Professional Tax (PT)", amount: "₹200" },
      { label: "Income Tax", amount: "₹940" },
    ],
  },
];

/* Single month salary card (one of the 3 cards) – click opens salary details modal */
const SalaryMonthCard = ({
  month,
  netPay,
  grossEarnings,
  totalDeductions,
  showAvatars,
  onClick,
}) => (
  <div
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    }}
    className="bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-100 dark:border-gray-700 p-3 relative flex-1 min-w-0 cursor-pointer hover:border-purple-200 dark:hover:border-purple-700 transition-all hover:shadow-lg"
  >
    <div
      className="absolute top-3 right-3 flex items-center gap-1"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
        aria-label="View"
        onClick={onClick}
      >
        <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </button>
      <button
        type="button"
        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
        aria-label="Download"
      >
        <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
    <p className="text-[0.65rem] font-light text-gray-400 dark:text-gray-300 mb-2">
      {month}
    </p>

    <div className="bg-[#FAF6FE] dark:bg-gray-700 flex flex-col items-center justify-center mb-2 rounded-lg py-3 px-4">
      <p className="text-[0.8rem] md:text-[1rem] font-medium text-[#8629DF] dark:text-purple-400">
        {netPay}
      </p>
      <p className="text-[0.7rem] font-medium text-gray-500 dark:text-gray-400">
        Net Pay
      </p>
    </div>

    <div className="flex items-center justify-between pt-2">
      <div className="flex items-center text-[0.7rem] font-semibold text-green-500 dark:text-green-400">
        <span>
          <ArrowUp className="w-3 h-3 text-green-500 dark:text-green-400" />
        </span>
        <span>{grossEarnings}</span>
      </div>
      <div className="flex items-center text-[0.7rem] font-semibold text-red-500 dark:text-red-400">
        <span>
          <ArrowDown className="w-3 h-3 text-red-500 dark:text-red-400" />
        </span>
        <span>{totalDeductions}</span>
      </div>
    </div>
  </div>
);

/* Modal: Salary Details – EARNINGS (green) | DEDUCTIONS (pink), Download button */
const SalaryDetailsModal = ({ salary, onClose, onDownload }) => {
  if (!salary) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 w-[100%]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-xl w-full max-h-[70vh] overflow-auto border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-[1.1rem] font-bold text-[#333333] dark:text-gray-100">
            Salary Details
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[0.9rem] font-medium text-gray-600 dark:text-gray-400">
              {salary.month}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {/* EARNINGS */}
          <div className="m-4 rounded-sm border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
            <p className="text-[0.75rem] text-[#333333] dark:text-gray-200 uppercase tracking-wide px-3 py-2 rounded bg-green-50 dark:bg-green-900/30 mb-3">
              Earnings
            </p>
            <ul className="space-y-2 mb-3 mx-3">
              {(salary.earnings || []).map((e, i) => (
                <li
                  key={i}
                  className="flex justify-between text-[0.8rem] text-[#333333] dark:text-gray-300"
                >
                  <span>{e.label}</span>
                  <span className="font-medium">{e.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mx-3 border-t-2 border-green-200 dark:border-green-300" />
            <div className="flex justify-between items-center px-3 py-2 rounded bg-green-50 dark:bg-green-900/30 text-[0.85rem] font-bold text-green-600 dark:text-green-400">
              <span>Total</span>
              <span>{salary.grossEarnings}</span>
            </div>
          </div>

          {/* DEDUCTIONS */}
          <div className="m-4 bg-pink-50 dark:bg-red-900/20 rounded-sm">
            <p className="text-[0.75rem] font-bold text-[#333333] dark:text-gray-200 uppercase tracking-wide px-3 py-2 rounded dark:bg-red-900/30 mb-3">
              Deductions
            </p>
            <ul className="space-y-2 mb-3 mx-3">
              {(salary.deductions || []).map((d, i) => (
                <li
                  key={i}
                  className="flex justify-between text-[0.8rem] text-[#333333] dark:text-gray-300"
                >
                  <span>{d.label}</span>
                  <span className="font-medium">{d.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mx-3 border-t-2 border-red-200 dark:border-red-300" />
            <div className="flex justify-between items-center px-3 py-2 rounded dark:bg-red-900/30 text-[0.85rem] font-bold text-red-500 dark:text-red-400">
              <span>Total</span>
              <span>{salary.totalDeductions}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            type="button"
            onClick={() => {
              onDownload?.(salary);
              onClose?.();
            }}
            className="px-5 py-1 rounded-sm bg-[#8629DF] text-white text-[0.75rem] font-medium hover:opacity-90"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

const SalaryDetailsCard = () => {
  const [modalSalary, setModalSalary] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(salaryMonths.length / itemsPerPage);

  // Get current 3 months to display
  const currentSalaryMonths = salaryMonths.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full">
      {modalSalary && (
        <SalaryDetailsModal
          salary={modalSalary}
          onClose={() => setModalSalary(null)}
          onDownload={() => {}}
        />
      )}
      {/* Purple header with title + nav arrows + icons */}
      <div className="flex items-center justify-between bg-[#8629DF] dark:bg-purple-800 rounded-t-xl px-4 py-2 w-[100%]">
        <div className="flex items-center gap-2">
          <img
            src="/user.png"
            alt="Salary"
            className="w-6 h-6 invert brightness-0"
          />
          <h2 className="text-[0.7rem] font-bold text-white">Salary Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            // className="p-0.5 rounded bg-white/20 text-white hover:bg-white/30 cursor-pointer"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`p-0.5 rounded text-white transition-all ${
              currentPage === 0
                ? "bg-white/10 cursor-not-allowed opacity-50"
                : "bg-white/20 hover:bg-white/30 cursor-pointer"
            }`}
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            // className="p-0.5 rounded bg-white/20 text-white hover:bg-white/30 cursor-pointer"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`p-0.5 rounded text-white transition-all ${
              currentPage === totalPages - 1
                ? "bg-white/10 cursor-not-allowed opacity-50"
                : "bg-white/20 hover:bg-white/30 cursor-pointer"
            }`}
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      {/* 3 cards in a row – click opens modal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 dark:bg-gray-900/50">
        {currentSalaryMonths.map((s, i) => (
          <SalaryMonthCard
            key={s.month}
            month={s.month}
            netPay={s.netPay}
            grossEarnings={s.grossEarnings}
            totalDeductions={s.totalDeductions}
            showAvatars={i === 1} // Optional: keep middle one with avatar
            onClick={() => setModalSalary(s)}
          />
        ))}
      </div>
    </div>
  );
};

/* ========== ANNOUNCEMENTS & TASKS ========== */
const announcementTabs = [
  { label: "Important", value: "important" },
  { label: "Action Required", value: "action" },
  { label: "General", value: "general" },
  { label: "Reminder", value: "reminder" },
];

const announcements = [
  { title: "Office Closed", meta: "26 Jan - Republic Day", tag: "important" },
  {
    title: "System Maintenance",
    meta: "15 Feb, 2:00 AM - 6:00 AM",
    tag: "important",
  },
  {
    title: "Security Policy Update",
    meta: "Effective from 1 Mar 2026",
    tag: "important",
  },
  {
    title: "HR Policy Uploaded",
    meta: "Documents",
    hasDownload: true,
    tag: "general",
  },
  {
    title: "New Cafeteria Menu",
    meta: "Available from next week",
    tag: "general",
  },
  { title: "Team Outing - Save the Date", meta: "20 Mar 2026", tag: "general" },
  { title: "Insurance Nomination", meta: "Submit by 28 Feb", tag: "general" },
  { title: "Q1 Targets", meta: "Action Required", tag: "action" },
  {
    title: "Leave Balance Declaration",
    meta: "Confirm by 5 Feb",
    tag: "action",
  },
  {
    title: "Tax Declaration Documents",
    meta: "Upload by 15 Mar",
    tag: "action",
  },
  { title: "Bonus Payout", meta: "Scheduled in March", tag: "reminder" },
  { title: "PF Nomination Review", meta: "Due by 10 Feb", tag: "reminder" },
  {
    title: "Annual Health Check-up",
    meta: "Book slot before 28 Feb",
    tag: "reminder",
  },
];

/* First announcement per category for the 2x2 cards (matches Figma) */
const announcementCardByCategory = [
  {
    tag: "important",
    label: "Important",
    dot: "bg-orange-500",
    glow: "rgba(249,115,22,0.6)",
    textColor: "text-orange-600 dark:text-orange-400",
    title: "Office Closed",
    meta: "26 Jan • Republic Day",
    bg: "bg-orange-50/50 dark:bg-orange-950/20",
  },
  {
    tag: "general",
    label: "General",
    dot: "bg-sky-400",
    glow: "rgba(56,189,248,0.6)",
    textColor: "text-sky-600 dark:text-sky-400",
    title: "HR Policy Uploaded",
    meta: "Documents",
    hasDownload: true,
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
  },
  {
    tag: "action",
    label: "Action Required",
    dot: "bg-green-500",
    glow: "rgba(34,197,94,0.6)",
    textColor: "text-green-600 dark:text-green-400",
    title: "Q1 Targets",
    meta: "Action Required",
    bg: "bg-green-50/50 dark:bg-green-950/20",
  },
  {
    tag: "reminder",
    label: "Reminder",
    dot: "bg-amber-500",
    glow: "rgba(245,158,11,0.6)",
    textColor: "text-amber-600 dark:text-amber-400",
    title: "Bonus Payout",
    meta: "Scheduled In March",
    bg: "bg-orange-50/50 dark:bg-orange-950/20",
  },
];

const AnnouncementsCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl  overflow-hidden">
      {/* Header: purple bar with megaphone icon and title */}
      <div className="flex items-center gap-2 bg-[#8629DF] px-4 py-2">
        <Megaphone className="w-5 h-5 text-white shrink-0 fill-white" />
        <h2 className="text-[0.7rem] font-bold text-white">
          Announcements & Tasks
        </h2>
      </div>

      {/* 2x2 grid of category cards (Figma) */}
      <div className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {announcementCardByCategory.map((card, i) => (
            <div
              key={card.tag}
              className={cn(
                "rounded-lg border border-gray-100 dark:border-gray-700 p-3 hover:shadow-sm transition-all",
                card.bg,
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn("w-2.5 h-2.5 rounded-full shrink-0", card.dot)}
                  style={{
                    boxShadow: `0 0 8px 2px ${card.glow}`,
                  }}
                />
                <span className={cn("text-[0.8rem] font-bold", card.textColor)}>
                  {card.label}
                </span>
              </div>
              <p className="text-[0.8rem] font-bold text-[#333333] dark:text-gray-100 mb-0.5 whitespace-nowrap">
                {card.title}
              </p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-[0.7rem] ${card.hasDownload ? "text-[#8629DF] dark:text-gray-400" : "text-gray-500 dark:text-gray-400"} font-medium`}
                >
                  {card.meta}
                </p>
                {card.hasDownload && (
                  <button
                    type="button"
                    className="p-1 rounded hover:bg-white/50 text-[#8629DF] shrink-0"
                    aria-label="Download"
                  >
                    <Download size={14} className="stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ========== MONTHLY ATTENDANCE PIE CHART ========== */
const attendancePieData = [
  { name: "Present", value: 75, color: "#34C759" },
  { name: "Absent(LOP)", value: 5, color: "#FF383C" },
  { name: "Leave", value: 6, color: "#8629DF" },
  { name: "Half Day", value: 15, color: "#FFCC00  " },
];

/* Summary row below charts (count + label + colored dot) */
const attendanceSummary = [
  { count: 18, label: "Present", color: "bg-green-500" },
  { count: 0, label: "LOP", color: "bg-red-500" },
  { count: 2, label: "Half Day", color: "bg-amber-500" },
  { count: 1, label: "Leave", color: "bg-purple-500" },
];

const GRAY_RING = "#E5E7EB";

const AttendancePieCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
    <h2 className="text-[1rem] font-bold text-[#8629DF] dark:text-purple-400 mb-8">
      Monthly Attendance Piechart
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {attendancePieData.map((entry, i) => {
        const dataWithGray = [
          { value: entry.value, color: entry.color },
          { value: 100 - entry.value, color: "#F3F4F6" },
        ];
        return (
          <div key={i} className="flex flex-col items-center">
            <div className="w-28 h-28 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataWithGray}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="100%"
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {dataWithGray.map((seg, j) => (
                      <Cell key={j} fill={seg.color} className="rounded-full" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[1rem] font-bold text-[#333333] dark:text-gray-100">
                  {String(entry.value).padStart(2, "0")}%
                </span>
              </div>
            </div>
            <span className="text-[0.8rem] font-bold text-gray-600 dark:text-gray-300 mt-4">
              {entry.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ========== WISHES ========== */
const wishesByTab = {
  birthday: [
    {
      name: "Rohit Verma",
      date: "1/21/2025",
      img: "https://i.pravatar.cc/101",
    },
    {
      name: "Priya Sharma",
      date: "1/22/2025",
      img: "https://i.pravatar.cc/102",
    },
    { name: "Amit Kumar", date: "1/23/2025", img: "https://i.pravatar.cc/103" },
    {
      name: "Sneha Singh",
      date: "1/24/2025",
      img: "https://i.pravatar.cc/104",
    },
  ],
  anniversary: [
    { name: "Neha Verma", date: "1/21/2025", img: "https://i.pravatar.cc/201" },
    {
      name: "Rajesh Mehta",
      date: "1/18/2025",
      img: "https://i.pravatar.cc/202",
    },
    {
      name: "Anita Desai",
      date: "1/25/2025",
      img: "https://i.pravatar.cc/203",
    },
  ],
  joining: [
    {
      name: "Ankit Jain",
      date: "1/21/2025",
      meta: "Joined Today",
      img: "https://i.pravatar.cc/301",
    },
    {
      name: "Anil Pawar",
      date: "1/21/2025",
      meta: "Joined Yesterday",
      img: "https://i.pravatar.cc/302",
    },
    {
      name: "Vikram Reddy",
      date: "1/21/2025",
      meta: "Joined 1 Feb 2026",
      img: "https://i.pravatar.cc/303",
    },
  ],
};

const wishTabConfig = {
  birthday: { label: "Birthday", buttonText: "Send Wish", count: 4 },
  anniversary: {
    label: "Work Anniversary",
    buttonText: "Congratulate",
    count: 3,
  },
  joining: { label: "New Joining", buttonText: "Welcome strip", count: 3 },
};

const WishesCard = () => {
  const [activeTab, setActiveTab] = useState("birthday");
  const wishesList = wishesByTab[activeTab] || wishesByTab.birthday;
  const config = wishTabConfig[activeTab] || wishTabConfig.birthday;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Purple header with chat bubble icon (Figma) – no arrows */}
      <div className="flex items-center gap-2 bg-[#8629DF] px-4 py-2">
        <MessageSquareMore className="w-4 h-4 text-white shrink-0 fill-white" />
        <h2 className="text-[0.7rem] font-bold text-white">Wishes</h2>
      </div>
      <div className="p-4">
        {/* Tabs with count – active tab has purple underline */}
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-600 mb-4 px-2">
          {["birthday", "anniversary", "joining"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-3 text-[0.8rem] font-medium transition-colors relative",
                activeTab === tab
                  ? "text-[#8629DF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8629DF]"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {tab === "birthday" && "Birthday(4)"}
              {tab === "anniversary" && "Work Anniversary(3)"}
              {tab === "joining" && "Joining(3)"}
            </button>
          ))}
        </div>
        {/* Scrollable list of cards – each with label, avatar, name, date, button (Figma) */}
        <ul className="space-y-[14px] max-h-[320px] overflow-y-auto table-scroll py-4">
          {/* {wishesList.map((p, i) => (
            <li
              key={i}
              className="rounded-lg border border-gray-200 dark:border-gray-600 p-3 bg-gray-50/80 dark:bg-gray-700/30 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                    {config.label}
                  </p>
                  <p className="text-[0.8rem] font-semibold text-[#333333] dark:text-gray-200 truncate">
                    {p.name}
                    {p.meta && (
                      <span className="font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        – {p.meta}
                      </span>
                    )}
                  </p>
                  <p className="text-[0.7rem] text-gray-500 dark:text-gray-400">
                    Date: {p.date}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-md bg-[#8629DF] text-white text-[0.7rem] font-bold hover:shadow-md transition-shadow shrink-0"
              >
                Send Wish
              </button>
            </li>
          ))} */}
          {wishesList.map((p, i) => (
            <li
              key={i}
              className="relative rounded-lg border border-gray-200 dark:border-gray-600 p-3 pt-4 bg-gray-50/80 dark:bg-gray-700/30 flex items-center justify-between gap-3"
            >
              {/* Top Chip */}
              <span
                className={`absolute -top-2 left-5 ${activeTab === "anniversary" ? "bg-blue-100 text-blue-600" : activeTab === "joining" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"} text-[0.65rem] px-2 py-0.5 rounded-full font-medium`}
              >
                {config.label}
              </span>

              <div className="flex items-center gap-3 min-w-0 flex-1 pt-1">
                <div className="relative w-10 h-10 shrink-0">
                  {/* Profile Image */}
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  {/* 3Yr Badge - Exactly like your image */}
                  {activeTab === "anniversary" && (
                    <div
                      className="absolute -top-1 -right-1 bg-[#3B82F6] text-white text-[0.5rem] 
                  w-5 h-5 flex items-center justify-center rounded-full shadow-sm "
                    >
                      3Yr
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[0.8rem] font-semibold text-[#333333] dark:text-gray-200 truncate">
                    {p.name}
                    {p.meta && (
                      <span className="font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        – {p.meta}
                      </span>
                    )}
                  </p>
                  <p className="text-[0.7rem] text-gray-500 dark:text-gray-400">
                    Date: {p.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="px-3 py-1.5 rounded-md bg-[#8629DF] text-white text-[0.7rem] font-bold hover:shadow-md transition-shadow shrink-0"
              >
                {activeTab === "birthday"
                  ? "Send Wish"
                  : activeTab === "anniversary"
                    ? "Congratulate"
                    : "Welcome Strip"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ========== CALENDAR (compact month view – fits without horizontal scroll, same component as attendance-regularization) ========== */
const legendItems = [
  { code: "P", label: "Present", color: "bg-green-500" },
  { code: "A", label: "LOP", color: "bg-red-500" },
  { code: "W", label: "Week Off", color: "bg-gray-400" },
  { code: "H", label: "Holiday", color: "bg-blue-500" },
  { code: "M", label: "Half Day", color: "bg-amber-500" },
  { code: "S", label: "Leave", color: "bg-purple-500" },
];

const summaryBoxes = [
  { count: 18, label: "Present", color: "#22c55e" }, // green-500
  { count: 0, label: "LOP", color: "#ef4444" }, // red-500
  { count: 2, label: "Half Day", color: "#3b82f6" }, // blue-500
  { count: 1, label: "Leave", color: "#a855f7" }, // purple-500
];

/* Day status for May 2015 (day of month -> status codes) – supports full tooltip when passed as full data */
const may2015DayData = {
  1: {
    status: ["M", "P"],
    in: "9:25",
    out: "18:25",
    shift: "Gurugram Office",
    icon: "sun",
  },
  2: {
    status: "P",
    in: "9:02",
    out: "18:05",
    shift: "Gurugram Office",
    icon: "sun",
  },
  3: {
    status: "P",
    in: "8:58",
    out: "18:01",
    shift: "Gurugram Office",
    icon: "sun",
  },
  4: { status: "W" },
  5: {
    status: "P",
    in: "9:10",
    out: "18:15",
    shift: "Gurugram Office",
    icon: "sun",
  },
  6: {
    status: "P",
    in: "8:55",
    out: "18:00",
    shift: "Gurugram Office",
    icon: "sun",
  },
  7: { status: "W" },
  8: {
    status: "P",
    in: "9:25",
    out: "18:25",
    shift: "Gurugram Office",
    icon: "sun",
  },
  9: { status: "H" },
  10: {
    status: "P",
    in: "9:00",
    out: "18:10",
    shift: "Gurugram Office",
    icon: "sun",
  },
  11: {
    status: "P",
    in: "8:58",
    out: "18:01",
    shift: "Gurugram Office",
    icon: "sun",
  },
  12: {
    status: "M",
    in: "9:25",
    out: "18:25",
    shift: "Gurugram Office",
    icon: "sun",
  },
  13: {
    status: "P",
    in: "9:03",
    out: "18:05",
    shift: "Gurugram Office",
    icon: "sun",
  },
  14: { status: "W" },
  15: {
    status: "P",
    in: "8:58",
    out: "18:01",
    shift: "Gurugram Office",
    icon: "sun",
  },
  16: {
    status: "P",
    in: "9:15",
    out: "18:20",
    shift: "Gurugram Office",
    icon: "sun",
  },
  17: {
    status: "P",
    in: "9:00",
    out: "18:00",
    shift: "Gurugram Office",
    icon: "sun",
  },
  18: { status: "W" },
  19: {
    status: "P",
    in: "8:58",
    out: "18:01",
    shift: "Gurugram Office",
    icon: "sun",
  },
  20: {
    status: "P",
    in: "9:10",
    out: "18:10",
    shift: "Gurugram Office",
    icon: "sun",
  },
  21: { status: "A" },
  22: { status: "S" },
  23: {
    status: "P",
    in: "9:25",
    out: "18:25",
    shift: "Gurugram Office",
    icon: "sun",
  },
  24: {
    status: "P",
    in: "9:00",
    out: "18:00",
    shift: "Gurugram Office",
    icon: "sun",
  },
  25: { status: "W" },
  26: {
    status: "P",
    in: "8:58",
    out: "18:01",
    shift: "Gurugram Office",
    icon: "sun",
  },
  27: {
    status: "P",
    in: "9:05",
    out: "18:05",
    shift: "Gurugram Office",
    icon: "sun",
  },
  28: {
    status: "P",
    in: "9:12",
    out: "18:15",
    shift: "Gurugram Office",
    icon: "sun",
  },
  29: {
    status: "P",
    in: "9:00",
    out: "18:00",
    shift: "Gurugram Office",
    icon: "sun",
  },
  30: { status: "W" },
  31: {
    status: "P",
    in: "9:25",
    out: "18:25",
    shift: "Gurugram Office",
    icon: "sun",
  },
};

const CalendarCard = () => {
  const [multipleCorrection, setMultipleCorrection] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [regularizeModal, setRegularizeModal] = useState({
    open: false,
    day: null,
    month: 4,
    year: 2015,
  });
  const [bulkRegularizeOpen, setBulkRegularizeOpen] = useState(false);

  const openSingleModal = (day) => {
    setRegularizeModal({ open: true, day, month: 4, year: 2015 });
  };

  const [formData, setFormData] = useState({
    currentDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 min-w-0">
      {/* <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#F3E9FF] dark:bg-purple-900/30 flex items-center justify-center">
          <CalendarIcon className="w-4 h-4 text-[#8629DF]" />
        </div>
        <h2 className="text-[1rem] font-bold text-[#333333] dark:text-gray-400">
          Attendance Calendar
        </h2>
      </div> */}

      {/* Month + summary pills – matches design image */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
        {/* <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-700">
          <span className="px-3 py-2 text-[0.8rem] font-medium text-[#333333] dark:text-gray-200 min-w-[90px]">
            May 2015
          </span>
        </div> */}
        <div className="w-50">
          <DatePickerField
            type="date"
            name="currentDate"
            value={formData.currentDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {summaryBoxes.map((b, i) => (
            <span
              key={i}
              className="px-2.5 py-1.5 rounded-md border min-w-[5rem] border-gray-200 dark:border-gray-600 border-t-2 text-[0.7rem] font-medium flex items-center gap-1.5 bg-white dark:bg-gray-700 text-[#333333] dark:text-gray-200"
              style={{ borderTopColor: b.color }}
            >
              <span className="text-[#8629DF]">{b.count}</span> - {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap border-1
      py-1 rounded-sm justify-evenly justify-content-evenly gap-x-4 gap-y-1 mb-3 text-[0.7rem] text-gray-600 dark:text-gray-400"
      >
        {legendItems.map((l, i) => (
          <span key={i} className="flex items-center gap-1 font-bold">
            <span
              className={cn("w-2.5 h-2.5 rounded-full shrink-0", l.color)}
            />
            {l.code} - {l.label}
          </span>
        ))}
      </div>

      {/* Enable Multiple Correction */}
      <div className="flex items-center gap-2 mb-3">
        <label className="text-[0.7rem] font-medium text-gray-600 dark:text-gray-400">
          Enable Multiple Correction
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={multipleCorrection}
          onClick={() => setMultipleCorrection((v) => !v)}
          className={cn(
            "w-9 h-5 rounded-full transition relative flex-shrink-0",
            multipleCorrection
              ? "bg-[#8629DF]"
              : "bg-gray-300 dark:bg-gray-600",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 block w-4 h-4 rounded-full bg-white shadow transition",
              multipleCorrection ? "translate-x-4" : "translate-x-0",
            )}
          />
        </button>
      </div>

      {/* Compact month grid – click a date to open regularize modal */}
      <div className="w-full min-w-0 max-w-full">
        <AttendanceCalendar
          month={4}
          year={2015}
          attendanceDataOverride={may2015DayData}
          compact={true}
          multipleCorrection={multipleCorrection}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          openSingleModal={openSingleModal}
        />
      </div>
      <AttendanceRegularizeModal
        open={regularizeModal.open}
        onClose={() => setRegularizeModal((p) => ({ ...p, open: false }))}
        day={regularizeModal.day}
        month={regularizeModal.month}
        year={regularizeModal.year}
      />
      {multipleCorrection && selectedDays.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setBulkRegularizeOpen(true)}
            className="px-4 py-2 bg-[#8629DF] text-white text-[0.7rem] font-bold rounded-md hover:bg-[#7620c7] transition-all shadow-md"
          >
            Open Multiple Correction ({selectedDays.length})
          </button>
        </div>
      )}
      <AttendanceBulkRegularizeModal
        open={bulkRegularizeOpen}
        onClose={() => setBulkRegularizeOpen(false)}
        selectedDays={selectedDays}
        month={4}
        year={2015}
      />
    </div>
  );
};

/* ========== HOLIDAYS (colored month headings only; dates on white background) ========== */
const holidaysByMonth = [
  {
    month: "January 2026",
    headingBg: "bg-sky-100 dark:bg-sky-900/30",
    list: [
      "01 Jan - Wed New Year",
      "26 Jan - Republic Day",
      "14 Jan - Tue Makar Sankranti",
    ],
  },
  {
    month: "February 2026",
    headingBg: "bg-gray-100 dark:bg-gray-700/50",
    list: ["14 Feb - Sat Valentine's Day", "26 Feb - Thu Maha Shivaratri"],
  },
  {
    month: "March 2026",
    headingBg: "bg-green-100 dark:bg-green-900/30",
    list: [
      "08 Mar - Sun Mahashivratri",
      "10 Mar - Tue Holi",
      "29 Mar - Sun Ram Navami",
    ],
  },
  {
    month: "April 2026",
    headingBg: "bg-gray-100 dark:bg-gray-700/50",
    list: [
      "02 Apr - Thu Mahavir Jayanti",
      "10 Apr - Fri Good Friday",
      "14 Apr - Tue Ambedkar Jayanti",
    ],
  },
  {
    month: "May 2026",
    headingBg: "bg-amber-100 dark:bg-amber-900/30",
    list: [
      "01 May - Fri Labour Day",
      "20 May - Wed Buddha Purnima",
      "31 May - Sun Id-ul-Fitr",
    ],
  },
];

const HolidaysCard = () => {
  const [year, setYear] = useState("2026");
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalMonths = holidaysByMonth?.length;

  const goToNext = () => {
    if (currentIndex < totalMonths - 1) setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Purple header: calendar icon + title + year dropdown (white text on lighter purple, white chevron) */}
      <div className="flex items-center justify-between gap-3 bg-[#8629DF] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-white shrink-0" />
          <h2 className="text-[0.7rem] font-bold text-white">
            Holidays (Jan - May)
          </h2>
        </div>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="text-[0.8rem] font-medium rounded-md pl-2.5 pr-8 py-1.5 bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-1 focus:ring-white/50 cursor-pointer appearance-none bg-no-repeat bg-[length:14px] bg-[right_10px_center]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          }}
          aria-label="Select year"
        >
          <option value="2025" className="bg-gray-800 text-gray-200">
            2025
          </option>
          <option value="2026" className="bg-gray-800 text-gray-200">
            2026
          </option>
          <option value="2027" className="bg-gray-800 text-gray-200">
            2027
          </option>
        </select>
      </div>
      {/* Month heading = colored bar; holiday list = white background */}
      <div className="relative h-[28rem] overflow-hidden bg-white dark:bg-gray-800">
        {" "}
        {/* Adjusted height for 3 items */}
        {/* Sliding Container */}
        <div
          className="h-full transition-transform duration-500 ease-in-out flex flex-col"
          style={{ transform: `translateY(-${currentIndex * 50}%)` }}
        >
          {holidaysByMonth.map((m, idx) => (
            <div key={idx} className=" flex-shrink-0 px-4 py-3 flex flex-col">
              <div className="border border-gray-100 dark:border-gray-700 shadow-md rounded-md overflow-hidden flex-1 flex flex-col">
                {/* Month Header */}
                <p
                  className={cn(
                    "text-[0.8rem] font-bold px-4 py-2.5",
                    m.headingBg,
                  )}
                >
                  {m.month}
                </p>

                {/* Holiday List - Only 3 items visible */}
                <ul className="flex-1 px-4 py-3 space-y-2 overflow-hidden text-[0.7rem] text-[#333333] dark:text-gray-300">
                  {m.list.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {h}
                      {(h.includes("Republic Day") ||
                        h.includes("New Year")) && (
                        <span className="ml-auto px-2 py-0.5 rounded-md text-[0.65rem] font-medium bg-purple-50 dark:bg-purple-900/40 text-[#8629DF] dark:text-purple-300 border border-purple-100 dark:border-purple-800/50">
                          National Holiday
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* Up Arrow - appears only if not first month */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrev}
            className="absolute top-4 right-1/2 translate-x-1/2 b cursor-pointer p-2 rounded-full  z-10 transition-all"
          >
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        {/* Down Arrow - appears only if not last month */}
        {currentIndex < totalMonths - 1 && (
          <button
            onClick={goToNext}
            className="absolute bottom-4 right-1/2 translate-x-1/2  cursor-pointer  p-2 rounded-full z-10 transition-all"
          >
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
};

/* ========== CTC REIMBURSEMENT ========== */
const reimbursementData = [
  { type: "LTA", entitled: "₹10,000", claimed: "₹5,000", balance: "₹5,000" },
  { type: "Petrol", entitled: "₹6,000", claimed: "₹2,000", balance: "₹4,000" },
  { type: "Fuel", entitled: "₹3,000", claimed: "₹1,500", balance: "₹1,500" },
  { type: "Uniform", entitled: "₹2,000", claimed: "₹0", balance: "₹2,000" },
];

const CTCReimbursementCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 overflow-x-auto">
    <h2 className="text-[1rem] font-bold text-[#333333] dark:text-gray-400 mb-4">
      CTC Reimbursement
    </h2>
    <div className="min-w-[320px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#8629DF] ">
            <th className="px-4 py-2 text-[0.7rem] font-medium text-white text-center">
              Type
            </th>
            <th className="px-4 py-2 text-[0.7rem] font-medium text-white text-center">
              Entitled
            </th>
            <th className="px-4 py-2 text-[0.7rem] font-medium text-white text-center">
              Claimed
            </th>
            <th className="px-4 py-2 text-[0.7rem] font-medium text-white text-center">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {reimbursementData.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-200 dark:border-gray-700 text-[#58585A] dark:text-gray-400 text-[0.7rem]"
            >
              <td className="px-4 py-2 text-center font-medium">{row.type}</td>
              <td className="px-4 py-2 text-center">{row.entitled}</td>
              <td className="px-4 py-2 text-center">{row.claimed}</td>
              <td className="px-4 py-2 text-center">{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ========== TASKS MODAL (opened from notification icon) ========== */
const TASK_STATUSES = [
  {
    value: "not_started",
    label: "Mark as Not Started",
    bg: "bg-[#8629DF] text-white",
  },
  {
    value: "in_progress",
    label: "Mark as In Progress",
    bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  {
    value: "awaiting_feedback",
    label: "Mark as Awaiting Feedback",
    bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    value: "testing",
    label: "Mark as Testing",
    bg: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  },
  {
    value: "completed",
    label: "Mark as Completed",
    bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
];

const tasksData = [
  {
    id: 1,
    taskId: "0245",
    title: "Monthly Payroll Review",
    assignedBy: "HR Manager",
    due: "10/02/2026",
    startedDate: "04/02/2026",
    completed: false,
    highPriority: true,
    description:
      "This task is related to monthly payroll verification and approval.",
    status: "not_started",
  },
  {
    id: 2,
    taskId: "0246",
    title: "Leave Balance Update",
    assignedBy: "HR Manager",
    due: "15 Feb 2026",
    startedDate: "05/02/2026",
    completed: false,
    highPriority: false,
    description: "Update and verify leave balances for the current cycle.",
    status: "not_started",
  },
  {
    id: 3,
    taskId: "0247",
    title: "Tax Declaration Review",
    assignedBy: "Finance Team",
    due: "18 Feb 2026",
    startedDate: "06/02/2026",
    completed: false,
    highPriority: false,
    description: "Review employee tax declaration submissions.",
    status: "not_started",
  },
  {
    id: 4,
    taskId: "0248",
    title: "Attendance Regularisation",
    assignedBy: "HR Manager",
    due: "20 Feb 2026",
    startedDate: "07/02/2026",
    completed: false,
    highPriority: false,
    description: "Process attendance regularisation requests.",
    status: "not_started",
  },
  {
    id: 5,
    taskId: "0249",
    title: "Insurance Nomination",
    assignedBy: "Admin",
    due: "22 Feb 2026",
    startedDate: "08/02/2026",
    completed: false,
    highPriority: false,
    description: "Verify and update insurance nomination details.",
    status: "not_started",
  },
  {
    id: 6,
    taskId: "0250",
    title: "Monthly Payroll Review",
    completedOn: "12 Feb 2026",
    completed: true,
    assignedBy: "HR Manager",
    status: "completed",
  },
];

const TASKS_COUNT = tasksData.length;

/* Task Details modal – opens on click of a task (like second image) */
const TaskDetailsModal = ({ task, onClose }) => {
  const [status, setStatus] = useState(task?.status || "not_started");
  const [comment, setComment] = useState("");
  if (!task) return null;
  const statusLabel = (v) =>
    TASK_STATUSES.find((s) => s.value === v)?.label?.replace("Mark as ", "") ||
    v;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h3 className="text-[1.1rem] font-bold text-[#333333] dark:text-gray-100">
            TASK ID - {task.taskId || String(task.id).padStart(4, "0")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="px-5 pt-1 pb-3 text-[0.95rem] font-medium text-[#333333] dark:text-gray-200 border-b border-gray-100 dark:border-gray-700">
          {task.title}
        </p>
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: status buttons, description, comment */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {TASK_STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStatus(s.value)}
                  className={cn(
                    "px-3 py-1.5 rounded text-[0.7rem] font-medium whitespace-nowrap transition-colors",
                    status === s.value ? "bg-[#8629DF] text-white" : s.bg,
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div>
              <p className="text-[0.8rem] font-bold text-[#333333] dark:text-gray-200 mb-1">
                Description
              </p>
              <p className="text-[0.8rem] text-gray-600 dark:text-gray-400">
                {task.description || "No description provided."}
              </p>
            </div>
            <div>
              <p className="text-[0.8rem] font-bold text-[#333333] dark:text-gray-200 mb-2">
                Comment
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add Comment"
                className="w-full h-24 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-[0.8rem] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8629DF] resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setComment("")}
                  className="px-4 py-2 rounded-md bg-[#8629DF] text-white text-[0.8rem] font-medium hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* Right: Task Information */}
          <div>
            <p className="text-[0.8rem] font-bold text-[#333333] dark:text-gray-200 mb-3">
              Task Information
            </p>
            <dl className="space-y-2 text-[0.8rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">
                  Assigned by
                </dt>
                <dd className="text-[#333333] dark:text-gray-200 font-medium">
                  {task.assignedBy || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="text-[#333333] dark:text-gray-200 font-medium">
                  {statusLabel(status)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">
                  Started Date
                </dt>
                <dd className="text-[#333333] dark:text-gray-200 font-medium">
                  {task.startedDate || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Due Date</dt>
                <dd className="text-[#333333] dark:text-gray-200 font-medium">
                  {task.due || task.completedOn || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 dark:text-gray-400">Priority</dt>
                <dd
                  className={cn(
                    "font-medium",
                    task.highPriority
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-[#333333] dark:text-gray-200",
                  )}
                >
                  {task.highPriority ? "High Priority" : "Normal"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const TasksModal = ({ onClose, onTaskClick }) => (
  <div className="fixed inset-0 z-50 flex justify-end pt-[4.5rem] pr-4 pb-4 md:pr-6 md:pt-24">
    <div
      className="absolute inset-0 bg-black/20"
      onClick={onClose}
      aria-hidden
    />
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-[350px] max-h-[calc(100vh-6rem)] flex flex-col border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 bg-[#8629DF] rounded-t-xl shrink-0">
        <h3 className="text-[1.25rem] font-bold text-white">Tasks</h3>
        <span className="w-8 h-8 rounded-full bg-[#8629DF] border-2 border-white/40 flex items-center justify-center text-white text-[0.9rem] font-bold">
          {String(tasksData.length).padStart(2, "0")}
        </span>
      </div>
      <div className="overflow-y-auto table-scroll p-4 space-y-2">
        {tasksData.map((t) => (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            onClick={() => onTaskClick?.(t)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onTaskClick?.(t);
              }
            }}
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/40 p-3 flex gap-3 cursor-pointer hover:border-[#8629DF]/50 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors"
          >
            <div className="shrink-0 pt-0.5">
              {t.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <span className="block w-3 h-3 rounded-full bg-[#8629DF]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[0.9rem] font-bold text-[#333333] dark:text-gray-200">
                  {t.title}
                </p>
                {t.highPriority && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[0.65rem] font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                    High Priority
                  </span>
                )}
              </div>
              {t.completed ? (
                <p className="text-[0.75rem] text-gray-500 dark:text-gray-400 mt-1">
                  Completed on: {t.completedOn}
                </p>
              ) : (
                <>
                  <p className="text-[0.75rem] text-gray-500 dark:text-gray-400 mt-1">
                    Assigned by: {t.assignedBy}
                  </p>
                  <p className="text-[0.75rem] text-gray-500 dark:text-gray-400">
                    Due: {t.due}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="p-3 border-t border-gray-200 dark:border-gray-700 shrink-0 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-[0.85rem] font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Close
        </button>
      </div> */}
    </div>
  </div>
);

/* ========== PAGE ========== */
const EmployeeDashboard = () => {
  const [tasksModalOpen, setTasksModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  return (
    <div>
      {tasksModalOpen && (
        <TasksModal
          onClose={() => setTasksModalOpen(false)}
          onTaskClick={(task) => {
            setSelectedTask(task);
            setTasksModalOpen(false);
          }}
        />
      )}
      {selectedTask && (
        <TaskDetailsModal
          key={selectedTask.id}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      {/* Search bar + Notification - full width */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 bg-white dark:bg-gray-800 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
          <input
            type="search"
            placeholder="Search here"
            className="w-full pl-6 pr-12 py-3 text-[0.9rem] rounded-md outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            aria-label="Search"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800 dark:text-gray-200 font-bold" />
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setTasksModalOpen(true)}
            className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 transition"
            aria-label="Notifications"
          >
            <BellDot className="h-6 w-6" />
          </button>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        {/* Left column: Salary → Piechart → Calendar → CTC (as per design) */}
        <div className="space-y-6 min-w-0">
          <SalaryDetailsCard />
          <AttendancePieCard />
          <CalendarCard />
          <CTCReimbursementCard />
        </div>

        {/* Right column: Announcements → Wishes → Holidays (as per design) */}
        <div className="space-y-6 min-w-0">
          <AnnouncementsCard />
          <WishesCard />
          <HolidaysCard />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
