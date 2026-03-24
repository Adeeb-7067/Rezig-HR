const ConfigurationActions = () => {

    return (
        <div className="flex justify-end gap-3 px-1">

            <button className="h-7.5 px-4 text-[0.7rem] font-semibold border border-[#8629DF] text-[#8629DF] rounded-sm hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all cursor-pointer">
                Reset
            </button>

            <button className="h-7.5 px-4 text-[0.7rem] font-semibold border border-[#8629DF] text-[#8629DF] rounded-sm hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all cursor-pointer">
                Log Report
            </button>

            <button className="h-7.5 px-6 text-[0.7rem] font-semibold bg-[#8629DF] text-white rounded-sm hover:bg-[#8629DF]/90 transition-all cursor-pointer">
                Save
            </button>

        </div>
    );
};

export default ConfigurationActions;