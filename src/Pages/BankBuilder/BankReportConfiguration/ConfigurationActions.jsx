const ConfigurationActions = () => {

    return (
        <div className="flex justify-end gap-3">

            <button className="border border-[#8629df] text-[#8629df] px-4 py-1 rounded-md">
                Reset
            </button>

            <button className="border border-[#8629df] text-[#8629df] px-4 py-1 rounded-md">
                Log Report
            </button>

            <button className="bg-primary text-white px-6 py-1 rounded-md">
                Save
            </button>

        </div>
    );
};

export default ConfigurationActions;