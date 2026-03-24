import { X, Calendar, Sun } from "lucide-react";
import { useState, useRef } from "react";

function getOrdinal(n) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return n + "th";
  const d = n % 10;
  if (d === 1) return n + "st";
  if (d === 2) return n + "nd";
  if (d === 3) return n + "rd";
  return n + "th";
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AttendanceBulkRegularizeModal = ({
  open,
  onClose,
  selectedDays = [],
  month = 4,
  year = 2025,
}) => {
  if (!open) return null;

  const formatSelectedDate = (day) => {
    const date = new Date(year, month, day);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const ord = getOrdinal(day);
    const mon = MONTH_NAMES[month];
    return `${weekday}, ${ord} ${mon} ${year}`;
  };

  const formatShortDate = (day) => {
    const d = new Date(year, month, day);
    return `${day} ${MONTH_NAMES[month]} ${year}`;
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700 shrink-0">
          <h2 className="text-[#8629DF] font-semibold text-sm truncate">
            {selectedDays.length > 0 && formatSelectedDate(dates[0]?.day)}
          </h2>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400 text-white text-xs font-medium">
              <Sun size={12} />
              Day
            </span>

            <button
              onClick={onClose}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto no-scrollbar dropdown-scroll px-4 py-3 space-y-2">
          {dates.map((item, index) => (
            <div key={item.day}>
              {/* SHIFT DETAILS */}
              <div className="border dark:border-gray-700 rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-[0.8rem]">Shift Details</p>
                  <span className="bg-purple-100 text-black text-[0.7rem] px-2 py-[2px] rounded">
                    Gurugram Office
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-5 mx-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <p>Shift In Date</p>
                    <p className="font-medium">{formatShortDate(item.day)}</p>
                  </div>
                  <div>
                    <p>Shift In</p>
                    <p className="font-medium">08:30</p>
                  </div>
                  <div>
                    <p>Shift Out Date</p>
                    <p className="font-medium">{formatShortDate(item.day)}</p>
                  </div>
                  <div>
                    <p>Shift Out</p>
                    <p className="font-medium">18:30</p>
                  </div>
                </div>
              </div>

              {/* CURRENT ATTENDANCE */}
              <div className="border dark:border-gray-700 rounded-md p-3">
                <p className="font-medium mb-2 text-[0.8rem]">
                  Current Attendance Details
                </p>

                <div className="grid grid-cols-2 gap-5 mx-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <p>In Date</p>
                    <p className="font-medium">{formatShortDate(item.day)}</p>
                  </div>
                  <div>
                    <p>In Time</p>
                    <p className="font-medium">09:30</p>
                  </div>
                  <div>
                    <p>Out Date</p>
                    <p className="font-medium">{formatShortDate(item.day)}</p>
                  </div>
                  <div>
                    <p>Out Time</p>
                    <p className="font-medium">18:00</p>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <p className="font-medium text-[0.8rem] mb-1">Status</p>
                <div className="flex items-center gap-2 text-[0.8rem]">
                  <span>Current Status :</span>
                  <span className="bg-amber-50 ml-12 text-amber-400 px-2 py-1 rounded-full text-[0.7rem]">
                    Missed Punch
                  </span>
                </div>
              </div>

              {/* CORRECT TIMING */}
              <div>
                <p className="font-medium mb-3 text-[0.8rem]">Correct Timing</p>

                <div className="grid grid-cols-2 gap-3 text-[0.7rem]">
                  {/* IN DATE */}
                  <div>
                    <p className="text-gray-500 font-medium mb-1">In Date</p>
                    <div
                      onClick={() => openPicker(item.inRef)}
                      className="border rounded px-2 py-2 flex justify-between items-center cursor-pointer"
                    >
                      <span className={item.inDate ? "" : "text-gray-400"}>
                        {item.inDate || "Select Date"}
                      </span>
                      <Calendar size={14} />
                    </div>
                    <input
                      ref={item.inRef}
                      type="date"
                      value={item.inDate}
                      onChange={(e) => updateField(index, "inDate", e.target.value)}
                      className="hidden"
                    />
                  </div>

                  {/* IN TIME */}
                  <div>
                    <p className="text-gray-500 mb-1 font-medium">In Time</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="19"
                        value={item.inHour}
                        onChange={(e) => updateField(index, "inHour", e.target.value)}
                        className="border rounded px-2 py-2 w-full"
                      />
                      <span className="w-fit text-gray-500 mt-2">:</span>
                      <input
                        type="number"
                        placeholder="25"
                        value={item.inMin}
                        onChange={(e) => updateField(index, "inMin", e.target.value)}
                        className="border rounded px-2 py-2 w-full"
                      />
                    </div>
                  </div>

                  {/* OUT DATE */}
                  <div>
                    <p className="text-gray-500 mb-1 font-medium">Out Date</p>
                    <div
                      onClick={() => openPicker(item.outRef)}
                      className="border rounded px-2 py-2 flex justify-between items-center cursor-pointer"
                    >
                      <span className={item.outDate ? "" : "text-gray-400"}>
                        {item.outDate || "Select Date"}
                      </span>
                      <Calendar size={14} />
                    </div>
                    <input
                      ref={item.outRef}
                      type="date"
                      value={item.outDate}
                      onChange={(e) => updateField(index, "outDate", e.target.value)}
                      className="hidden"
                    />
                  </div>

                  {/* OUT TIME */}
                  <div>
                    <p className="text-gray-500 mb-1 font-medium">Out Time</p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="09"
                        value={item.outHour}
                        onChange={(e) => updateField(index, "outHour", e.target.value)}
                        className="border rounded px-2 py-2 w-full"
                      />
                      <span className="w-fit text-gray-500 mt-2">:</span>
                      <input
                        type="number"
                        placeholder="25"
                        value={item.outMin}
                        onChange={(e) => updateField(index, "outMin", e.target.value)}
                        className="border rounded px-2 py-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* NEXT DATE SEPARATOR */}
              {dates[index + 1] && (
                <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-[#8629DF] font-semibold text-sm">
                      {formatSelectedDate(dates[index + 1].day)}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400 text-white text-xs font-medium">
                      <Sun size={12} />
                      Day
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="w-full flex justify-end px-4 py-3 border-t dark:border-gray-700 shrink-0">
          <button className="w-fit py-1 px-3 bg-[#8629DF] hover:bg-[#7620c7] text-white rounded-sm text-sm font-medium">
            Regularize All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceBulkRegularizeModal;