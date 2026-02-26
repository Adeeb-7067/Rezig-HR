const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div
      className="
        flex gap-6 md:gap-10
        border-b border-gray-200 dark:border-gray-700
        overflow-x-auto md:overflow-hidden
        no-scrollbar
      "
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className="relative pb-3 whitespace-nowrap"
          >
            {/* Label */}
            <span
              className={`
                text-[0.8rem] md:text-base font-medium transition-colors cursor-pointer

                ${
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : `
                      text-gray-500 dark:text-gray-400
                      hover:text-gray-700 dark:hover:text-gray-200
                    `
                }
              `}
            >
              {tab.label}
            </span>

            {/* Underline */}
            {isActive && (
              <span
                className="
                  absolute left-0 right-0 -bottom-[1px]
                  h-[2px] rounded
                  bg-purple-600 dark:bg-purple-400
                  transition-all duration-300
                "
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
