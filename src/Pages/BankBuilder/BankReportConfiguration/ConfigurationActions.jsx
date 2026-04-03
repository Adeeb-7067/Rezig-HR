const ConfigurationActions = ({ onBack }) => {

    return (
        <div className="flex justify-end gap-2 px-1 mt-4">
            <button 
                onClick={onBack}
                className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-ds-primary/10 transition-all">
                Back
            </button>
            <button
                type="button"
                className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-ds-primary/10 transition-all"
            >
                Reset
            </button>

            <button
                type="button"
                className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-ds-primary/10 transition-all"
            >
                Log Report
            </button>

            <button
                type="button"
                className="bg-ds-primary text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[32%] sm:w-auto md:w-24 cursor-pointer hover:bg-ds-primary/90 transition-all"
            >
                Save
            </button>

        </div>
    );
};

export default ConfigurationActions;