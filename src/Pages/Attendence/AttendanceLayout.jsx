;
import { useState } from "react";
import AttendanceTemplate from "./AttendenceTemplate/AttendanceTemplate";
import ShiftConfiguration from "./ShiftConfiguration/ShiftConfiguration";
import SectionCard from "@/components/cards/SectionCard";
import ShiftCategoryMaster from "./ShiftCategoryMaster/ShiftCategoryMaster";
import ShiftMaster from "./ShiftMaster/ShiftMaster";

const AttendanceLayout = () => {
    const [activeTab, setActiveTab] = useState("attendance");

    const tabs = [
        { id: "attendance", label: "Attendance Template" },
        { id: "category", label: "Shift Category Master" },
        { id: "shift", label: "Shift Master" },
        { id: "config", label: "Shift Configuration" },
    ];

    return (
        <div>

            {/* Tabs */}
            <div className="w-full flex gap-10 text-Header  border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-2 transition-all duration-200 ${activeTab === tab.id
                            ? "text-purple-600 border-b-2 border-purple-600"
                            : "text-gray-500 hover:text-purple-600"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="w-full mt-6">
                {activeTab === "attendance" && <AttendanceTemplate />}
                {activeTab === "config" && <ShiftConfiguration />}
                {activeTab === "category" && < ShiftCategoryMaster />}
                {activeTab === "shift" && < ShiftMaster />}
            </div>

        </div>
    );
};

export default AttendanceLayout;