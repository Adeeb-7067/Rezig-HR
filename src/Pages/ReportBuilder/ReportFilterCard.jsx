import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";

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
        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm space-y-4">

            <div className="flex gap-4 items-end flex-wrap">

                {/* Select Report */}
                <div className="w-60">
                    <SelectField
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
                    <div>
                        <InputField
                            label="Report Name"
                            name="reportName"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="Enter Report Name"
                        />
                    </div>
                )}

            </div>

            {/* Buttons */}
            <div className="flex gap-2">

                <button
                    onClick={onSearch}
                    className="py-1 px-6 sm:w-auto md:w-24 ds-text-xs font-semibold text-white bg-ds-primary hover:opacity-90 rounded-sm transition-all"
                >
                    Search
                </button>

                <button
                    onClick={handleReset}
                    className="py-1 px-7 sm:w-auto md:w-24 ds-text-xs ds-text-primary ds-border-primary border  font-semibold    hover:bg-gray-200 dark:hover:bg-gray-600 rounded-sm transition-all"
                >
                    Reset
                </button>

            </div>

        </div>
    );
};

export default ReportFilterCard;
