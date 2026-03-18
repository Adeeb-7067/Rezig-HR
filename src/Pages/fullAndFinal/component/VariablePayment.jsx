import { useState } from "react";

const btnPrevReset =
  "bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24";
const btnSave =
  "bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24";

const variablePayHeads = [
  { id: "basic", name: "Basic", fromDate: "2025-07-21", toDate: "2025-07-21", formula: "", monthly: "1000", annual: "12000", remarks: "40% as per metro city norms", checked: true },
  { id: "hra", name: "HRA", fromDate: "2025-07-21", toDate: "2025-07-21", formula: "", monthly: "500", annual: "6000", remarks: "Calculated based on unused leaves (carry-forwarded)", checked: true },
  { id: "transport", name: "Transport", fromDate: "", toDate: "", formula: "", monthly: "", annual: "", remarks: "", checked: false },
  { id: "spl", name: "SPL Allowance", fromDate: "", toDate: "", formula: "", monthly: "", annual: "", remarks: "", checked: false },
];

const reimbursementPayHead = "Exgratia payable yearly (E00010)";
const defaultReimb = { accumulated: "6672.00", claimed: "00.00", holdClaimed: "00.00", balance: "6672.00", amtToBePaid: "6672.00", billSubmitted: "6672.00", billsReceived: "00.00", checked: true };
const reimbRows = [
  { ...defaultReimb, amtToBePaid: "6672.00", billSubmitted: "6672.00" },
  { ...defaultReimb, amtToBePaid: "6672.00", billSubmitted: "6672.00" },
  { ...defaultReimb, amtToBePaid: "", billSubmitted: "" },
  { ...defaultReimb, amtToBePaid: "", billSubmitted: "" },
];

export default function VariablePayment({ onNext, onPrev }) {
  const [variableList, setVariableList] = useState(variablePayHeads);
  const [reimbursementList, setReimbursementList] = useState(reimbRows);

  const updateVariable = (index, field, value) => {
    setVariableList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateReimbursement = (index, field, value) => {
    setReimbursementList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const thClass = "text-left p-2 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600";
  const tdClass = "p-2 border-b border-gray-100 dark:border-gray-700/50 text-sm text-gray-800 dark:text-gray-200";
  const inputClass = "w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs bg-white dark:bg-gray-800 min-w-0";
  const checkboxClass = "w-4 h-4 rounded border-gray-300 dark:border-gray-500 text-[#8629DF] focus:ring-[#8629DF] cursor-pointer";

  return (
    <div className="space-y-6">
      {/* Variable List */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Variable List</h2>
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className={thClass}>Pay Head Name</th>
              <th className={thClass}>From Date</th>
              <th className={thClass}>To Date</th>
              <th className={thClass}>Formula</th>
              <th className={thClass}>Monthly Amount</th>
              <th className={thClass}>Annual Amount</th>
              <th className={thClass}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {variableList.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className={tdClass}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={(e) => updateVariable(index, "checked", e.target.checked)}
                      className={checkboxClass}
                    />
                    <span>{row.name}</span>
                  </label>
                </td>
                <td className={tdClass}>
                  <input
                    type="date"
                    value={row.fromDate}
                    onChange={(e) => updateVariable(index, "fromDate", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className={tdClass}>
                  <input
                    type="date"
                    value={row.toDate}
                    onChange={(e) => updateVariable(index, "toDate", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className={tdClass}>
                  <select
                    value={row.formula}
                    onChange={(e) => updateVariable(index, "formula", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select Formula</option>
                    <option value="formula1">Formula 1</option>
                    <option value="formula2">Formula 2</option>
                  </select>
                </td>
                <td className={tdClass}>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={row.monthly}
                    onChange={(e) => updateVariable(index, "monthly", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className={tdClass}>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={row.annual}
                    onChange={(e) => updateVariable(index, "annual", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className={tdClass}>
                  <input
                    type="text"
                    placeholder="Enter your Remarks"
                    value={row.remarks}
                    onChange={(e) => updateVariable(index, "remarks", e.target.value)}
                    className={inputClass}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reimbursement Payment */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Reimbursement Payment</h2>
      <div className="flex justify-end mb-2">
        <button type="button" className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-sm font-medium px-4 py-2 rounded">
          Calculated Reimbursement Balance
        </button>
      </div>
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className={thClass}>Pay Head Name</th>
              <th className={thClass}>Accumulated</th>
              <th className={thClass}>Claimed</th>
              <th className={thClass}>Hold Claimed</th>
              <th className={thClass}>Balance</th>
              <th className={thClass}>Amt To Be Paid</th>
              <th className={thClass}>Bill Submitted</th>
              <th className={thClass}>Bills Received</th>
            </tr>
          </thead>
          <tbody>
            {reimbursementList.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className={tdClass}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={(e) => updateReimbursement(index, "checked", e.target.checked)}
                      className={checkboxClass}
                    />
                    <span>{reimbursementPayHead}</span>
                  </label>
                </td>
                <td className={tdClass}>{row.accumulated}</td>
                <td className={tdClass}>{row.claimed}</td>
                <td className={tdClass}>{row.holdClaimed}</td>
                <td className={tdClass}>{row.balance}</td>
                <td className={tdClass}>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={row.amtToBePaid}
                    onChange={(e) => updateReimbursement(index, "amtToBePaid", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className={tdClass}>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={row.billSubmitted}
                    onChange={(e) => updateReimbursement(index, "billSubmitted", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className={tdClass}>{row.billsReceived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons - reuse same as AttendanceAdjustment */}
      <div className="flex flex-row flex-wrap justify-end w-full gap-2 mt-6">
        <button type="button" className={btnPrevReset} onClick={onPrev}>
          Previous
        </button>
        <button type="button" className={btnPrevReset}>
          Reset
        </button>
        <button type="button" className={btnSave} onClick={onNext}>
          Save
        </button>
      </div>
    </div>
  );
}
