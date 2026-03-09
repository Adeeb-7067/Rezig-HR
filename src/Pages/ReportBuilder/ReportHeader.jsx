import { Plus } from "lucide-react";

const ReportHeader = ({ onCreate }) => {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <h1 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300">
                Report Builder
            </h1>

            <button
                onClick={onCreate}
                className="flex items-center justify-center gap-2 
        w-full sm:w-auto
        px-4 py-2 text-sm text-white rounded-md 
        bg-primary shadow"
            >
                <Plus size={16} />
                Create New Report
            </button>

        </div>
    );
};

export default ReportHeader;