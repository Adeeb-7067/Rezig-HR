import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DateInput from "@/components/ui/DateInput";

const btnPrevReset =
  "bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24";
const btnSave =
  "bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24";
const labelClass = "text-xs text-gray-500 dark:text-gray-400 block mb-1";
const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 min-w-0 focus:outline-none focus:ring-1 focus:ring-[#8629DF]";

function InvestmentRow({ label, amount = "25,000.00" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-end gap-3 py-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
      <div className="min-w-0 flex-1">
        <label className={labelClass}>{label}</label>
      </div>
      <div className="flex items-end gap-2 flex-wrap">
        <div className="text-right">
          <p className="text-[#8629DF] font-semibold text-sm">{amount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
        </div>
        <button
          type="button"
          className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-sm font-medium px-4 py-2 rounded shrink-0"
        >
          Add Fields
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-center w-9 h-9 rounded-md border border-[#8629DF] text-[#8629DF] hover:bg-[#8629DF]/10 shrink-0"
          aria-expanded={open}
        >
          <ChevronDown size={18} className={open ? "rotate-180" : ""} />
        </button>
      </div>
    </div>
  );
}

export default function InvestmentDetails({ onNext, onPrev }) {
  const [section80CLimit, setSection80CLimit] = useState("");
  const [otherIncome, setOtherIncome] = useState({
    dateOfPossession: "",
    nameOfLender: "",
    panOfLender: "",
    addressOfLender: "",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Investment Details</h2>

      {/* Under Section 80C Limit */}
      <div>
        <label className={labelClass}>Under Section 80C Limit</label>
        <input
          type="text"
          value={section80CLimit}
          onChange={(e) => setSection80CLimit(e.target.value)}
          className={inputClass}
          placeholder=""
        />
      </div>

      {/* Section 80C, 80CCC & 80CCD / Other Section / House Rent Details */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden divide-y divide-gray-200 dark:divide-gray-600">
        <InvestmentRow label="Section 80C, 80CCC & 80CCD" amount="25,000.00" />
        <InvestmentRow label="Other Section" amount="25,000.00" />
        <InvestmentRow label="House Rent Details" amount="25,000.00" />
      </div>

      {/* Other Income / Deduction */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">Other Income / Deduction</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DateInput
            label="Date of Possession"
            value={otherIncome.dateOfPossession}
            setValue={(v) => setOtherIncome((p) => ({ ...p, dateOfPossession: v }))}
            placeholder="Select a date"
          />
          <div>
            <label className={labelClass}>Name of the Lender</label>
            <input
              type="text"
              value={otherIncome.nameOfLender}
              onChange={(e) => setOtherIncome((p) => ({ ...p, nameOfLender: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>PAN of the Lender</label>
            <input
              type="text"
              value={otherIncome.panOfLender}
              onChange={(e) => setOtherIncome((p) => ({ ...p, panOfLender: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Address of the Lender</label>
            <input
              type="text"
              value={otherIncome.addressOfLender}
              onChange={(e) => setOtherIncome((p) => ({ ...p, addressOfLender: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Footer buttons */}
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
