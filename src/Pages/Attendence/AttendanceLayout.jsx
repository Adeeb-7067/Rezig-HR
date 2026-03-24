"use client";

import { useState } from "react";

import Tabs from "@/components/Tabs"; // adjust path if needed

import AttendanceTemplate from "./AttendenceTemplate/AttendanceTemplate";
import ShiftConfiguration from "./ShiftConfiguration/ShiftConfiguration";
import ShiftCategoryMaster from "./ShiftCategoryMaster/ShiftCategoryMaster";
import ShiftMaster from "./ShiftMaster/ShiftMaster";

const AttendanceLayout = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  const tabs = [
    { value: "attendance", label: "Attendance Template" },
    { value: "category", label: "Shift Category Master" },
    { value: "shift", label: "Shift Master" },
    { value: "config", label: "Shift Configuration" },
  ];

  return (
    <div className="w-full">
      {/* Tabs Component */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

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