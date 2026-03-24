import React from "react";

const EmployeeCard = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 w-full max-w-[560px]">

      <div className="flex gap-4">

        {/* IMAGE */}
        <img
          src="https://i.pravatar.cc/150"
          alt="Amit Sharma"
          className="w-[110px] h-[110px] rounded-lg object-cover bg-gray-100"
        />

        {/* CONTENT */}
        <div className="flex-1">

          {/* TOP ROW */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[1rem] font-semibold text-gray-800 dark:text-gray-100">
                Amit Sharma
              </h2>
              <p className="text-[0.8rem] text-gray-400 font-medium">
                EMP1024
              </p>
            </div>

            {/* STATUS */}
            <span className="text-[0.7rem]  text-[#FFCC00] bg-[#FFF9E0] px-2 py-1 rounded-full mt-1">
              Missed Punch
            </span>
          </div>

          {/* DATE */}
          <p className="mx-2 text-[0.8rem] text-gray-700 dark:text-gray-200 mt-1 font-medium">
            19 January 2026
          </p>

          {/* TIME INFO */}
          <div className=" mx-2 text-[0.7rem] text-gray-500 dark:text-gray-400 mt-1 space-y-[2px]">
            <p>
              In Time -{" "}
              <span className="text-gray-700 dark:text-gray-300">
                10:15 am
              </span>
            </p>
            <p>
              Out Time -{" "}
              <span className="text-gray-700 dark:text-gray-300">
                06:00 pm
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-2">
        {["Marking Department", "Senior Executive", "Gurugram Office"].map(
          (tag) => (
            <span
              key={tag}
              className="bg-[#7B2CBF] text-white text-[0.65rem] px-3 py-1 rounded-[4px]"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;