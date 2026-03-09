"use client";

import { Trash, Trash2 } from "lucide-react";

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
        <div className="bg-white dark:bg-gray-900  ">

            {/* Title */}
            <div className="flex items-center justify-between px-1 py-3">

                <h3 className="text-sm font-semibold text-[#252C58] dark:text-gray-200">
                    Selected Parameters for the report
                </h3>

                <button className="text-[#8629df] text-xs font-medium bg-[#F7F2FD] dark:bg-[#2b1d3f] px-2 py-1 rounded">
                    Sequence
                </button>

            </div>

            {/* Table */}
            <div className="border-t border-gray-200 dark:border-gray-700 border rounded-sm">

                {/* Header */}
                <div className="grid grid-cols-3 bg-primary text-white text-xs px-4 py-3  rounded-t-sm ">

                    <div>DESCRIPTION</div>

                    <div className="text-center">Order</div>

                    <div className="text-center">Delete</div>

                </div>

                {/* Scroll Body */}
                <div className="max-h-[550px] overflow-y-auto table-scroll">

                    {data.map((item, i) => (

                        <div
                            key={i}
                            className="grid grid-cols-3 px-4 py-2 items-center border-b
              border-gray-200 dark:border-gray-700
              text-Primary
              hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >

                            {/* Description */}
                            <div className="text-gray-700 dark:text-gray-200">
                                {item.name}
                            </div>

                            {/* Order */}
                            <div className="flex justify-center">

                                <input
                                    type="number"
                                    defaultValue={item.order}
                                    className="
                  w-16 text-center
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-800
                  text-gray-700 dark:text-gray-200
                  rounded px-2 py-1 text-Primary
                  focus:outline-none focus:ring-2 focus:ring-primary
                  "
                                />

                            </div>

                            {/* Delete */}
                            <div className="flex justify-center">

                                <Trash2
                                    size={14}
                                    className="text-red-500 cursor-pointer hover:text-red-600"
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