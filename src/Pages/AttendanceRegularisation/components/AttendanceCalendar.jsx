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

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const AttendanceCalendar = ({
    multipleCorrection,
    selectedDays,
    setSelectedDays,
    //  openBulkModal,
    openSingleModal
}) => {
    return (
        <div className="border rounded-lg overflow-hidden">

            {/* Week Header */}
            <div className="grid grid-cols-7 dark:bg-gray-800 dark:text-white bg-gray-100 text-xs font-medium text-gray-500">
                {weekDays.map((day) => (
                    <div key={day} className="p-2 border-r text-center">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="overflow-x-auto">
                <div className="grid grid-cols-7 min-w-[900px]">

                    {days.map((day) => (
                        // <CalendarDay
                        //     key={day}
                        //     day={day}
                        //     data={attendanceData[day]}
                        //     multipleCorrection={multipleCorrection}
                        //     selectedDays={selectedDays}
                        //     setSelectedDays={setSelectedDays}
                        // />
                        <CalendarDay
                            key={day}
                            day={day}
                            data={attendanceData[day]}
                            multipleCorrection={multipleCorrection}
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
                            //openBulkModal={openBulkModal}
                            openSingleModal={openSingleModal}
                        />
                    ))}

                </div>
            </div>

        </div>
    );
};

export default AttendanceCalendar;