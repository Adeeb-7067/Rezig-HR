import { X, Calendar } from "lucide-react";
import { useMemo, useRef, useState } from "react";

const AttendanceRegularizeModal = ({ open, onClose, day }) => {

    if (!open) return null;

    const selectedDate = useMemo(() => {
        const date = new Date(2025, 4, day);
        return date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }, [day]);

    const inputDate = useMemo(() => {
        const d = new Date(2025, 4, day);
        return d.toISOString().split("T")[0];
    }, [day]);

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

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            {/* MODAL */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-sm shadow-xl p-4 sm:p-5">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-purple-600 font-semibold text-sm sm:text-base">
                        {selectedDate}
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* SHIFT DETAILS */}
                <div className="border dark:border-gray-700 rounded-sm p-3 mb-3">

                    <div className="flex items-center gap-2 mb-2">

                        <p className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                            Shift Details
                        </p>

                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs px-2 py-[2px] rounded">
                            Gurugram Office
                        </span>

                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">

                        <div>
                            <p>Shift In Date</p>
                            <p className="font-medium">{selectedDate}</p>
                        </div>

                        <div>
                            <p>Shift In</p>
                            <p className="font-medium">08:30</p>
                        </div>

                        <div>
                            <p>Shift Out Date</p>
                            <p className="font-medium">{selectedDate}</p>
                        </div>

                        <div>
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

                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">

                        <div>
                            <p>In Date</p>
                            <p className="font-medium">{selectedDate}</p>
                        </div>

                        <div>
                            <p>In Time</p>
                            <p className="font-medium">09:30</p>
                        </div>

                        <div>
                            <p>Out Date</p>
                            <p className="font-medium">{selectedDate}</p>
                        </div>

                        <div>
                            <p>Out Time</p>
                            <p className="font-medium">18:00</p>
                        </div>

                    </div>

                </div>

                {/* STATUS */}
                <div className="mb-3 text-xs sm:text-sm">

                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                        Status
                    </p>

                    <div className="flex items-center gap-2">

                        <span className="text-gray-600 dark:text-gray-300">
                            Current Status :
                        </span>

                        <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 px-2 py-[2px] rounded text-xs">
                            Missed Punch
                        </span>

                    </div>

                </div>

                {/* CORRECT TIMING */}
                <div className="border dark:border-gray-700 rounded-lg p-3">

                    <p className="font-medium text-gray-700 dark:text-gray-200 mb-3 text-sm">
                        Correct Timing
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">

                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                In Date
                            </p>

                            <div
                                onClick={() => openPicker(inDateRef)}
                                className="relative cursor-pointer"
                            >
                                <div className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 flex items-center justify-between">

                                    <span className={`text-xs ${inDate ? "text-gray-800 dark:text-gray-200" : "text-gray-400"
                                        }`}>
                                        {inDate || "Select Date"}
                                    </span>

                                    <Calendar size={14} className="text-gray-500" />
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

                        <div>

                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                In Time
                            </p>

                            <div className="flex gap-1">

                                <input
                                    type="number"
                                    placeholder="09"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-1 w-full"
                                />

                                <input
                                    type="number"
                                    placeholder="25"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-1 w-full"
                                />

                            </div>

                        </div>

                        <div>

                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Out Date
                            </p>

                            <div
                                onClick={() => openPicker(outDateRef)}
                                className="relative cursor-pointer"
                            >
                                <div className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 flex items-center justify-between">

                                    <span className={`text-xs ${outDate ? "text-gray-800 dark:text-gray-200" : "text-gray-400"
                                        }`}>
                                        {outDate || "Select Date"}
                                    </span>

                                    <Calendar size={14} className="text-gray-500" />
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

                        <div>

                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Out Time
                            </p>

                            <div className="flex gap-1">

                                <input
                                    type="number"
                                    placeholder="18"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-1 w-full"
                                />

                                <input
                                    type="number"
                                    placeholder="00"
                                    className="border dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-2 py-1 w-full"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* BUTTON */}
                <div className="flex justify-end mt-4">

                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">
                        Regularize
                    </button>

                </div>

            </div>

        </div>

    );
};

export default AttendanceRegularizeModal;