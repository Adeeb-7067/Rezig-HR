import { Button } from "@/components/ui/button";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { BsFolder } from "react-icons/bs";
import Selectf from "@/components/SelectFeild";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { createPortal } from "react-dom";

// Utility function for classNames
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// =============================
// Embedded Calendar Component
// =============================
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

  // Update selectedDate when value prop changes
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

// =============================
// End of Embedded Calendar Component
// =============================

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

// Date field wrapper for table cells
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

const SalaryAssigment = ({ onNext, onPrev }) => {
  // Form data state
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePayHeadChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedPayHeads = [...prevData.payHeads];
      updatedPayHeads[index] = {
        ...updatedPayHeads[index],
        [field]: value,
      };
      return {
        ...prevData,
        payHeads: updatedPayHeads,
      };
    });
  };

  const handleOneTimePaymentChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedPayments = [...prevData.oneTimePayments];
      updatedPayments[index] = {
        ...updatedPayments[index],
        [field]: value,
      };
      return {
        ...prevData,
        oneTimePayments: updatedPayments,
      };
    });
  };

  const handleNotesChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      notes: e.target.value,
    }));
  };

  function SalaryTable() {
    return (
      <div className="w-full flex justify-center  overflow-auto rounded-lg no-scrollbar table-scroll">
        <div className="w-full  dark:bg-[#E4E6EB]/10 rounded-sm shadow-sm overflow-auto md:overflow-visible">
          <table className="min-w-[800px] w-full text-[0.7rem] text-left border-collapse ">
            {/* Table Head */}
            <thead className="bg-[#8629DF] h-12 dark:bg-gray-500 text-white font-semibold divide-x divide-gray-200">
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
                  <td className="px-4 py-2 text-xs">
                    {item.remarks ? (
                      <div
                        className="truncate max-w-[200px]"
                        title={item.remarks}
                      >
                        {item.remarks}
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Remarks"
                        className="rounded-md px-2 py-1 text-[0.7rem] w-full focus:outline-none focus:ring-0 border border-gray-200"
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

  const PayTable = () => {
    const [paymentsData, setPaymentsData] = useState({
      oneTimePayments: [
        {
          id: 1,
          name: "Joining Bonus",
          checked: true,
          amount: 50000,
          frequency: 1,
          isTag: true,
          showSplits: false,
          date: "",
        },
      ],
    });

    const computeTotalFor = (items, parentId) =>
      items
        .filter((r) => r.id === parentId || r.parentId === parentId)
        .reduce((s, r) => s + Number(r.amount || 0), 0);

    const handleOneTimePaymentChange = (id, field, value) => {
      setPaymentsData((prev) => {
        const updated = prev.oneTimePayments.map((r) =>
          r.id === id ? { ...r, [field]: value } : r,
        );
        return { ...prev, oneTimePayments: updated };
      });
    };

    const handleFrequencyChange = (parentId, newFrequency) => {
      setPaymentsData((prev) => {
        const cloned = [...prev.oneTimePayments];
        const parentIndex = cloned.findIndex((r) => r.id === parentId);
        if (parentIndex === -1) return prev;

        const parent = { ...cloned[parentIndex] };

        const totalAmount = Number(parent.amount || 0);
        const freq = Math.max(1, Number(newFrequency));

        parent.frequency = freq;
        parent.showSplits = freq > 1;

        // remove old splits
        const withoutSplits = cloned.filter((r) => r.parentId !== parentId);

        // if frequency = 1 → no splits
        if (freq === 1) {
          return {
            ...prev,
            oneTimePayments: withoutSplits.map((r) =>
              r.id === parentId ? parent : r,
            ),
          };
        }

        // split total amount
        const base = Math.floor(totalAmount / freq);
        const remainder = totalAmount % freq;

        const splitRows = Array.from({ length: freq }, (_, i) => ({
          id: `${parentId}-s${i + 1}`,
          name: `${parent.name} - Part ${i + 1}`,
          checked: false,
          amount: i === freq - 1 ? base + remainder : base,
          isSplit: true,
          parentId,
          date: "",
        }));

        const parentPos = withoutSplits.findIndex((r) => r.id === parentId);

        return {
          ...prev,
          oneTimePayments: [
            ...withoutSplits.slice(0, parentPos),
            parent,
            ...splitRows,
            ...withoutSplits.slice(parentPos + 1),
          ],
        };
      });
    };

    const handleDateChange = (id, value) => {
      setPaymentsData((prev) => ({
        ...prev,
        oneTimePayments: prev.oneTimePayments.map((r) =>
          r.id === id ? { ...r, date: value } : r,
        ),
      }));
    };

    const visibleRows = paymentsData.oneTimePayments
      .filter((r) => !r.isSplit)
      .flatMap((parent) => {
        if (parent.showSplits) {
          const splits = paymentsData.oneTimePayments.filter(
            (r) => r.parentId === parent.id,
          );
          return [parent, ...splits];
        }
        return [parent];
      });

    return (
      <div className="w-full mx-auto mt-6 bg-white dark:bg-[#E4E6EB]/10 border border-gray-300 rounded-sm overflow-auto sm:overflow-visible">
        <table className="w-full text-[0.8rem] border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#8629DF] dark:bg-gray-500 text-white text-[0.8rem]">
              <th className="px-6 py-3 text-left font-semibold rounded-tl-sm">
                Pay Head Name
              </th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold rounded-tr-sm">
                Payment Frequency
              </th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-200 text-[0.7rem]">
            {visibleRows.map((row) => {
              const isParent = !row.isSplit;
              return (
                <tr
                  key={row.id}
                  className={`${
                    row.isSplit ? "bg-gray-50 dark:bg-gray-800/30" : ""
                  } border-b border-gray-200 dark:border-gray-700`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!row.isSplit && (
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={!!row.checked}
                          onChange={(e) =>
                            handleOneTimePaymentChange(
                              row.id,
                              "checked",
                              e.target.checked,
                            )
                          }
                        />
                      )}
                      <span
                        className={`${
                          row.isSplit ? "font-medium ml-6" : "font-medium"
                        }`}
                      >
                        {row.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <input
                        type="text"
                        value={row.amount}
                        disabled={row.frequency > 1}
                        onChange={(e) =>
                          handleOneTimePaymentChange(
                            row.id,
                            "amount",
                            e.target.value,
                          )
                        }
                        className="w-24 text-center rounded px-2 py-1 focus:outline-none focus:ring-0 text-[0.7rem] border border-gray-300"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 flex justify-center items-center">
                    {isParent ? (
                      <div className="flex items-center gap-1 justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleFrequencyChange(row.id, row.frequency - 1)
                          }
                          disabled={row.frequency <= 1}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="border border-purple-400 rounded-md px-3 py-1 text-purple-600 font-medium min-w-[40px] text-center">
                          {row.frequency}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleFrequencyChange(row.id, row.frequency + 1)
                          }
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center text-center align-center items-center">
                        <Calendar
                          name="date"
                          value={row.date || ""}
                          onChange={(e) =>
                            handleDateChange(row.id, e.target.value)
                          }
                          className="border-0 shadow-none focus:ring-0 text-center mr-4"
                          style={{ width: "130px" }}
                          showLabel={false}
                          placeholder="Select a date"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#EFEFEF] dark:bg-[#E4E6EB]/10 dark:border-white dark:border gap-4 p-4 pt-4 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Selectf
            label="Salary Template"
            name="salaryTemplate"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-normal"
            value={formData.salaryTemplate}
            onChange={handleChange}
            options={[
              {
                value: "Salary",
                label: "Salary",
              },
            ]}
          />
          <Selectf
            label="Currency"
            name="currency"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-normal"
            value={formData.currency}
            onChange={handleChange}
            options={[{ value: "select Currency", label: "select Currency" }]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Calendar
            label="Effective From Date"
            name="EffectiveFromDate"
            value={formData.EffectiveFromDate}
            onChange={handleChange}
          />
          <Calendar
            label="Effective to Date"
            name="EffectiveToDate"
            value={formData.EffectiveToDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-6 w-full">
        <SalaryTable />
        <div className="w-full flex justify-end">
          <button className="py-0.5 px-8 my-2.5 mt-6 text-[0.7rem] text-red-600 border border-red-500 rounded-sm cursor-pointer hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h1 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
          One Time Payment
        </h1>
        <div className="mt-4">
          <PayTable />
        </div>
      </div>
      <div className="mt-8">
        <div>
          <h1 className="font-semibold text-sm mb-4 text-gray-800 dark:text-gray-200">
            Notes/Remarks
          </h1>
          <div>
            <textarea
              className="w-full h-[120px] p-3 text-[0.7rem] border border-gray-300 dark:border-gray-700 dark:bg-[#E4E6EB]/10 text-black dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
              placeholder="Write Here ..."
              value={formData.notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>

      <div
        className="
    flex flex-row sm:flex-row 
    justify-end 
    w-full 
    gap-2 
    mt-2
  "
      >
        <button
          onClick={onPrev}
          className="
            bg-white dark:bg-[#E4E6EB]/10
            border border-[#8629DF]
            text-[#8629DF]
            font-semibold
            text-xs sm:text-[0.7rem]
            py-1
            rounded-sm
            w-full sm:w-auto md:w-24
    "
        >
          Previous
        </button>

        <button
          className="
           bg-white dark:bg-[#E4E6EB]/10
           border border-[#8629DF]
           text-[#8629DF]
           font-semibold
           text-xs sm:text-[0.7rem]
           py-1
           rounded-sm
           w-full sm:w-auto md:w-24
    "
        >
          Reset
        </button>

        <button
          onClick={onNext}
          className="
           bg-[#8629DF]
           text-white
           font-semibold
           text-xs sm:text-[0.7rem]
           py-1
           rounded-sm
           w-full sm:w-auto md:w-24
    "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SalaryAssigment;
