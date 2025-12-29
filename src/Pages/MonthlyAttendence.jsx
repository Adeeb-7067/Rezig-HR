import { CalendarDays, UserCheck2Icon } from "lucide-react";
import { useState } from "react";
import { CiGrid41, CiGrid42 } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import MonthlyAttendanceImport from "./MonthlyAttendanceImport";
export default function AttendanceImport() {
  const [showCards, setShowCards] = useState(true);

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  return (
    <div className="p-6 min-h-screen text-sm text-gray-800">
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleCards}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300 hover:shadow-md cursor-pointer transition-all duration-300 active:scale-95"
        >
          <span
            className={`transition-transform duration-300 ${
              showCards ? "rotate-0 scale-100" : "rotate-180 scale-90"
            }`}
          >
            {showCards ? <CiGrid41 size={18} /> : <CiGrid42 size={18} />}
          </span>
        </button>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transition-all duration-500 ${
          showCards
            ? "opacity-100 max-h-[1000px]"
            : "opacity-0 max-h-0  overflow-hidden "
        }`}
      >
        <Section title="Data Input & Imports" showCards={showCards}>
          <div className="space-y-3">
            <ActionCard
              color="bg-[#8629DF]"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />

                  <line x1="3" y1="10" x2="21" y2="10" />

                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />

                  <circle cx="12" cy="15" r="2" />

                  <path d="M8 20c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                </svg>
              }
              title="Import Monthly Attendance"
              desc="Upload Full Attendance Records For A Month"
              showCards={showCards}
              delay={0}
            />
            <ActionCard
              color="bg-blue-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />

                  <line x1="3" y1="9" x2="21" y2="9" />

                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />

                  <text
                    x="12"
                    y="17"
                    text-anchor="middle"
                    font-size="7"
                    font-family="Arial, sans-serif"
                    fill="currentColor"
                    font-weight="bold"
                  >
                    07
                  </text>

                  {/* <path d="M15.5 15.5l1.5 1.5 3-3" /> */}
                </svg>
              }
              title="Import Weekly Off"
              desc="Bulk Upload Weekly Offs For Employees"
              showCards={showCards}
              delay={50}
            />
            <ActionCard
              color="bg-indigo-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />

                  <rect x="6" y="10" width="12" height="4" rx="1" />
                  <line x1="8" y1="14" x2="8" y2="18" />
                  <line x1="16" y1="14" x2="16" y2="18" />

                  <circle cx="17.5" cy="6.5" r="3" />
                  <line x1="16.5" y1="5.5" x2="18.5" y2="7.5" />
                  <line x1="18.5" y1="5.5" x2="16.5" y2="7.5" />
                </svg>
              }
              title="Import Attendance LWP Dates"
              desc="Bulk Upload LWP Dates For Selected Employees"
              showCards={showCards}
              delay={100}
            />
            <ActionCard
              color="bg-sky-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2a10 10 0 1 1-7.07 2.93" />

                  <line x1="12" y1="6" x2="12" y2="11" />
                  <line x1="12" y1="11" x2="9" y2="11" />
                  <rect x="13" y="13" width="7" height="5" rx="1" />

                  <path d="M14.5 13v-1a2 2 0 0 1 4 0v1" />
                </svg>
              }
              title="Import OT Hours/Day"
              desc="Upload Daily Overtime Hours In Bulk"
              showCards={showCards}
              delay={150}
            />
            <ActionCard
              color="bg-orange-500"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-15.5-6.36" />
                  <polyline points="5 3 5 7 9 7" />

                  <path d="M3 12a9 9 0 0 0 15.5 6.36" />
                  <polyline points="19 21 19 17 15 17" />

                  {/* <rect x="8" y="5" width="8" height="14" rx="1" /> */}

                  <line x1="11" y1="9" x2="14" y2="9" />
                  <line x1="11" y1="13" x2="14" y2="13" />
                  {/* <line x1="11" y1="17" x2="14" y2="17" /> */}

                  <polyline points="9 9 9.5 9.5 10.5 8.5" />
                  <polyline points="9 13 9.5 13.5 10.5 12.5" />
                  {/* <polyline points="9 17 9.5 17.5 10.5 16.5" /> */}
                </svg>
              }
              title="Import Regularization/Leave"
              desc="Upload Approved Leaves Or Corrections"
              showCards={showCards}
              delay={200}
            />
          </div>
        </Section>

        {/* Scheduling & Assignments Section */}
        <Section title="Scheduling & Assignments" showCards={showCards}>
          <div className="space-y-3">
            <ActionCard
              color="bg-green-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="5" r="2" />
                  <path d="M8.5 10c0-2 1.6-3 3.5-3s3.5 1 3.5 3" />

                  <circle cx="6" cy="15" r="2" />
                  <path d="M3 20c0-2 1.6-3 3-3s3 1 3 3" />

                  <circle cx="18" cy="15" r="2" />
                  <path d="M15 20c0-2 1.6-3 3-3s3 1 3 3" />
                </svg>
              }
              title="Assign Shift"
              desc="Allocate Day, Night, Or Rotational Shifts"
              showCards={showCards}
              delay={250}
            />
            <ActionCard
              color="bg-emerald-600"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />

                  <line x1="3" y1="9" x2="21" y2="9" />

                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />

                  <rect x="6" y="12" width="2" height="2" />
                  <rect x="10" y="12" width="2" height="2" />
                  <rect x="14" y="12" width="2" height="2" />

                  {/* <line x1="13.5" y1="15.5" x2="19.5" y2="21.5" />
                  <line x1="19.5" y1="15.5" x2="13.5" y2="21.5" /> */}
                </svg>
              }
              title="Assign Holiday"
              desc="Set Official Holidays For Employees / Groups"
              showCards={showCards}
              delay={300}
            />
            <ActionCard
              color="bg-blue-500"
              icon={<CalendarDays size={30} />}
              title="Assign Weekly Off"
              desc="Define Weekly Offs For Employees"
              showCards={showCards}
              delay={350}
            />
          </div>
        </Section>

        {/* Processing & Adjustments Section */}
        <Section title="Processing & Adjustments" showCards={showCards}>
          <div className="space-y-3">
            <ActionCard
              color="bg-purple-600"
              icon={<UserCheck2Icon size={32} />}
              title="Attendance Process"
              desc="Process Final Attendance, Shifts & OT"
              showCards={showCards}
              delay={400}
            />
            <ActionCard
              color="bg-orange-500"
              icon={<FaUserCircle size={32} />}
              title="Attendance Punch Correction"
              desc="Correct Missing Or Wrong Punch Times"
              showCards={showCards}
              delay={450}
            />
          </div>
        </Section>
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


<div>
        <MonthlyAttendanceImport />
</div>
    </div>
  );
}

function Section({ title, children, showCards }) {
  return (
    <div
      className={`transition-opacity duration-500 ${
        showCards ? "opacity-100" : "opacity-0"
      }`}
    >
      <h3
        className={`text-xs font-semibold text-gray-500 mb-3 transition-opacity duration-300 ${
          !showCards ? "opacity-0" : "opacity-100"
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
        flex items-center gap-3 bg-white p-3 cursor-pointer rounded-sm 
        hover:bg-[#8629DF]/90 hover:text-white hover:shadow-lg hover:scale-[1.02]
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
        <span className="h-8 w-8">{icon}</span>
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
