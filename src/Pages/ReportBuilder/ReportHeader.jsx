import { Plus } from "lucide-react";

const ReportHeader = ({ onCreate }) => {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <h1 className="text-xl sm:text-2xl font-semibold text-gray-400 dark:text-gray-50 ">
                Report Builder
            </h1>

            <button
                onClick={onCreate}
                className="flex items-center justify-center gap-2 
        w-full sm:w-auto
        h-7.5 px-4 py-1.5 text-[0.8rem] text-white rounded-sm 
        bg-[#8629DF] hover:opacity-90 shadow transition-all cursor-pointer"
            >
                <Plus size={18} />
                Create New Report
            </button>

        </div>
    );
};

export default ReportHeader;