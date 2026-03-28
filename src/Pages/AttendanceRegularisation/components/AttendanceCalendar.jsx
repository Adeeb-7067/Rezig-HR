import React from "react";
import CalendarDay from "./CalendarDay";

export const attendanceData = {
    1: { status: "M", in: "9:25", out: "9:25", shift: "day", icon: "sun" },
    2: { status: "P", in: "19:10", out: "18:01", shift: "night", icon: "moon" },
    3: { status: "P", in: "9:02", out: "18:05", shift: "day", icon: "sun" },
    4: { status: "W" },

    5: { status: "A" },
    6: { status: "P", in: "8:58", out: "18:01", icon: "sun" },
    7: { status: "M", in: "18:35", out: "18:35", icon: "moon" },
    8: { status: "P", in: "8:58", out: "18:01", icon: "sun" },
    9: { status: "H" },

    12: { status: "M", in: "9:25", out: "9:25", icon: "sun" },
    13: { status: "M", in: "9:03", out: "9:03", icon: "sun" },
    14: { status: "P", in: "18:58", out: "18:01", icon: "moon" },
    15: { status: "P", in: "8:58", out: "18:01", icon: "sun" },
};

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const weekDaysShort = ["M", "T", "W", "T", "F", "S", "S"];

/** Build a month grid with leading/trailing days (Monday-first). */
function getMonthGrid(year, month) {
    const firstDay = new Date(year, month, 1);
    const startDow = firstDay.getDay();
    const monFirst = startDow === 0 ? 6 : startDow - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = [];
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = monFirst - 1; i >= 0; i--) {
        prevMonthDays.push(prevMonthLast - i);
    }
    const grid = [];
    prevMonthDays.forEach((d) => grid.push({ day: d, isCurrentMonth: false }));
    for (let d = 1; d <= daysInMonth; d++) {
        grid.push({ day: d, isCurrentMonth: true });
    }
    const remainder = grid.length % 7;
    if (remainder) {
        for (let i = 0; i < 7 - remainder; i++) {
            grid.push({ day: i + 1, isCurrentMonth: false });
        }
    }
    return grid;
}

function toAttendanceDataShape(dayStatusMap) {
    if (!dayStatusMap) return undefined;
    const out = {};
    Object.entries(dayStatusMap).forEach(([day, statuses]) => {
        const key = Number(day);
        out[key] = Array.isArray(statuses) ? { status: statuses } : { status: statuses };
    });
    return out;
}

function normalizeOverride(attendanceDataOverride) {
    if (!attendanceDataOverride) return undefined;
    const firstVal = Object.values(attendanceDataOverride)[0];
    const isFullObject =
        firstVal != null &&
        typeof firstVal === "object" &&
        !Array.isArray(firstVal) &&
        "status" in firstVal;
    if (isFullObject) {
        const out = {};
        Object.entries(attendanceDataOverride).forEach(([day, obj]) => {
            out[Number(day)] = obj;
        });
        return out;
    }
    return toAttendanceDataShape(attendanceDataOverride);
}

const AttendanceCalendar = ({
    multipleCorrection,
    selectedDays,
    setSelectedDays,
    openSingleModal,
    month,
    year,
    attendanceDataOverride,
    compact = false,
}) => {
    const dataSource = attendanceDataOverride
        ? normalizeOverride(attendanceDataOverride)
        : attendanceData;
    const useMonthGrid = month != null && year != null;
    const gridCells = useMonthGrid
        ? getMonthGrid(year, month)
        : Array.from({ length: 31 }, (_, i) => ({ day: i + 1, isCurrentMonth: true }));

    return (
        <div className="border rounded-lg overflow-hidden w-full">
            {/* Week Header */}
            <div
                className={`grid grid-cols-7 dark:bg-gray-800 dark:text-white bg-gray-100 font-medium text-gray-500 ${
                    compact ? "text-[0.7rem]" : "text-[0.6rem] sm:text-xs"
                }`}
            >
                {weekDays.map((day, i) => (
                    <div
                        key={day}
                        className="border-r-2 border-gray-200 dark:border-gray-600 p-1 sm:p-[7px] text-center"
                    >
                        {/* Full label on sm+, single letter on xs */}
                        <span className="hidden sm:inline">{day}</span>
                        <span className="inline sm:hidden">{weekDaysShort[i]}</span>
                    </div>
                ))}
            </div>

            {/* Calendar Days — fully fluid, no horizontal scroll */}
            <div className="w-full">
                <div className="grid grid-cols-7 w-full">
                    {gridCells.map((cell, idx) => (
                        <CalendarDay
                            key={
                                useMonthGrid
                                    ? `${cell.isCurrentMonth ? "c" : "o"}-${cell.day}-${idx}`
                                    : cell.day
                            }
                            day={cell.day}
                            data={cell.isCurrentMonth ? dataSource?.[cell.day] : undefined}
                            multipleCorrection={multipleCorrection}
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
                            openSingleModal={openSingleModal}
                            compact={compact}
                            isCurrentMonth={cell.isCurrentMonth}
                            month={useMonthGrid ? month : undefined}
                            year={useMonthGrid ? year : undefined}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar;