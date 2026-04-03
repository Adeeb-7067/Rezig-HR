import React, { useState } from "react";
import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import DatePickerField from "@/components/ui/datePicker";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const btnPrevReset = "bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24";
const btnSave = "font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white ds-bg-primary text-white hover:bg-ds-primary/80";
const cardClass = "bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3";
const sectionTitleClass = "text-base font-semibold mb-2 text-gray-500 dark:text-gray-200 mt-2";

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
    <div className="space-y-4">
      {/* 1. Leave Encashment & Payment Details */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Leave Encashment & Payment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SelectField
            label="Leave Type"
            name="leaveType"
            value={leave.leaveType}
            onChange={(e) => updateLeave("leaveType", e.target.value)}
            options={[
              { value: "", label: "Select Type" },
              { value: "el", label: "Earned Leave" },
              { value: "cl", label: "Casual Leave" },
            ]}
          />
          <InputField
            label="Leave Description"
            name="leaveDescription"
            value={leave.leaveDescription}
            onChange={(e) => updateLeave("leaveDescription", e.target.value)}
          />
          <DatePickerField
            label="Total Balance"
            name="totalBalance"
            value={leave.totalBalance}
            onChange={(e) => updateLeave("totalBalance", e.target.value)}
          />
          <InputField
            label="Accrued Balance"
            name="accruedBalance"
            value={leave.accruedBalance}
            onChange={(e) => updateLeave("accruedBalance", e.target.value)}
          />
          <SelectField
            label="Pay Code Template"
            name="payCodeTemplate"
            value={leave.payCodeTemplate}
            onChange={(e) => updateLeave("payCodeTemplate", e.target.value)}
            options={[{ value: "", label: "Select Template" }]}
          />
          <SelectField
            label="Payable Heads"
            name="payableHeads"
            value={leave.payableHeads}
            onChange={(e) => updateLeave("payableHeads", e.target.value)}
            options={[{ value: "", label: "Select Payable Heads" }]}
          />
          <InputField
            label="Encashment Amount"
            name="encashmentAmount"
            value={leave.encashmentAmount}
            onChange={(e) => updateLeave("encashmentAmount", e.target.value)}
            placeholder="Select amount"
          />
          <InputField
            label="Payable Amount"
            name="payableAmount"
            value={leave.payableAmount}
            onChange={(e) => updateLeave("payableAmount", e.target.value)}
          />
          <InputField
            label="To Be Encashed"
            name="toBeEncashed"
            value={leave.toBeEncashed}
            onChange={(e) => updateLeave("toBeEncashed", e.target.value)}
          />
          <InputField
            label="Exemption-1"
            name="exemption1"
            value={leave.exemption1}
            onChange={(e) => updateLeave("exemption1", e.target.value)}
          />
          <InputField
            label="Exemption-2"
            name="exemption2"
            value={leave.exemption2}
            onChange={(e) => updateLeave("exemption2", e.target.value)}
          />
          <InputField
            label="Exemption-3"
            name="exemption3"
            value={leave.exemption3}
            onChange={(e) => updateLeave("exemption3", e.target.value)}
          />
          <InputField
            label="Exemption Actual"
            name="exemptionActual"
            value={leave.exemptionActual}
            onChange={(e) => updateLeave("exemptionActual", e.target.value)}
          />
          <InputField
            label="Exemption Payable"
            name="exemptionPayable"
            value={leave.exemptionPayable}
            onChange={(e) => updateLeave("exemptionPayable", e.target.value)}
          />
        </div>
      </div>

      {/* 2. Gratuity Payment */}
      <div className={cardClass}>
          <div className="flex justify-between mb-3">
        <h3 className={sectionTitleClass}>Gratuity Payment</h3>
        <div>

          <button
            type="button"
            className="ds-bg-primary hover:bg-ds-primary/90 text-white ds-text-xs font-semibold px-4 py-1.5 mt-1 rounded-sm"
          >
            Calculate Gratuity
          </button>
        </div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
          <InputField
            label="Employee Current DA"
            name="employeeCurrentDA"
            value={gratuity.employeeCurrentDA}
            onChange={(e) => updateGratuity("employeeCurrentDA", e.target.value)}
          />
          <InputField
            label="Employee Current Basic"
            name="employeeCurrentBasic"
            value={gratuity.employeeCurrentBasic}
            onChange={(e) => updateGratuity("employeeCurrentBasic", e.target.value)}
          />
          <DatePickerField
            label="Employee Gratuity/Joining"
            name="gratuityJoining"
            value={gratuity.gratuityJoining}
            onChange={(e) => updateGratuity("gratuityJoining", e.target.value)}
          />
          <DatePickerField
            label="Employee Exact Work Duration"
            name="exactWorkDuration"
            value={gratuity.exactWorkDuration}
            onChange={(e) => updateGratuity("exactWorkDuration", e.target.value)}
          />
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <InputField
            label="Calculate Gratuity Amount"
            name="calculatedGratuityAmount"
            value={gratuity.calculatedGratuityAmount}
            onChange={(e) => updateGratuity("calculatedGratuityAmount", e.target.value)}
          />
          <InputField
            label="Gratuity Payable Amount"
            name="gratuityPayableAmount"
            value={gratuity.gratuityPayableAmount}
            onChange={(e) => updateGratuity("gratuityPayableAmount", e.target.value)}
          />
        </div>
      </div>

      {/* 3. Bonus Payment Details */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Bonus Payment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
          <DatePickerField
            label="Bonus Period From"
            name="bonusPeriodFrom"
            value={bonus.bonusPeriodFrom}
            onChange={(e) => updateBonus("bonusPeriodFrom", e.target.value)}
          />
          <DatePickerField
            label="Bonus Period To"
            name="bonusPeriodTo"
            value={bonus.bonusPeriodTo}
            onChange={(e) => updateBonus("bonusPeriodTo", e.target.value)}
          />
          <InputField
            label="Basic Wage Limit"
            name="basicWageLimit"
            value={bonus.basicWageLimit}
            onChange={(e) => updateBonus("basicWageLimit", e.target.value)}
          />
          <InputField
            label="Bonus Percent / Exgratia"
            name="bonusPercent"
            value={bonus.bonusPercent}
            onChange={(e) => updateBonus("bonusPercent", e.target.value)}
          />
          <SelectField
            label="Pay-In Payhead"
            name="payInPayhead"
            value={bonus.payInPayhead}
            onChange={(e) => updateBonus("payInPayhead", e.target.value)}
            options={[{ value: "", label: "Select Paycode" }]}
          />
          <InputField
            label="Minimum Attendance"
            name="minimumAttendance"
            value={bonus.minimumAttendance}
            onChange={(e) => updateBonus("minimumAttendance", e.target.value)}
          />
          <InputField
            label="Bonus Upper Limit"
            name="bonusUpperLimit"
            value={bonus.bonusUpperLimit}
            onChange={(e) => updateBonus("bonusUpperLimit", e.target.value)}
          />
         <VariableTypeRow name="basicWage" label='Basic Wage' value={bonus.basicWage} onChange={(e) => updateBonus("basicWage", e.target.value)}/>
          <InputField
            label="Calculated Bonus"
            name="calculatedBonus"
            value={bonus.calculatedBonus}
            onChange={(e) => updateBonus("calculatedBonus", e.target.value)}
          />
          <InputField
            label="Bonus Paid"
            name="bonusPaid"
            value={bonus.bonusPaid}
            onChange={(e) => updateBonus("bonusPaid", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className={btnPrevReset}>
            Reset
          </button>
          <button type="button" className="ds-bg-primary hover:bg-ds-primary/90 text-white text-[0.7rem] font-semibold px-4 py-1 rounded-sm">
            Calculate
          </button>
        </div>
      </div>

      {/* 4. Notice Pay & Recover */}
      <div className={cardClass}>
        <h3 className={sectionTitleClass}>Notice Pay & Recover</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SelectField
            label="Show Notice Type"
            name="noticeType"
            value={notice.noticeType}
            onChange={(e) => updateNotice("noticeType", e.target.value)}
            options={[{ value: "", label: "Select Notice Type" }]}
          />
          <SelectField
            label="Select Payhead"
            name="payhead"
            value={notice.payhead}
            onChange={(e) => updateNotice("payhead", e.target.value)}
            options={[{ value: "", label: "Select Payhead" }]}
          />
          <InputField
            label="Enter Notice Days"
            name="noticeDays"
            value={notice.noticeDays}
            onChange={(e) => updateNotice("noticeDays", e.target.value)}
          />
          <InputField
            label="Notice Amount Per Day"
            name="noticeAmountPerDay"
            value={notice.noticeAmountPerDay}
            onChange={(e) => updateNotice("noticeAmountPerDay", e.target.value)}
          />
          <InputField
            label="Total Notice Amount"
            name="totalNoticeAmount"
            value={notice.totalNoticeAmount}
            onChange={(e) => updateNotice("totalNoticeAmount", e.target.value)}
          />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex flex-row justify-end w-full gap-2 mt-4">
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
