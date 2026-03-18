import { useState } from "react";

const cardClass = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6";
const sectionTitleClass = "text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4";
const labelClass = "text-xs text-gray-500 dark:text-gray-400 block mb-1";
const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 min-w-0 focus:outline-none focus:ring-1 focus:ring-[#8629DF]";
const tableHeaderClass = "bg-[#8629DF] text-white text-left text-xs font-semibold p-2 first:rounded-tl last:rounded-tr";
const tableHeaderRightClass = "bg-[#8629DF] text-white text-right text-xs font-semibold p-2";

const additionRows = [
  { payHead: "Basic Salary Arrear", actualAmount: "₹5,000", payableAmount: "₹5,000" },
  { payHead: "HRA Arrear", actualAmount: "₹2,000", payableAmount: "₹1,800" },
];
const additionTotal = "₹6,800";

const deductionRows = [
  { payHead: "PF Arrear", amount: "₹420" },
  { payHead: "Tax Adjustment", amount: "₹300" },
];
const deductionTotal = "₹720";
const netPayableArrear = "₹6,080";

export default function ViewFinalizedReports() {
  const [statutory, setStatutory] = useState({
    taxPayable: "",
    taxOnTotalIncome: "",
    ecess: "",
    enterPF: "",
    esi: "",
    profTax: "",
  });

  const updateStatutory = (key, value) =>
    setStatutory((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-6">
      {/* View Arrear Payment */}
      <div>
        <h3 className={sectionTitleClass}>View Arrear Payment</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          {/* Addition Pay Heads */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
              Addition Pay Heads
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={tableHeaderClass}>Pay Head</th>
                  <th className={tableHeaderRightClass}>Actual Amount</th>
                  <th className={tableHeaderRightClass}>Payable Amount</th>
                </tr>
              </thead>
              <tbody>
                {additionRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-2 text-gray-800 dark:text-gray-200">{row.payHead}</td>
                    <td className="p-2 text-right text-gray-800 dark:text-gray-200">{row.actualAmount}</td>
                    <td className="p-2 text-right text-gray-800 dark:text-gray-200">{row.payableAmount}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <td className="p-2 font-semibold text-[#8629DF]" colSpan={2}>
                    Total Additions
                  </td>
                  <td className="p-2 text-right font-semibold text-[#8629DF]">{additionTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deduction Pay Heads */}
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
              Deduction Pay Heads
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={tableHeaderClass}>Pay Head</th>
                  <th className={tableHeaderRightClass}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {deductionRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-2 text-gray-800 dark:text-gray-200">{row.payHead}</td>
                    <td className="p-2 text-right text-gray-800 dark:text-gray-200">{row.amount}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <td className="p-2 font-semibold text-[#8629DF]">Total Deductions</td>
                  <td className="p-2 text-right font-semibold text-[#8629DF]">{deductionTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            Net Payable Arrear Amount: <span className="text-[#8629DF]">{netPayableArrear}</span>
          </p>
          <button
            type="button"
            className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-sm font-medium px-4 py-2 rounded shrink-0"
          >
            Finalized Process
          </button>
        </div>
      </div>

      {/* Statutory Details */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Statutory Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Tax Payable</label>
            <input
              type="text"
              value={statutory.taxPayable}
              onChange={(e) => updateStatutory("taxPayable", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tax on Total Income</label>
            <input
              type="text"
              value={statutory.taxOnTotalIncome}
              onChange={(e) => updateStatutory("taxOnTotalIncome", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Ecess</label>
            <input
              type="text"
              value={statutory.ecess}
              onChange={(e) => updateStatutory("ecess", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Enter PF</label>
            <input
              type="text"
              value={statutory.enterPF}
              onChange={(e) => updateStatutory("enterPF", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>ESI</label>
            <input
              type="text"
              value={statutory.esi}
              onChange={(e) => updateStatutory("esi", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Prof Tax</label>
            <input
              type="text"
              value={statutory.profTax}
              onChange={(e) => updateStatutory("profTax", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Action buttons - Save, Download Full & Final Slip */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
        <button
          type="button"
          className="bg-[#8629DF] hover:bg-[#7620c7] text-white font-semibold text-xs sm:text-[0.7rem] py-2 px-4 rounded-sm w-full sm:w-auto"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-[#8629DF] hover:bg-[#7620c7] text-white font-semibold text-sm py-2 px-5 rounded-sm w-full sm:w-auto"
        >
          Download Full & Final Slip
        </button>
      </div>
    </div>
  );
}
