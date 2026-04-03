import AttendanceSection from "./AttendanceSection";
import BiometricAttendanceSection from "./BiometricAttendanceSection";
import LeaveConfigurationSection from "./LeaveConfigurationSection";
import ShortLeaveSection from "./ShortLeaveSection";
import LeaveYearSection from "./LeaveYearSection";
import ESSSection from "./ESSSection";

const AttendanceTemplate = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="cols-span-1 space-y-3">
          <AttendanceSection />
          <LeaveConfigurationSection />
        </div>
        <div className="col-span-1 space-y-3">
          <BiometricAttendanceSection />
          <ShortLeaveSection />
          <LeaveYearSection />
          <ESSSection />
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-4">
        <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          type="button"
          className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceTemplate;
