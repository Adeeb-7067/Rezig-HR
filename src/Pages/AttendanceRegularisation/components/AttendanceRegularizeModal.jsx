import { X, Calendar, Sun } from "lucide-react";
import { useMemo, useRef, useState } from "react";

function getOrdinal(n) {
    const v = n % 100;
    if (v >= 11 && v <= 13) return n + "th";
    const d = n % 10;
    if (d === 1) return n + "st";
    if (d === 2) return n + "nd";
    if (d === 3) return n + "rd";
    return n + "th";
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const AttendanceRegularizeModal = ({ open, onClose, day, month = 4, year = 2025 }) => {

    if (!open || day == null) return null;

    const selectedDate = useMemo(() => {
        const date = new Date(year, month, day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        const ord = getOrdinal(day);
        const mon = MONTH_NAMES[month];
        return `${weekday}, ${ord} ${mon} ${year}`;
    }, [day, month, year]);

    const shortDateStr = useMemo(() => {
        const d = new Date(year, month, day);
        return `${day} ${MONTH_NAMES[month]} ${year}`;
    }, [day, month, year]);

    const inputDate = useMemo(() => {
        const d = new Date(year, month, day);
        return d.toISOString().split("T")[0];
    }, [day, month, year]);

    const inDateRef = useRef(null);
    const outDateRef = useRef(null);

    // const [inDate, setInDate] = useState(inputDate);
    // const [outDate, setOutDate] = useState(inputDate);
    const [inDate, setInDate] = useState("");
    const [outDate, setOutDate] = useState("");
    const openPicker = (ref) => {
        if (ref.current?.showPicker) {
            ref.current.showPicker();
        } else {
            ref.current.focus();
        }
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 overflow-y-auto">

            {/* MODAL - no internal scroll */}
            <div className="w-full max-w-md min-w-0 my-auto bg-white dark:bg-gray-800 rounded-sm shadow-xl p-4 sm:p-5">

                {/* HEADER: date, Day pill (sun), X */}
                <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">

                    <h2 className="text-[#333333] dark:text-gray-100 font-semibold text-sm sm:text-base truncate min-w-0 flex-1">
                        {selectedDate}
                    </h2>

                    <div className="flex items-center gap-2 ml-auto">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-xs font-medium">
                            <Sun size={12} />
                            Day
                        </span>
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                </div>

                {/* SHIFT DETAILS */}
                <div className="border dark:border-gray-700 rounded-sm p-3 mb-3">

                    <div className="flex items-center gap-2 mb-2">

                        <p className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                            Shift Details
                        </p>

                        <span className="bg-[#8629DF]/10 dark:bg-purple-900/50 text-[#8629DF] dark:text-purple-300 text-xs px-2 py-[2px] rounded font-medium">
                            Gurugram Office
                        </span>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <div className="min-w-0">
                            <p>Shift In Date</p>
                            <p className="font-medium truncate">{shortDateStr}</p>
                        </div>
                        <div className="min-w-0">
                            <p>Shift In</p>
                            <p className="font-medium">08:30</p>
                        </div>
                        <div className="min-w-0">
                            <p>Shift Out Date</p>
                            <p className="font-medium truncate">{shortDateStr}</p>
                        </div>
                        <div className="min-w-0">
                            <p>Shift Out</p>
                            <p className="font-medium">18:30</p>
                        </div>
                    </div>

                </div>

                {/* CURRENT ATTENDANCE */}
                <div className="border dark:border-gray-700 rounded-sm p-3 mb-3">

                    <p className="font-medium text-gray-700 dark:text-gray-200 mb-2 text-sm">
                        Current Attendance Details
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        <div className="min-w-0">
                            <p>In Date</p>
                            <p className="font-medium truncate">{shortDateStr}</p>
                        </div>
                        <div className="min-w-0">
                            <p>In Time</p>
                            <p className="font-medium">09:30</p>
                        </div>
                        <div className="min-w-0">
                            <p>Out Date</p>
                            <p className="font-medium truncate">{shortDateStr}</p>
                        </div>
                        <div className="min-w-0">
                            <p>Out Time</p>
                            <p className="font-medium">18:00</p>
                        </div>
                    </div>

                </div>

                {/* STATUS */}
                <div className="mb-3 text-xs sm:text-sm min-w-0">
                    <p className="font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Status
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">
                            Current Status:
                        </span>
                        <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-xs font-medium shrink-0">
                            Missed Punch
                        </span>
                    </div>
                </div>

                {/* CORRECT TIMING */}
                <div className="border dark:border-gray-700 rounded-lg p-3 min-w-0">
                    <p className="font-medium text-gray-700 dark:text-gray-200 mb-3 text-sm">
                        Correct Timing
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="min-w-0">
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                In Date
                            </p>
                            <div
                                onClick={() => openPicker(inDateRef)}
                                className="relative cursor-pointer min-w-0"
                            >
                                <div className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded px-2 py-2 sm:py-1 flex items-center justify-between min-w-0">
                                    <span className={`text-xs truncate min-w-0 ${inDate ? "text-gray-800 dark:text-gray-200" : "text-gray-400"}`}>
                                        {inDate || "Select Date"}
                                    </span>
                                    <Calendar size={14} className="text-gray-500 shrink-0 ml-1" />
                                </div>
                                <input
                                    ref={inDateRef}
                                    type="date"
                                    value={inDate}
                                    onChange={(e) => setInDate(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                In Time
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="09"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-2 sm:py-1 w-full min-w-0 text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="25"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-2 sm:py-1 w-full min-w-0 text-sm"
                                />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Out Date
                            </p>
                            <div
                                onClick={() => openPicker(outDateRef)}
                                className="relative cursor-pointer min-w-0"
                            >
                                <div className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded px-2 py-2 sm:py-1 flex items-center justify-between min-w-0">
                                    <span className={`text-xs truncate min-w-0 ${outDate ? "text-gray-800 dark:text-gray-200" : "text-gray-400"}`}>
                                        {outDate || "Select Date"}
                                    </span>
                                    <Calendar size={14} className="text-gray-500 shrink-0 ml-1" />
                                </div>
                                <input
                                    ref={outDateRef}
                                    type="date"
                                    value={outDate}
                                    onChange={(e) => setOutDate(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Out Time
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="18"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-2 sm:py-1 w-full min-w-0 text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="00"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-2 sm:py-1 w-full min-w-0 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BUTTON */}
                <div className="flex justify-end mt-4 shrink-0">
                    <button type="button" className="w-full sm:w-auto bg-[#8629DF] hover:bg-[#7620c7] text-white px-4 py-2.5 sm:py-2 rounded-md text-sm font-medium min-h-[44px] sm:min-h-0">
                        Regularize
                    </button>
                </div>

            </div>

        </div>

    );
};

export default AttendanceRegularizeModal;