import React from "react";

const EmployeeCard = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 bg-white dark:bg-gray-800 w-full max-w-[560px]">

      <div className="flex gap-3 sm:gap-4">

        {/* IMAGE */}
        <img
          src="https://i.pravatar.cc/150"
          alt="Amit Sharma"
          className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-lg object-cover bg-gray-100 flex-shrink-0"
        />

        {/* CONTENT */}
        <div className="flex-1 min-w-0">

          {/* TOP ROW */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h2 className="text-[0.9rem] sm:text-[1rem] font-semibold text-gray-800 dark:text-gray-100 truncate">
                Amit Sharma
              </h2>
              <p className="text-[0.75rem] sm:text-[0.8rem] text-gray-400 font-medium">
                EMP1024
              </p>
            </div>

            {/* STATUS */}
              <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-400 dark:text-amber-300 px-2 py-1 rounded-full text-[0.7rem]">
              Missed Punch
            </span>
          </div>

          {/* DATE */}
          <p className="text-[0.75rem] sm:text-[0.8rem] text-gray-700 dark:text-gray-200 mt-1 font-medium">
            19 January 2026
          </p>

          {/* TIME INFO */}
          <div className="text-[0.7rem] text-gray-500 dark:text-gray-400 mt-1 space-y-[2px]">
            <p>
              In Time -{" "}
              <span className="text-gray-700 dark:text-gray-300">10:15 am</span>
            </p>
            <p>
              Out Time -{" "}
              <span className="text-gray-700 dark:text-gray-300">06:00 pm</span>
            </p>
          </div>
        </div>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
        {["Marking Department", "Senior Executive", "Gurugram Office"].map((tag) => (
          <span
            key={tag}
            className="bg-[#7B2CBF] text-white text-[0.6rem] sm:text-[0.65rem] px-2 sm:px-3 py-1 rounded-[4px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCard;