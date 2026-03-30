import InputField from "@/components/inputfeild";
import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/SelectFeild";
import DatePickerField from "@/components/ui/datePicker";

const ToggleField = ({
  label,
  name,
  value,
  onChange,
  className = "",
  info = null,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (showTooltip && iconRef.current && tooltipRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      const top = iconRect.top + scrollTop - tooltipRect.height - 8;
      const left =
        iconRect.left +
        scrollLeft +
        iconRect.width / 2 -
        tooltipRect.width / 2;

      tooltipRef.current.style.top = `${Math.max(4, top)}px`;
      tooltipRef.current.style.left = `${Math.max(4, left)}px`;
    }
  }, [showTooltip]);

  return (
    <div
      className={`flex items-center justify-between gap-3 mr-4 py-2 ${className}`}
    >
      <div className="flex items-center gap-1">
        {info && (
          <div className="relative">
            <Info
              ref={iconRef}
              size={12}
              className="text-[#8629DF] cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div
                ref={tooltipRef}
                className="fixed z-[99999] w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
                style={{
                  transform: "translateX(0)",
                }}
              >
                {info}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        )}
        <Label
          htmlFor={name}
          className="text-gray-500 dark:text-gray-50 text-[0.7rem] font-semibold"
        >
          {label}
        </Label>
      </div>
      <Switch
        id={name}
        checked={value === "Yes"}
        onCheckedChange={(checked) =>
          onChange({
            target: { name, value: checked ? "Yes" : "No" },
          })
        }
        className="data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-gray-300"
      />
    </div>
  );
};

const AddLoan = () => {
  // Static Employee Data
  const employee = {
    name: "Aman Sharma",
    status: "Active",
    empCode: "EMP-1023",
    avatar: "",
    existingLoan: {
      type: "Home Loan",
      currentLoan: "₹3,50,000",
      emi: "₹12,500",
      remainingTenure: "28 Months",
    },
    tags: ["Full Time", "Engineering", "Payroll Eligible"],
  };

  // ── Form State ──
  const [formData, setFormData] = useState({
    payCode: "",
    loanAdvance: "",
    calculationMethod: "",
    principal: "",
    intrest: "",
    installmentDeducted: "",
    noOfInstallments: "",
    installmentAmount: "",
    dueAmount: "",
    balance: "",
    startDeductingFrom: "",
    transactionDate: "",
    loanTypePerkMap: "",
    loanAdvanceAcNo: "",
  });

  // ── Handle Change (works for InputField, SelectField, DatePickerField) ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Reset Form ──
  const handleReset = () => {
    setFormData({
      payCode: "",
      loanAdvance: "",
      calculationMethod: "",
      principal: "",
      intrest: "",
      installmentDeducted: "",
      noOfInstallments: "",
      installmentAmount: "",
      dueAmount: "",
      balance: "",
      startDeductingFrom: "",
      transactionDate: "",
      loanTypePerkMap: "",
      loanAdvanceAcNo: "",
    });
  };

  // ── Save Form ──
  const handleSave = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-row sm:flex-row justify-between gap-3 mt-2 mb-8 w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#252C58] dark:text-gray-50">
          Loan Assignment
        </h1>
      </div>

      {/* ── Employee Info Card ── */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-5 mb-5 bg-white dark:bg-gray-800 w-full md:max-w-[480px] lg:w-[50%]">
        <div className="flex flex-row items-start gap-3 sm:gap-4">
          {employee.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-16 h-16 sm:w-[120px] sm:h-[120px] rounded-lg object-cover flex-shrink-0 bg-gray-100"
            />
          ) : (
            <div className="w-16 h-16 sm:w-[120px] sm:h-[120px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-lg sm:text-2xl font-bold flex-shrink-0">
              {String(employee.name || "?")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1 mb-0.5">
              <span className="text-[1rem] sm:text-[1.1rem] font-semibold text-gray-900 dark:text-gray-50 truncate">
                {employee.name}
              </span>
              <span className="text-[0.65rem] font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                {employee.status}
              </span>
            </div>
            <p className="text-[0.8rem] font-semibold text-gray-400 mb-2">
              {employee.empCode}
            </p>
            <div className="mb-3">
              <p className="text-[0.7rem] font-medium text-gray-700 dark:text-gray-200 mb-1">
                {employee.existingLoan.type}
              </p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[0.7rem] text-gray-500 dark:text-gray-400">
                <dt>Current Loan</dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {employee.existingLoan.currentLoan}
                </dd>
                <dt>EMI</dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {employee.existingLoan.emi}
                </dd>
                <dt>Remaining Tenure</dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {employee.existingLoan.remainingTenure}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {employee.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#8629DF] text-white text-[0.7rem] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
        <h1 className="text-base font-semibold mb-1 text-gray-500">
          Loan / Advance Detail
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SelectField
            label="Pay Code"
            name="payCode"
            value={formData.payCode}
            onChange={handleChange}
            unSelectLabel="Select Payhead"
            options={[{ label: "payhead", value: "payhead" }]}
          />

          <SelectField
            label="Loan / Advance"
            name="loanAdvance"
            value={formData.loanAdvance}
            onChange={handleChange}
            unSelectLabel="Select Loan / Advance"
            options={[{ label: "loan/advance", value: "loan/advance" }]}
          />

          <SelectField
            label="Calculation Method"
            name="calculationMethod"
            value={formData.calculationMethod}
            onChange={handleChange}
            unSelectLabel="Select Type"
            options={[{ label: "Addition", value: "Addition" }]}
          />

          <span></span>

          <InputField
            name="principal"
            label="Principal"
            value={formData.principal}
            onChange={handleChange}
          />

          <InputField
            name="intrest"
            label="Intrest"
            value={formData.intrest}
            onChange={handleChange}
          />

          <SelectField
            label="Installment to be deducted"
            name="installmentDeducted"
            value={formData.installmentDeducted}
            onChange={handleChange}
            unSelectLabel="Deduction Type"
            options={[{ label: "Addition", value: "Addition" }]}
          />

          <InputField
            name="noOfInstallments"
            label="No of Installments"
            value={formData.noOfInstallments}
            onChange={handleChange}
          />

          <InputField
            name="installmentAmount"
            label="Installment Amount"
            value={formData.installmentAmount}
            onChange={handleChange}
          />

          <InputField
            name="dueAmount"
            label="Due Amount"
            value={formData.dueAmount}
            onChange={handleChange}
          />

          <InputField
            name="balance"
            label="Balance"
            value={formData.balance}
            onChange={handleChange}
          />

          <SelectField
            label="Start Deducting From"
            name="startDeductingFrom"
            value={formData.startDeductingFrom}
            onChange={handleChange}
            unSelectLabel="March 2026"
            options={[{ label: "April 2026", value: "April 2026" }]}
          />

          <DatePickerField
            name="transactionDate"
            label="Transaction Date"
            value={formData.transactionDate}
            onChange={handleChange}
          />

          <SelectField
            label="Loan Type(Perk Map)"
            name="loanTypePerkMap"
            value={formData.loanTypePerkMap}
            onChange={handleChange}
            unSelectLabel="Select Type"
            options={[{ label: "Addition", value: "Addition" }]}
          />

          <InputField
            name="loanAdvanceAcNo"
            label="Loan / Advance A/c No"
            value={formData.loanAdvanceAcNo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-3">
        <button
          type="button"
          onClick={handleReset}
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddLoan;