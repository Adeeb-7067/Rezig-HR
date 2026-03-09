import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import LeaveMaster from "./LeaveMaster";

const LeaveConfiguration = () => {

    const [showMaster, setShowMaster] = useState(false);

    const data = [
        { code: "CL", template: "Default", desc: "Casual Leave", max: "8.00", paid: "Yes" },
        { code: "EL", template: "Default", desc: "Earned Leave", max: "0.00", paid: "Yes" },
        { code: "SL", template: "Default", desc: "Sick Leave", max: "10.00", paid: "No" },
        { code: "CL", template: "Default", desc: "Casual Leave", max: "8.00", paid: "Yes" },
        { code: "EL", template: "Default", desc: "Earned Leave", max: "0.00", paid: "Yes" },
        { code: "SL", template: "Default", desc: "Sick Leave", max: "10.00", paid: "No" },
    ];

    if (showMaster) {
        return <LeaveMaster onBack={() => setShowMaster(false)} />;
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-Title font-semibold text-gray-700 dark:text-gray-200">
                    Leave Configuration
                </h1>

                <button
                    onClick={() => setShowMaster(true)}
                    className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-sm shadow"
                >
                    <Plus size={16} />
                    Add Leave Master
                </button>
            </div>

            {/* Card */}
            <div className=" border-gray-200 dark:border-gray-600">

                <div className="py-3 px-1 text-Header font-semibold text-[#252C58] dark:text-gray-200">
                    List of Leave Code
                </div>

                {/* Scroll container */}
                <div className="overflow-x-auto no-scrollbar border rounded-sm">

                    <div className="min-w-[900px]">

                        {/* Header */}
                        <div
                            className="text-[0.75rem] font-semibold text-white bg-[#8629DF] py-3 px-6 rounded-t-md"
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.6fr 0.6fr",
                                alignItems: "center",
                            }}
                        >
                            <div>Leave Code</div>
                            <div>Template</div>
                            <div>Description</div>
                            <div>Maximum Leave</div>
                            <div>Paid</div>
                            <div className="text-center">Edit</div>
                            <div className="text-center">Delete</div>
                        </div>

                        {/* Body */}
                        <div className="max-h-[120px] overflow-y-auto table-scroll">

                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="text-[0.75rem] py-3 px-6 border-b border-gray-200 hover:bg-gray-50"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.6fr 0.6fr",
                                        alignItems: "center",
                                    }}
                                >

                                    <div>{item.code}</div>
                                    <div>{item.template}</div>
                                    <div>{item.desc}</div>
                                    <div>{item.max}</div>
                                    <div>{item.paid}</div>

                                    <div className="flex justify-center">
                                        <Pencil size={14} className="cursor-pointer hover:text-purple-600" />
                                    </div>

                                    <div className="flex justify-center">
                                        <Trash2 size={14} className="cursor-pointer text-red-500" />
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LeaveConfiguration;