import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Selectf from "@/components/SelectFeild";

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

  useEffect(() => {
    if (selectedDate && !isCalendarOpen) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate, isCalendarOpen]);

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

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const formatDate = (date) => {
    if (!date) return placeholder;
    const month = months[date.getMonth()].substring(0, 3);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatISODate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

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
                         ? "bg-ds-primary text-white"
                         : isToday
                           ? "text-black"
                           : "hover:bg-ds-primary/100 dark:hover:bg-ds-primary/90 text-gray-900 dark:text-gray-100"
                     }`}
        >
          {day}
        </div>,
      );
    }

    return daysArray;
  };

  const prevMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
        setIsYearDropdownOpen(false);
      }
    };

    if (isCalendarOpen) {
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

  const toggleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCalendarOpen(!isCalendarOpen);
    setIsYearDropdownOpen(false);
  };

  const handleYearDropdownClick = (e) => {
    e.stopPropagation();
    setIsYearDropdownOpen(!isYearDropdownOpen);
  };

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
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectYear(year);
                      }}
                      className="px-3 py-1.5 text-[0.75rem] hover:bg-ds-primary/100 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100"
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

        <div className="grid grid-cols-7 gap-1 text-center text-gray-500 dark:text-gray-400 font-medium mb-2 ds-text-xs">
          {days.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">{renderDays()}</div>
      </div>
    );

    return createPortal(calendarContent, document.body);
  };

  return (
    <div className="flex flex-col space-y-1 w-full relative justify-center">
      {showLabel && label && (
        <label className="ds-text-xs font-normal text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

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
            "px-2 ds-text-xs cursor-pointer",
            "focus:border-2 focus:border-ds-primary",
            selectedDate
              ? "text-gray-700 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-500",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400 ds-text-xs dark:text-gray-400" />
          <span>{formatDate(selectedDate)}</span>
        </div>
      </div>

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
      {label && (
        <label className="block ds-text-xs font-normal text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-2 rounded-sm py-1.5 ds-text-xs bg-white dark:bg-gray-800 ${className}`}
      >
        {children}
      </select>
    </div>
  );
};

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

// ── Initial data (extracted for reset) ──

const initialPayHeads = [
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
];

const initialOneTimePayments = [
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
];

const initialFormData = {
  salaryTemplate: "",
  currency: "",
  EffectiveFromDate: "",
  EffectiveToDate: "",
  notes: "",
};

// ── Main Component ──

const SalaryAssigment = ({ onNext, onPrev }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [payHeads, setPayHeads] = useState(initialPayHeads);
  const [oneTimePayments, setOneTimePayments] = useState(
    initialOneTimePayments,
  );

  // ── Handlers ──

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePayHeadChange = (index, field, value) => {
    setPayHeads((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const handleOneTimePaymentChange = (id, field, value) => {
    setOneTimePayments((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const handleFrequencyChange = (parentId, newFrequency) => {
    setOneTimePayments((prev) => {
      const cloned = [...prev];
      const parentIndex = cloned.findIndex((r) => r.id === parentId);
      if (parentIndex === -1) return prev;

      const parent = { ...cloned[parentIndex] };
      const totalAmount = Number(parent.amount || 0);
      const freq = Math.max(1, Number(newFrequency));

      parent.frequency = freq;
      parent.showSplits = freq > 1;

      const withoutSplits = cloned.filter((r) => r.parentId !== parentId);

      if (freq === 1) {
        return withoutSplits.map((r) => (r.id === parentId ? parent : r));
      }

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

      return [
        ...withoutSplits.slice(0, parentPos),
        parent,
        ...splitRows,
        ...withoutSplits.slice(parentPos + 1),
      ];
    });
  };

  const handleDateChange = (id, value) => {
    setOneTimePayments((prev) =>
      prev.map((r) => (r.id === id ? { ...r, date: value } : r)),
    );
  };

  const handleNotesChange = (e) => {
    setFormData((prev) => ({ ...prev, notes: e.target.value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPayHeads(initialPayHeads);
    setOneTimePayments(initialOneTimePayments);
  };

  // ── Sub-components ──

  function SalaryTable() {
    return (
      <div className="w-full flex justify-center  overflow-auto rounded-lg no-scrollbar table-scroll">
        <div className="w-full  dark:bg-[#E4E6EB]/10 rounded-sm shadow-sm overflow-auto md:overflow-visible">
          <table className="min-w-[800px] w-full ds-text-xs text-left border-collapse rounded-sm shadow drop-shadow-xs border border-gray-200 dark:border-gray-600">
            <thead className="ds-bg-primary text-white font-semibold rounded-t-md">
              <tr className="divide-x divide-gray-200">
                <th className="ds-text-xs px-2 py-3 min-w-[130px]">
                  Pay Head Name
                </th>
                <th className="ds-text-xs px-4 py-3 min-w-[130px]">
                  From Date
                </th>
                <th className="ds-text-xs px-4 py-3 min-w-[130px]">
                  To Date
                </th>
                <th className="ds-text-xs px-4 py-3 min-w-[140px]">
                  Formula
                </th>
                <th className="ds-text-xs px-4 py-3 min-w-[170px]">
                  Monthly Amount
                </th>
                <th className="ds-text-xs px-4 py-3 min-w-[130px]">
                  Annual Amount
                </th>
                <th className="ds-text-xs px-4 py-3">Remarks</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-700 dark:text-gray-200">
              {payHeads.map((item, idx) => (
                <tr
                  key={idx}
                  className="divide-x divide-gray-200 hover:bg-gray-200/30 dark:hover:bg-gray-500/30 dark:bg-[#A1A1AA]/5"
                >
                  <td className="px-2 py-2 flex items-center space-x-2 ds-text-xs">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) =>
                        handlePayHeadChange(idx, "checked", e.target.checked)
                      }
                      className="h-3 w-3 accent-ds-primary"
                    />
                    <span className="text-[13px]">{item.name}</span>
                  </td>

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

                  <td className="px-4 py-2">
                    {item.monthly ? (
                      <div className="text-center">{item.monthly}</div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Amount"
                        className="rounded-md px-2 py-1 ds-text-xs w-full focus:outline-none focus:ring-0 border border-gray-200"
                        value={item.monthly}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "monthly", e.target.value)
                        }
                      />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {item.annual ? (
                      <div className="text-center">{item.annual}</div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Enter Amount"
                        className="rounded-md px-2 py-1 ds-text-xs w-full focus:outline-none focus:ring-0 border border-gray-200"
                        value={item.annual}
                        onChange={(e) =>
                          handlePayHeadChange(idx, "annual", e.target.value)
                        }
                      />
                    )}
                  </td>

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
                        className="rounded-md px-2 py-1 ds-text-xs w-full focus:outline-none focus:ring-0 border border-gray-200"
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

  function PayTable() {
    const visibleRows = oneTimePayments
      .filter((r) => !r.isSplit)
      .flatMap((parent) => {
        if (parent.showSplits) {
          const splits = oneTimePayments.filter(
            (r) => r.parentId === parent.id,
          );
          return [parent, ...splits];
        }
        return [parent];
      });

    return (
      <div className="w-full mx-auto mt-6 bg-white dark:bg-[#E4E6EB]/10 border border-gray-300 dark:border-gray-600 rounded-sm overflow-auto sm:overflow-visible">
        <table className="w-full text-[0.8rem] border-separate border-spacing-0 ">
          <thead>
            <tr className="ds-bg-primary  text-white ds-text-xs">
              <th className="px-6 py-3 text-left font-semibold rounded-tl-sm">
                Pay Head Name
              </th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold rounded-tr-sm">
                Payment Frequency
              </th>
            </tr>
          </thead>

          <tbody className="dark:text-gray-200 ds-text-xs">
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
                          className="w-3 h-3 accent-ds-primary"
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
                        className="w-24 text-center rounded px-2 py-1 focus:outline-none focus:ring-0 ds-text-xs border border-gray-300"
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
                          className="px-2 py-1 text-xs bg-ds-primary/10 text-ds-primary rounded hover:bg-ds-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="border border-ds-primary/50 rounded-md px-3 py-1 text-ds-primary font-medium min-w-[40px] text-center">
                          {row.frequency}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleFrequencyChange(row.id, row.frequency + 1)
                          }
                          className="px-2 py-1 text-xs bg-ds-primary/10 text-ds-primary rounded hover:bg-ds-primary/20"
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
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#EFEFEF] dark:bg-[#E4E6EB]/10 dark:border-gray-600 dark:border gap-4 p-4 pt-4 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Selectf
            label="Salary Template"
            name="salaryTemplate"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 font-normal"
            value={formData.salaryTemplate}
            onChange={handleChange}
            options={[{ value: "Salary", label: "Salary" }]}
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
          <button className="py-0.5 px-8 my-2.5 mt-6 ds-text-xs text-red-600 border border-red-500 rounded-sm cursor-pointer hover:bg-red-50 transition-colors">
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
              className="w-full h-[120px] p-3 ds-text-xs border border-gray-300 dark:border-gray-700 dark:bg-[#E4E6EB]/10 text-black dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-primary/50 focus:border-transparent resize-none"
              placeholder="Write Here ..."
              value={formData.notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>

          {/* Buttons */}
          <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-4">
          <button
          onClick={onPrev}
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Previous
        </button>
        <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onNext}
          className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SalaryAssigment;
