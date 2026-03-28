import {
  ArrowBigUp,
  CalendarDays,
  Download,
  Import,
  Upload,
  UserCheck2Icon,
} from "lucide-react";
import { useState } from "react";
import { CiGrid41, CiGrid42 } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import MonthlyAttendanceImport from "./MonthlyAttendanceImport";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Attendance1 from "../Assets/Attendance1.svg";
import Attendance2 from "../Assets/Attendance2.svg";
import Attendance3 from "../Assets/Attendance3.svg";
import Attendance4 from "../Assets/Attendance4.svg";
import Attendance5 from "../Assets/Attendance5.svg";
import Attendance6 from "../Assets/Attendance6.svg";
import Attendance7 from "../Assets/Attendance7.svg";
import Attendance8 from "../Assets/Attendance8.svg";
import Attendance9 from "../Assets/Attendance9.svg";
import Attendance10 from "../Assets/Attendance10.svg";
export default function AttendanceImport() {
  const [showCards, setShowCards] = useState(true);

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  
  return (
    <div className="p-0 md:p-6 min-h-screen text-sm text-gray-800">
      <div className="p-0 md:p-4 rounded-sm shadow drop-shadow-xs border border-gray-100 dark:border-gray-500 dark:bg-gray-900   ">
        {/* Toggle Button */}

        <div
          className="flex justify-between cursor-pointer   bg-primary  rounded-sm p-0.5"
          onClick={toggleCards}
        >
          <h1 className="text-white font-semibold  text-[1.4rem] px-2 py-1">
            Attendance
          </h1>
          <button className="flex items-center justify-center gap-2  m-2 px-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm border border-gray-300 hover:shadow-md cursor-pointer transition-all duration-300 active:scale-95">
            <span
            // className={`transition-transform duration-300  ${
            //   showCards ? "rotate-0 scale-100" : "rotate-180 scale-90"
            // }`}
            >
              {showCards ? (
                <MdOutlineKeyboardArrowUp size={22} />
              ) : (
                <MdOutlineKeyboardArrowDown size={22} />
              )}
            </span>
          </button>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-2 transition-all duration-500 ${showCards
              ? "opacity-100 h-auto md:max-h-[1000px]"
              : "opacity-0 max-h-0  overflow-hidden "
            }`}
        >
          <div showCards={showCards}>
            <h1 className="text-[0.9rem] text-gray-400 mb-2 font-semibold">
              Data Input & Imports
            </h1>
            <div className="space-y-3">
              <ActionCard
                color="bg-[#8629DF]"
                icon={Attendance1}
                title="Import Monthly Attendance"
                desc="Upload Full Attendance Records For A Month"
                showCards={showCards}
                delay={0}
              />
              <ActionCard
                color="bg-blue-600"
                icon={Attendance2}
                title="Import Weekly Off"
                desc="Bulk Upload Weekly Offs For Employees"
                showCards={showCards}
                delay={50}
              />
              <ActionCard
                color="bg-indigo-600"
                icon={Attendance3}
                title="Import Attendance LWP Dates"
                desc="Bulk Upload LWP Dates For Selected Employees"
                showCards={showCards}
                delay={100}
              />
              <ActionCard
                color="bg-sky-600"
                icon={Attendance4}
                title="Import OT Hours/Day"
                desc="Upload Daily Overtime Hours In Bulk"
                showCards={showCards}
                delay={150}
              />
              <ActionCard
                color="bg-orange-500"
                icon={Attendance5}
                title="Import Regularization/Leave"
                desc="Upload Approved Leaves Or Corrections"
                showCards={showCards}
                delay={200}
              />
            </div>
          </div>

          {/* Scheduling & Assignments Section */}
          <div showCards={showCards}>
            <h1 className="text-[0.9rem] text-gray-400 mb-2 font-semibold">
              Scheduling & Assignments{" "}
            </h1>
            <div className="space-y-3">
              <ActionCard
                color="bg-green-600"
                icon={Attendance6}
                title="Assign Shift"
                desc="Allocate Day, Night, Or Rotational Shifts"
                showCards={showCards}
                delay={250}
              />
              <ActionCard
                color="bg-emerald-600"
                icon={Attendance7}
                title="Assign Holiday"
                desc="Set Official Holidays For Employees / Groups"
                showCards={showCards}
                delay={300}
              />
              <ActionCard
                color="bg-blue-500"
                icon={Attendance8}
                title="Assign Weekly Off"
                desc="Define Weekly Offs For Employees"
                showCards={showCards}
                delay={350}
              />
            </div>
          </div>

          {/* Processing & Adjustments Section */}
          <div showCards={showCards}>
            <h1 className="text-[0.9rem] text-gray-400 mb-2 font-semibold">
              Processing & Adjustments{" "}
            </h1>
            <div className="space-y-3">
              <ActionCard
                color="bg-purple-600"
                icon={Attendance9}
                title="Attendance Process"
                desc="Process Final Attendance, Shifts & OT"
                showCards={showCards}
                delay={400}
              />
              <ActionCard
                color="bg-orange-500"
                icon={Attendance10}
                title="Attendance Punch Correction"
                desc="Correct Missing Or Wrong Punch Times"
                showCards={showCards}
                delay={450}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Empty State - Shows when cards are hidden */}
      {/* <div className={`transition-all duration-500 text-center py-12 ${!showCards ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
          <CiGrid42 size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">Cards are Hidden</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Click the "Show All Cards" button above to display all attendance import options.
        </p>
      </div> */}

      <div className="mt-16 md:mt-0 ">
        <MonthlyAttendanceImport />
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap justify-end w-full gap-2 mt-6">
        {/* Cancel */}
        <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] 
               text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] 
               py-1 rounded-sm
               w-[48%] sm:w-auto md:w-24"
        >
          Cancel
        </button>

        {/* Export */}
        <button
          type="button"
          className="bg-[#8629DF] text-white font-semibold 
               text-xs sm:text-[0.7rem] py-1.2 rounded-sm
               w-[48%] sm:w-auto md:w-24"
        >
          <span className="flex justify-center gap-3">
            <Download className="h-3 w-3 mt-0.4" />
            Export
          </span>
        </button>

        {/* Import & Save */}
        <button
          type="button"
          className="bg-[#8629DF] text-white font-semibold 
               text-xs sm:text-[0.7rem] py-2 md:py-1.2 rounded-sm
               w-full sm:w-full md:w-fit  px-4"
        >
          <span className="flex justify-center gap-3">
            <Upload className="h-3 w-3 mt-0.5" />
            Import and Save
          </span>
        </button>
      </div>

      
    </div>
  );
}

function Section({ title, children, showCards }) {
  return (
    <div
      className={`transition-opacity duration-500 ${showCards ? "opacity-100" : "opacity-0"
        }`}
    >
      <h3
        className={`text-xs font-semibold text-gray-500 mb-3 transition-opacity duration-300 ${!showCards ? "opacity-0" : "opacity-100"
          }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ActionCard({ icon, title, desc, color, showCards, delay = 0 }) {
  return (
    <div
      className={`
        flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 cursor-pointer rounded-sm 
        hover:bg-[#8629DF]/90 hover:text-white dark:text-white hover:shadow-lg hover:scale-[1.02]
        transition-all duration-300 ease-out
        ${showCards ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
    // style={{
    //   transitionDelay: `${delay}ms`,
    //   pointerEvents: showCards ? 'auto' : 'none'
    // }}
    >
      <div
        className={`h-10 w-10 flex items-center justify-center rounded-md text-white ${color} transition-transform duration-300 group-hover:scale-110`}
      >
        {/* <span className="h-8 w-8">{icon}</span> */}
        <img src={icon} className=" h-8 w-8" alt={title} />
      </div>
      <div className="transition-all duration-300">
        <p className="font-semibold text-[0.9rem] group-hover:translate-x-1">
          {title}
        </p>
        <p className="text-[0.7rem] group-hover:translate-x-1">{desc}</p>
      </div>
    </div>
  );
}
