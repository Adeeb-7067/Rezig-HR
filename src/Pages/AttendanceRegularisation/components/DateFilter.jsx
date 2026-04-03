import { Calendar as CalendarIcon } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

// Utility
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ─── Single Date Picker ────────────────────────────────────────────────────────
const DatePicker = ({ placeholder, value, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("below");
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

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

  const handleOpen = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(spaceBelow < 280 && spaceAbove > 280 ? "above" : "below");
    }
    setIsOpen((v) => !v);
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setIsOpen(false);
    setIsYearDropdownOpen(false);
    if (onChange) onChange(formatISO(newDate));
  };

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const today = new Date();
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="aspect-square" />);
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
            "aspect-square flex items-center justify-center rounded-full cursor-pointer ds-text-xs transition-colors select-none",
            isSelected
              ? "bg-ds-primary text-white"
              : isToday
              ? "font-semibold text-ds-primary dark:text-ds-primary ring-1 ring-ds-primary/40"
              : "hover:bg-ds-primary/10 dark:hover:bg-ds-primary/40 text-gray-800 dark:text-gray-200"
          )}
        >
          {day}
        </div>
      );
    }
    return cells;
  };

  const handleClickOutside = useCallback((e) => {
    if (
      calendarRef.current && !calendarRef.current.contains(e.target) &&
      inputRef.current && !inputRef.current.contains(e.target)
    ) {
      setIsOpen(false);
      setIsYearDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (!isOpen) return;
    const handleResize = () => {
      setIsOpen(false);
      setIsYearDropdownOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className="relative w-full sm:w-40" ref={inputRef}>
      {/* ── Original closed trigger UI (unchanged) ── */}
      <div
        onClick={handleOpen}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 dark:bg-gray-800 flex items-center justify-between cursor-pointer hover:border-ds-primary/50 dark:hover:border-ds-primary transition-colors"
      >
        <CalendarIcon className="text-gray-600 dark:text-gray-400" size={14} />

        <span className={`ds-text-xs ${selectedDate ? "text-gray-800 dark:text-gray-200" : "text-gray-500"}`}>
          {selectedDate ? formatDisplay(selectedDate) : placeholder}
        </span>
      </div>

      {/* ── Calendar popover (styled like Calendar/DatePicker component) ── */}
      {isOpen && (
        <div
          ref={calendarRef}
          className={cn(
            "w-full min-w-[220px] max-w-[320px]",
            "p-3 rounded-sm shadow-lg",
            "border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-900",
            "absolute z-[99999]",
            dropdownPosition === "above"
              ? "bottom-full mb-1"
              : "top-full mt-1",
            "left-0"
          )}
        >
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-3 gap-1">
            <button
              onClick={prevMonth}
              className="p-1 rounded text-gray-500 dark:text-gray-300 hover:text-ds-primary dark:hover:text-ds-primary transition-colors"
              aria-label="Previous month"
            >
              &#8592;
            </button>

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[0.8rem] font-semibold text-gray-600 dark:text-gray-100 truncate">
                {months[currentDate.getMonth()]}
              </span>

              {/* Year dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsYearDropdownOpen((v) => !v)}
                  className="text-[0.8rem] font-semibold text-gray-600 dark:text-gray-100 hover:text-ds-primary dark:hover:text-ds-primary transition-colors"
                  aria-label="Select year"
                  aria-expanded={isYearDropdownOpen}
                >
                  {currentDate.getFullYear()}
                </button>
                {isYearDropdownOpen && (
                  <div
                    className={cn(
                      "absolute z-20 w-20 bg-white dark:bg-gray-900",
                      "border border-gray-200 dark:border-gray-700",
                      "rounded shadow-lg max-h-40 overflow-y-auto",
                      "bottom-full mb-1"
                    )}
                  >
                    {years.map((year) => (
                      <div
                        key={year}
                        onClick={() => selectYear(year)}
                        className={cn(
                          "px-3 py-1 text-[0.72rem] cursor-pointer transition-colors",
                          "text-gray-800 dark:text-gray-100",
                          "hover:bg-ds-primary/10 dark:hover:bg-ds-primary/40",
                          year === currentDate.getFullYear() &&
                            "bg-ds-primary/10 dark:bg-ds-primary/20 font-semibold"
                        )}
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
                className="p-1 rounded text-gray-500 dark:text-gray-300 hover:text-ds-primary dark:hover:text-ds-primary transition-colors"
              aria-label="Next month"
            >
              &#8594;
            </button>
          </div>

          {/* Day-of-week labels */}
          <div className="grid grid-cols-7 gap-0.5 text-center text-gray-400 dark:text-gray-500 text-[0.65rem] font-medium mb-1">
            {days.map((d) => (
              <div key={d} className="py-0.5">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0.5">
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