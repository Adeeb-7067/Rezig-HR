import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import LeaveMaster from "./LeaveMaster";

const LeaveConfiguration = () => {
  const [showMaster, setShowMaster] = useState(false);

  const data = [
    {
      code: "CL",
      template: "Default",
      desc: "Casual Leave",
      max: "8.00",
      paid: "Yes",
    },
    {
      code: "EL",
      template: "Default",
      desc: "Earned Leave",
      max: "0.00",
      paid: "Yes",
    },
    {
      code: "SL",
      template: "Default",
      desc: "Sick Leave",
      max: "10.00",
      paid: "No",
    },
    {
      code: "CL",
      template: "Default",
      desc: "Casual Leave",
      max: "8.00",
      paid: "Yes",
    },
    {
      code: "EL",
      template: "Default",
      desc: "Earned Leave",
      max: "0.00",
      paid: "Yes",
    },
    {
      code: "SL",
      template: "Default",
      desc: "Sick Leave",
      max: "10.00",
      paid: "No",
    },
  ];

  if (showMaster) {
    return <LeaveMaster onBack={() => setShowMaster(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-row sm:flex-row justify-between gap-3 mt-2 mb-8 w-full">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-[#252C58] dark:text-gray-50 ">
          Leave Configuration
        </h1>

        {/* Button */}
        <div className="flex gap-0 sm:gap-3">
          <button
            onClick={() => setShowMaster(true)}
            className="btn-primary-sm"
          >
            <Plus className="md:w-4 md:h-4 font-semibold" />
            Add Leave Master
          </button>
        </div>
      </div>

      {/* Card */}
      <div className=" border-gray-200 dark:border-gray-600">
        <div className="py-3 px-1 text-[0.9rem] font-semibold text-[#252C58] dark:text-gray-200">
          List of Leave Code
        </div>

        {/* Scroll container */}
        <div className="overflow-x-auto no-scrollbar border rounded-sm">
          <div className="min-w-[750px]">
            {/* Header */}
            <div
              className="ds-text-xs text-center font-semibold text-white bg-[#8629DF] py-2.5 px-6 rounded-t-sm"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.12fr",
                alignItems: "center",
              }}
            >
              <div>Leave Code</div>
              <div>Template</div>
              <div>Description</div>
              <div>Maximum Leave</div>
              <div>Paid</div>
              <div className="text-center">Action</div>
           
            </div>

            {/* Body */}
            <div className="max-h-[120px] overflow-y-auto table-scroll">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="ds-text-xs text-center py-3 px-6 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50  dark:hover:bg-gray-700"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 0.12fr",
                    alignItems: "center",
                  }}
                >
                  <div>{item.code}</div>
                  <div>{item.template}</div>
                  <div>{item.desc}</div>
                  <div>{item.max}</div>
                  <div>{item.paid}</div>

                  <div className="flex justify-center text-center gap-2">
                    <Pencil
                      size={14}
                      className="cursor-pointer hover:text-purple-600"
                    />
                
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
