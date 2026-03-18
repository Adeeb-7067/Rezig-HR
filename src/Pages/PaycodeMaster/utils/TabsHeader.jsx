import React from "react";

const TabsHeader = ({
    activeTab,
    setActiveTab,
    buttonText,
    onButtonClick,
    showCreate,
}) => {
    return (
        <div className=" border-gray-200 dark:border-gray-700 pb-4 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">

            {/* Tabs */}
            <div className="flex gap-6 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("paycode")}
                    className={`pb-2 px-10 text-lg font-medium whitespace-nowrap transition ${activeTab === "paycode"
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 dark:text-gray-400 hover:text-purple-600"
                        }`}
                >
                    Paycode Master
                </button>

                <button
                    onClick={() => setActiveTab("formula")}
                    className={`pb-2 px-10 text-lg font-medium whitespace-nowrap transition ${activeTab === "formula"
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : "text-gray-500 dark:text-gray-400 hover:text-purple-600"
                        }`}
                >
                    Formula
                </button>
            </div>

            {!showCreate && (
                <div className="w-full md:w-auto pt-10">
                    <button
                        onClick={onButtonClick}
                        className="
              w-full md:w-auto
              bg-primary
              text-white
              px-4 py-2
              rounded-md
              text-sm font-medium
              shadow-sm
              hover:opacity-90
              transition
            "
                    >
                        + {buttonText}
                    </button>
                </div>
            )}

        </div>
    );
};

export default TabsHeader;