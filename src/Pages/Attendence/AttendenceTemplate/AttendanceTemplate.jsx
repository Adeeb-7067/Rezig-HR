;

import AttendanceSection from "./AttendanceSection";
import BiometricAttendanceSection from "./BiometricAttendanceSection";
import LeaveConfigurationSection from "./LeaveConfigurationSection";
import ShortLeaveSection from "./ShortLeaveSection";
import LeaveYearSection from "./LeaveYearSection";
import ESSSection from "./ESSSection";
import SectionCard from "@/components/cards/SectionCard";

const AttendanceTemplate = () => {
    return (

        <div className="max-w-[1400px] mx-auto px-6 space-y-6">

            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <AttendanceSection />
                <BiometricAttendanceSection />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                {/* Left Column */}
                <div className="-mt-4 lg:-mt-66">
                    <LeaveConfigurationSection />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <ShortLeaveSection />
                    <LeaveYearSection />
                    <ESSSection />
                </div>

            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 pt-2">
                <button className="px-6 py-2 text-xs font-medium border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition">
                    Reset
                </button>

                <button className="px-6 py-2 text-xs font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                    Update
                </button>
            </div>

        </div>

    );
};

export default AttendanceTemplate;