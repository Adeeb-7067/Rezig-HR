"use client";

import { Trash2 } from "lucide-react";

const SelectedParameters = () => {

    const data = [
        { name: "Father Name", order: 1 },
        { name: "Father Name", order: 1 },
        { name: "Father Name", order: 1 },
        { name: "Father Name", order: 1 },
        { name: "Mother Name", order: 2 },
        { name: "Mother Name", order: 2 },
        { name: "Transport Allowance", order: 3 },
        { name: "Transport Allowance", order: 4 },
        { name: "HRA", order: 5 },
        { name: "HRA", order: 6 },
        { name: "Mother Name", order: 2 },
        { name: "Mother Name", order: 2 },
        { name: "Transport Allowance", order: 3 },
        { name: "Transport Allowance", order: 4 },
        { name: "HRA", order: 5 },
        { name: "HRA", order: 6 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 min-h-screen">

            {/* Title */}
            <div className="flex items-center justify-between px-1 py-2">

                <h3 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                    Selected Parameters for the report
                </h3>

                <button className="text-[#8629df] text-[0.65rem] font-bold bg-[#F7F2FD] dark:bg-[#2b1d3f] px-2 py-0.5 rounded-sm border border-purple-100 dark:border-purple-800 hover:bg-[#8629DF] hover:text-white transition-all">
                    Sequence
                </button>

            </div>

            {/* Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden shadow-sm">

                {/* Header */}
                <div className="grid grid-cols-3 bg-[#8629DF] text-white text-[0.65rem] font-bold uppercase tracking-wider px-4 py-2">

                    <div>DESCRIPTION</div>

                    <div className="text-center">Order</div>

                    <div className="text-center">Delete</div>

                </div>

                {/* Scroll Body */}
                <div className="max-h-[350px] overflow-y-auto table-scroll no-scrollbar bg-white dark:bg-gray-800">

                    {data.map((item, i) => (

                        <div
                            key={i}
                            className="grid grid-cols-3 px-4 py-2 items-center border-b
               border-gray-100 dark:border-gray-700
               text-[0.7rem]
               hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all"
                        >

                            {/* Description */}
                            <div className="text-gray-600 dark:text-gray-200 font-medium">
                                {item.name}
                            </div>

                            {/* Order */}
                            <div className="flex justify-center">

                                <input
                                    type="number"
                                    defaultValue={item.order}
                                    className="
                   w-12 h-6 text-center
                   border border-gray-200 dark:border-gray-700
                   bg-white dark:bg-gray-800
                   text-gray-600 dark:text-gray-200
                   rounded-sm px-1 text-[0.7rem]
                   focus:outline-none focus:ring-1 focus:ring-[#8629DF]
                   "
                                />

                            </div>

                            {/* Delete */}
                            <div className="flex justify-center">

                                <Trash2
                                    size={14}
                                    className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default SelectedParameters;