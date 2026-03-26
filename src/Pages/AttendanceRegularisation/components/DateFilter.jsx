import { Calendar as CalendarIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// Utility
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Single Date Picker ────────────────────────────────────────────────────────
const DatePicker = ({ placeholder, value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const calendarRef = useRef(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  // Parse value string "YYYY-MM-DD" → Date
  const selectedDate = value ? new Date(value + "T00:00:00") : null;

  const formatDisplay = (date) => {
    if (!date) return "";
    return `${months[date.getMonth()].substring(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatISO = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setIsOpen(false);
    setIsYearDropdownOpen(false);
    if (onChange) onChange(formatISO(newDate));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const today = new Date();
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();

      cells.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-[0.75rem] transition-colors",
            isSelected
              ? "bg-purple-600 text-white"
              : isToday
              ? "font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900"
              : "text-gray-900 dark:text-gray-100 hover:bg-purple-100 dark:hover:bg-purple-900"
          )}
        >
          {day}
        </div>
      );
    }
    return cells;
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={calendarRef} className="relative w-full sm:w-40">
      {/* ── Closed trigger — matches DateFilter exactly ── */}
      <div
        onClick={() => setIsOpen((v) => !v)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 dark:bg-gray-800 flex items-center justify-between cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
      >
        <span className={`text-sm ${selectedDate ? "text-gray-800 dark:text-gray-200" : "text-gray-500"}`}>
          {selectedDate ? formatDisplay(selectedDate) : placeholder}
        </span>
        <CalendarIcon className="text-gray-600 dark:text-gray-400" size={16} />
      </div>

      {/* ── Open state — custom calendar UI ── */}
      {isOpen && (
        <div className="absolute z-[99999] mt-1 w-64 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors text-base leading-none"
            >
              &#8592;
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-[0.8rem] font-semibold text-gray-600 dark:text-gray-100">
                {months[currentDate.getMonth()]}
              </span>

              {/* Year dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsYearDropdownOpen((v) => !v)}
                  className="text-[0.8rem] font-semibold text-gray-600 dark:text-gray-100 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                >
                  {currentDate.getFullYear()}
                </button>
                {isYearDropdownOpen && (
                  <div className="absolute z-20 mt-1 w-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {years.map((year) => (
                      <div
                        key={year}
                        onClick={() => {
                          setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                          setIsYearDropdownOpen(false);
                        }}
                        className="px-3 py-1.5 text-[0.75rem] hover:bg-purple-100 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100"
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors text-base leading-none"
            >
              &#8594;
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-gray-500 dark:text-gray-400 font-medium mb-2 text-[0.7rem]">
            {days.map((d, i) => <div key={i}>{d}</div>)}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── DateFilter ────────────────────────────────────────────────────────────────
const DateFilter = ({ fromDate, toDate, setFromDate, setToDate }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <DatePicker
        placeholder="From Date"
        value={fromDate}
        onChange={setFromDate}
      />
      <DatePicker
        placeholder="To Date"
        value={toDate}
        onChange={setToDate}
      />
    </div>
  );
};

export default DateFilter;