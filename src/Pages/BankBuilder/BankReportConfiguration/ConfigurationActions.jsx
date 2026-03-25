const ConfigurationActions = () => {

    return (
        <div className="flex justify-end gap-2 px-1 mt-4">

            <button
                type="button"
                className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-purple-50 transition-all"
            >
                Reset
            </button>

            <button
                type="button"
                className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-purple-50 transition-all"
            >
                Log Report
            </button>

            <button
                type="button"
                className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-[#8629DF]/90 transition-all"
            >
                Save
            </button>

        </div>
    );
};

export default ConfigurationActions;