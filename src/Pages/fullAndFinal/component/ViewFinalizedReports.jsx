import InputField from "@/components/inputfeild";
import { useState } from "react";

const cardClass = "bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3";
const sectionTitleClass = "text-base font-semibold mb-1 text-gray-500";
const labelClass = "block text-gray-500 font-semibold dark:text-gray-50 ds-text-xs mb-1";
const inputClass =
  "w-full ds-text-xs h-7.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9853F9] focus:ring-inset rounded-sm px-4 py-1.5";
const tableHeaderClass = "bg-ds-primary text-white text-left text-[0.65rem] font-semibold p-2 first:rounded-tl last:rounded-tr";
const tableHeaderRightClass = "bg-ds-primary text-white text-right text-[0.65rem] font-semibold p-2";

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
    <div className="space-y-4">
      {/* View Arrear Payment */}
      <div>
        <h3 className={sectionTitleClass}>View Arrear Payment</h3>
        <div className="flex flex-col lg:flex-row w-full gap-2 mb-2">
          {/* Addition Pay Heads */}
          <div className=" rounded-lg p-2 w-full min-w-[60%] ">
            <p className="ds-text-xs font-semibold text-[#252C58] dark:text-gray-200 mb-1">
              Addition Pay Heads
            </p>
            <table className="w-full ds-text-xs rounded-lg drop-shadow-sm">
              <thead>
                <tr>
                  <th className={tableHeaderClass}>Pay Head</th>
                  <th className={tableHeaderRightClass}>Actual Amount</th>
                  <th className={tableHeaderClass} style={{ textAlign: "right" }}>Payable Amount</th>
                </tr>
              </thead>
              <tbody>
                {additionRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <td className="p-2 text-gray-600 dark:text-gray-200">{row.payHead}</td>
                    <td className="p-2 text-right text-gray-600 dark:text-gray-200">{row.actualAmount}</td>
                    <td className="p-2 text-right text-gray-600 dark:text-gray-200">{row.payableAmount}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <td className="p-2 font-semibold ds-text-primary ds-text-xs" colSpan={2}>
                    Total Additions
                  </td>
                  <td className="p-2 text-right font-semibold ds-text-primary ds-text-xs">{additionTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deduction Pay Heads */}
          <div className=" rounded-lg  min-w-[40%] w-full p-2">
            <p className="ds-text-xs font-semibold text-[#252C58] dark:text-gray-200 mb-1">
              Deduction Pay Heads
            </p>
            <table className="w-full ds-text-xs drop-shadow-sm ">
              <thead>
                <tr>
                  <th className={tableHeaderClass}>Pay Head</th>
                  <th className={tableHeaderClass} style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {deductionRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <td className="p-2 text-gray-600 dark:text-gray-200">{row.payHead}</td>
                    <td className="p-2 text-right text-gray-600 dark:text-gray-200">{row.amount}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-700/30">
                  <td className="p-2 font-semibold ds-text-primary ds-text-xs">Total Deductions</td>
                  <td className="p-2 text-right font-semibold ds-text-primary ds-text-xs">{deductionTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-semibold text-[0.9rem] text-[#252C58] dark:text-gray-200">
            Net Payable Arrear Amount: <span className="text-[#252C58]">{netPayableArrear}</span>
          </p>
          <button
            type="button"
            className="bg-ds-primary hover:bg-ds-primary/90 text-white ds-text-xs font-semibold px-4 py-1 rounded-sm shrink-0"
          >
            Finalized Process
          </button>
        </div>
      </div>

      {/* Statutory Details */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Statutory Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <InputField name='Tax Payable' label='Tax Payable' value={statutory.taxPayable} onChange={(e) => updateStatutory("taxPayable", e.target.value)} />
          <InputField name={'Tax on Total Income'} label='Tax on Total Income' value={statutory.taxOnTotalIncome} onChange={(e) => updateStatutory("taxOnTotalIncome", e.target.value)} />
          <div></div> <div></div>
          <InputField name={'Ecess'} label='Ecess' value={statutory.ecess} onChange={(e) => updateStatutory("ecess", e.target.value)} />
          <InputField name={'Enter PF'} label='Enter PF' value={statutory.enterPF}
            onChange={(e) => updateStatutory("enterPF", e.target.value)}
            className={inputClass}
          />
          <InputField name={'ESI'} label='ESI' value={statutory.esi} onChange={(e) => updateStatutory("esi", e.target.value)} />
          <InputField name={'Prof Tax'} label='Prof Tax' value={statutory.profTax} onChange={(e) => updateStatutory("profTax", e.target.value)}
          />
        </div>


      </div>
      < div className="flex flex-col sm:flex-row justify-end gap-2 mt-3" >
        <button
          type="button"
          className="bg-ds-primary text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
        >
          Save
        </button>
      </div>

      {/* Action buttons */}
      < div className="flex flex-col sm:flex-row justify-end gap-2 mt-3" >
        <button
          type="button"
          className="bg-ds-primary hover:bg-ds-primary/90 text-white font-semibold text-[0.7rem] py-1 px-5 rounded-sm w-full sm:w-auto"
        >
          Download Full & Final Slip
        </button>
      </div >
    </div >
  );
}
