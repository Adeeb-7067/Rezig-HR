import { Copy, Download, Pencil, Trash2 } from "lucide-react";

const ReportsTable = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-800 transition-colors">

            {/* Title */}
            <div className="px-1 py-2 text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                Reports List
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm overflow-hidden">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto no-scrollbar table-scroll">

                    <div className="min-w-[650px]">

                        {/* Header */}
                        <div className="bg-ds-primary text-white ds-text-xs font-semibold rounded-t-sm">
                            <div className="grid grid-cols-5 px-4 py-2 uppercase tracking-wider">
                                <div>Report Type</div>
                                <div>Report Name</div>
                                <div className="flex justify-center">Created On</div>
                                <div className="flex justify-center">Duplicate</div>

                                <div className="flex justify-center">Action</div>
                            </div>
                        </div>

                        {/* Vertical Scroll */}
                        <div className="max-h-[300px] overflow-y-auto table-scroll bg-white dark:bg-gray-800">

                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-5 px-4 py-2 border-t border-gray-200 dark:border-gray-700
                  ds-text-xs hover:bg-gray-50 dark:hover:bg-gray-700/50 transition items-center"
                                >

                                    <div className="text-gray-800 dark:text-gray-200 font-medium">
                                        {item.type}
                                    </div>

                                    <div className="text-gray-800 dark:text-gray-200">
                                        {item.name}
                                    </div>

                                    <div className="text-gray-800 dark:text-gray-400 flex justify-center">
                                        {item.date}
                                    </div>

                                    <div className="flex justify-center">
                                        <Copy size={14} className="cursor-pointer text-gray-800 dark:text-gray-300 hover:text-ds-primary transition-colors" />
                                    </div>

                                    <div className="flex justify-center gap-4">

                                        <Download size={14} className="cursor-pointer text-gray-800 dark:text-gray-300 hover:text-ds-primary transition-colors" />

                                        <Pencil size={14} className="cursor-pointer text-gray-800 dark:text-gray-300 hover:text-ds-primary transition-colors" />

                                        <Trash2 size={14} className="cursor-pointer text-red-800 dark:text-red-500 hover:text-red-600 transition-colors" />

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

export default ReportsTable;