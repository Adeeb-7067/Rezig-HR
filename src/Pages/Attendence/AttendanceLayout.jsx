"use client";

import { useState } from "react";

import AttendanceTemplate from "./AttendenceTemplate/AttendanceTemplate";
import ShiftConfiguration from "./ShiftConfiguration/ShiftConfiguration";
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
        <div className="w-full">

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">

                <div className="flex gap-6 sm:gap-10 min-w-max px-1">

                    {tabs.map((tab) => {

                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  whitespace-nowrap
                  pb-2 text-sm sm:text-base
                  transition-all duration-200
                  ${isActive
                                        ? "text-purple-600 border-b-2 border-purple-600"
                                        : "text-gray-500 hover:text-purple-600"
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        );
                    })}

                </div>

            </div>

            {/* Content */}
            <div className="mt-6">

                {activeTab === "attendance" && <AttendanceTemplate />}
                {activeTab === "category" && <ShiftCategoryMaster />}
                {activeTab === "shift" && <ShiftMaster />}
                {activeTab === "config" && <ShiftConfiguration />}
            </div>

        </div>
    );
};

export default AttendanceLayout;