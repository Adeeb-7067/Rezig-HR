import { Pencil, Trash2 } from "lucide-react";

const data = Array(15).fill({
    code: "GR001",
    desc: "Gurugram Office Summer Shift",
    start: "8:30 AM",
    end: "18:30 PM",
    day: "Day",
});

const ShiftMasterTable = () => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">

            <h3 className="text-base font-semibold text-gray-600 dark:text-gray-100 mb-4">
                List Of Shift Category
            </h3>

            <div className="rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Horizontal Scroll Wrapper */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[650px]">

                        {/* Header */}
                        <div className="bg-primary text-white">
                            <table className="w-full table-fixed ds-text-xs">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-2.5 text-left w-[15%]">Shift Code</th>
                                        <th className="px-2 py-2.5 text-left w-[25%]">Description</th>
                                        <th className="px-2 py-2.5 text-left w-[15%]">Start Time</th>
                                        <th className="px-2 py-2.5 text-left w-[15%]">End Time</th>
                                        <th className="px-2 py-2.5 text-left w-[10%]">Shift Day</th>
                                        <th className="px-2 py-2.5 text-center w-[15%]">Action</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* Body */}
                        <div className="max-h-[190px] overflow-y-auto table-scroll bg-white dark:bg-gray-800">
                            <table className="w-full table-fixed ds-text-xs">

                                <tbody className="text-gray-700 dark:text-gray-200">

                                    {data.map((item, i) => (
                                        <tr
                                            key={i}
                                            className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="px-4 py-2 w-[15%]">{item.code}</td>

                                            <td className="px-4 py-2 w-[25%]">{item.desc}</td>

                                            <td className="px-4 py-2 w-[15%]">{item.start}</td>

                                            <td className="px-4 py-2 w-[15%]">{item.end}</td>

                                            <td className="px-4 py-2 w-[10%]">{item.day}</td>

                                            <td className="px-4 py-2 text-center w-[15%] ">
                                                <button className="p-1 cursor-pointer rounded">
                                                    <Pencil size={14} className="hover:text-gray-500 hover:scale-110" />
                                                </button>
                                        
                                                <button className="p-1 cursor-pointer rounded">
                                                    <Trash2 size={14} className="text-red-500 hover:scale-110" />
                                                </button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ShiftMasterTable;