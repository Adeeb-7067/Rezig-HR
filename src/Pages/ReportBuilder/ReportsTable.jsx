import { Eye, Copy, Download, Trash2 } from "lucide-react";

const ReportsTable = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors">

            {/* Title */}
            <div className="px-1 text-Header py-3 text-sm font-semibold 
      text-gray-700 dark:text-gray-200">
                Reports List
            </div>

            <div className="border shadow-sm rounded-lg border-gray-200 dark:border-gray-700">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto">

                    <div className="min-w-[650px]">

                        {/* Header */}
                        <div className="bg-primary text-white text-Secondary rounded-t-lg">
                            <div className="grid grid-cols-4 px-6 py-3">
                                <div>Report Type</div>
                                <div>Report Name</div>
                                <div>Created On</div>
                                <div>Action</div>
                            </div>
                        </div>

                        {/* Vertical Scroll */}
                        <div className="max-h-[160px] overflow-y-auto table-scroll">

                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 px-6 py-3 border-t border-gray-200 dark:border-gray-700
                  text-Primary hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                >

                                    <div className="text-gray-700 dark:text-gray-200">
                                        {item.type}
                                    </div>

                                    <div className="text-gray-700 dark:text-gray-200">
                                        {item.name}
                                    </div>

                                    <div className="text-gray-600 dark:text-gray-400">
                                        {item.date}
                                    </div>

                                    <div className="flex gap-3 items-center">

                                        <Eye size={16} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-primary" />

                                        <Copy size={16} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-primary" />

                                        <Download size={16} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-primary" />

                                        <Trash2 size={16} className="cursor-pointer text-red-500 hover:text-red-600" />

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