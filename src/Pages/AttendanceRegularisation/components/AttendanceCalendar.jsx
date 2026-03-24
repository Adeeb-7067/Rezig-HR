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

/** Build a month grid with leading/trailing days (Monday-first). Returns flat array of { day, isCurrentMonth } */
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

/** Convert map of day -> string[] to day -> { status: string[] } for CalendarDay */
function toAttendanceDataShape(dayStatusMap) {
    if (!dayStatusMap) return undefined;
    const out = {};
    Object.entries(dayStatusMap).forEach(([day, statuses]) => {
        const key = Number(day);
        out[key] = Array.isArray(statuses) ? { status: statuses } : { status: statuses };
    });
    return out;
}

/** If override values are full objects (status, in, out, shift, icon), use as-is; else convert with toAttendanceDataShape */
function normalizeOverride(attendanceDataOverride) {
    if (!attendanceDataOverride) return undefined;
    const firstVal = Object.values(attendanceDataOverride)[0];
    const isFullObject = firstVal != null && typeof firstVal === "object" && !Array.isArray(firstVal) && "status" in firstVal;
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
    const dataSource = attendanceDataOverride ? normalizeOverride(attendanceDataOverride) : attendanceData;
    const useMonthGrid = month != null && year != null;
    const gridCells = useMonthGrid
        ? getMonthGrid(year, month)
        : Array.from({ length: 31 }, (_, i) => ({ day: i + 1, isCurrentMonth: true }));

    return (
        <div className={`border rounded-lg ${compact ? "max-w-full overflow-visible" : "overflow-hidden"}`}>
            {/* Week Header */}
            <div className={`grid grid-cols-7 dark:bg-gray-800 dark:text-white bg-gray-100 font-medium text-gray-500 ${compact ? "text-[0.7rem] " : "text-xs "}`}>
                {weekDays.map((day) => (
                    <div key={day} className="border-r-2 p-[7px]  border-gray-200 dark:border-gray-600  ">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className={compact ? "" : "overflow-x-auto"}>
                <div className={`grid grid-cols-7 ${compact ? "min-w-0 w-full" : "min-w-[900px]"}`}>
                    {gridCells.map((cell, idx) => (
                        <CalendarDay
                            key={useMonthGrid ? `${cell.isCurrentMonth ? "c" : "o"}-${cell.day}-${idx}` : cell.day}
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