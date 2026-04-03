import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import PaycodeList from "./component/PaycodeList";
import FormulaList from "./component/FormulaList";

import CreatePaycodeMaster from "./component/CreatePaycodeMaster";
import CreateFormula from "./component/CreateFormula";
import { AiOutlinePlus } from "react-icons/ai";

const PaycodeMaster = () => {
  const [activeTab, setActiveTab] = useState("paycode");
  const [showCreate, setShowCreate] = useState(false);

  const paycodeData = [
    {
      code: "A0001",
      desc: "Basic",
      formula: "MonthlyCTC * 4",
      type: "Deduction",
      status: true,
      variableType: "Fixed",
    },
    {
      code: "A0001",
      desc: "Basic",
      formula: "MonthlyCTC * 4",
      type: "Addition",
      status: true,
      variableType: "Fixed",
    },
    {
      code: "A0001",
      desc: "Basic",
      formula: "MonthlyCTC * 4",
      type: "Addition",
      status: false,
      variableType: "Variable",
    },
  ];

  const formulaData = [
    {
      code: "Basic",
      desc: "Basic formula",
      formula: "MonthlyCTC * 4",
      sequence: 1,
    },
    {
      code: "ESI",
      desc: "ESI formula",
      formula: "MonthlyCTC * .0475",
      sequence: 2,
    },
  ];

  const tabs = [
    { label: "Paycode Master", value: "paycode" },
    { label: "Formula", value: "formula" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

        {!showCreate && (
          <button
            onClick={() => setShowCreate(true)}
            className="ds-bg-primary text-white ds-text-xs px-2 md:px-4  rounded-sm flex justify-center items-center gap-1 py-2 md:text-[0.8rem] cursor-pointer w-fit"
          >
            <AiOutlinePlus className=" md:w-4 md:h-4 font-semibold" />
            {activeTab === "paycode"
              ? "Create Paycode Master"
              : "Create Formula"}
          </button>
        )}
      </div>

      {/* PAYCODE TAB */}
      {activeTab === "paycode" &&
        (showCreate ? (
          <CreatePaycodeMaster onBack={() => setShowCreate(false)} />
        ) : (
          <PaycodeList data={paycodeData} />
        ))}

      {/* FORMULA TAB */}
      {activeTab === "formula" &&
        (showCreate ? (
          <CreateFormula onCancel={() => setShowCreate(false)} />
        ) : (
          <FormulaList data={formulaData} />
        ))}
    </div>
  );
};

export default PaycodeMaster;
