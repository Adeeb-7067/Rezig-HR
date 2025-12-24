import {
  CalendarDays,
  Upload,
  Clock,
  FileText,
  Users,
  Edit3,
  Filter,
} from "lucide-react";

export default function AttendanceImport() {
  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen text-sm text-gray-800">
      {/* ===== TOP ACTION CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Section title="Data Input & Imports">
          <ActionCard
            color="bg-purple-600"
            icon={<Upload size={18} />}
            title="Import Monthly Attendance"
            desc="Upload Full Attendance Records For A Month"
          />
          <ActionCard
            color="bg-blue-600"
            icon={<CalendarDays size={18} />}
            title="Import Weekly Off"
            desc="Bulk Upload Weekly Offs For Employees"
          />
          <ActionCard
            color="bg-indigo-600"
            icon={<FileText size={18} />}
            title="Import Attendance LWP Dates"
            desc="Bulk Upload LWP Dates For Selected Employees"
          />
          <ActionCard
            color="bg-sky-600"
            icon={<Clock size={18} />}
            title="Import OT Hours/Day"
            desc="Upload Daily Overtime Hours In Bulk"
          />
          <ActionCard
            color="bg-orange-500"
            icon={<Edit3 size={18} />}
            title="Import Regularization/Leave"
            desc="Upload Approved Leaves Or Corrections"
          />
        </Section>

        {/* Scheduling */}
        <Section title="Scheduling & Assignments">
          <ActionCard
            color="bg-green-600"
            icon={<Users size={18} />}
            title="Assign Shift"
            desc="Allocate Day, Night, Or Rotational Shifts"
          />
          <ActionCard
            color="bg-emerald-600"
            icon={<CalendarDays size={18} />}
            title="Assign Holiday"
            desc="Set Official Holidays For Employees / Groups"
          />
          <ActionCard
            color="bg-blue-500"
            icon={<CalendarDays size={18} />}
            title="Assign Weekly Off"
            desc="Define Weekly Offs For Employees"
          />
        </Section>

        {/* Processing */}
        <Section title="Processing & Adjustments">
          <ActionCard
            color="bg-purple-600"
            icon={<Clock size={18} />}
            title="Attendance Process"
            desc="Process Final Attendance, Shifts & OT"
          />
          <ActionCard
            color="bg-orange-500"
            icon={<Edit3 size={18} />}
            title="Attendance Punch Correction"
            desc="Correct Missing Or Wrong Punch Times"
          />
        </Section>
      </div>

      {/* ===== IMPORT MONTHLY ATTENDANCE ===== */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="font-semibold mb-4">Import Monthly Attendance</h2>

        {/* Search & Filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-72">
            <input
              className="w-full border rounded-md pl-3 pr-9 py-2 text-sm"
              placeholder="Search by employee name, ID"
            />
          </div>

          <button className="flex items-center gap-2 border rounded-md px-3 py-2">
            <Filter size={16} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            "Unit Name",
            "Department",
            "Live/Current",
            "Designation",
            "Grade",
            "Level",
          ].map((item) => (
            <select
              key={item}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option>{item}</option>
            </select>
          ))}
        </div>

        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Select All", "Location Unit", "Kajra Thakur", "UX/UI Designer", "Bhopal"].map(
            (tag) => (
              <span
                key={tag}
                className="bg-gray-100 border rounded-full px-3 py-1 text-xs"
              >
                {tag} ✕
              </span>
            )
          )}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-xs mb-1">Leave Template ID</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1">Month - Year</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option>Apr-2025</option>
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1">Select Attendance Excel File</label>
            <input
              type="file"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded-md text-sm">
              Export
            </button>
            <button className="border px-4 py-2 rounded-md text-sm">
              Reset
            </button>
          </div>

          <button className="bg-purple-600 text-white px-6 py-2 rounded-md">
            Import and Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Reusable Components ===== */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ActionCard({ icon, title, desc, color }) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
      <div
        className={`h-10 w-10  flex items-center justify-center rounded-md text-white ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="font-semibold text-[0.9rem]">{title}</p>
        <p className="text-[0.7rem] text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
