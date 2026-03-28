import { X, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import DatePickerField from "@/components/ui/datePicker";
import SelectField from "@/components/SelectFeild";

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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const AttendanceRegularizeModal = ({
  open,
  onClose,
  day,
  month = 4,
  year = 2025,
}) => {
  if (!open || day == null) return null;

  const selectedDate = useMemo(() => {
    const date = new Date(year, month, day);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const ord = getOrdinal(day);
    const mon = MONTH_NAMES[month];
    return `${weekday}, ${ord} ${mon} ${year}`;
  }, [day, month, year]);

  const shortDateStr = useMemo(() => {
    return `${day} ${MONTH_NAMES[month]} ${year}`;
  }, [day, month, year]);

  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-lg shadow-xl flex flex-col max-h-[92vh] sm:max-h-[95vh] overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700 shrink-0">
          <h2 className="text-[#8629DF] font-semibold text-xs sm:text-sm truncate pr-2">
            {selectedDate}
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400 text-white text-xs font-medium">
              <Sun size={12} />
              Day
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto no-scrollbar dropdown-scroll px-4 py-3 space-y-3 flex-1">

          {/* SHIFT DETAILS */}
          <div className="border dark:border-gray-700 rounded-md p-3">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <p className="font-medium text-[0.8rem]">Shift Details</p>
              <span className="bg-purple-100 text-black text-[0.7rem] px-2 py-[2px] rounded">
                Gurugram Office
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 mx-2 text-sm text-gray-600">
              <div>
                <p>Shift In Date</p>
                <p className="font-medium">{shortDateStr}</p>
              </div>
              <div>
                <p>Shift In</p>
                <p className="font-medium">08:30</p>
              </div>
              <div>
                <p>Shift Out Date</p>
                <p className="font-medium">{shortDateStr}</p>
              </div>
              <div>
                <p>Shift Out</p>
                <p className="font-medium">18:30</p>
              </div>
            </div>
          </div>

          {/* CURRENT ATTENDANCE */}
          <div className="border dark:border-gray-700 rounded-md p-3">
            <p className="font-medium mb-2 text-[0.8rem]">Current Attendance Details</p>

            <div className="grid grid-cols-2 gap-5 mx-2 text-sm text-gray-600">
              <div>
                <p>In Date</p>
                <p className="font-medium">{shortDateStr}</p>
              </div>
              <div>
                <p>In Time</p>
                <p className="font-medium">09:30</p>
              </div>
              <div>
                <p>Out Date</p>
                <p className="font-medium">{shortDateStr}</p>
              </div>
              <div>
                <p>Out Time</p>
                <p className="font-medium">18:00</p>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="px-2">
            <p className="font-medium text-[0.8rem] mb-1">Status</p>
            <div className="flex items-center gap-2 text-[0.8rem]">
              <span>Current Status :</span>
              <span className="bg-amber-50 text-amber-400 px-2 py-1 rounded-full text-[0.7rem]">
                Missed Punch
              </span>
            </div>
          </div>

          {/* CORRECT TIMING */}
          <div className="px-2">
            <p className="font-medium mb-3 text-[0.8rem]">Correct Timing</p>

            {/* grid-cols-2 on sm+ (original), single col on xs */}
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 text-[0.7rem]">
              {/* IN DATE */}
              <DatePickerField label={"In Date"} />

              {/* IN TIME */}
              <div>
                <p className="text-gray-500 mb-1 font-medium">In Time</p>
                <div className="flex gap-2">
                  <SelectField
                    type="number"
                     options={[{
                      label: '1', value: '1'
                    }]}
                    placeholder="19"
                    className="border rounded px-2 py-2 w-full"
                  />
                  <span className="w-fit text-gray-500 mt-2">:</span>
                  <SelectField
                    type="number"
                    placeholder="25"
                     options={[{
                      label: '1', value: '1'
                    }]}
                    className="border rounded px-2 py-2 w-full"
                  />
                </div>
              </div>

              {/* OUT DATE */}
              <DatePickerField label={"Out Date"} />

              {/* OUT TIME */}
              <div>
                <p className="text-gray-500 mb-1 font-medium">Out Time</p>
                <div className="flex gap-2">
                  <SelectField
                    type="number"
                     options={[{
                      label: '1', value: '1'
                    }]}
                    placeholder="09"
                    className="border rounded px-2 py-2 w-full"
                  />
                  <span className="w-fit text-gray-500 mt-2">:</span>
                  <SelectField
                    options={[{
                      label: '1', value: '1'
                    }]}
                    type="number"
                    placeholder="25"
                    className="border rounded px-2 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="w-full flex justify-end px-4 py-3 border-t dark:border-gray-700 shrink-0">
          <button className="w-full min-[480px]:w-auto py-1 px-3 bg-[#8629DF] hover:bg-[#7620c7] text-white rounded-sm text-sm font-medium">
            Regularize
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRegularizeModal;