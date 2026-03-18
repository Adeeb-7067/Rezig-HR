import React, { useEffect, useRef, useState } from "react";
import InputField from "@/components/inputfeild";
import Tabs from "@/components/Tabs";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/SelectFeild";
import DatePickerField from "@/components/ui/datePicker";
import { Eye, X, Pencil, Trash2 } from "lucide-react";
const data = [
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
    lowerLimit: "1.00",
    upperLimit: "400000.00",
    percent: "0.00",
    regime: "Old",
    slabType: "Individual",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
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
    lowerLimit: "1.00",
    upperLimit: "400000.00",
    percent: "0.00",
    regime: "Old",
    slabType: "Individual",
    startYear: "01 Apr 2025",
    endYear: "31 Mar 2026",
  },
  {
    lowerLimit: "1.00",
    upperLimit: "400000.00",
    percent: "0.00",
    regime: "Old",
    slabType: "Individual",
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

const TransactionHistory = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen p-6">
      {/* Main Table */}
      <div className="rounded-sm mt-5 shadow drop-shadow-xs border border-gray-200 dark:border-gray-600">
        <div className="overflow-x-auto no-scrollbar">
          {/* Common width wrapper */}
          <div className="min-w-[900px] lg:min-w-full">
            {/* Header */}
            <div
              className="text-[0.7rem] font-semibold text-white 
        bg-[#8629DF] py-2 px-4 rounded-t-md"
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

            {/* Body */}
            <div
              className="max-h-[200px] overflow-y-auto table-scroll"
              style={{
                scrollbarGutter: "stable",
              }}
            >
              {data.map((item, index) => (
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
                  <div>TXN-102394</div>

                  <div>12 Jan 2026, 10:42 AM</div>

                  <div>Rahul Sharma</div>

                  <div>192.168.1.24</div>

                  <div>Exemption Details</div>

                  <div className="flex justify-center">
                    <Eye
                      size={16}
                      className="cursor-pointer hover:text-purple-600"
                      onClick={() => setOpenModal(true)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          {/* Modal Card */}
          <div className="bg-white w-[80%] lg:w-[1000px]  rounded-lg shadow-lg p-5 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 cursor-pointer"
            >
              <X />
            </button>

            {/* Modal Title */}
            <h2 className="text-lg text-[#58585A] font-semibold mb-4">
              Transaction Details – TXN-102394
            </h2>

            {/* SAME TABLE INSIDE MODAL */}
            {/* Table */}
            <div className="rounded-sm mt-3 border border-gray-200">
              <div className="overflow-x-auto no-scrollbar">
                {/* Wrapper with fixed min width */}
                <div className="min-w-[1100px] lg:min-w-full">
                  {/* Header */}
                  <div
                    className="text-[0.7rem] font-semibold text-white
        bg-[#8629DF] py-2 px-4 rounded-t-md"
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

                  {/* Body */}
                  <div
                    className="max-h-[250px] overflow-y-auto table-scroll"
                    style={{
                      scrollbarGutter: "stable",
                    }}
                  >
                    {data.map((item, index) => (
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
                        <div>8%</div>
                        <div>8.33%</div>
                        <div>Bonus Percent</div>
                        <div>Exemption Details</div>
                        <div>Rahul Sharma</div>
                        <div>192.168.1.24</div>
                        <div>12 Jan 2026, 10:42 AM</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                className="
                  bg-[#8629DF]
                  text-white
                  font-semibold
                  text-xs sm:text-[0.7rem]
                  py-1
                  rounded-sm
                  w-full sm:w-auto md:w-24
                     "
              >
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
    <div className="rounded-sm mt-5 shadow drop-shadow-xs border border-gray-200 dark:border-gray-600">
      {/* SINGLE SCROLL CONTAINER */}
      <div className="overflow-auto no-scrollbar  table-scroll">
        {/* Inner wrapper */}
        <div className="min-w-[1050px] lg:min-w-full">
          {/* Header */}
          <div
            className="text-[0.7rem] font-semibold text-white 
        bg-[#8629DF] py-2 px-4 rounded-t-md"
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
            <div className="">Edit</div>
            <div className="">Delete</div>
          </div>

          {/* Body */}
          {taxData.map((tax, index) => (
            <div
              key={index}
              className="text-[0.7rem] py-2 px-3 border-b hover:bg-gray-100"
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
                <Pencil className="h-4 w-4 text-center " />
              </div>
              <div className="text-center">
                <Trash2 className="h-4 w-4 text-center text-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IncomeTaxConfiguration = () => {
  const [activeTab, setActiveTab] = useState("itc");
  const [formData, setFormData] = useState({
    // Tax Configuration
    " Start Financial Year": "",
    " End Financial Year": "",
    "Surcharge(%)": "10.00",
    " Education Cess Charge(%)": "4.00",
    " Surcharge Qualifying Amount": "500000000.00",
    " TDS-Consultant(%)": "2400.00",
    "  Deduct TDS in higher slab (if PAN is available)": "No",
    "  Deduct TDS Proportionate": "No",
    "  Do Not Deduct Hold Employee TDS": "No",
    "  Generate ETDS Company Wise (Unit Name)": "No",
    "Default Tax Deduction Regime ": "New Tax Regime",
    " Add the tax deducted on Perq. with tax challan": "No",
    " Deduct Tax in case of Negative Net Salary Also ": "No",
    "Project Car Prequisite": "No",

    // Investment Configuration
    " Default Status for Chapter VI-A": "let the user choose ",
    " Tax Based on confirm Docs ": "Dec 2025 ",
    " PAN mandatory on investment declarations ": "No",
    " Max investment Declaration Request ": "",

    // Tax Rebate Configuration
    " Max Credit Limit (old Regime)": "1200000.00",
    " Max Tax Credit Limit (New Regime)": "600000.00",
    "  Tax Credit Amount Old Regime": "",
    "  Tax Credit Amount New Regime": "",
    " Old Regime Standard Deduction": "50000.00",
    " New Regime Standard Deduction": "750000.00",
    " Super Senior Citizen Age": "2400.00",
    "  Senior Citizen Age": "2400.00",
    " Arrear TDS in Pay Month": "Both",

    // Exemption Details
    " Max Children for Education Allowance": "2",
    " LandLord PAN Rent Limit": "10000.00",
    " Max Children for School Allowance": "2400.00",
    " Max Children for Hostel Allowance": "7200.00",
    " Do Not Deduct Hold Employee on TDS": "No",
    " Generate ETDS Company Wise (Unit Name)": "No",
    " Chapter VI-A Approval": "Admin",
    " Housing Loan Intrest Exemption Limit": "20000.00",
    " CLA Exemption Calculation": "Prorate with Paid Days",
    " HRA Exemption Calculation": "Actual rent Paid Amount",
    " Gratuity Exemption Limit": "200000.00",
    " Consultant Tax  Exemption Limit": "200000.00",

    // Tax Slab (if needed in this tab)
    " Higher Tax Slab": "No",
    " Lower Limit": "",
    " Upper Limit": "",
    " Tax Percent": "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tabs = [
    { label: "Income Tax Configuration", value: "itc" },
    { label: "Income Tax Slab ", value: "its" },
  ];

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
                    name={" Start Financial Year"}
                    label={"Start Financial Year"}
                    value={formData[" Start Financial Year"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" End Financial Year"}
                    label={"End Financial Year"}
                    value={formData[" End Financial Year"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name="Surcharge(%)"
                    label={"Surcharge(%)"}
                    value={formData["Surcharge(%)"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Education Cess Charge(%)"}
                    label={"Education Cess Charge(%)"}
                    value={formData[" Education Cess Charge(%)"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Surcharge Qualifying Amount"}
                    label={"Surcharge Qualifying Amount"}
                    value={formData[" Surcharge Qualifying Amount"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" TDS-Consultant(%)"}
                    label={"TDS-Consultant(%)"}
                    value={formData[" TDS-Consultant(%)"]}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={"  Deduct TDS in higher slab (if PAN is available)"}
                    label={" Deduct TDS in higher slab (if PAN is available)"}
                    info={"Deduct TDS in higher slab (if PAN is available)"}
                    value={
                      formData[
                        "  Deduct TDS in higher slab (if PAN is available)"
                      ]
                    }
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={"  Deduct TDS Proportionate"}
                    label={" Deduct TDS Proportionate"}
                    info={"Deduct TDS proportionate "}
                    value={formData["  Deduct TDS Proportionate"]}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={"  Do Not Deduct Hold Employee TDS"}
                    label={" Do Not Deduct Hold Employee TDS"}
                    info={"Do Not Deduct Hold Employee TDS "}
                    value={formData["  Do Not Deduct Hold Employee TDS"]}
                    onChange={handleChange}
                  />

                  <ToggleField
                    name={"  Generate ETDS Company Wise (Unit Name)"}
                    label={" Generate ETDS Company Wise (Unit Name)"}
                    info={"Generate ETDS Company Wise (Unit Name) "}
                    value={formData["  Generate ETDS Company Wise (Unit Name)"]}
                    onChange={handleChange}
                  />
                  <SelectField
                    label="Default Tax Deduction Regime"
                    name="Default Tax Deduction Regime "
                    value={formData["Default Tax Deduction Regime "]}
                    onChange={handleChange}
                    options={[{ value: "New Tax Regime", label: "New Tax Regime" }]}
                  />
                  <ToggleField
                    name={" Add the tax deducted on Perq. with tax challan"}
                    label={"Add the tax deducted on Perq. with tax challan"}
                    info={"Add the tax deducted on Perq. with tax challan"}
                    value={
                      formData[" Add the tax deducted on Perq. with tax challan"]
                    }
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={" Deduct Tax in case of Negative Net Salary Also "}
                    label={"Deduct Tax in case of Negative Net Salary Also "}
                    info={"Deduct Tax in case of Negative Net Salary Also "}
                    value={
                      formData[
                        " Deduct Tax in case of Negative Net Salary Also "
                      ]
                    }
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={"Project Car Prequisite"}
                    label={"Project Car Prequisite"}
                    info={"Project Car Prequisite"}
                    value={formData["Project Car Prequisite"]}
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
                    name={" Default Status for Chapter VI-A"}
                    label={"Default Status for Chapter VI-A"}
                    info={"Default Status for Chapter VI-A"}
                    value={formData[" Default Status for Chapter VI-A"]}
                    onChange={handleChange}
                    options={[
                      {
                        value: "let the user choose ",
                        label: "let the user choose ",
                      },
                    ]}
                  />
                  <SelectField
                    name={" Tax Based on confirm Docs "}
                    label={"Tax Based on confirm Docs "}
                    info={"Tax Based on confirm Docs "}
                    value={formData[" Tax Based on confirm Docs "]}
                    onChange={handleChange}
                    options={[{ value: "Dec 2025 ", label: "Dec 2025 " }]}
                  />
                  <ToggleField
                    name={" PAN mandatory on investment declarations "}
                    label={"PAN mandatory on investment declarations "}
                    info={["PAN mandatory on investment declarations "]}
                    value={
                      formData[" PAN mandatory on investment declarations "]
                    }
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Max investment Declaration Request "}
                    label={"Max investment Declaration Request "}
                    value={formData[" Max investment Declaration Request "]}
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
                    name={" Max Credit Limit (old Regime)"}
                    label={"Max Credit Limit (old Regime)"}
                    value={formData[" Max Credit Limit (old Regime)"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Max Tax Credit Limit (New Regime)"}
                    label={"Max Tax Credit Limit (New Regime)"}
                    value={formData[" Max Tax Credit Limit (New Regime)"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name="  Tax Credit Amount Old Regime"
                    label={"Tax Credit Amount Old Regime"}
                    value={formData["  Tax Credit Amount Old Regime"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name="  Tax Credit Amount New Regime"
                    label={"Tax Credit Amount New Regime"}
                    value={formData["  Tax Credit Amount New Regime"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Old Regime Standard Deduction"}
                    label={"Old Regime Standard Deduction"}
                    value={formData[" Old Regime Standard Deduction"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" New Regime Standard Deduction"}
                    label={"New Regime Standard Deduction"}
                    value={formData[" New Regime Standard Deduction"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Super Senior Citizen Age"}
                    label={"Super Senior Citizen Age"}
                    value={formData[" Super Senior Citizen Age"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={"  Senior Citizen Age"}
                    label={" Senior Citizen Age"}
                    value={formData["  Senior Citizen Age"]}
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
                        onStyleOpen={{
                          width: "200px",
                        }}
                      />
                      <DatePickerField
                        onStyleOpen={{
                          width: "200px",
                        }}
                      />
                    </div>
                  </div>
                  <SelectField
                    name={" Arrear TDS in Pay Month"}
                    label={"Arrear TDS in Pay Month"}
                    info={" Arrear TDS in Pay Month"}
                    value={formData[" Arrear TDS in Pay Month"]}
                    onChange={handleChange}
                    options={[{ label: "Both", value: "Both" }]}
                  />
                </div>
              </div>

              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-3">
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
                  Exemption Details
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField
                    name={" Max Children for Education Allowance"}
                    label={"Max Children for Education Allowance"}
                    value={formData[" Max Children for Education Allowance"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" LandLord PAN Rent Limit"}
                    label={"LandLord PAN Rent Limit"}
                    value={formData[" LandLord PAN Rent Limit"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Max Children for School Allowance"}
                    label={"Max Children for School Allowance"}
                    value={formData[" Max Children for School Allowance"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Max Children for Hostel Allowance"}
                    label={"Max Children for Hostel Allowance"}
                    value={formData[" Max Children for Hostel Allowance"]}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={" Do Not Deduct Hold Employee on TDS"}
                    label={"Do Not Deduct Hold Employee on TDS"}
                    info={"Do Not Deduct Hold Employee on TDS"}
                    value={formData[" Do Not Deduct Hold Employee on TDS"]}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={" Generate ETDS Company Wise (Unit Name)"}
                    label={"Generate ETDS Company Wise (Unit Name)"}
                    info={"Generate ETDS Company Wise (Unit Name)"}
                    value={formData[" Generate ETDS Company Wise (Unit Name)"]}
                    onChange={handleChange}
                  />
                  <SelectField
                    name={" Chapter VI-A Approval"}
                    label={"Chapter VI-A Approval"}
                    info={"Chapter VI-A Approval"}
                    value={formData[" Chapter VI-A Approval"]}
                    onChange={handleChange}
                    options={[{ label: "Admin", value: "Admin" }]}
                  />
                  <InputField
                    name={" Housing Loan Intrest Exemption Limit"}
                    label={"Housing Loan Intrest Exemption Limit"}
                    value={formData[" Housing Loan Intrest Exemption Limit"]}
                    onChange={handleChange}
                  />

                  <SelectField
                    name={" CLA Exemption Calculation"}
                    label={"CLA Exemption Calculation"}
                    info={"CLA Exemption Calculation"}
                    value={formData[" CLA Exemption Calculation"]}
                    onChange={handleChange}
                    options={[
                      {
                        label: "Prorate with Paid Days",
                        value: "Prorate with Paid Days",
                      },
                    ]}
                  />
                  <SelectField
                    name={" HRA Exemption Calculation"}
                    label={"HRA Exemption Calculation"}
                    info={"HRA Exemption Calculation"}
                    value={formData[" HRA Exemption Calculation"]}
                    onChange={handleChange}
                    options={[
                      {
                        label: "Actual rent Paid Amount",
                        value: "Actual rent Paid Amount",
                      },
                    ]}
                  />
                  <InputField
                    name={" Gratuity Exemption Limit"}
                    label={"Gratuity Exemption Limit"}
                    value={formData[" Gratuity Exemption Limit"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={" Consultant Tax  Exemption Limit"}
                    label={"Consultant Tax  Exemption Limit"}
                    info={"Consultant Tax  Exemption Limit"}
                    value={formData[" Consultant Tax  Exemption Limit"]}
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
                  name={"  Start Financial Year "}
                  label={" Start Financial Year "}
                />
                <DatePickerField
                  name={"  End Financial Year "}
                  label={" End Financial Year "}
                />
                <SelectField
                  name={"Tax Regime"}
                  label={"Tax Regime"}
                  options={[{ label: "Select Regime", value: "Select Regime" }]}
                />
                <SelectField
                  name={"Slab Type"}
                  label={"Slab Type"}
                  options={[
                    { label: "Select Slab Type", value: "Select Slab Type" },
                  ]}
                />{" "}
                <InputField
                  name={" Lower Limit"}
                  label={"Lower Limit"}
                  value={formData[" Lower Limit"]}
                  onChange={handleChange}
                />
                <InputField
                  name={" Upper Limit"}
                  label={"Upper Limit"}
                  value={formData[" Upper Limit"]}
                  onChange={handleChange}
                />
                <InputField
                  name={" Tax Percent"}
                  label={"Tax Percent"}
                  value={formData[" Tax Percent"]}
                  onChange={handleChange}
                />
                <ToggleField
                  name={" Higher Tax Slab"}
                  label={" Higher Tax Slab"}
                  info={" Higher Tax Slab"}
                  value={formData[" Higher Tax Slab"]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="
    flex flex-row sm:flex-row 
    justify-end 
    w-full 
    gap-2 
    mt-3
  "
      >
        <button
          className="
      bg-white dark:bg-[#E4E6EB]/10
      border border-[#8629DF]
      text-[#8629DF]
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
        >
          Reset
        </button>
        <button
          className="
      bg-white dark:bg-[#E4E6EB]/10
      border border-[#8629DF]
      text-[#8629DF]
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
        >
          Log Report
        </button>

        <button
          className="
      bg-[#8629DF]
      text-white
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
        >
          Update
        </button>
      </div>
      <div className="p-6">
        <TaxConfigurationTable taxData={data} />
      </div>

      <TransactionHistory />
    </div>
  );
};

export default IncomeTaxConfiguration;
