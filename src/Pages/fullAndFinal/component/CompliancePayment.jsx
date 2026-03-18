import { useState } from "react";
import DateInput from "@/components/ui/DateInput";

const btnPrevReset =
  "bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24";
const btnSave =
  "bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24";
const cardClass = "bg-gray-100 dark:bg-gray-800 rounded-lg p-6";
const sectionTitleClass = "text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4";
const labelClass = "text-xs text-gray-500 dark:text-gray-400 block mb-1";
const inputClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 min-w-0 focus:outline-none focus:ring-1 focus:ring-[#8629DF]";
const selectClass = inputClass + " cursor-pointer appearance-none";

function Field({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function CompliancePayment({ onNext, onPrev }) {
  const [leave, setLeave] = useState({
    leaveType: "",
    leaveDescription: "",
    totalBalance: "",
    accruedBalance: "",
    payCodeTemplate: "",
    payableHeads: "",
    encashmentAmount: "",
    payableAmount: "",
    toBeEncashed: "",
    exemption1: "",
    exemption2: "",
    exemption3: "",
    exemptionActual: "",
    exemptionPayable: "",
  });
  const [gratuity, setGratuity] = useState({
    employeeCurrentDA: "",
    employeeCurrentBasic: "",
    gratuityJoining: "",
    exactWorkDuration: "",
    calculatedGratuityAmount: "",
    gratuityPayableAmount: "",
  });
  const [bonus, setBonus] = useState({
    bonusPeriodFrom: "",
    bonusPeriodTo: "",
    basicWageLimit: "21000",
    bonusPercent: "8.33",
    payInPayhead: "",
    minimumAttendance: "30",
    bonusUpperLimit: "7000",
    basicWage: false,
    calculatedBonus: "",
    bonusPaid: "",
  });
  const [notice, setNotice] = useState({
    noticeType: "",
    payhead: "",
    noticeDays: "",
    noticeAmountPerDay: "",
    totalNoticeAmount: "",
  });

  const updateLeave = (key, value) => setLeave((p) => ({ ...p, [key]: value }));
  const updateGratuity = (key, value) => setGratuity((p) => ({ ...p, [key]: value }));
  const updateBonus = (key, value) => setBonus((p) => ({ ...p, [key]: value }));
  const updateNotice = (key, value) => setNotice((p) => ({ ...p, [key]: value }));

  return (
    <div className="space-y-6">
      {/* 1. Leave Encashment & Payment Details */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Leave Encashment & Payment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Leave Type">
            <select
              value={leave.leaveType}
              onChange={(e) => updateLeave("leaveType", e.target.value)}
              className={selectClass}
            >
              <option value="">Select Type</option>
              <option value="el">Earned Leave</option>
              <option value="cl">Casual Leave</option>
            </select>
          </Field>
          <Field label="Leave Description">
            <input
              type="text"
              value={leave.leaveDescription}
              onChange={(e) => updateLeave("leaveDescription", e.target.value)}
              className={inputClass}
            />
          </Field>
          <DateInput
            label="Total Balance"
            value={leave.totalBalance}
            setValue={(v) => updateLeave("totalBalance", v)}
            placeholder="Select a date"
          />
          <Field label="Accrued Balance">
            <input
              type="text"
              value={leave.accruedBalance}
              onChange={(e) => updateLeave("accruedBalance", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Pay Code Template">
            <select
              value={leave.payCodeTemplate}
              onChange={(e) => updateLeave("payCodeTemplate", e.target.value)}
              className={selectClass}
            >
              <option value="">Select Template</option>
            </select>
          </Field>
          <Field label="Payable Heads">
            <select
              value={leave.payableHeads}
              onChange={(e) => updateLeave("payableHeads", e.target.value)}
              className={selectClass}
            >
              <option value="">Select Payable Heads</option>
            </select>
          </Field>
          <Field label="Encashment Amount">
            <input
              type="text"
              value={leave.encashmentAmount}
              onChange={(e) => updateLeave("encashmentAmount", e.target.value)}
              placeholder="Select amount"
              className={inputClass}
            />
          </Field>
          <Field label="Payable Amount">
            <input
              type="text"
              value={leave.payableAmount}
              onChange={(e) => updateLeave("payableAmount", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="To Be Encashed">
            <input
              type="text"
              value={leave.toBeEncashed}
              onChange={(e) => updateLeave("toBeEncashed", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Exemption-1">
            <input
              type="text"
              value={leave.exemption1}
              onChange={(e) => updateLeave("exemption1", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Exemption-2">
            <input
              type="text"
              value={leave.exemption2}
              onChange={(e) => updateLeave("exemption2", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Exemption-3">
            <input
              type="text"
              value={leave.exemption3}
              onChange={(e) => updateLeave("exemption3", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Exemption Actual">
            <input
              type="text"
              value={leave.exemptionActual}
              onChange={(e) => updateLeave("exemptionActual", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Exemption Payable">
            <input
              type="text"
              value={leave.exemptionPayable}
              onChange={(e) => updateLeave("exemptionPayable", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* 2. Gratuity Payment */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Gratuity Payment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Field label="Employee Current DA">
            <input
              type="text"
              value={gratuity.employeeCurrentDA}
              onChange={(e) => updateGratuity("employeeCurrentDA", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Employee Current Basic">
            <input
              type="text"
              value={gratuity.employeeCurrentBasic}
              onChange={(e) => updateGratuity("employeeCurrentBasic", e.target.value)}
              className={inputClass}
            />
          </Field>
          <DateInput
            label="Employee Gratuity/Joining"
            value={gratuity.gratuityJoining}
            setValue={(v) => updateGratuity("gratuityJoining", v)}
            placeholder="Select a date"
          />
          <DateInput
            label="Employee Exact Work Duration"
            value={gratuity.exactWorkDuration}
            setValue={(v) => updateGratuity("exactWorkDuration", v)}
            placeholder="Select a date"
          />
        </div>
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-sm font-medium px-4 py-2 rounded"
          >
            Calculate Gratuity
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Calculate Gratuity Amount">
            <input
              type="text"
              value={gratuity.calculatedGratuityAmount}
              onChange={(e) => updateGratuity("calculatedGratuityAmount", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Gratuity Payable Amount">
            <input
              type="text"
              value={gratuity.gratuityPayableAmount}
              onChange={(e) => updateGratuity("gratuityPayableAmount", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* 3. Bonus Payment Details */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Bonus Payment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <DateInput
            label="Bonus Period From"
            value={bonus.bonusPeriodFrom}
            setValue={(v) => updateBonus("bonusPeriodFrom", v)}
            placeholder="Select a date"
          />
          <DateInput
            label="Bonus Period To"
            value={bonus.bonusPeriodTo}
            setValue={(v) => updateBonus("bonusPeriodTo", v)}
            placeholder="Select a date"
          />
          <Field label="Basic Wage Limit">
            <input
              type="text"
              value={bonus.basicWageLimit}
              onChange={(e) => updateBonus("basicWageLimit", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Bonus Percent / Exgratia">
            <input
              type="text"
              value={bonus.bonusPercent}
              onChange={(e) => updateBonus("bonusPercent", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Pay-In Payhead">
            <select
              value={bonus.payInPayhead}
              onChange={(e) => updateBonus("payInPayhead", e.target.value)}
              className={selectClass}
            >
              <option value="">Select Paycode</option>
            </select>
          </Field>
          <Field label="Minimum Attendance">
            <input
              type="text"
              value={bonus.minimumAttendance}
              onChange={(e) => updateBonus("minimumAttendance", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Bonus Upper Limit">
            <input
              type="text"
              value={bonus.bonusUpperLimit}
              onChange={(e) => updateBonus("bonusUpperLimit", e.target.value)}
              className={inputClass}
            />
          </Field>
          <div>
            <span className={labelClass}>Basic Wage</span>
            <label className="relative inline-flex items-center cursor-pointer mt-1 block">
              <input
                type="checkbox"
                checked={bonus.basicWage}
                onChange={(e) => updateBonus("basicWage", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-[#8629DF] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
          <Field label="Calculated Bonus">
            <input
              type="text"
              value={bonus.calculatedBonus}
              onChange={(e) => updateBonus("calculatedBonus", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Bonus Paid">
            <input
              type="text"
              value={bonus.bonusPaid}
              onChange={(e) => updateBonus("bonusPaid", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className={btnPrevReset}>
            Reset
          </button>
          <button type="button" className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-sm font-medium px-4 py-2 rounded">
            Calculate
          </button>
        </div>
      </div>

      {/* 4. Notice Pay & Recover */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Notice Pay & Recover</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Show Notice Type">
            <select
              value={notice.noticeType}
              onChange={(e) => updateNotice("noticeType", e.target.value)}
              className={selectClass}
            >
              <option value="">Select Notice Type</option>
            </select>
          </Field>
          <Field label="Select Payhead">
            <select
              value={notice.payhead}
              onChange={(e) => updateNotice("payhead", e.target.value)}
              className={selectClass}
            >
              <option value="">Select Payhead</option>
            </select>
          </Field>
          <Field label="Enter Notice Days">
            <input
              type="text"
              value={notice.noticeDays}
              onChange={(e) => updateNotice("noticeDays", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Notice Amount Per Day">
            <input
              type="text"
              value={notice.noticeAmountPerDay}
              onChange={(e) => updateNotice("noticeAmountPerDay", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Total Notice Amount">
            <input
              type="text"
              value={notice.totalNoticeAmount}
              onChange={(e) => updateNotice("totalNoticeAmount", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {/* Footer buttons - same as VariablePayment / AttendanceAdjustment */}
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
