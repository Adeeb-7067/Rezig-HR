// LoanAssignmentDetail.jsx
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Pencil, Trash2, FileText, X, Upload } from "lucide-react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link } from "react-router-dom";
import InputField from "@/components/inputfeild";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/SelectFeild";
import DatePickerField from "@/components/ui/datePicker";
import DragandUpload from "@/components/ui/DragandUpload";

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

  // Position tooltip when shown
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
        iconRect.left + scrollLeft + iconRect.width / 2 - tooltipRect.width / 2;

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

// ── Default fallback data ─────────────────────────────────────────────────────
const defaultEmployee = {
  empCode: "EMP1024",
  name: "Amit Sharma",
  department: "IT Support",
  unitId: "142001",
  status: "Active",
  avatar: null,
  existingLoan: {
    type: "Existing Personal Loan",
    currentLoan: "₹1,20,000",
    emi: "₹5,000/month",
    remainingTenure: "12 Months",
  },
  tags: ["Marking Department", "Senior Executive", "Gurugram Office"],
  balanceAmount: "1,90,000",
  installmentPaid: 2,
  loans: [
    {
      id: 1,
      loanName: "Car Loan",
      principal: "5,00,000",
      interestAmount: "0",
      totalAmount: "5,00,000",
      interestRate: "0",
      noOfEMI: 10,
      emiStartMonth: "Jan-26",
      emis: [],
    },
    {
      id: 2,
      loanName: "Personal Loan",
      principal: "5,00,000",
      interestAmount: "0",
      totalAmount: "5,00,000",
      interestRate: "0",
      noOfEMI: 10,
      emiStartMonth: "Jan-26",
      emis: [
        {
          sno: 1,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Jan-26",
          status: "Paid",
        },
        {
          sno: 2,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Feb-26",
          status: "Paid",
        },
        {
          sno: 3,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Mar-26",
          status: "Unpaid",
        },
        {
          sno: 4,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Apr-26",
          status: "Unpaid",
        },
        {
          sno: 5,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "May-26",
          status: "Unpaid",
        },
        {
          sno: 6,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Jun-26",
          status: "Unpaid",
        },
        {
          sno: 7,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Jul-26",
          status: "Unpaid",
        },
        {
          sno: 8,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Aug-26",
          status: "Unpaid",
        },
        {
          sno: 9,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Sep-26",
          status: "Unpaid",
        },
        {
          sno: 10,
          loanType: "Personal Loan",
          emiPrincipal: "10,000",
          emiInterest: "0",
          totalEMI: "10,000",
          month: "Oct-26",
          status: "Unpaid",
        },
      ],
    },
    {
      id: 3,
      loanName: "Home Loan",
      principal: "5,00,000",
      interestAmount: "0",
      totalAmount: "5,00,000",
      interestRate: "0",
      noOfEMI: 10,
      emiStartMonth: "Jan-26",
      emis: [],
    },
  ],
};

// ── Avatar: small circle for stats bar ───────────────────────────────────────
const SmallAvatar = ({ name }) => {
  const initials = String(name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-[0.6rem] font-bold flex-shrink-0 overflow-hidden">
      <span>{initials}</span>
    </div>
  );
};

// ── Edit Installment Modal ────────────────────────────────────────────────────
const EditInstallmentModal = ({ loan, onClose }) => {
  const [activeTab, setActiveTab] = useState("adjust");

  const tabs = [
    { key: "adjust", label: "Adjust Installment" },
    { key: "extra", label: "Add Extra Amount" },
    { key: "foreclosure", label: "Foreclosure" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden">
        {/* Tab bar + close */}
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-6 pt-4 relative">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-[0.75rem] font-medium pb-3 mr-8 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-[#8629DF] text-[#8629DF]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={onClose}
            className="absolute right-4 top-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab content */}
        <div className="p-4">
          {activeTab === "adjust" && (
            <AdjustInstallmentTab loan={loan} onClose={onClose} />
          )}
          {activeTab === "extra" && (
            <AddExtraAmountTab loan={loan} onClose={onClose} />
          )}
          {activeTab === "foreclosure" && (
            <ForeclosureTab loan={loan} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

// ── Shared bottom action bar ──────────────────────────────────────────────────
const ModalActions = ({ onClose }) => (
  <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
    <button className="px-4 py-1.5 text-[0.78rem] border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">
      Export
    </button>
    <button className="px-4 py-1.5 text-[0.78rem] border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">
      Import & Save
    </button>
    <button className="px-4 py-1.5 text-[0.78rem] border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">
      Reset
    </button>
    <button className="px-5 py-1.5 text-[0.78rem] bg-[#8629DF] text-white rounded hover:bg-[#7020c5] transition-colors font-medium">
      Submit
    </button>
  </div>
);

// ── Shared file upload zone ───────────────────────────────────────────────────
const FileUploadZone = () => (
  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg h-full min-h-[140px] bg-gray-50 dark:bg-gray-800">
    <p className="text-[0.78rem] text-gray-500 mb-3">
      Drag & drop Excel file here or
    </p>
    <button className="flex items-center gap-2 px-4 py-2 bg-[#8629DF] text-white text-[0.78rem] rounded-full hover:bg-[#7020c5] transition-colors">
      <Upload size={14} />
      Upload File
    </button>
  </div>
);

// ── Tab 1: Adjust Installment ─────────────────────────────────────────────────
const AdjustInstallmentTab = ({ loan, onClose }) => (
  <>
    <div className="flex gap-4 w-full">
      {/* Left: form fields */}
      <div className="flex-1 space-y-2 w-[60%]">
        {/* Row 1 */}
        <div className="flex gap-3">
          <SelectField
            name={"Adjustment Month & Year"}
            label={"Adjustment Month & Year"}
            unSelectLabel={"March 2026"}
            options={[
              {
                label: "april",
                value: "april",
              },
            ]}
          />
          <SelectField
            name={"Shifting Methods"}
            label={"Shifting Methods"}
            unSelectLabel={"Select Pay Method"}
            options={[
              {
                label: "UPI",
                value: "UPI",
              },
            ]}
          />
        </div>

        {/* Amount */}
        <InputField
          name={" Amount to be Adjusted"}
          label={"Amount to be Adjusted"}
          placeholder={"Enter Amount"}
        />

        {/* Reason */}
        <div>
          <label className="block text-[0.7rem] text-gray-500 font-semibold dark:text-gray-400 ">
            Adjustment Reason
          </label>
          <textarea
            rows={3}
            placeholder="Enter Leave Type"
            className="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-[0.78rem] dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8629DF] resize-none"
          />
        </div>
      </div>

      {/* Right: file upload */}
      <div className="  w-[40%]">
        <DragandUpload />
      </div>
    </div>
    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
      <button className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
        Export
      </button>
      <button className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
        Import & Save
      </button>
      <button className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
        Reset
      </button>
      <button className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
        Submit
      </button>
    </div>{" "}
  </>
);

// ── Tab 2: Add Extra Amount ───────────────────────────────────────────────────
const AddExtraAmountTab = ({ loan, onClose }) => {
  const [formData, setFormData] = React.useState({
    addAmount: "",
    installmentCount: "",
    adjustmentMode: "",
    effectiveDate: "",
  });

  // const handleChange = (field, value) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  // };

  const handleReset = () => {
    setFormData({
      addAmount: "",
      installmentCount: "",
      adjustmentMode: "",
      effectiveDate: "",
    });
  };

  const stats = {
    totalLoanAmount: loan?.totalAmountWithInterest ?? "995667.00",
    paidAmount: loan?.paidAmount ?? "0.00",
    totalInstallment: loan?.totalInstallment ?? 7,
    paidInstallment: loan?.paidInstallment ?? 0,
    remainingAmount: loan?.remainingAmount ?? "995667.00",
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-5">
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div>
            <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
              Total Loan/Advnc Amount(with Interest)
            </p>
            <p className="text-[0.95rem] font-semibold text-gray-800 dark:text-gray-100">
              {stats.totalLoanAmount}
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
              Paid Amount(Installments+Out of Payroll)
            </p>
            <p className="text-[0.95rem] font-semibold text-gray-800 dark:text-gray-100">
              {stats.paidAmount}
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
              Total Installment
            </p>
            <p className="text-[0.95rem] font-semibold text-gray-800 dark:text-gray-100">
              {stats.totalInstallment}
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
              Paid Installment
            </p>
            <p className="text-[0.95rem] font-semibold text-gray-800 dark:text-gray-100">
              {stats.paidInstallment}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[0.72rem] text-gray-500 dark:text-gray-400 mb-1">
            Remaining Principal+Interest Amount
          </p>
          <p className="text-[0.95rem] font-semibold text-gray-800 dark:text-gray-100">
            {stats.remainingAmount}
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-4 gap-3">
          <InputField
            label={"Add Amount to Existing Loan/Advance"}
            placeholder="Enter Loan Amount "
          />
          <InputField
            label={"Number of Installments to be Increased"}
            placeholder="Enter No. of Installments"
          />
          <InputField
            label={"Adjustment Mode"}
            placeholder="Enter Adjustment Mode"
          />
          <DatePickerField
            label={"Effective Date"}
            placeholder="Select Effective Date"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleReset}
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          onClick={() => console.log("Add Amount", formData)}
          className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Add Amount
        </button>
      </div>
    </div>
  );
};

// ── Tab 3: Foreclosure ────────────────────────────────────────────────────────
const ForeclosureTab = ({ loan, onClose }) => (
  <>
    {/* Summary Stats */}
    <div className="flex gap-8 mb-6">
      <div>
        <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
          Total Loan/Advnc Amount(with Interest)
        </p>
        <p className="text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">
          {loan?.totalAmountWithInterest ?? "995667.00"}
        </p>
      </div>
      <div>
        <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
          Paid Amount(Installments+Out of Payroll)
        </p>
        <p className="text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">
          {loan?.paidAmount ?? "0.00"}
        </p>
      </div>
      <div>
        <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
          Total Installment
        </p>
        <p className="text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">
          {loan?.totalInstallment ?? "7"}
        </p>
      </div>
      <div>
        <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
          Paid Installment
        </p>
        <p className="text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">
          {loan?.paidInstallment ?? "0"}
        </p>
      </div>
    </div>

    {/* Remaining Amount */}
    <div className="mb-6">
      <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mb-1">
        Remaining Principal+Interest Amount
      </p>
      <p className="text-[0.95rem] font-medium text-gray-800 dark:text-gray-100">
        {loan?.remainingAmount ?? "995667.00"}
      </p>
    </div>

    {/* Form Row 1 */}
    <div className="grid grid-cols-4 gap-3 mb-4">
      <InputField label="Paid Amount" placeholder="Enter Paid Amount" />
      <InputField label="Cheque/Draft No" placeholder="Enter Cheque/Draft No" />
      <InputField label="Adjustment Mode" placeholder="Select Mode" />
      <DatePickerField label="Paid Date" placeholder="Select a Date" />
    </div>

    {/* Form Row 2 */}
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div>
        <label className="block text-[0.7rem] text-gray-600 dark:text-gray-400 mb-1">
          Bank Details
        </label>
        <textarea
          rows={4}
          placeholder="Enter Bank Details"
          className="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-[0.78rem] dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8629DF] resize-none"
        />
      </div>
      <div>
        <label className="block text-[0.7rem] text-gray-600 dark:text-gray-400 mb-1">
          Remarks
        </label>
        <textarea
          rows={4}
          placeholder="Enter Remarks"
          className="w-full border border-gray-200 dark:border-gray-600 rounded px-3 py-2 text-[0.78rem] dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8629DF] resize-none"
        />
      </div>
    </div>

   {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Add Amount
        </button>
      </div>  </>
);

// ── Main Component ────────────────────────────────────────────────────────────
const LoanAssignmentDetail = ({ employee: rawEmployee, onBack }) => {
  const emp = rawEmployee || {};
  const employee = {
    empCode: emp.empCode || defaultEmployee.empCode,
    name: emp.name || emp.employeeName || defaultEmployee.name,
    department: emp.department || defaultEmployee.department,
    unitId: emp.unitId || defaultEmployee.unitId,
    status: emp.status || defaultEmployee.status,
    avatar: emp.avatar || defaultEmployee.avatar,
    existingLoan: emp.existingLoan || defaultEmployee.existingLoan,
    tags: emp.tags || defaultEmployee.tags,
    balanceAmount: emp.balanceAmount || defaultEmployee.balanceAmount,
    installmentPaid: emp.installmentPaid ?? defaultEmployee.installmentPaid,
    loans: emp.loans || defaultEmployee.loans,
  };

  const [expandedLoan, setExpandedLoan] = useState(
    employee.loans.find((l) => l.emis && l.emis.length > 0)?.id ?? null,
  );

  // ── Modal state ──
  const [editingLoan, setEditingLoan] = useState(null);

  const toggleExpand = (loan) => {
    if (!loan.emis || loan.emis.length === 0) return;
    setExpandedLoan((prev) => (prev === loan.id ? null : loan.id));
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-900 min-h-screen w-full min-w-0 max-w-full overflow-x-hidden">
      {/* ── Edit Installment Modal ── */}
      {editingLoan && (
        <EditInstallmentModal
          loan={editingLoan}
          onClose={() => setEditingLoan(null)}
        />
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-2 mb-6 sm:mb-8 w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#252C58] dark:text-gray-50 truncate">
          Loan Assigment
        </h1>
        <div className="flex gap-2 sm:gap-3 shrink-0">
          <div className="bg-[#8629DF] text-white text-[0.7rem] px-3 sm:px-4 rounded-sm flex justify-center items-center gap-1 py-2 sm:py-1.5 min-w-[120px]">
            <Link
              to="/addLoan"
              className="flex items-center justify-center gap-1 text-[0.7rem] md:text-[0.8rem]"
            >
              <AiOutlinePlus className="md:w-4 md:h-4 font-semibold" />
              Add Loan
            </Link>
          </div>
        </div>
      </div>

      {/* ── Employee Info Card ── */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-5 mb-5 bg-white dark:bg-gray-800 w-full md:max-w-[480px] lg:w-[50%]">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {employee.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-[120px] h-[120px] rounded-lg object-cover flex-shrink-0 bg-gray-100"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-2xl font-bold flex-shrink-0">
              {String(employee.name || "?")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <div className="flex justify-between items-center gap-2 mb-0.5">
              <span className="text-[1.1rem] font-semibold text-gray-900 dark:text-gray-50">
                {employee.name}
              </span>
              <span className="text-[0.65rem] font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                {employee.status}
              </span>
            </div>
            <p className="text-[0.8rem] font-semibold text-gray-400 mb-2">
              {employee.empCode}
            </p>
            <div className="mb-3 mx-1">
              <p className="text-[0.7rem] font-medium text-gray-700 dark:text-gray-200 mb-0.5">
                {employee.existingLoan.type}
              </p>
              <div className="text-[0.7rem] text-gray-500 dark:text-gray-400 space-y-0.5">
                <p>
                  Current Loan –&nbsp;&nbsp;&nbsp;
                  <span className="text-gray-700 dark:text-gray-300">
                    {employee.existingLoan.currentLoan}
                  </span>
                </p>
                <p>
                  EMI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-gray-700 dark:text-gray-300">
                    {employee.existingLoan.emi}
                  </span>
                </p>
                <p>
                  Remaining Tenure –{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {employee.existingLoan.remainingTenure}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {employee.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#8629DF] text-white text-[0.7rem] px-3 py-1.5 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
        {/* ── Stats row ── */}
        <div className="flex flex-wrap items-center gap-3 mb-5 px-2 sm:px-4 py-3">
          <div className="flex items-center gap-2 py-1 px-2 border border-gray-200 dark:border-gray-600 rounded-sm">
            <SmallAvatar name={employee.name} />
            <span className="text-[0.7rem] font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap truncate max-w-[140px] sm:max-w-none">
              {employee.unitId} | {String(employee.name).slice(0, 9)} Shar
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-sm py-2.5 px-2 border border-gray-200 dark:border-gray-600 min-w-0">
            <HiOutlineOfficeBuilding className="w-4 h-4 text-[#8629DF] flex-shrink-0" />
            <span className="text-[0.7rem] text-gray-900 dark:text-gray-300 whitespace-nowrap font-semibold truncate max-w-[180px] sm:max-w-none">
              Department : {employee.department}
            </span>
          </div>

          <div className="flex-1 min-w-[20px]" />

          {/* Balance Amount box */}
          <div className="border-t-4 border-[#CB30E0] rounded-sm px-4 sm:px-8 py-1 text-center min-w-[120px] sm:min-w-[150px] shadow-sm flex-shrink-0">
            <p className="text-[0.9rem] sm:text-[1rem] font-bold text-[#8629DF] dark:text-gray-50">
              {employee.balanceAmount}
            </p>
            <p className="text-[0.65rem] sm:text-[0.7rem] text-gray-900 tracking-wide">
              Balance Amount
            </p>
          </div>

          {/* Installment Paid box */}
          <div className="border-t-4 border-green-400 rounded-sm px-4 sm:px-8 py-1 text-center min-w-[120px] sm:min-w-[150px] shadow-sm flex-shrink-0">
            <p className="text-[1rem] font-bold text-[#8629DF] dark:text-gray-50">
              {employee.installmentPaid}
            </p>
            <p className="text-[0.7rem] text-gray-900 tracking-wide">
              Installment Paid
            </p>
          </div>
        </div>

        {/* ── Loan Summary Table heading ── */}
        <p className="text-[1rem] font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Loan Summery Table
        </p>

        {/* ── Table ── */}
        <div className="rounded-sm overflow-x-auto overflow-y-hidden border border-gray-200 dark:border-gray-700">
          <table className="w-full text-[0.7rem] border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#8629DF] text-white text-left">
                {[
                  "Loan Name",
                  "Principal",
                  "Interest Amount",
                  "Total Amount",
                  "Interest rate",
                  "No. of EMI",
                  "EMI Start Month",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employee.loans.map((loan) => {
                const isExpanded = expandedLoan === loan.id;
                const hasEmis = loan.emis && loan.emis.length > 0;

                return (
                  <React.Fragment key={loan.id}>
                    <tr
                      className={`border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${hasEmis ? "cursor-pointer" : ""}`}
                    >
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-100 whitespace-nowrap relative">
                        {isExpanded && (
                          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8629DF] rounded-r-full" />
                        )}
                        {loan.loanName}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {loan.principal}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {loan.interestAmount}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {loan.totalAmount}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {loan.interestRate}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {loan.noOfEMI}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {loan.emiStartMonth}
                      </td>
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleExpand(loan)}
                            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                              isExpanded
                                ? "text-[#8629DF]"
                                : "text-gray-400 hover:text-[#8629DF]"
                            } ${!hasEmis ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={!hasEmis}
                            title="View EMI details"
                          >
                            <FileText size={13} />
                          </button>

                          {/* ── Edit button — opens modal ── */}
                          <button
                            onClick={() => setEditingLoan(loan)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-500 transition-colors"
                            title="Edit installment"
                          >
                            <Pencil size={15} />
                          </button>

                          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EMI sub-table */}
                    {isExpanded && hasEmis && (
                      <tr>
                        <td
                          colSpan={8}
                          className="p-0 bg-gray-50 dark:bg-gray-800"
                        >
                          <div>
                            <table className="w-full text-[0.7rem] border border-gray-200 dark:border-gray-700 rounded-xs overflow-hidden">
                              <thead>
                                <tr className="bg-[#E0E4E7] dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-left">
                                  <th className="px-4 py-2 font-semibold text-center">
                                    S.NO
                                  </th>
                                  <th className="px-4 py-2 font-semibold">
                                    Loan Type
                                  </th>
                                  <th className="px-4 py-2 font-semibold">
                                    EMI Principal
                                  </th>
                                  <th className="px-4 py-2 font-semibold">
                                    EMI Interest
                                  </th>
                                  <th className="px-4 py-2 font-semibold">
                                    Total EMI Amount
                                  </th>
                                  <th className="px-4 py-2 font-semibold">
                                    Month
                                  </th>
                                  <th className="px-4 py-2 font-semibold text-center">
                                    Payment Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {loan.emis.map((emi) => (
                                  <tr
                                    key={emi.sno}
                                    className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                                  >
                                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 text-center">
                                      {emi.sno}
                                    </td>
                                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                                      {emi.loanType}
                                    </td>
                                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                                      {emi.emiPrincipal}
                                    </td>
                                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                                      {emi.emiInterest}
                                    </td>
                                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                                      {emi.totalEMI}
                                    </td>
                                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                                      {emi.month}
                                    </td>
                                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400 text-center">
                                      {emi.status}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanAssignmentDetail;
