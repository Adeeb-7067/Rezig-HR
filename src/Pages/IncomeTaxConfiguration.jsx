import React, { useEffect, useRef, useState } from "react";
import InputField from "@/components/inputfeild";
import Tabs from "@/components/Tabs";
import { Info, Eye, X, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/SelectFeild";
import DatePickerField from "@/components/ui/datePicker";
import DateFilter from "./AttendanceRegularisation/components/DateFilter";

const taxTableData = [
  {
    lowerLimit: "1.00",
    upperLimit: "400000.00",
    percent: "0.00",
    regime: "Old",
    slabType: "Individual",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
  {
    lowerLimit: "400001.00",
    upperLimit: "800000.00",
    percent: "5.00",
    regime: "Old",
    slabType: "Individual",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
  {
    lowerLimit: "800001.00",
    upperLimit: "1200000.00",
    percent: "10.00",
    regime: "Old",
    slabType: "Individual",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
  {
    lowerLimit: "1200001.00",
    upperLimit: "1600000.00",
    percent: "15.00",
    regime: "New",
    slabType: "Individual",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
  {
    lowerLimit: "1600001.00",
    upperLimit: "2000000.00",
    percent: "20.00",
    regime: "New",
    slabType: "Senior Citizen",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
];

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
                style={{ transform: "translateX(0)" }}
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
          onChange({ target: { name, value: checked ? "Yes" : "No" } })
        }
        className="data-[state=checked]:bg-violet-600 data-[state=unchecked]:bg-gray-300"
      />
    </div>
  );
};

const TransactionHistory = () => {
  const mockTransactions = [
    {
      id: "TXN-102394",
      date: "12 Jan 2026, 10:42 AM",
      user: "Rahul Sharma",
      ip: "192.168.1.24",
      card: "Exemption Details",
    },
    {
      id: "TXN-102395",
      date: "11 Jan 2026, 03:15 PM",
      user: "Priya Singh",
      ip: "192.168.1.30",
      card: "Tax Configuration",
    },
    {
      id: "TXN-102396",
      date: "10 Jan 2026, 09:20 AM",
      user: "Amit Verma",
      ip: "192.168.1.45",
      card: "Investment Config",
    },
    {
      id: "TXN-102397",
      date: "09 Jan 2026, 11:55 AM",
      user: "Neha Gupta",
      ip: "192.168.1.12",
      card: "Tax Rebate",
    },
    {
      id: "TXN-102398",
      date: "08 Jan 2026, 02:30 PM",
      user: "Vikram Patel",
      ip: "192.168.1.58",
      card: "Exemption Details",
    },
  ];

  const mockModalData = [
    {
      oldVal: "8%",
      newVal: "8.33%",
      field: "Bonus Percent",
      card: "Exemption Details",
      user: "Rahul Sharma",
      ip: "192.168.1.24",
      date: "12 Jan 2026, 10:42 AM",
    },
    {
      oldVal: "50000",
      newVal: "75000",
      field: "Standard Deduction",
      card: "Tax Rebate",
      user: "Rahul Sharma",
      ip: "192.168.1.24",
      date: "12 Jan 2026, 10:42 AM",
    },
    {
      oldVal: "Old",
      newVal: "New",
      field: "Tax Regime",
      card: "Tax Configuration",
      user: "Rahul Sharma",
      ip: "192.168.1.24",
      date: "12 Jan 2026, 10:41 AM",
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleView = (txn) => {
    setSelectedTxn(txn);
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen p-2 md:p-6">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
        <h1 className="text-lg text-[#58585A] dark:text-gray-50 font-semibold mb-3">
          Transaction History Table
        </h1>
        <div className="w-full md:w-auto">
          <DateFilter
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </div>
      </div>

      <div className="rounded-sm mt-5 shadow drop-shadow-xs border border-gray-200 dark:border-gray-600">
        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[900px] lg:min-w-full">
            <div
              className="text-[0.7rem] font-semibold text-white bg-[#8629DF] py-2 px-4 rounded-t-md"
              style={{
                display: "grid",
                gridTemplateColumns: "140px 160px 1.5fr 1.5fr 1.5fr 80px",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <div>Transaction ID</div>
              <div>Date & Time</div>
              <div>User Name</div>
              <div>IP Address</div>
              <div>Card Name</div>
              <div className="text-center">View</div>
            </div>

            <div
              className="max-h-[200px] overflow-y-auto table-scroll"
              style={{ scrollbarGutter: "stable" }}
            >
              {mockTransactions.map((item, index) => (
                <div
                  key={index}
                  className="text-[0.7rem] py-2 px-4 border-b hover:bg-gray-200/30"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 160px 1.5fr 1.5fr 1.5fr 80px",
                    gap: "6px",
                    alignItems: "center",
                  }}
                >
                  <div>{item.id}</div>
                  <div>{item.date}</div>
                  <div>{item.user}</div>
                  <div>{item.ip}</div>
                  <div>{item.card}</div>
                  <div className="flex justify-center">
                    <Eye
                      size={16}
                      className="cursor-pointer hover:text-purple-600"
                      onClick={() => handleView(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button className="bg-[#8629DF] text-white px-4 py-1 rounded-sm mt-3 text-[0.7rem]">
          Download
        </button>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 w-[80%] lg:w-[1000px] rounded-lg shadow-lg p-5 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 cursor-pointer"
            >
              <X />
            </button>

            <h2 className="text-lg text-[#58585A] dark:text-gray-50 font-semibold mb-4">
              Transaction Details – {selectedTxn?.id || "TXN-102394"}
            </h2>

            <div className="rounded-sm mt-3 border border-gray-200 dark:border-gray-600">
              <div className="overflow-x-auto no-scrollbar">
                <div className="min-w-[1100px] lg:min-w-full">
                  <div
                    className="text-[0.7rem] font-semibold text-white bg-[#8629DF] py-2 px-4 rounded-t-md"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "120px 120px 1.5fr 1.5fr 1.5fr 1.5fr 160px",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <div>Old Value</div>
                    <div>New Value</div>
                    <div>Field Name</div>
                    <div>Card Name</div>
                    <div>User Name</div>
                    <div>IP Address</div>
                    <div>Date & Time</div>
                  </div>

                  <div
                    className="max-h-[250px] overflow-y-auto table-scroll"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    {mockModalData.map((item, index) => (
                      <div
                        key={index}
                        className="text-[0.7rem] py-2 px-4 border-b hover:bg-gray-200/30"
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "120px 120px 1.5fr 1.5fr 1.5fr 1.5fr 160px",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        <div>{item.oldVal}</div>
                        <div>{item.newVal}</div>
                        <div>{item.field}</div>
                        <div>{item.card}</div>
                        <div>{item.user}</div>
                        <div>{item.ip}</div>
                        <div>{item.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TaxConfigurationTable = ({ taxData }) => {
  return (
    <div>
      <h1 className="text-lg text-[#58585A] dark:text-gray-50 font-semibold mb-3">
        Tax Configutration List
      </h1>
      <div className="rounded-sm mt-5 shadow drop-shadow-xs border border-gray-200 dark:border-gray-600">
        <div className="overflow-auto no-scrollbar table-scroll">
          <div className="min-w-[1050px] lg:min-w-full">
            <div
              className="text-[0.7rem] font-semibold text-white bg-[#8629DF] py-2 px-4 rounded-t-md"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "60px 1fr 1fr 80px 120px 120px 1.5fr 1.5fr 60px 60px",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <div>S.No</div>
              <div>Lower Limit</div>
              <div>Upper Limit</div>
              <div>Percent</div>
              <div>Regime</div>
              <div>Slab Type</div>
              <div>Start Financial Yr</div>
              <div>End Financial Yr</div>
              <div>Edit</div>
              <div>Delete</div>
            </div>

            {taxData.map((tax, index) => (
              <div
                key={index}
                className="text-[0.7rem] py-2 px-3 border-b hover:bg-gray-100 dark:hover:bg-gray-500"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "60px 1fr 1fr 80px 120px 120px 1.5fr 1.5fr 60px 60px",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                <div>{index + 1}</div>
                <div>{tax.lowerLimit}</div>
                <div>{tax.upperLimit}</div>
                <div>{tax.percent}</div>
                <div>{tax.regime}</div>
                <div>{tax.slabType}</div>
                <div>{tax.startYear}</div>
                <div>{tax.endYear}</div>
                <div className="text-center">
                  <Pencil className="h-4 w-4 text-center" />
                </div>
                <div className="text-center">
                  <Trash2 className="h-4 w-4 text-center text-red-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Initial form data (extracted for reset) ──

const initialFormData = {
  // Tax Configuration
  startFinancialYear: "",
  endFinancialYear: "",
  surchargePercent: "10.00",
  educationCessCharge: "4.00",
  surchargeQualifyingAmount: "500000000.00",
  tdsConsultantPercent: "2400.00",
  deductTdsHigherSlab: "No",
  deductTdsProportionate: "No",
  doNotDeductHoldEmployeeTds: "No",
  generateEtdsCompanyWise: "No",
  defaultTaxDeductionRegime: "New Tax Regime",
  addTaxDeductedOnPerq: "No",
  deductTaxNegativeNetSalary: "No",
  projectCarPrequisite: "No",

  // Investment Configuration
  defaultStatusChapterVIA: "let the user choose",
  taxBasedOnConfirmDocs: "Dec 2025",
  panMandatoryOnInvestment: "No",
  maxInvestmentDeclarationRequest: "",

  // Tax Rebate Configuration
  maxCreditLimitOldRegime: "1200000.00",
  maxTaxCreditLimitNewRegime: "600000.00",
  taxCreditAmountOldRegime: "",
  taxCreditAmountNewRegime: "",
  oldRegimeStandardDeduction: "50000.00",
  newRegimeStandardDeduction: "750000.00",
  superSeniorCitizenAge: "2400.00",
  seniorCitizenAge: "2400.00",
  ltaBlockPeriodFrom: "",
  ltaBlockPeriodTo: "",
  arrearTdsInPayMonth: "Both",

  // Exemption Details
  maxChildrenEducationAllowance: "2",
  landlordPanRentLimit: "10000.00",
  maxChildrenSchoolAllowance: "2400.00",
  maxChildrenHostelAllowance: "7200.00",
  doNotDeductHoldEmployeeOnTds: "No",
  generateEtdsCompanyWiseExemption: "No",
  chapterVIAApproval: "Admin",
  housingLoanInterestExemptionLimit: "20000.00",
  claExemptionCalculation: "Prorate with Paid Days",
  hraExemptionCalculation: "Actual rent Paid Amount",
  gratuityExemptionLimit: "200000.00",
  consultantTaxExemptionLimit: "200000.00",

  // Tax Slab tab
  slabStartFinancialYear: "",
  slabEndFinancialYear: "",
  taxRegime: "",
  slabType: "",
  lowerLimit: "",
  upperLimit: "",
  taxPercent: "",
  higherTaxSlab: "No",
};

const IncomeTaxConfiguration = () => {
  const [activeTab, setActiveTab] = useState("itc");
  const [formData, setFormData] = useState(initialFormData);
  const [showTaxTable, setShowTaxTable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setShowTaxTable(false);
  };

  const handleUpdate = () => {
    console.log("Updating income tax configuration:", formData);
    setShowTaxTable(true);
  };

  const tabs = [
    { label: "Income Tax Configuration", value: "itc" },
    { label: "Income Tax Slab ", value: "its" },
  ];
  const isMobile = window.innerWidth < 768;

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "itc" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                <h1 className="text-base font-semibold mb-1 text-gray-500">
                  Tax Configuration
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField
                    name="startFinancialYear"
                    label="Start Financial Year"
                    value={formData.startFinancialYear}
                    onChange={handleChange}
                  />
                  <InputField
                    name="endFinancialYear"
                    label="End Financial Year"
                    value={formData.endFinancialYear}
                    onChange={handleChange}
                  />
                  <InputField
                    name="surchargePercent"
                    label="Surcharge(%)"
                    value={formData.surchargePercent}
                    onChange={handleChange}
                  />
                  <InputField
                    name="educationCessCharge"
                    label="Education Cess Charge(%)"
                    value={formData.educationCessCharge}
                    onChange={handleChange}
                  />
                  <InputField
                    name="surchargeQualifyingAmount"
                    label="Surcharge Qualifying Amount"
                    value={formData.surchargeQualifyingAmount}
                    onChange={handleChange}
                  />
                  <InputField
                    name="tdsConsultantPercent"
                    label="TDS-Consultant(%)"
                    value={formData.tdsConsultantPercent}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="deductTdsHigherSlab"
                    label="Deduct TDS in higher slab (if PAN is available)"
                    info="Deduct TDS in higher slab (if PAN is available)"
                    value={formData.deductTdsHigherSlab}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="deductTdsProportionate"
                    label="Deduct TDS Proportionate"
                    info="Deduct TDS proportionate"
                    value={formData.deductTdsProportionate}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="doNotDeductHoldEmployeeTds"
                    label="Do Not Deduct Hold Employee TDS"
                    info="Do Not Deduct Hold Employee TDS"
                    value={formData.doNotDeductHoldEmployeeTds}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="generateEtdsCompanyWise"
                    label="Generate ETDS Company Wise (Unit Name)"
                    info="Generate ETDS Company Wise (Unit Name)"
                    value={formData.generateEtdsCompanyWise}
                    onChange={handleChange}
                  />
                  <SelectField
                    label="Default Tax Deduction Regime"
                    name="defaultTaxDeductionRegime"
                    value={formData.defaultTaxDeductionRegime}
                    onChange={handleChange}
                    options={[
                      { value: "New Tax Regime", label: "New Tax Regime" },
                      { value: "Old Tax Regime", label: "Old Tax Regime" },
                    ]}
                  />
                  <ToggleField
                    name="addTaxDeductedOnPerq"
                    label="Add the tax deducted on Perq. with tax challan"
                    info="Add the tax deducted on Perq. with tax challan"
                    value={formData.addTaxDeductedOnPerq}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="deductTaxNegativeNetSalary"
                    label="Deduct Tax in case of Negative Net Salary Also"
                    info="Deduct Tax in case of Negative Net Salary Also"
                    value={formData.deductTaxNegativeNetSalary}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="projectCarPrequisite"
                    label="Project Car Prequisite"
                    info="Project Car Prequisite"
                    value={formData.projectCarPrequisite}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                <h1 className="text-base font-semibold mb-1 text-gray-500">
                  Investment Configuration
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <SelectField
                    name="defaultStatusChapterVIA"
                    label="Default Status for Chapter VI-A"
                    info="Default Status for Chapter VI-A"
                    value={formData.defaultStatusChapterVIA}
                    onChange={handleChange}
                    options={[
                      {
                        value: "let the user choose",
                        label: "Let the user choose",
                      },
                      { value: "approved", label: "Approved" },
                      { value: "pending", label: "Pending" },
                    ]}
                  />
                  <SelectField
                    name="taxBasedOnConfirmDocs"
                    label="Tax Based on confirm Docs"
                    info="Tax Based on confirm Docs"
                    value={formData.taxBasedOnConfirmDocs}
                    onChange={handleChange}
                    options={[
                      { value: "Dec 2025", label: "Dec 2025" },
                      { value: "Jan 2026", label: "Jan 2026" },
                      { value: "Feb 2026", label: "Feb 2026" },
                      { value: "Mar 2026", label: "Mar 2026" },
                    ]}
                  />
                  <ToggleField
                    name="panMandatoryOnInvestment"
                    label="PAN mandatory on investment declarations"
                    info="PAN mandatory on investment declarations"
                    value={formData.panMandatoryOnInvestment}
                    onChange={handleChange}
                  />
                  <InputField
                    name="maxInvestmentDeclarationRequest"
                    label="Max investment Declaration Request"
                    value={formData.maxInvestmentDeclarationRequest}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
                  Tax Rebate Configuration
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField
                    name="maxCreditLimitOldRegime"
                    label="Max Credit Limit (Old Regime)"
                    value={formData.maxCreditLimitOldRegime}
                    onChange={handleChange}
                  />
                  <InputField
                    name="maxTaxCreditLimitNewRegime"
                    label="Max Tax Credit Limit (New Regime)"
                    value={formData.maxTaxCreditLimitNewRegime}
                    onChange={handleChange}
                  />
                  <InputField
                    name="taxCreditAmountOldRegime"
                    label="Tax Credit Amount Old Regime"
                    value={formData.taxCreditAmountOldRegime}
                    onChange={handleChange}
                  />
                  <InputField
                    name="taxCreditAmountNewRegime"
                    label="Tax Credit Amount New Regime"
                    value={formData.taxCreditAmountNewRegime}
                    onChange={handleChange}
                  />
                  <InputField
                    name="oldRegimeStandardDeduction"
                    label="Old Regime Standard Deduction"
                    value={formData.oldRegimeStandardDeduction}
                    onChange={handleChange}
                  />
                  <InputField
                    name="newRegimeStandardDeduction"
                    label="New Regime Standard Deduction"
                    value={formData.newRegimeStandardDeduction}
                    onChange={handleChange}
                  />
                  <InputField
                    name="superSeniorCitizenAge"
                    label="Super Senior Citizen Age"
                    value={formData.superSeniorCitizenAge}
                    onChange={handleChange}
                  />
                  <InputField
                    name="seniorCitizenAge"
                    label="Senior Citizen Age"
                    value={formData.seniorCitizenAge}
                    onChange={handleChange}
                  />
                  <div>
                    <label
                      htmlFor="dates"
                      className="block text-gray-500 font-semibold dark:text-gray-50 text-[0.7rem]"
                    >
                      Current LTA Block Period(From-To)
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <DatePickerField
                        name="ltaBlockPeriodFrom"
                        value={formData.ltaBlockPeriodFrom}
                        onChange={(e) => handleChange(e)}
                        onStyleOpen={isMobile ? {} : { width: "200px" }}
                      />
                      <DatePickerField
                        name="ltaBlockPeriodTo"
                        value={formData.ltaBlockPeriodTo}
                        onChange={(e) => handleChange(e)}
                        onStyleOpen={isMobile ? {} : { width: "200px" }}
                      />
                    </div>
                  </div>
                  <SelectField
                    name="arrearTdsInPayMonth"
                    label="Arrear TDS in Pay Month"
                    info="Arrear TDS in Pay Month"
                    value={formData.arrearTdsInPayMonth}
                    onChange={handleChange}
                    options={[
                      { label: "Both", value: "Both" },
                      { label: "Salary Month", value: "Salary Month" },
                      { label: "Arrear Month", value: "Arrear Month" },
                    ]}
                  />
                </div>
              </div>

              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-3">
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
                  Exemption Details
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField
                    name="maxChildrenEducationAllowance"
                    label="Max Children for Education Allowance"
                    value={formData.maxChildrenEducationAllowance}
                    onChange={handleChange}
                  />
                  <InputField
                    name="landlordPanRentLimit"
                    label="LandLord PAN Rent Limit"
                    value={formData.landlordPanRentLimit}
                    onChange={handleChange}
                  />
                  <InputField
                    name="maxChildrenSchoolAllowance"
                    label="Max Children for School Allowance"
                    value={formData.maxChildrenSchoolAllowance}
                    onChange={handleChange}
                  />
                  <InputField
                    name="maxChildrenHostelAllowance"
                    label="Max Children for Hostel Allowance"
                    value={formData.maxChildrenHostelAllowance}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="doNotDeductHoldEmployeeOnTds"
                    label="Do Not Deduct Hold Employee on TDS"
                    info="Do Not Deduct Hold Employee on TDS"
                    value={formData.doNotDeductHoldEmployeeOnTds}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name="generateEtdsCompanyWiseExemption"
                    label="Generate ETDS Company Wise (Unit Name)"
                    info="Generate ETDS Company Wise (Unit Name)"
                    value={formData.generateEtdsCompanyWiseExemption}
                    onChange={handleChange}
                  />
                  <SelectField
                    name="chapterVIAApproval"
                    label="Chapter VI-A Approval"
                    info="Chapter VI-A Approval"
                    value={formData.chapterVIAApproval}
                    onChange={handleChange}
                    options={[
                      { label: "Admin", value: "Admin" },
                      { label: "Manager", value: "Manager" },
                      { label: "HR", value: "HR" },
                    ]}
                  />
                  <InputField
                    name="housingLoanInterestExemptionLimit"
                    label="Housing Loan Intrest Exemption Limit"
                    value={formData.housingLoanInterestExemptionLimit}
                    onChange={handleChange}
                  />
                  <SelectField
                    name="claExemptionCalculation"
                    label="CLA Exemption Calculation"
                    info="CLA Exemption Calculation"
                    value={formData.claExemptionCalculation}
                    onChange={handleChange}
                    options={[
                      {
                        label: "Prorate with Paid Days",
                        value: "Prorate with Paid Days",
                      },
                      { label: "Fixed Amount", value: "Fixed Amount" },
                    ]}
                  />
                  <SelectField
                    name="hraExemptionCalculation"
                    label="HRA Exemption Calculation"
                    info="HRA Exemption Calculation"
                    value={formData.hraExemptionCalculation}
                    onChange={handleChange}
                    options={[
                      {
                        label: "Actual rent Paid Amount",
                        value: "Actual rent Paid Amount",
                      },
                      { label: "50% of Basic", value: "50% of Basic" },
                      { label: "40% of Basic", value: "40% of Basic" },
                    ]}
                  />
                  <InputField
                    name="gratuityExemptionLimit"
                    label="Gratuity Exemption Limit"
                    value={formData.gratuityExemptionLimit}
                    onChange={handleChange}
                  />
                  <InputField
                    name="consultantTaxExemptionLimit"
                    label="Consultant Tax Exemption Limit"
                    info="Consultant Tax Exemption Limit"
                    value={formData.consultantTaxExemptionLimit}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "its" && (
          <div>
            <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
              <h1 className="text-base font-semibold  mb-1 text-gray-500">
                Tax Configuration
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DatePickerField
                  name="slabStartFinancialYear"
                  label="Start Financial Year"
                  value={formData.slabStartFinancialYear}
                  onChange={(e) => handleChange(e)}
                />
                <DatePickerField
                  name="slabEndFinancialYear"
                  label="End Financial Year"
                  value={formData.slabEndFinancialYear}
                  onChange={(e) => handleChange(e)}
                />
                <SelectField
                  name="taxRegime"
                  label="Tax Regime"
                  value={formData.taxRegime}
                  onChange={handleChange}
                  options={[
                    { label: "Select Regime", value: "" },
                    { label: "Old Regime", value: "Old" },
                    { label: "New Regime", value: "New" },
                  ]}
                />
                <SelectField
                  name="slabType"
                  label="Slab Type"
                  value={formData.slabType}
                  onChange={handleChange}
                  options={[
                    { label: "Select Slab Type", value: "" },
                    { label: "Individual", value: "Individual" },
                    { label: "Senior Citizen", value: "Senior Citizen" },
                    {
                      label: "Super Senior Citizen",
                      value: "Super Senior Citizen",
                    },
                    { label: "HUF", value: "HUF" },
                  ]}
                />
                <InputField
                  name="lowerLimit"
                  label="Lower Limit"
                  value={formData.lowerLimit}
                  onChange={handleChange}
                />
                <InputField
                  name="upperLimit"
                  label="Upper Limit"
                  value={formData.upperLimit}
                  onChange={handleChange}
                />
                <InputField
                  name="taxPercent"
                  label="Tax Percent"
                  value={formData.taxPercent}
                  onChange={handleChange}
                />
                <ToggleField
                  name="higherTaxSlab"
                  label="Higher Tax Slab"
                  info="Higher Tax Slab"
                  value={formData.higherTaxSlab}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-3">
        <button
          onClick={handleReset}
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24">
          Log Report
        </button>
        <button
          onClick={handleUpdate}
          className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24"
        >
          Update
        </button>
      </div>

      {showTaxTable && (
        <div className="p-2 mt-1 md:p-6">
          <TaxConfigurationTable taxData={taxTableData} />
        </div>
      )}

      <TransactionHistory />
    </div>
  );
};

export default IncomeTaxConfiguration;
