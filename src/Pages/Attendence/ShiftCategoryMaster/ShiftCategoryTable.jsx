import { Pencil, Trash2 } from "lucide-react";

const data = Array(20).fill({ code: "GN", name: "General" });

const ShiftCategoryTable = () => {
    return (
        <div className="flex flex-col w-full">

            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
                List of Shift Category
            </h3>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

                {/* Horizontal Scroll Wrapper */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[600px]">

                        {/* Header */}
                        <div className="bg-primary text-white">
                            <table className="w-full table-fixed text-Secondary">
                                <thead>
                                    <tr>
                                        <th className="w-[30%] px-6 py-2 text-left font-medium">
                                            Category Code
                                        </th>

                                        <th className="w-[40%] px-6 py-2 text-left font-medium">
                                            Category Name
                                        </th>

                                        <th className="w-[15%] px-6 py-2 text-center font-medium">
                                            Edit
                                        </th>

                                        <th className="w-[15%] px-6 py-2 text-center font-medium">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* Body Scroll */}
                        <div className="max-h-[115px] overflow-y-auto table-scroll bg-white dark:bg-gray-800">
                            <table className="w-full table-fixed text-Primary">

                                <tbody className="text-gray-700 dark:text-gray-200">

                                    {data.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >

                                            <td className="w-[30%] px-6 py-1">{item.code}</td>

                                            <td className="w-[40%] px-6 py-1">{item.name}</td>

                                            <td className="w-[15%] px-6 py-1 text-center">
                                                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                                                    <Pencil
                                                        size={14}
                                                        className="text-gray-600 dark:text-gray-300"
                                                    />
                                                </button>
                                            </td>

                                            <td className="w-[15%] px-6 py-1 text-center">
                                                <button className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition">
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

export default ShiftCategoryTable;