import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState , useRef } from "react";
const Datefeild = ({
  label,
  name,
  value,
  onChange,
  className = "",
  style = {},
}) => {
  return (
    <div className="w-full">
      <Calendar
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          "border-0 shadow-none focus:ring-0 hover:bg-transparent dark:hover:bg-transparent",
          "!px-1 !py-1",
          className,
        )}
        style={{ width: "100%", ...style }}
        showLabel={false}
        placeholder="Select a date"
      />
    </div>
  );
};

const Calendar = ({
  label,
  name,
  value,
  onChange,
  style,
  className = "",
  placeholder = "Select a date",
  showLabel = true,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null,
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const calendarRef = useRef(null);
  const triggerRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (value) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
        } else {
          setSelectedDate(null);
        }
      } catch (e) {
        setSelectedDate(null);
      }
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Update currentDate when selectedDate changes
  useEffect(() => {
    if (selectedDate && !isCalendarOpen) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate, isCalendarOpen]);

  // Update calendar position when it opens
  useEffect(() => {
    if (isCalendarOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        triggerHeight: rect.height,
      });
    }
  }, [isCalendarOpen]);

  // Generate years for dropdown (current year ± 10 years)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Format date for display (e.g., "Oct 7, 2025")
  const formatDate = (date) => {
    if (!date) return placeholder;
    const month = months[date.getMonth()].substring(0, 3);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Format date for onChange (YYYY-MM-DD)
  const formatISODate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(newDate);
    setIsCalendarOpen(false);
    if (onChange) {
      onChange({
        target: { name, value: formatISODate(newDate) },
      });
    }
  };

  // Generate calendar days
  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysArray = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();
      daysArray.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-[0.75rem] transition-colors
                     ${
                       isSelected
                         ? "bg-purple-600 text-white"
                         : isToday
                           ? "text-black"
                           : "hover:bg-purple-500 dark:hover:bg-purple-500 text-gray-900 dark:text-gray-100"
                     }`}
        >
          {day}
        </div>,
      );
    }

    return daysArray;
  };

  // Navigate to previous month
  const prevMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // Navigate to next month
  const nextMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Select a year
  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setIsYearDropdownOpen(false);
      }
    };

    if (isCalendarOpen) {
      // Add a small delay to ensure the calendar is mounted
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      }, 10);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Toggle calendar
  const toggleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCalendarOpen(!isCalendarOpen);
    setIsYearDropdownOpen(false);
  };

  // Close dropdown when clicking elsewhere
  const handleYearDropdownClick = (e) => {
    e.stopPropagation();
    setIsYearDropdownOpen(!isYearDropdownOpen);
  };

  // Render calendar using portal
  const renderCalendarPortal = () => {
    if (!isCalendarOpen) return null;

    const isMobile = window.innerWidth < 768;
    const calendarContent = (
      <div
        ref={calendarRef}
        className="fixed z-[99999] p-3 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        style={{
          top: isMobile ? "50%" : calendarPosition.top,
          left: isMobile ? "50%" : calendarPosition.left,
          transform: isMobile ? "translate(-50%, -50%)" : "translateY(0)",
          width: isMobile ? "90vw" : Math.max(calendarPosition.width, 250),
          maxWidth: isMobile ? "300px" : "350px",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-[1rem]"
          >
            &larr;
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-[0.8rem] font-semibold mt-0.5 text-gray-500 dark:text-gray-100">
              {months[currentDate.getMonth()]}
            </span>
            <div className="relative">
              <button
                onClick={handleYearDropdownClick}
                className="text-[0.8rem] font-semibold text-gray-500 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {currentDate.getFullYear()}
              </button>
              {isYearDropdownOpen && (
                <div
                  className="absolute z-20 mt-2 w-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectYear(year);
                      }}
                      className="px-3 py-1.5 text-[0.75rem] hover:bg-purple-500 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100"
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={nextMonth}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-[1rem]"
          >
            &rarr;
          </button>
        </div>

        {/* Days of the week */}
        <div className="grid grid-cols-7 gap-1 text-center text-gray-500 dark:text-gray-400 font-medium mb-2 text-[0.7rem]">
          {days.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 text-center">{renderDays()}</div>
      </div>
    );

    return createPortal(calendarContent, document.body);
  };

  return (
    <div className="flex flex-col space-y-1 w-full relative justify-center">
      {/* Label */}
      {showLabel && label && (
        <label className="text-[0.7rem] font-normal text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      {/* Input Field */}
      <div className="relative items-center flex justify-center">
        <div
          ref={triggerRef}
          style={style}
          onClick={toggleCalendar}
          className={cn(
            "w-full flex items-center text-left font-normal py-1.5 h-[1.9rem] transition-all duration-200",
            "rounded-sm border border-gray-300 dark:border-gray-700",
            "bg-white dark:bg-gray-800",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            "px-2 text-[0.7rem] cursor-pointer",
            "focus:border-2 focus:border-[#9853F9]",
            selectedDate
              ? "text-gray-700 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-500",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400 text-[0.7rem] dark:text-gray-400" />
          <span>{formatDate(selectedDate)}</span>
        </div>
      </div>

      {/* Render calendar via portal */}
      {renderCalendarPortal()}
    </div>
  );
};



const SelectField = ({
  label,
  name,
  value,
  onChange,
  children,
  className = "",
}) => {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-[0.7rem] font-normal text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>

      {/* Select */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-2 rounded-sm py-1.5 text-[0.7rem] bg-white dark:bg-gray-800 ${className}`}
      >
        {children}
      </select>
    </div>
  );
};
const btnPrevReset =
  "bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24";
const btnSave =
  "bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer";

const variablePayHeads = [
  { id: "basic", name: "Basic", fromDate: "2025-07-21", toDate: "2025-07-21", formula: "", monthly: "1000", annual: "12000", remarks: "40% as per metro city norms", checked: true },
  { id: "hra", name: "HRA", fromDate: "2025-07-21", toDate: "2025-07-21", formula: "", monthly: "500", annual: "6000", remarks: "Calculated based on unused leaves (carry-forwarded)", checked: true },
  { id: "transport", name: "Transport", fromDate: "", toDate: "", formula: "", monthly: "", annual: "", remarks: "", checked: false },
  { id: "spl", name: "SPL Allowance", fromDate: "", toDate: "", formula: "", monthly: "", annual: "", remarks: "", checked: false },
];

const reimbursementPayHead = "Exgratia payable yearly (E00010)";
const defaultReimb = { accumulated: "6672.00", claimed: "00.00", holdClaimed: "00.00", balance: "6672.00", amtToBePaid: "6672.00", billSubmitted: "6672.00", billsReceived: "00.00", checked: true };
const reimbRows = [
  { ...defaultReimb, amtToBePaid: "6672.00", billSubmitted: "6672.00" },
  { ...defaultReimb, amtToBePaid: "6672.00", billSubmitted: "6672.00" },
  { ...defaultReimb, amtToBePaid: "", billSubmitted: "" },
  { ...defaultReimb, amtToBePaid: "", billSubmitted: "" },
];

export default function VariablePayment({ onNext, onPrev }) {
  const [variableList, setVariableList] = useState(variablePayHeads);
  const [reimbursementList, setReimbursementList] = useState(reimbRows);
    const [formData, setFormData] = useState({
      salaryTemplate: "",
      currency: "",
      EffectiveFromDate: "",
      EffectiveToDate: "",
      payHeads: [
        {
          name: "Basic",
          fromDate: "2025-07-21",
          toDate: "2025-07-21",
          formula: "",
          monthly: "1000",
          annual: "12000",
          remarks: "40% as per metro city norms",
          checked: true,
        },
        {
          name: "HRA",
          fromDate: "2025-07-21",
          toDate: "2025-07-21",
          formula: "",
          monthly: "500",
          annual: "6000",
          remarks: "Calculated based on unused leaves (carry-forwarded)",
          checked: true,
        },
        {
          name: "Transport",
          fromDate: "",
          toDate: "",
          formula: "",
          monthly: "",
          annual: "",
          remarks: "",
          checked: false,
        },
        {
          name: "SPL Allowance",
          fromDate: "",
          toDate: "",
          formula: "",
          monthly: "",
          annual: "",
          remarks: "",
          checked: false,
        },
      ],
      oneTimePayments: [
        {
          id: 1,
          name: "Joining Bonus",
          amount: 50000,
          frequency: "2",
          isTag: true,
          checked: true,
        },
        {
          id: 2,
          name: "Joining Bonus",
          amount: 25000,
          frequency: "April 2025",
          isTag: false,
          checked: false,
        },
        {
          id: 3,
          name: "Joining Bonus",
          amount: 25000,
          frequency: "April 2025",
          isTag: false,
          checked: false,
        },
      ],
      notes: "",
    });

  const updateVariable = (index, field, value) => {
    setVariableList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateReimbursement = (index, field, value) => {
    setReimbursementList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const thClass = "text-left p-2 text-[0.65rem] font-semibold bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 text-gray-500 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600";
  const tdClass = "p-2 border-b border-gray-100 dark:border-gray-700/50 text-[0.7rem] text-gray-600 dark:text-gray-200";
  const inputClass = "w-full text-[0.7rem] h-7.5 border border-gray-300 dark:border-gray-700 rounded-sm px-4 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white min-w-0 focus:outline-none focus:ring-2 focus:ring-[#9853F9] focus:ring-inset";
  const checkboxClass = "w-4 h-4 rounded border-gray-300 dark:border-gray-500 text-[#8629DF] focus:ring-[#9853F9] cursor-pointer";
  function SalaryTable() {
    return (
      <div className="w-full flex justify-center  overflow-auto  rounded-lg no-scrollbar table-scroll ">
        <div className="w-full  dark:bg-[#E4E6EB]/10 rounded-sm shadow-sm overflow-auto md:overflow-visible">
          <table className="min-w-[800px] w-full text-[0.7rem] text-left border-collapse ">
            {/* Table Head */}
            <thead className="bg-[#8629DF] h-12 dark:bg-gray-500 text-white font-semibold divide-x divide-gray-200 border">
              <tr>
                <th className="text-[0.8rem] px-2 py-1.5 min-w-[130px]">
                  Pay Head Name
                </th>
                <th className="text-[0.8rem] px-4 py-1.5 min-w-[130px]">
                  From Date
                </th>
                <th className="text-[0.8rem] px-4 py-1.5 min-w-[130px]">
                  To Date
                </th>
                <th className="text-[0.8rem] px-4 py-1.5 min-w-[140px]">
                  Formula
                </th>
                <th className="text-[0.8rem] px-4 py-1.5 min-w-[130px]">
                  Monthly Amount
                </th>
                <th className="text-[0.8rem] px-4 py-1.5 min-w-[130px]">
                  Annual Amount
                </th>
                <th className="text-[0.8rem] px-4 py-1.5">Remarks</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 text-gray-700 dark:text-gray-200">
              {formData.payHeads.map((item, idx) => (
                <tr
                  key={idx}
                  className="divide-x divide-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  {/* Pay Head Name with Checkbox */}
                  <td className="px-2 py-2 flex items-center space-x-2 text-[0.7rem]">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) =>
                        handlePayHeadChange(idx, "checked", e.target.checked)
                      }
                      className="h-3 w-3 accent-[#8629DF]"
                    />
                    <span className="text-[13px]">{item.name}</span>
                  </td>

                  {/* From Date */}
                  <td className="px-2 py-2">
                    <div className="flex justify-center">
                      <Datefeild
                        name="fromDate"
                        value={item.fromDate}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "fromDate", e.target.value)
                        }
                        style={{ width: "110px" }}
                      />
                    </div>
                  </td>

                  {/* To Date */}
                  <td className="px-2 py-2">
                    <div className="flex justify-center">
                      <Datefeild
                        name="toDate"
                        value={item.toDate}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "toDate", e.target.value)
                        }
                        style={{ width: "110px" }}
                      />
                    </div>
                  </td>

                  {/* Formula */}
                  <td className="px-2 py-2">
                    <div className="px-1">
                      <SelectField
                        value={item.formula}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "formula", e.target.value)
                        }
                      >
                        <option value="">Select Formula</option>
                        <option value="formula1">Formula 1</option>
                        <option value="formula2">Formula 2</option>
                      </SelectField>
                    </div>
                  </td>

                  {/* Monthly Amount */}
                  <td className="px-4 py-2">
                    {item.monthly ? (
                      <div className="text-center">{item.monthly}</div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Amount"
                        className="rounded-md px-2 py-1 text-[0.7rem] w-full focus:outline-none focus:ring-0 border border-gray-200"
                        value={item.monthly}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "monthly", e.target.value)
                        }
                      />
                    )}
                  </td>

                  {/* Annual Amount */}
                  <td className="px-4 py-2">
                    {item.annual ? (
                      <div className="text-center">{item.annual}</div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Amount"
                        className="rounded-md px-2 py-1 text-[0.7rem] w-full focus:outline-none focus:ring-0 border border-gray-200"
                        value={item.annual}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "annual", e.target.value)
                        }
                      />
                    )}
                  </td>

                  {/* Remarks */}
                  <td className="px-4 py-2 text-xs min-w-[150px]">
                    {item.remarks ? (
                      <div
                        className="truncate max-w-[150px]"
                        title={item.remarks}
                      >
                        {item.remarks}
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Remarks"
                        className="rounded-md px-2 py-1 text-[0.7rem] w-full focus:outline-none focus:ring-0 border border-gray-200 "
                        value={item.remarks}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "remarks", e.target.value)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  const initialPayHeads = [
  {
    checked: true,
    name: "Exgratia payable yearly (E00010)",
    accumulated: "6672.00",
    claimed: "00.00",
    holdClaimed: "00.00",
    balance: "6672.00",
    amtToBePaid: "6672.00",
    billSubmitted: "6672.00",
    billsReceived: "00.00",
    amtFixed: true,
    billFixed: true,
  },
  {
    checked: true,
    name: "Exgratia payable yearly (E00010)",
    accumulated: "6672.00",
    claimed: "00.00",
    holdClaimed: "00.00",
    balance: "6672.00",
    amtToBePaid: "6672.00",
    billSubmitted: "6672.00",
    billsReceived: "00.00",
    amtFixed: true,
    billFixed: true,
  },
  {
    checked: true,
    name: "Exgratia payable yearly (E00010)",
    accumulated: "6672.00",
    claimed: "00.00",
    holdClaimed: "00.00",
    balance: "6672.00",
    amtToBePaid: "",
    billSubmitted: "",
    billsReceived: "00.00",
    amtFixed: false,
    billFixed: false,
  },
  {
    checked: true,
    name: "Exgratia payable yearly (E00010)",
    accumulated: "6672.00",
    claimed: "00.00",
    holdClaimed: "00.00",
    balance: "6672.00",
    amtToBePaid: "",
    billSubmitted: "",
    billsReceived: "00.00",
    amtFixed: false,
    billFixed: false,
  },
];
 
 function PayHeadTable() {
  const [rows, setRows] = useState(initialPayHeads);
 
  const handleChange = (idx, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );
  };
 
  return (
    <div className="  flex items-start justify-center ">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-auto table-scroll">
          <table className="min-w-[900px] w-full text-sm text-left border-collapse">
            {/* Header */}
            <thead>
              <tr className="bg-[#8629DF] text-white font-semibold divide-x divide-purple-400">
                {[
                  "Pay Head Name",
                  "Accumulated",
                  "Claimed",
                  "Hold Claimed",
                  "Balance",
                  "Amt To Be Paid",
                  "Bill Submited",
                  "Bills Received",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-[0.78rem] whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
 
            {/* Body */}
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="divide-x divide-gray-200 hover:bg-purple-50 transition-colors duration-150"
                >
                  {/* Pay Head Name */}
                  <td className="px-3 py-3 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={(e) =>
                          handleChange(idx, "checked", e.target.checked)
                        }
                        className="h-3.5 w-3.5 accent-[#8629DF] cursor-pointer"
                      />
                      <span className="text-[0.78rem] font-semibold text-gray-800 leading-tight">
                        {row.name}
                      </span>
                    </div>
                  </td>
 
                  {/* Accumulated */}
                  <td className="px-4 py-3 text-[0.78rem] font-bold text-gray-800 min-w-[110px]">
                    {row.accumulated}
                  </td>
 
                  {/* Claimed */}
                  <td className="px-4 py-3 text-[0.78rem] font-bold text-gray-800 min-w-[90px]">
                    {row.claimed}
                  </td>
 
                  {/* Hold Claimed */}
                  <td className="px-4 py-3 text-[0.78rem] font-bold text-gray-800 min-w-[110px]">
                    {row.holdClaimed}
                  </td>
 
                  {/* Balance */}
                  <td className="px-4 py-3 text-[0.78rem] font-bold text-gray-800 min-w-[100px]">
                    {row.balance}
                  </td>
 
                  {/* Amt To Be Paid */}
                  <td className="px-3 py-2 min-w-[130px]">
                    {row.amtFixed ? (
                      <span className="text-[0.78rem] font-bold text-gray-800 px-1">
                        {row.amtToBePaid}
                      </span>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Amount"
                        value={row.amtToBePaid}
                        onChange={(e) =>
                          handleChange(idx, "amtToBePaid", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[0.72rem] text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white"
                      />
                    )}
                  </td>
 
                  {/* Bill Submitted */}
                  <td className="px-3 py-2 min-w-[130px]">
                    {row.billFixed ? (
                      <span className="text-[0.78rem] font-bold text-gray-800 px-1">
                        {row.billSubmitted}
                      </span>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Amount"
                        value={row.billSubmitted}
                        onChange={(e) =>
                          handleChange(idx, "billSubmitted", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[0.72rem] text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-300 bg-white"
                      />
                    )}
                  </td>
 
                  {/* Bills Received */}
                  <td className="px-4 py-3 text-[0.78rem] font-bold text-gray-800 min-w-[110px]">
                    {row.billsReceived}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="space-y-4">
      {/* Variable List */}
      <h2 className="text-base font-semibold text-gray-500">Variable List</h2>
      <div className="rounded-lg  p-2">

     <SalaryTable/>
      </div>

      {/* Reimbursement Payment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
  
  <h2 className="text-[0.8rem] sm:text-[1.1rem] font-semibold text-gray-500">
    Reimbursement Payment
  </h2>

  <button
    type="button"
    className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-xs sm:text-[0.7rem] font-semibold px-3 sm:px-3 py-2 sm:py-2 rounded-sm w-full sm:w-auto"
  >
    Calculated Reimbursement Balance
  </button>

</div>
      {/* <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 rounded-lg p-2 px-3">
      
        <div className="border border-gray-200 dark:border-gray-600 rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-[0.7rem] min-w-[800px]">
            <thead>
              <tr>
                <th className={thClass}>Pay Head Name</th>
                <th className={thClass}>Accumulated</th>
                <th className={thClass}>Claimed</th>
                <th className={thClass}>Hold Claimed</th>
                <th className={thClass}>Balance</th>
                <th className={thClass}>Amt To Be Paid</th>
                <th className={thClass}>Bill Submitted</th>
                <th className={thClass}>Bills Received</th>
              </tr>
            </thead>
            <tbody>
              {reimbursementList.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 bg-white dark:bg-gray-800">
                  <td className={tdClass}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={(e) => updateReimbursement(index, "checked", e.target.checked)}
                        className={checkboxClass}
                      />
                      <span>{reimbursementPayHead}</span>
                    </label>
                  </td>
                  <td className={tdClass}>{row.accumulated}</td>
                  <td className={tdClass}>{row.claimed}</td>
                  <td className={tdClass}>{row.holdClaimed}</td>
                  <td className={tdClass}>{row.balance}</td>
                  <td className={tdClass}>
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      value={row.amtToBePaid}
                      onChange={(e) => updateReimbursement(index, "amtToBePaid", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className={tdClass}>
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      value={row.billSubmitted}
                      onChange={(e) => updateReimbursement(index, "billSubmitted", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className={tdClass}>{row.billsReceived}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      <PayHeadTable/>

      {/* Buttons */}
      <div className="flex flex-row flex-wrap justify-end w-full gap-2 ">
        <button type="button" className={btnPrevReset} onClick={onPrev}>
          Previous
        </button>
        <button type="button" className={btnPrevReset}>
          Reset
        </button>
        <button type="button" className={btnSave} onClick={onNext}>
          Save
        </button>
      </div>
    </div>
  );
}
