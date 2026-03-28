import { CalendarIcon } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Calendar = ({ label, name, value, onChange, style, onStyleOpen }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const formatDate = (date) => {
    if (!date) return "";
    return `${months[date.getMonth()].substring(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatISODate = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Determine whether dropdown should open above or below
  const handleOpen = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // Calendar height is roughly 260px
      setDropdownPosition(spaceBelow < 280 && spaceAbove > 280 ? "above" : "below");
    }
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setIsCalendarOpen(false);
    setIsYearDropdownOpen(false);
    if (onChange) {
      onChange({ target: { name, value: formatISODate(newDate) } });
    }
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="aspect-square" />);
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

      daysArray.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className={cn(
            "aspect-square flex items-center justify-center rounded-full cursor-pointer text-[0.7rem] transition-colors select-none",
            isSelected
              ? "bg-purple-600 text-white"
              : isToday
              ? "font-semibold text-purple-600 dark:text-purple-400 ring-1 ring-purple-400"
              : "hover:bg-purple-100 dark:hover:bg-purple-900/40 text-gray-800 dark:text-gray-200"
          )}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };

  const prevMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const handleClickOutside = useCallback((e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)) {
      setIsCalendarOpen(false);
      setIsYearDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Close on resize if open (avoids broken positioning)
  useEffect(() => {
    if (!isCalendarOpen) return;
    const handleResize = () => {
      setIsCalendarOpen(false);
      setIsYearDropdownOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCalendarOpen]);

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-[0.7rem] font-semibold text-gray-500 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Input trigger */}
      <div className="relative w-full" ref={inputRef}>
        <div
          style={style}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleOpen()}
          aria-haspopup="true"
          aria-expanded={isCalendarOpen}
          className={cn(
            "w-full flex items-center text-left font-normal py-1.5 h-[1.9rem]",
            "rounded-sm border border-gray-300 dark:border-gray-700",
            "bg-white dark:bg-gray-800",
            "hover:bg-gray-50 dark:hover:bg-gray-700/60",
            "px-2 text-[0.7rem] cursor-pointer transition-all duration-200",
            "focus:outline-none focus:border-2 focus:border-[#9853F9]",
            selectedDate
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-500"
          )}
        >
          <CalendarIcon className="mr-2 h-3.5 w-3.5 flex-shrink-0 text-gray-400 dark:text-gray-400" />
          <span className="truncate">{formatDate(selectedDate) || "Select date"}</span>
        </div>

        {/* Calendar popover */}
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            style={onStyleOpen}
            className={cn(
              // Responsive width: full on small screens, min 220px otherwise
              "w-full min-w-[220px] max-w-[320px]",
              "p-3 rounded-sm shadow-lg",
              "border border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-gray-900",
              "absolute z-[99999]",
              // Position above or below based on viewport space
              dropdownPosition === "above"
                ? "bottom-full mb-1"
                : "top-full mt-1",
              // Prevent overflow off right edge
              "left-0"
            )}
          >
            {/* Month/Year header */}
            <div className="flex items-center justify-between mb-3 gap-1">
              <button
                onClick={prevMonth}
                className="p-1 rounded text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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
                    className="text-[0.8rem] font-semibold text-gray-600 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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
                        // Flip year list up if near bottom of calendar
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
                            "hover:bg-purple-100 dark:hover:bg-purple-900/40",
                            year === currentDate.getFullYear() &&
                              "bg-purple-50 dark:bg-purple-900/20 font-semibold"
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
                className="p-1 rounded text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
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

            {/* Day grid — uses aspect-square so cells are always proportional */}
            <div className="grid grid-cols-7 gap-0.5">
              {renderDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;