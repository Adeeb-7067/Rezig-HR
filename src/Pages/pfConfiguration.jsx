import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import Tabs from "@/components/Tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "postcss";

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
const pfConfiguration = () => {
  const [activeTab, setActiveTab] = useState("pf");

  const tabs = [
    { label: "PF Configuration", value: "pf" },
    { label: "ESI Configuration", value: "esi" },
    { label: "PT Configuration", value: "pt" },
    { label: "LWF Configuration", value: "lwf" },
  ];
  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "pf" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                  <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                    PF Configuration
                  </h1>

                  <div className="grid  grid-cols-1 md:grid-cols-2 gap-2">
                    <InputField
                      label={"Organization Name"}
                      name={"Organization Name"}
                      placeHolder="Rezig Demo India Pvt Ltd"
                    />
                    <InputField
                      label={"Responsible Person"}
                      name={"Responsible Person"}
                      placeHolder="Enter"
                    />
                    <InputField
                      label={"Organization Address-1"}
                      name={"Organization Address-1"}
                    />
                    <InputField
                      label={"Organization Address-2"}
                      name={"Organization Address-2"}
                    />
                    <InputField
                      label={"Organization Address-3"}
                      name={"Organization Address-3"}
                    />
                    <InputField
                      label={"Organization Phone No."}
                      name={"Organization Phone No."}
                    />
                  </div>
                </div>
                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                  <h1 className="text-xl font-semibold  mb-1 text-gray-500 ">
                    Account
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputField
                      name={"PF Share (%)"}
                      label={"PF Share (%)"}
                      value={"12.00"}
                    />
                    <InputField
                      name={"Ac-10 Share (%)"}
                      label={"Ac-10 Share (%)"}
                      value={"8.33"}
                    />
                    <InputField
                      name={"Ac-2  (%)"}
                      label={"Ac-2  (%)"}
                      value={"0.50"}
                    />
                    <InputField
                      name={"Ac-21  (%)"}
                      label={"Ac-21  (%)"}
                      value={"0.50"}
                    />
                    <InputField
                      name={"Ac-21  (%)"}
                      label={"Ac-21  (%)"}
                      value={"0.000"}
                    />
                    <SelectField
                      label="Admin Charges(AC-21)"
                      name="Admin Charges(AC-21)"
                      options={[
                        { value: "", label: "Select Admin Charges" },
                        { value: "Pension Wages", label: "Pension Wages" },
                      ]}
                    />
                    <SelectField
                      label="Admin Charges(Account22)"
                      name="Admin Charges(Account22)"
                      options={[
                        { value: "", label: "Select Admin Charges" },
                        { value: "Pension Wages", label: "Pension Wages" },
                      ]}
                    />
                    <SelectField
                      label="Admin Charges(AC-21)"
                      name="Admin Charges(AC-21)"
                      options={[
                        { value: "", label: "Select Admin Charges" },
                        { value: "Pension Wages", label: "Pension Wages" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ToggleField
                      label={"PF Applicable"}
                      name={"PF Applicable"}
                    />

                    <InputField
                      name={"PF Limit"}
                      label={"PF Limit"}
                      value={"15000.00"}
                    />
                    <SelectField
                      label="PF Rounding "
                      name="PF Rounding "
                      options={[
                        { value: "", label: "Select PF Rounding" },
                        { value: "Nearest Rupee", label: "Nearest Rupee" },
                      ]}
                    />
                    <ToggleField
                      name={"Porate PF Limmit"}
                      label={"Porate PF Limit "}
                    />
                  </div>
                </div>

                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ToggleField
                      info={"this is Pf on overtime feild "}
                      name={"PF on Overtime"}
                      label={"PF on Overtime"}
                    />
                    <InputField
                      name={"Organization PF Number"}
                      label={"Organization PF Number"}
                    />
                    <ToggleField
                      name={"VPF Applicable"}
                      label={"VPF Applicable"}
                    />
                    <ToggleField
                      info={"Calculate VPF on Actual Basic Earning (No Limit) "}
                      name={"Calculate VPF on Actual Basic Earning (No Limit)"}
                      label={"Calculate VPF on Actual Basic Earning (No Limit)"}
                    />
                    <SelectField
                      label="Deduct PF on Arrears "
                      name=" Deduct PF on Arrears "
                      info=" Deduct PF on Arrears "
                      options={[{ value: "", label: "All" }]}
                    />
                    <SelectField
                      label="Estabilishment "
                      name=" Estabilishment "
                      info=" Estabilishment "
                      options={[{ value: "", label: "Non-Exempted" }]}
                    />
                    <ToggleField
                      name={"Deduct PF on Arrears"}
                      label={"Deduct PF on Arrears"}
                    />
                    <ToggleField
                      info={"Show Employees whose PF is zero on Reports "}
                      name={"Show Employees whose PF is zero on Reports"}
                      label={"Show Employees whose PF is zero on Reports"}
                    />
                    <ToggleField
                      info={"Show hold employees on PF Reports "}
                      name={"Show hold employees on PF Reports"}
                      label={"Show hold employees on PF Reports"}
                    />
                    <SelectField
                      label="Recover Negative PF on FNF "
                      name=" Recover Negative PF on FNF "
                      options={[{ value: "", label: "PF Recovery" }]}
                    />
                    <SelectField
                      label="VPF Rounding "
                      name=" VPF Rounding "
                      info=" VPF Rounding "
                      options={[{ value: "", label: "50 Paise" }]}
                    />
                    <ToggleField
                      info={"Allow Negative PF"}
                      name={"Allow Negative PF"}
                      label={"Allow Negative PF"}
                    />
                    <ToggleField
                      info={"Separate PF Rounding on Salary and Arrear"}
                      name={"Separate PF Rounding on Salary and Arrear"}
                      label={"Separate PF Rounding on Salary and Arrear"}
                    />
                    <InputField
                      name={"Pension Limit"}
                      label={"Pension Limit"}
                      value={"15000.00"}
                    />
                    <ToggleField
                      name={"Pension Proportionately"}
                      label={"Pension Proportionately"}
                    />
                    <ToggleField
                      name={"PF on Selected Payhead Only"}
                      label={"PF on Selected Payhead Only"}
                      info={"PF on Selected Payhead Only"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "esi" && (
          <div>
            <div className="">
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  ESI Configuration
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-5 my-3">
                    <ToggleField
                      name={"ESI Applicable"}
                      label={"ESI Applicable"}
                    />

                    <ToggleField
                      name={"ESI on Overtime"}
                      label={"ESI on Overtime"}
                      info={"ESI on Overtime"}
                    />

                    <InputField
                      name={"ESI Limit"}
                      label={"ESI Limit"}
                      value={"21000.00"}
                    />

                    <ToggleField
                      name={"Deduct ESI on Salary + Arrear Gross"}
                      label={"Deduct ESI on Salary + Arrear Gross"}
                    />
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-3">
                    <InputField
                      name={"Organization ESI Number"}
                      label={"Organization ESI Number"}
                      value={"20001105140001000"}
                    />

                    <SelectField
                      label="ESI on Arrears"
                      name="ESI on Arrears"
                      options={[{ value: "", label: "All" }]}
                    />

                    <SelectField
                      label="ESI Rounding"
                      name="ESI Rounding"
                      options={[{ value: "", label: "Higher Rupee" }]}
                    />

                    <SelectField
                      label="Negative ESI recovery on FNF"
                      name="Negative ESI recovery on FNF"
                      options={[{ value: "", label: "All" }]}
                    />
                  </div>

                  {/* Column 3 */}
                  <div className="flex flex-col gap-5">
                    <InputField
                      name={"ESI Local Office"}
                      label={"ESI Local Office"}
                      value={"20001105140001000"}
                    />

                    <ToggleField
                      name={"Sepearte ESI rounding on Arrears"}
                      label={"Sepearte ESI rounding on Arrears"}
                    />

                    <InputField
                      name={"Employee ESI Share (%)"}
                      label={"Employee ESI Share (%)"}
                      value={"0.75"}
                      disabled
                      className="disabled:bg-gray-300"
                    />

                    <ToggleField
                      name={"Deduct ESI on ESI Limit"}
                      label={"Deduct ESI on ESI Limit"}
                    />
                  </div>

                  {/* Column 4 */}
                  <div className="flex flex-col gap-6 my-1">
                    <ToggleField
                      label={"Deposit Hold Employees ESI"}
                      name={"Deposit Hold Employees ESI"}
                    />

                    <SelectField
                      label="Round ESI Employer Share"
                      name="Round ESI Employer Share"
                      options={[{ value: "", label: "None" }]}
                    />

                    <InputField
                      name={"Employer ESI Share(%)"}
                      label={"Employer ESI Share(%)"}
                      value={"3.25"}
                    />

                    <ToggleField
                      name={"Seprate ESI on OT"}
                      label={"Seprate ESI on OT"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "pt" && (
          <div>
            <div>
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  Professional Tax (PT) Configuration
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ToggleField name={"PT Applicable"} label={"PT Applicable"} />
                  <InputField
                    name={"PT Certificate Number"}
                    label={"PT Certificate Number"}
                  />
                  <ToggleField
                    name={"PT on Overtime "}
                    label={"PT on Overtime"}
                  />
                  <ToggleField
                    name={"Deposit Hold Employees PT"}
                    label={"Deposit Hold Employees PT"}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <SelectField
                    label="Deduct PT on Arrear"
                    name="Deduct PT on Arrear"
                    options={[
                      { value: "", label: "PT (Salary + Arrear) on Salary" },
                    ]}
                  />

                  <div className="col-span-3 w-fit my-3">
                    <ToggleField
                      name={
                        "Deduct PT Monthly on Half Yearly / Yearly slabs as per YTD Income :"
                      }
                      label={
                        "Deduct PT Monthly on Half Yearly / Yearly slabs as per YTD Income :"
                      }
                    />
                  </div>
                </div> 
              </div>
            </div>
          </div>
        )}
        {activeTab === "lwf" && (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
            <h1 className="text-xl font-semibold  mb-1 text-gray-500">
              Labour Welfare Fund (LWF) Configuration
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SelectField
                label=" LWF deduction on the basis of "
                name="  LWF deduction on the basis of "
                options={[{ value: "", label: "Rate" }]}
              />
              <SelectField
                label=" Deduct LWF on Arrear"
                name="  Deduct LWF on Arrear"
                options={[{ value: "", label: "Do no Deduct LWF on Arrear" }]}
              />
              <ToggleField
                name={"Deduct LWF on FNF"}
                label={"Deduct LWF on FNF"}
                className="my-3"
              />
              <ToggleField
                name={"Deduct LWF on Zero Attendance"}
                label={"Deduct LWF on Zero Attendance"}
                className="my-3"
              />
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default pfConfiguration;
