export default function AttendanceAdjustment({ onNext, onPrev }) {

    return (
        <div className="space-y-4">

            {/* Title */}
            <h2 className="text-base font-semibold mb-1 text-gray-500">
                Attendance Adjustment
            </h2>

            {/* Card */}
            <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3">

                <p className="text-base font-semibold text-gray-500 dark:text-gray-200 mb-3">
                    Attendance Calculation Method
                </p>

                {/* Toggle Row */}
                <div className="flex items-center gap-3">

                    <span className="text-[0.7rem] text-gray-600 dark:text-gray-200">
                        Optimistic Attendance
                    </span>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">

                        <input type="checkbox" className="sr-only peer" />

                        <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none 
                        rounded-full peer dark:bg-gray-600 
                        peer-checked:bg-ds-primary 
                        dark:peer-checked:bg-ds-primary
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border 
                        after:rounded-full after:h-4 after:w-4 after:transition-all 
                        peer-checked:after:translate-x-5"></div>

                    </label>

                    <span className="ds-text-xs text-gray-500 dark:text-gray-400">
                        Mark Attendance According To Attendance Machine
                    </span>

                </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-3">
                <button
                    className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
                    onClick={onPrev}
                >
                    Previous
                </button>
                <button
                    className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
                >
                    Reset
                </button>
                <button
                    className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white hover:bg-ds-primary/80"
                    onClick={onNext}
                >
                    Save
                </button>
            </div>
        </div>
    );
}