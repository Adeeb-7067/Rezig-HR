import { useState } from "react";
import BankReportTabs from "./BankReportTabs";
import BankReportHeader from "./BankReportHeader";
import ListOfBank from "./ListOfBank/ListOfBank";
import BankConfiguration from "./BankReportConfiguration/BankConfiguration";

const BankBuilder = () => {

    const [activeTab, setActiveTab] = useState("config");
    const [showConfig, setShowConfig] = useState(false);

    const handleCreate = () => {
        setActiveTab("config");
        setShowConfig(true);
    };

    return (
        <div className="p-6 space-y-6">

            <BankReportTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Button logic */}
            {(activeTab === "list" || !showConfig) && (
                <BankReportHeader onCreate={handleCreate} />
            )}

            {/* List Tab */}
            {activeTab === "list" && (
                <ListOfBank onCreate={handleCreate} />
            )}

            {/* Config Tab */}
            {activeTab === "config" && showConfig && (
                <BankConfiguration />
            )}

        </div>
    );
};

export default BankBuilder;