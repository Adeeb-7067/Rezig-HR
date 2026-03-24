import { Eye, Copy, Download, Trash2 } from "lucide-react";

const ReportsTable = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-800 transition-colors">

            {/* Title */}
            <div className="px-1 py-2 text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                Reports List
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm overflow-hidden">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[650px]">

                        {/* Header */}
                        <div className="bg-[#8629DF] text-white text-[0.7rem] font-semibold rounded-t-sm">
                            <div className="grid grid-cols-4 px-4 py-2 uppercase tracking-wider">
                                <div>Report Type</div>
                                <div>Report Name</div>
                                <div>Created On</div>
                                <div>Action</div>
                            </div>
                        </div>

                        {/* Vertical Scroll */}
                        <div className="max-h-[300px] overflow-y-auto table-scroll bg-white dark:bg-gray-800">

                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 px-4 py-2 border-t border-gray-200 dark:border-gray-700
                  text-[0.7rem] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition items-center"
                                >

                                    <div className="text-gray-600 dark:text-gray-200 font-medium">
                                        {item.type}
                                    </div>

                                    <div className="text-gray-600 dark:text-gray-200">
                                        {item.name}
                                    </div>

                                    <div className="text-gray-500 dark:text-gray-400">
                                        {item.date}
                                    </div>

                                    <div className="flex gap-4 items-center">

                                        <Eye size={14} className="cursor-pointer text-gray-400 hover:text-[#8629DF] transition-colors" />

                                        <Copy size={14} className="cursor-pointer text-gray-400 hover:text-[#8629DF] transition-colors" />

                                        <Download size={14} className="cursor-pointer text-gray-400 hover:text-[#8629DF] transition-colors" />

                                        <Trash2 size={14} className="cursor-pointer text-red-400 hover:text-red-600 transition-colors" />

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