import { CalendarIcon } from 'lucide-react';
import React, { useState, useRef } from 'react';

const Calendar = ({ label, name, value, onChange ,style}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const calendarRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate years for dropdown (current year ± 10 years)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Get days in the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date for input (e.g., "Oct 7, 2025")
  const formatDate = (date) => {
    if (!date) return 'Select a date';
    const month = months[date.getMonth()].substring(0, 3);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Format date for onChange (YYYY-MM-DD)
  const formatISODate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
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
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const daysArray = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();
      const isSelected = selectedDate &&
                        day === selectedDate.getDate() &&
                        currentDate.getMonth() === selectedDate.getMonth() &&
                        currentDate.getFullYear() === selectedDate.getFullYear();
      daysArray.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-[0.75rem] transition-colors
                     ${isSelected ? 'bg-purple-600 text-white' : isToday ? 'text-black' : 'hover:bg-purple-500 dark:hover:bg-purple-500 text-gray-900 dark:text-gray-100'}`}
        >
          {day}
        </div>
      );
    }

    return daysArray;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Select a year
  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  // Handle click outside to close calendar
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarOpen(false);
      setIsYearDropdownOpen(false);
    }
  };

  // Add event listener for click outside
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col space-y-1 w-full max-w-sm mx-auto cursor-pointer">
      {/* Label */}
      <label className="text-[0.7rem] font-semibold text-gray-500 dark:text-gray-200">
        {label || ''}
      </label>

      {/* Input Field */}
      <div className="relative">
        <div
        style={style}
          onClick={() => setIsCalendarOpen(true)}
          className={cn(
            "w-full flex items-center text-left font-normal py-1.5 h-[1.9rem] transition-all duration-200",
            "rounded-sm border border-gray-300 dark:border-gray-700",
            "bg-white dark:bg-gray-800",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            "px-2 text-[0.7rem]",
            ' focus:border-2 focus:border-[#9853F9]',
            selectedDate ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 text-[0.7rem] dark:text-gray-400" />
          <span>{formatDate(selectedDate)}</span>
        </div>

        {/* Calendar */}
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className="w-full p-3 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 absolute z-[99999] mt-1"
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
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    className="text-[0.8rem] font-semibold text-gray-500 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {currentDate.getFullYear()}
                  </button>
                  {isYearDropdownOpen && (
                    <div className="absolute z-20 mt-2 w-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {years.map((year) => (
                        <div
                          key={year}
                          onClick={() => selectYear(year)}
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
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors  text-[1rem]"
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
            <div className="grid grid-cols-7 gap-1 text-center">
              {renderDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Utility function to mimic cn for className concatenation
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default Calendar;