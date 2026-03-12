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
                  />
                  <InputField
                    name={" End Financial Year"}
                    label={"End Financial Year"}
                  />
                  <InputField
                    name="Surcharge(%)"
                    label={"Surcharge(%)"}
                    value={"10.00"}
                  />
                  <InputField
                    name={" Education Cess Charge(%)"}
                    label={"Education Cess Charge(%)"}
                    value={"4.00"}
                  />
                  <InputField
                    name={" Surcharge Qualifying Amount"}
                    label={"Surcharge Qualifying Amount"}
                    value={"500000000.00"}
                  />
                  <InputField
                    name={" TDS-Consultant(%)"}
                    label={"TDS-Consultant(%)"}
                    value={"2400.00"}
                  />
                  <ToggleField
                    name={"  Deduct TDS in higher slab (if PAN is available)"}
                    label={" Deduct TDS in higher slab (if PAN is available)"}
                    info={"Deduct TDS in higher slab (if PAN is available)"}
                  />
                  <ToggleField
                    name={"  Deduct TDS Proportionate"}
                    label={" Deduct TDS Proportionate"}
                    info={"Deduct TDS proportionate "}
                  />
                  <ToggleField
                    name={"  Do Not Deduct Hold Employee TDS"}
                    label={" Do Not Deduct Hold Employee TDS"}
                    info={"Do Not Deduct Hold Employee TDS "}
                  />

                  <ToggleField
                    name={"  Generate ETDS Company Wise (Unit Name)"}
                    label={" Generate ETDS Company Wise (Unit Name)"}
                    info={"Generate ETDS Company Wise (Unit Name) "}
                  />
                  <SelectField
                    label="Default Tax Deduction Regime"
                    name="Default Tax Deduction Regime "
                    options={[{ value: "", label: "New Tax Regime" }]}
                  />
                  <ToggleField
                    name={" Add the tax deducted on Perq. with tax challan"}
                    label={"Add the tax deducted on Perq. with tax challan"}
                    info={"Add the tax deducted on Perq. with tax challan"}
                  />
                  <ToggleField
                    name={" Deduct Tax in case of Negative Net Salary Also "}
                    label={"Deduct Tax in case of Negative Net Salary Also "}
                    info={"Deduct Tax in case of Negative Net Salary Also "}
                  />
                  <ToggleField
                    name={"Project Car Prequisite"}
                    label={"Project Car Prequisite"}
                    info={"Project Car Prequisite"}
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
                    options={[{ value: "Dec 2025 ", label: "Dec 2025 " }]}
                  />
                  <ToggleField
                    name={" PAN mandatory on investment declarations "}
                    label={"PAN mandatory on investment declarations "}
                    info={["PAN mandatory on investment declarations "]}
                  />
                  <InputField
                    name={" Max investment Declaration Request "}
                    label={"Max investment Declaration Request "}
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
                    value={"1200000.00"}
                  />
                  <InputField
                    name={" Max Tax Credit Limit (New Regime)"}
                    label={"Max Tax Credit Limit (New Regime)"}
                    value={"600000.00"}
                  />
                  <InputField
                    name="  Tax Credit Amount Old Regime"
                    label={"Tax Credit Amount Old Regime"}
                  />
                  <InputField
                    name="  Tax Credit Amount New Regime"
                    label={"Tax Credit Amount New Regime"}
                  />
                  <InputField
                    name={" Old Regime Standard Deduction"}
                    label={"Old Regime Standard Deduction"}
                    value={"50000.00"}
                  />
                  <InputField
                    name={" New Regime Standard Deduction"}
                    label={"New Regime Standard Deduction"}
                    value={"750000.00"}
                  />
                  <InputField
                    name={" Super Senior Citizen Age"}
                    label={"Super Senior Citizen Age"}
                    value={"2400.00"}
                  />
                  <InputField
                    name={"  Senior Citizen Age"}
                    label={" Senior Citizen Age"}
                    value={"2400.00"}
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
                    options={[{ name: "Both", value: "Both" }]}
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
                    value={"2"}
                  />
                  <InputField
                    name={" LandLord PAN Rent Limit"}
                    label={"LandLord PAN Rent Limit"}
                    value={"10000.00"}
                  />
                  <InputField
                    name={" Max Children for School Allowance"}
                    label={"Max Children for School Allowance"}
                    value={"2400.00"}
                  />
                  <InputField
                    name={" Max Children for Hostel Allowance"}
                    label={"Max Children for Hostel Allowance"}
                    value={"7200.00"}
                  />
                  <ToggleField
                    name={" Do Not Deduct Hold Employee on TDS"}
                    label={"Do Not Deduct Hold Employee on TDS"}
                    info={"Do Not Deduct Hold Employee on TDS"}
                  />
                  <ToggleField
                    name={" Generate ETDS Company Wise (Unit Name)"}
                    label={"Generate ETDS Company Wise (Unit Name)"}
                    info={"Generate ETDS Company Wise (Unit Name)"}
                  />
                  <SelectField
                    name={" Chapter VI-A Approval"}
                    label={"Chapter VI-A Approval"}
                    info={"Chapter VI-A Approval"}
                    options={[{ name: "Admin", value: "Admin" }]}
                  />
                  <InputField
                    name={" Housing Loan Intrest Exemption Limit"}
                    label={"Housing Loan Intrest Exemption Limit"}
                    value={"20000.00"}
                  />

                  <SelectField
                    name={" CLA Exemption Calculation"}
                    label={"CLA Exemption Calculation"}
                    info={"CLA Exemption Calculation"}
                    options={[
                      {
                        name: "Prorate with Paid Days",
                        value: "Prorate with Paid Days",
                      },
                    ]}
                  />
                  <SelectField
                    name={" HRA Exemption Calculation"}
                    label={"HRA Exemption Calculation"}
                    info={"HRA Exemption Calculation"}
                    options={[
                      {
                        name: "Actual rent Paid Amount",
                        value: "Actual rent Paid Amount",
                      },
                    ]}
                  />
                  <InputField
                    name={" Gratuity Exemption Limit"}
                    label={"Gratuity Exemption Limit"}
                    value={"200000.00"}
                  />
                  <InputField
                    name={" Consultant Tax  Exemption Limit"}
                    label={"Consultant Tax  Exemption Limit"}
                    info={"Consultant Tax  Exemption Limit"}
                    value={"200000.00"}
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
                <InputField name={" Lower Limit"} label={"Lower Limit"} />
                <InputField name={" Upper Limit"} label={"Upper Limit"} />
                <InputField name={" Tax Percent"} label={"Tax Percent"} />
                <ToggleField
                  name={" Higher Tax Slab"}
                  label={" Higher Tax Slab"}
                  info={" Higher Tax Slab"}
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
