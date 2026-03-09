;

import SelectFieldScroll from "@/components/SelectFieldScroll";

const ReportFilterCard = ({
    reports,
    selectedReport,
    setSelectedReport,
    reportName,
    setReportName,
    handleReset,
    onSearch,
}) => {
    return (
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm space-y-4">

            <div className="flex gap-4 items-end flex-wrap">

                {/* Select Report */}
                <div className="w-60">
                    <SelectFieldScroll
                        label="Select Report"
                        name="report"
                        value={selectedReport}
                        options={reports}
                        unSelectLabel="Select"
                        onChange={(e) => setSelectedReport(e.target.value)}
                    />
                </div>

                {/* Report Name */}
                {selectedReport && (
                    <div className="w-60">
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                            Report Name
                        </label>

                        <input
                            type="text"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="Enter Report Name"
                            className="w-full px-3 py-2 border rounded-md text-sm
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                )}

            </div>

            {/* Buttons */}
            <div className="flex gap-3">

                <button
                    onClick={onSearch}
                    className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                >
                    Search
                </button>

                <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md"
                >
                    Reset
                </button>

            </div>

        </div>
    );
};

export default ReportFilterCard;