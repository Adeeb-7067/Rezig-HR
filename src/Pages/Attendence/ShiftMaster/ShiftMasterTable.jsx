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

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
                List Of Shift Category
            </h3>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Horizontal Scroll Wrapper */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[900px]">

                        {/* Header */}
                        <div className="bg-primary text-white">
                            <table className="w-full table-fixed text-Primary">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-3 text-left w-[15%]">Shift Code</th>
                                        <th className="px-2 py-3 text-left w-[35%]">Description</th>
                                        <th className="px-2 py-3 text-left w-[15%]">Start Time</th>
                                        <th className="px-2 py-3 text-left w-[15%]">End Time</th>
                                        <th className="px-2 py-3 text-left w-[10%]">Shift Day</th>
                                        <th className="px-2 py-3 text-center w-[5%]">Edit</th>
                                        <th className="px-0 py-3  text-center w-[5%]">Delete</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* Body */}
                        <div className="max-h-[190px] overflow-y-auto table-scroll bg-white dark:bg-gray-800">
                            <table className="w-full table-fixed text-Primary">

                                <tbody className="text-gray-700 dark:text-gray-200">

                                    {data.map((item, i) => (
                                        <tr
                                            key={i}
                                            className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="px-4 py-2 w-[15%]">{item.code}</td>

                                            <td className="px-4 py-2 w-[35%]">{item.desc}</td>

                                            <td className="px-4 py-2 w-[15%]">{item.start}</td>

                                            <td className="px-4 py-2 w-[15%]">{item.end}</td>

                                            <td className="px-4 py-2 w-[10%]">{item.day}</td>

                                            <td className="px-4 py-2 text-center w-[5%]">
                                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                                                    <Pencil size={14} />
                                                </button>
                                            </td>

                                            <td className="px-4 py-2 text-center w-[5%]">
                                                <button className="p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                                                    <Trash2 size={14} className="text-red-500" />
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