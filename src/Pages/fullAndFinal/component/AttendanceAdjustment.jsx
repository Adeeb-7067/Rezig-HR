export default function AttendanceAdjustment({ onNext, onPrev }) {

    return (
        <div className="space-y-6">

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Attendance Adjustment
            </h2>

            {/* Card */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">

                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    Attendance Calculation Method
                </p>

                {/* Toggle Row */}
                <div className="flex items-center gap-3">

                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        Optimistic Attendance
                    </span>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">

                        <input type="checkbox" className="sr-only peer" />

                        <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none 
                        rounded-full peer dark:bg-gray-600 
                        peer-checked:bg-purple-600 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border 
                        after:rounded-full after:h-4 after:w-4 after:transition-all 
                        peer-checked:after:translate-x-5"></div>

                    </label>

                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Mark Attendance According To Attendance Machine
                    </span>

                </div>

            </div>

            {/* Buttons */}
            {/* <div className="flex justify-end gap-3">

                <button
                    onClick={onPrev}
                    className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md"
                >
                    Previous
                </button>

                <button className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-gray-600 dark:text-gray-300">
                    Reset
                </button>

                <button
                    onClick={onNext}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
                >
                    Save
                </button>

            </div> */}
            <div
                className="
    flex flex-row sm:flex-row 
    justify-end 
    w-full 
    gap-2 
    mt-3
  "
            >
                <button
                    className="
      bg-white dark:bg-[#E4E6EB]/10
      border border-[#8629DF]
      text-[#8629DF]
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
                    onClick={onPrev}
                >
                    Previous
                </button>
                <button
                    className="
      bg-white dark:bg-[#E4E6EB]/10
      border border-[#8629DF]
      text-[#8629DF]
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
                >
                    Reset
                </button>
                <button
                    className="
      bg-[#8629DF]
      text-white
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
                    onClick={onNext}
                >
                    Save
                </button>
            </div>
        </div>
    );
}