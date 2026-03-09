;

import { useState } from "react";
import ReportFilterCard from "./ReportFilterCard";
import ReportHeader from "./ReportHeader";
import ReportsTable from "./ReportsTable";
import CreateNewReport from "./CreateNewReport/CreateNewReport";

const initialData = [
    { type: "CTC Report", name: "CTC REPORT WITH MCTC", date: "12 Jan 2025" },
    { type: "CTC Report Rate", name: "CTC RATE DETAILS", date: "15 Feb 2025" },
    { type: "Employee Master Data", name: "Employee Details", date: "02 Mar 2025" },
    { type: "Investment Details", name: "Investment Summary", date: "10 Mar 2025" },
    { type: "Leave Report", name: "Leave Balance", date: "12 Apr 2025" },
    { type: "Hold Employee Report", name: "Hold Employees", date: "18 Apr 2025" },
];

const reportOptions = [
    { label: "CTC Report Rate", value: "CTC Report Rate" },
    { label: "CTC Report", value: "CTC Report" },
    { label: "Employee Master Data", value: "Employee Master Data" },
    { label: "Investment Details", value: "Investment Details" },
    { label: "Leave Report", value: "Leave Report" },
    { label: "Hold Employee Report", value: "Hold Employee Report" },
];

const ReportBuilder = () => {

    const [selectedReport, setSelectedReport] = useState("");
    const [reportName, setReportName] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const filteredData = initialData.filter((item) => {

        const matchType = selectedReport
            ? item.type === selectedReport
            : true;

        const matchName = reportName
            ? item.name.toLowerCase().includes(reportName.toLowerCase())
            : true;

        return matchType && matchName;
    });

    const handleSearch = () => {
        // search already reactive (kept for button)
    };

    const handleReset = () => {
        setSelectedReport("");
        setReportName("");
    };

    if (showCreate) {
        return <CreateNewReport onBack={() => setShowCreate(false)} />;
    }


    return (
        <div className="p-6 space-y-6">

            <ReportHeader onCreate={() => setShowCreate(true)} showCreate={showCreate} />

            <ReportFilterCard
                reports={reportOptions}
                selectedReport={selectedReport}
                setSelectedReport={setSelectedReport}
                reportName={reportName}
                setReportName={setReportName}
                handleReset={handleReset}
                onSearch={handleSearch}
            />

            <ReportsTable data={filteredData} />

        </div>
    );
};

export default ReportBuilder;