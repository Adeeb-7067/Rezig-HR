import { useState } from "react";
import Tabs from "@/components/Tabs";
import BankReportHeader from "./BankReportHeader";
import ListOfBank from "./ListOfBank/ListOfBank";
import BankConfiguration from "./BankReportConfiguration/BankConfiguration";

const BankBuilder = () => {

    const [activeTab, setActiveTab] = useState("list");
    const [showConfig, setShowConfig] = useState(false);

    const tabs = [
        { label: "List Of Bank Advice", value: "list" },
        { label: "Bank Report Configuration", value: "config" },
    ];

    const handleCreate = () => {
        setActiveTab("config");
        setShowConfig(true);
    };

    return (
        <div className="p-2 sm:p-4 space-y-4">

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
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
                <BankConfiguration onBack={() => setActiveTab('list')} />
            )}

        </div>
    );
};

export default BankBuilder;