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
   <div className="flex sm:gap-3 overflow-x-auto">
  {/* Paycode */}
  <button
    onClick={() => setActiveTab("paycode")}
    className={`ds-bg-primary text-white ds-text-xs px-3 md:px-4 rounded-sm flex justify-center items-center py-1 md:text-[0.8rem] cursor-pointer transition
      ${activeTab === "paycode" ? "opacity-100" : "opacity-70 hover:opacity-100"}
    `}
  >
    Paycode Master
  </button>

  {/* Formula */}
  <button
    onClick={() => setActiveTab("formula")}
    className={`ds-bg-primary text-white ds-text-xs px-3 md:px-4 rounded-sm flex justify-center items-center py-1 md:text-[0.8rem] cursor-pointer transition
      ${activeTab === "formula" ? "opacity-100" : "opacity-70 hover:opacity-100"}
    `}
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
        ds-bg-primary
        text-white
        ds-text-xs md:text-[0.8rem]
        px-2 md:px-4
        py-1
        rounded-sm
        flex justify-center items-center gap-1
        cursor-pointer
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
