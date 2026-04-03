const ReportActions = () => {
    return (
        <div className="flex justify-end gap-3 px-1 py-4">

            <button className=" px-3 py-1 ds-text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer">
                Reset
            </button>

            <button className=" px-3 py-1 ds-text-xs font-semibold text-white bg-ds-primary rounded-sm hover:bg-ds-primary/60 transition-all cursor-pointer">
                Create Report
            </button>

        </div>
    );
};

export default ReportActions;