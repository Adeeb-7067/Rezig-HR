import { X, Calendar, Sun } from "lucide-react";
import { useState, useRef } from "react";
const AttendanceBulkRegularizeModal = ({
    open,
    onClose,
    selectedDays = []
}) => {

    if (!open) return null;


    const openPicker = (ref) => {
        if (ref.current?.showPicker) {
            ref.current.showPicker();
        } else {
            ref.current.focus();
        }
    };
    const [dates, setDates] = useState(
        selectedDays.map((day) => ({
            day,
            inDate: "",
            outDate: "",
            inHour: "",
            inMin: "",
            outHour: "",
            outMin: "",
            inRef: useRef(null),
            outRef: useRef(null)
        }))
    );

    const updateField = (index, field, value) => {
        const updated = [...dates];
        updated[index][field] = value;
        setDates(updated);
    };

    const formatDate = (day) => {
        const d = new Date(2025, 4, day);
        return d.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-xl">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">

                    <h2 className="text-purple-600 font-semibold">
                        {formatDate(dates[0]?.day)}
                    </h2>

                    <div className="flex items-center gap-3">

                        <span className="flex items-center gap-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 px-2 py-1 rounded-full">
                            <Sun size={14} /> Day
                        </span>

                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            <X size={18} />
                        </button>

                    </div>

                </div>

                {/* BODY */}
                <div className="max-h-[70vh] overflow-y-auto table-scroll px-6 py-5 space-y-6">

                    {dates.map((item, index) => (

                        <div key={item.day}>

                            {/* SHIFT DETAILS */}
                            <div className="border dark:border-gray-700 rounded-lg p-4 mb-4">

                                <div className="flex gap-2 items-center mb-3">

                                    <p className="font-medium text-gray-700 dark:text-gray-200">
                                        Shift Details
                                    </p>

                                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-[2px] rounded">
                                        Gurugram Office
                                    </span>

                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">

                                    <div>
                                        <p>Shift In Date</p>
                                        <p className="font-medium">{formatDate(item.day)}</p>
                                    </div>

                                    <div>
                                        <p>Shift In</p>
                                        <p className="font-medium">08:30</p>
                                    </div>

                                    <div>
                                        <p>Shift Out Date</p>
                                        <p className="font-medium">{formatDate(item.day)}</p>
                                    </div>

                                    <div>
                                        <p>Shift Out</p>
                                        <p className="font-medium">18:30</p>
                                    </div>

                                </div>

                            </div>

                            {/* CURRENT ATTENDANCE */}
                            <div className="border-b pb-4 mb-4">

                                <p className="font-medium text-gray-700 dark:text-gray-200 mb-3">
                                    Current Attendance Details
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">

                                    <div>
                                        <p>In Date</p>
                                        <p className="font-medium">{formatDate(item.day)}</p>
                                    </div>

                                    <div>
                                        <p>In Time</p>
                                        <p className="font-medium">09 : 30</p>
                                    </div>

                                    <div>
                                        <p>Out Date</p>
                                        <p className="font-medium">{formatDate(item.day)}</p>
                                    </div>

                                    <div>
                                        <p>Out Time</p>
                                        <p className="font-medium">18 : 00</p>
                                    </div>

                                </div>

                            </div>

                            {/* STATUS */}
                            <div className="mb-4">

                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 font-semibold">
                                    Status
                                </p>

                                <div className="flex items-center gap-2 text-sm">

                                    <span>Current Status :</span>

                                    <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 text-xs px-2 py-1 rounded-full">
                                        Missed Punch
                                    </span>

                                </div>

                            </div>

                            {/* CORRECT TIMING */}
                            <div className="border dark:border-gray-700 rounded-lg p-4">

                                <p className="font-medium text-gray-700 dark:text-gray-200 mb-3">
                                    Correct Timing
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-sm">

                                    <div>
                                        <p className="text-gray-500 mb-1">In Date</p>

                                        <div
                                            onClick={() => openPicker(item.inRef)}
                                            className="relative cursor-pointer"
                                        >
                                            <div className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 flex items-center justify-between">

                                                <span className={`text-xs ${item.inDate ? "text-gray-800 dark:text-gray-200" : "text-gray-400"}`}>
                                                    {item.inDate || "Select Date"}
                                                </span>

                                                <Calendar size={14} className="text-gray-500" />

                                            </div>

                                            <input
                                                ref={item.inRef}
                                                type="date"
                                                value={item.inDate}
                                                onChange={(e) => updateField(index, "inDate", e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />

                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 mb-1">In Time</p>

                                        <div className="flex gap-2">

                                            <input
                                                type="number"
                                                placeholder="19"
                                                value={item.inHour}
                                                onChange={(e) =>
                                                    updateField(index, "inHour", e.target.value)
                                                }
                                                className="w-full border dark:border-gray-600 rounded px-2 py-1"
                                            />

                                            <input
                                                type="number"
                                                placeholder="25"
                                                value={item.inMin}
                                                onChange={(e) =>
                                                    updateField(index, "inMin", e.target.value)
                                                }
                                                className="w-full border dark:border-gray-600 rounded px-2 py-1"
                                            />

                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 mb-1">Out Date</p>

                                        <div
                                            onClick={() => openPicker(item.outRef)}
                                            className="relative cursor-pointer"
                                        >
                                            <div className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 flex items-center justify-between">

                                                <span className={`text-xs ${item.outDate ? "text-gray-800 dark:text-gray-200" : "text-gray-400"}`}>
                                                    {item.outDate || "Select Date"}
                                                </span>

                                                <Calendar size={14} className="text-gray-500" />

                                            </div>

                                            <input
                                                ref={item.outRef}
                                                type="date"
                                                value={item.outDate}
                                                onChange={(e) => updateField(index, "outDate", e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />

                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 mb-1">Out Time</p>

                                        <div className="flex gap-2">

                                            <input
                                                type="number"
                                                placeholder="09"
                                                value={item.outHour}
                                                onChange={(e) =>
                                                    updateField(index, "outHour", e.target.value)
                                                }
                                                className="w-full border dark:border-gray-600 rounded px-2 py-1"
                                            />

                                            <input
                                                type="number"
                                                placeholder="25"
                                                value={item.outMin}
                                                onChange={(e) =>
                                                    updateField(index, "outMin", e.target.value)
                                                }
                                                className="w-full border dark:border-gray-600 rounded px-2 py-1"
                                            />

                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* NEXT DATE */}
                            {dates[index + 1] && (
                                <div className="flex justify-between items-center mt-4">

                                    <p className="text-purple-600 font-medium">
                                        {formatDate(dates[index + 1].day)}
                                    </p>

                                    <span className="flex items-center gap-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 px-2 py-1 rounded-full">
                                        <Sun size={14} /> Day
                                    </span>

                                </div>
                            )}

                        </div>

                    ))}

                </div>

                {/* FOOTER */}
                <div className="flex justify-end px-6 py-4 border-t dark:border-gray-700">

                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded">
                        Regularize All
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AttendanceBulkRegularizeModal;