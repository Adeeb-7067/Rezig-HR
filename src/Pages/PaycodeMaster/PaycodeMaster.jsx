;
import React, { useState } from "react";
import TabsHeader from "./utils/TabsHeader";
import PaycodeList from "./component/PaycodeList";
import FormulaList from "./component/FormulaList";

import CreatePaycodeMaster from "./component/CreatePaycodeMaster";
import CreateFormula from "./component/CreateFormula";

const PaycodeMaster = () => {
    const [activeTab, setActiveTab] = useState("paycode");
    const [showCreate, setShowCreate] = useState(false);

    const paycodeData = [
        { code: "A0001", desc: "Basic", formula: "MonthlyCTC * 4", type: "Deduction", status: true, variableType: "Fixed" },
        { code: "A0001", desc: "Basic", formula: "MonthlyCTC * 4", type: "Addition", status: true, variableType: "Fixed" },
        { code: "A0001", desc: "Basic", formula: "MonthlyCTC * 4", type: "Addition", status: false, variableType: "Variable" },

    ];

    const formulaData = [
        { code: "Basic", desc: "Basic formula", formula: "MonthlyCTC * 4", sequence: 1 },
        { code: "ESI", desc: "ESI formula", formula: "MonthlyCTC * .0475", sequence: 2 },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowCreate(false);
    };

    return (
        <div className="space-y-6">

            <TabsHeader
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                buttonText={
                    activeTab === "paycode"
                        ? "Create Paycode Master"
                        : "Create Formula"
                }
                onButtonClick={() => setShowCreate(true)}
                showCreate={showCreate}
            />

            {/* PAYCODE TAB */}
            {activeTab === "paycode" && (
                showCreate ? (
                    <CreatePaycodeMaster onBack={() => setShowCreate(false)} />
                ) : (
                    <PaycodeList data={paycodeData} />
                )
            )}

            {/* FORMULA TAB */}
            {activeTab === "formula" && (
                showCreate ? (
                    <CreateFormula onCancel={() => setShowCreate(false)} />
                ) : (
                    <FormulaList data={formulaData} />
                )
            )}

        </div>
    );
};

export default PaycodeMaster;