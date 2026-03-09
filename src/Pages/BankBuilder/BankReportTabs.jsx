const BankReportTabs = ({ activeTab, setActiveTab }) => {

    return (
        <div className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-700">

            <button
                onClick={() => setActiveTab("config")}
                className={`pb-3 text-sm font-medium transition
                ${activeTab === "config"
                        ? "text-[#8629df] border-b-2 border-b-[#8629df] border-primary"
                        : "text-gray-500 dark:text-gray-400"}
                `}
            >
                Bank Report Configuration
            </button>

            <button
                onClick={() => setActiveTab("list")}
                className={`pb-3 text-sm font-medium transition
                ${activeTab === "list"
                        ? "text-[#8629df] border-b-2 border-b-[#8629df] border-primary"
                        : "text-gray-500 dark:text-gray-400"}
                `}
            >
                List Of Bank Advice
            </button>

        </div>
    );
};

export default BankReportTabs;