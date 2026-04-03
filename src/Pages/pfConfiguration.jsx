import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import Tabs from "@/components/Tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ToggleField from "@/components/ui/VariableTypeRow";
// const ToggleField = ({
//   label,
//   name,
//   value,
//   onChange,
//   className = "",
//   info = null,
// }) => {
//   const [showTooltip, setShowTooltip] = useState(false);
//   const iconRef = useRef(null);
//   const tooltipRef = useRef(null);

//   // Position tooltip when shown
//   useEffect(() => {
//     if (showTooltip && iconRef.current && tooltipRef.current) {
//       const iconRect = iconRef.current.getBoundingClientRect();
//       const tooltipRect = tooltipRef.current.getBoundingClientRect();
//       const scrollTop =
//         window.pageYOffset || document.documentElement.scrollTop;
//       const scrollLeft =
//         window.pageXOffset || document.documentElement.scrollLeft;

//       const top = iconRect.top + scrollTop - tooltipRect.height - 8;
//       const left =
//         iconRect.left + scrollLeft + iconRect.width / 2 - tooltipRect.width / 2;

//       tooltipRef.current.style.top = `${Math.max(4, top)}px`;
//       tooltipRef.current.style.left = `${Math.max(4, left)}px`;
//     }
//   }, [showTooltip]);

//   return (
//     <div
//       className={`flex items-center justify-between gap-3 mr-4 py-2 ${className}`}
//     >
//       <div className="flex items-center gap-1">
//         {info && (
//           <div className="relative">
//             <Info
//               ref={iconRef}
//               size={12}
//               className="ds-text-primary cursor-help"
//               onMouseEnter={() => setShowTooltip(true)}
//               onMouseLeave={() => setShowTooltip(false)}
//             />
//             {showTooltip && (
//               <div
//                 ref={tooltipRef}
//                 className="fixed z-[99999] w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg"
//                 style={{
//                   transform: "translateX(0)",
//                 }}
//               >
//                 {info}
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
//               </div>
//             )}
//           </div>
//         )}
//         <Label
//           htmlFor={name}
//           className="text-gray-500 dark:text-gray-50 ds-text-xs font-semibold"
//         >
//           {label}
//         </Label>
//       </div>
//       <Switch
//         id={name}
//         checked={value === "Yes"}
//         onCheckedChange={(checked) =>
//           onChange({
//             target: { name, value: checked ? "Yes" : "No" },
//           })
//         }
//         className="data-[state=checked]:bg-ds-primary data-[state=unchecked]:bg-gray-300"
//       />
//     </div>
//   );
// };

const initialFormData = {
  // PF Configuration
  "Organization Name": "Rezig Demo India Pvt Ltd",
  "Responsible Person": "",
  "Organization Address-1": "",
  "Organization Address-2": "",
  "Organization Address-3": "",
  "Organization Phone No.": "",
  "PF Share (%)": "12.00",
  "Ac-10 Share (%)": "8.33",
  "Ac-2 (%)": "0.50",
  "Ac-21 (%)": "0.50",
  "Admin Charges(AC-21)": "Pension Wages",
  "Admin Charges(Account22)": "Pension Wages",
  "PF Applicable": "Yes",
  "PF Limit": "15000.00",
  "PF Rounding": "Nearest Rupee",
  "Porate PF Limmit": "No",
  "PF on Overtime": "No",
  "Organization PF Number": "",
  "VPF Applicable": "No",
  "Calculate VPF on Actual Basic Earning (No Limit)": "No",
  "Deduct PF on Arrears": "No",
  "Show Employees whose PF is zero on Reports": "No",
  "Show hold employees on PF Reports": "No",
  "Recover Negative PF on FNF": "PF Recovery",
  "VPF Rounding": "50 Paise",
  "Allow Negative PF": "No",
  "Separate PF Rounding on Salary and Arrear": "No",
  "Pension Limit": "15000.00",
  "Pension Proportionately": "No",
  "PF on Selected Payhead Only": "No",
  "Deduct PF on Arrears Select": "All",
  "Estabilishment": "Non-Exempted",

  // ESI Configuration
  "ESI Applicable": "Yes",
  "ESI on Overtime": "No",
  "ESI Limit": "21000.00",
  "Deduct ESI on Salary + Arrear Gross": "No",
  "Organization ESI Number": "20001105140001000",
  "ESI on Arrears": "All",
  "ESI Rounding": "Higher Rupee",
  "Negative ESI recovery on FNF": "All",
  "ESI Local Office": "20001105140001000",
  "Sepearte ESI rounding on Arrears": "No",
  "Employee ESI Share (%)": "0.75",
  "Deduct ESI on ESI Limit": "No",
  "Deposit Hold Employees ESI": "No",
  "Round ESI Employer Share": "None",
  "Employer ESI Share(%)": "3.25",
  "Seprate ESI on OT": "No",

  // PT Configuration
  "PT Applicable": "Yes",
  "PT Certificate Number": "",
  "PT on Overtime": "No",
  "Deposit Hold Employees PT": "No",
  "Deduct PT on Arrear": "PT (Salary + Arrear) on Salary",
  "Deduct PT Monthly on Half Yearly / Yearly slabs as per YTD Income": "No",

  // LWF Configuration
  "LWF deduction on the basis of": "Rate",
  "Deduct LWF on Arrear": "Do no Deduct LWF on Arrear",
  "Deduct LWF on FNF": "No",
  "Deduct LWF on Zero Attendance": "No",
};

const PfConfiguration = () => {
  const [activeTab, setActiveTab] = useState("pf");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleUpdate = () => {
    console.log("Updating configuration with data:", formData);
    // Add API call logic here
  };

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
                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2">
                  <h1 className="text-base font-semibold mb-1 text-gray-500">
                    PF Configuration
                  </h1>

                  <div className="grid  grid-cols-1 md:grid-cols-2 gap-2">
                    <InputField
                      label={"Organization Name"}
                      name={"Organization Name"}
                      value={formData["Organization Name"]}
                      onChange={handleChange}
                      placeHolder="Rezig Demo India Pvt Ltd"
                    />
                    <InputField
                      label={"Responsible Person"}
                      name={"Responsible Person"}
                      value={formData["Responsible Person"]}
                      onChange={handleChange}
                      placeHolder="Enter"
                    />
                    <InputField
                      label={"Organization Address-1"}
                      name={"Organization Address-1"}
                      value={formData["Organization Address-1"]}
                      onChange={handleChange}
                    />
                    <InputField
                      label={"Organization Address-2"}
                      name={"Organization Address-2"}
                      value={formData["Organization Address-2"]}
                      onChange={handleChange}
                    />
                    <InputField
                      label={"Organization Address-3"}
                      name={"Organization Address-3"}
                      value={formData["Organization Address-3"]}
                      onChange={handleChange}
                    />
                    <InputField
                      label={"Organization Phone No."}
                      name={"Organization Phone No."}
                      value={formData["Organization Phone No."]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2 mt-4">
                  <h1 className="text-base font-semibold mb-1 text-gray-500">
                    Account
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputField
                      name={"PF Share (%)"}
                      label={"PF Share (%)"}
                      value={formData["PF Share (%)"]}
                      onChange={handleChange}
                    />
                    <InputField
                      name={"Ac-10 Share (%)"}
                      label={"Ac-10 Share (%)"}
                      value={formData["Ac-10 Share (%)"]}
                      onChange={handleChange}
                    />
                    <InputField
                      name={"Ac-2 (%)"}
                      label={"Ac-2 (%)"}
                      value={formData["Ac-2 (%)"]}
                      onChange={handleChange}
                    />
                    <InputField
                      name={"Ac-21 (%)"}
                      label={"Ac-21 (%)"}
                      value={formData["Ac-21 (%)"]}
                      onChange={handleChange}
                    />
                    <InputField
                      name={"Ac-21 (%)"}
                      label={"Ac-21 (%)"}
                      value={formData["Ac-21 (%)"]}
                      onChange={handleChange}
                    />
                    <SelectField
                      label="Admin Charges(AC-21)"
                      name="Admin Charges(AC-21)"
                      value={formData["Admin Charges(AC-21)"]}
                      onChange={handleChange}
                      options={[
                        { value: "", label: "Select Admin Charges" },
                        { value: "Pension Wages", label: "Pension Wages" },
                      ]}
                    />
                    <SelectField
                      label="Admin Charges(Account22)"
                      name="Admin Charges(Account22)"
                      value={formData["Admin Charges(Account22)"]}
                      onChange={handleChange}
                      options={[
                        { value: "", label: "Select Admin Charges" },
                        { value: "Pension Wages", label: "Pension Wages" },
                      ]}
                    />
                    <SelectField
                      label="Admin Charges(AC-21)"
                      name="Admin Charges(AC-21)"
                      value={formData["Admin Charges(AC-21)"]}
                      onChange={handleChange}
                      options={[
                        { value: "", label: "Select Admin Charges" },
                        { value: "Pension Wages", label: "Pension Wages" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ToggleField
                      label={"PF Applicable"}
                      name={"PF Applicable"}
                      value={formData["PF Applicable"]}
                      onChange={handleChange}
                    />

                    <InputField
                      name={"PF Limit"}
                      label={"PF Limit"}
                      value={formData["PF Limit"]}
                      onChange={handleChange}
                    />
                    <SelectField
                      label="PF Rounding"
                      name="PF Rounding"
                      value={formData["PF Rounding"]}
                      onChange={handleChange}
                      options={[
                        { value: "", label: "Select PF Rounding" },
                        { value: "Nearest Rupee", label: "Nearest Rupee" },
                      ]}
                    />
                    <ToggleField
                      name={"Porate PF Limmit"}
                      label={"Porate PF Limit "}
                      value={formData["Porate PF Limmit"]}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <ToggleField
                      info={"this is Pf on overtime feild "}
                      name={"PF on Overtime"}
                      label={"PF on Overtime"}
                      value={formData["PF on Overtime"]}
                      onChange={handleChange}
                    />
                    <InputField
                      name={"Organization PF Number"}
                      label={"Organization PF Number"}
                      value={formData["Organization PF Number"]}
                      onChange={handleChange}
                    />
                    <ToggleField
                      name={"VPF Applicable"}
                      label={"VPF Applicable"}
                      value={formData["VPF Applicable"]}
                      onChange={handleChange}
                    />
                    <ToggleField
                      info={"Calculate VPF on Actual Basic Earning (No Limit) "}
                      name={"Calculate VPF on Actual Basic Earning (No Limit)"}
                      label={"Calculate VPF on Actual Basic Earning (No Limit)"}
                      value={
                        formData[
                        "Calculate VPF on Actual Basic Earning (No Limit)"
                        ]
                      }
                      onChange={handleChange}
                    />
                    <SelectField
                      label="Deduct PF on Arrears"
                      name="Deduct PF on Arrears Select"
                      value={formData["Deduct PF on Arrears Select"]}
                      onChange={handleChange}
                      info="Deduct PF on Arrears"
                      options={[{ value: "All", label: "All" }]}
                    />
                    <SelectField
                      label="Estabilishment"
                      name="Estabilishment"
                      value={formData["Estabilishment"]}
                      onChange={handleChange}
                      info="Estabilishment"
                      options={[{ value: "Non-Exempted", label: "Non-Exempted" }]}
                    />
                    <ToggleField
                      name={"Deduct PF on Arrears"}
                      label={"Deduct PF on Arrears"}
                      value={formData["Deduct PF on Arrears"]}
                      onChange={handleChange}
                    />
                    <ToggleField
                      info={"Show Employees whose PF is zero on Reports "}
                      name={"Show Employees whose PF is zero on Reports"}
                      label={"Show Employees whose PF is zero on Reports"}
                      value={
                        formData["Show Employees whose PF is zero on Reports"]
                      }
                      onChange={handleChange}
                    />
                    <ToggleField
                      info={"Show hold employees on PF Reports "}
                      name={"Show hold employees on PF Reports"}
                      label={"Show hold employees on PF Reports"}
                      value={formData["Show hold employees on PF Reports"]}
                      onChange={handleChange}
                    />
                    <SelectField
                      label="Recover Negative PF on FNF"
                      name="Recover Negative PF on FNF"
                      value={formData["Recover Negative PF on FNF"]}
                      onChange={handleChange}
                      options={[{ value: "PF Recovery", label: "PF Recovery" }]}
                    />
                    <SelectField
                      label="VPF Rounding"
                      name="VPF Rounding"
                      value={formData["VPF Rounding"]}
                      onChange={handleChange}
                      info="VPF Rounding"
                      options={[{ value: "50 Paise", label: "50 Paise" }]}
                    />
                    <ToggleField
                      info={"Allow Negative PF"}
                      name={"Allow Negative PF"}
                      label={"Allow Negative PF"}
                      value={formData["Allow Negative PF"]}
                      onChange={handleChange}
                    />
                    <ToggleField
                      info={"Separate PF Rounding on Salary and Arrear"}
                      name={"Separate PF Rounding on Salary and Arrear"}
                      label={"Separate PF Rounding on Salary and Arrear"}
                      value={
                        formData["Separate PF Rounding on Salary and Arrear"]
                      }
                      onChange={handleChange}
                    />
                    <InputField
                      name={"Pension Limit"}
                      label={"Pension Limit"}
                      value={formData["Pension Limit"]}
                      onChange={handleChange}
                    />
                    <ToggleField
                      name={"Pension Proportionately"}
                      label={"Pension Proportionately"}
                      value={formData["Pension Proportionately"]}
                      onChange={handleChange}
                    />
                    <ToggleField
                      name={"PF on Selected Payhead Only"}
                      label={"PF on Selected Payhead Only"}
                      info={"PF on Selected Payhead Only"}
                      value={formData["PF on Selected Payhead Only"]}
                      onChange={handleChange}
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
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2">
                <h1 className="text-base font-semibold mb-1 text-gray-500">
                  ESI Configuration
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {/* Column 1 */}
                  <div className="flex flex-col gap-5 my-3">
                    <ToggleField
                      name={"ESI Applicable"}
                      label={"ESI Applicable"}
                      value={formData["ESI Applicable"]}
                      onChange={handleChange}
                    />

                    <ToggleField
                      name={"ESI on Overtime"}
                      label={"ESI on Overtime"}
                      info={"ESI on Overtime"}
                      value={formData["ESI on Overtime"]}
                      onChange={handleChange}
                    />

                    <InputField
                      name={"ESI Limit"}
                      label={"ESI Limit"}
                      value={formData["ESI Limit"]}
                      onChange={handleChange}
                    />

                    <ToggleField
                      name={"Deduct ESI on Salary + Arrear Gross"}
                      label={"Deduct ESI on Salary + Arrear Gross"}
                      value={formData["Deduct ESI on Salary + Arrear Gross"]}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-3">
                    <InputField
                      name={"Organization ESI Number"}
                      label={"Organization ESI Number"}
                      value={formData["Organization ESI Number"]}
                      onChange={handleChange}
                    />

                    <SelectField
                      label="ESI on Arrears"
                      info="ESI on Arrears"
                      name="ESI on Arrears"
                      value={formData["ESI on Arrears"]}
                      onChange={handleChange}
                      options={[{ value: "All", label: "All" }]}
                    />

                    <SelectField
                      label="ESI Rounding"
                      name="ESI Rounding"
                      value={formData["ESI Rounding"]}
                      onChange={handleChange}
                      options={[{ value: "Higher Rupee", label: "Higher Rupee" }]}
                    />

                    <SelectField
                      label="Negative ESI recovery on FNF"
                      name="Negative ESI recovery on FNF"
                      value={formData["Negative ESI recovery on FNF"]}
                      onChange={handleChange}
                      options={[{ value: "All", label: "All" }]}
                    />
                  </div>

                  {/* Column 3 */}
                  <div className="flex flex-col gap-5">
                    <InputField
                      name={"ESI Local Office"}
                      label={"ESI Local Office"}
                      value={formData["ESI Local Office"]}
                      onChange={handleChange}
                    />

                    <ToggleField
                      name={"Sepearte ESI rounding on Arrears"}
                      info="Sepearte ESI rounding on Arrears"
                      label={"Sepearte ESI rounding on Arrears"}
                      value={formData["Sepearte ESI rounding on Arrears"]}
                      onChange={handleChange}
                    />

                    <InputField
                      name={"Employee ESI Share (%)"}
                      label={"Employee ESI Share (%)"}
                      value={formData["Employee ESI Share (%)"]}
                      onChange={handleChange}
                      disabled
                      className="disabled:bg-gray-300"
                    />

                    <ToggleField
                      name={"Deduct ESI on ESI Limit"}
                      info={'Deduct ESI on ESI Limit'}
                      label={"Deduct ESI on ESI Limit"}
                      value={formData["Deduct ESI on ESI Limit"]}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Column 4 */}
                  <div className="flex flex-col gap-6 my-1">
                    <ToggleField
                      label={"Deposit Hold Employees ESI"}
                      name={"Deposit Hold Employees ESI"}
                      value={formData["Deposit Hold Employees ESI"]}
                      onChange={handleChange}
                    />

                    <SelectField
                      label="Round ESI Employer Share"
                      info={'Round ESI Eployer share'}
                      name="Round ESI Employer Share"
                      value={formData["Round ESI Employer Share"]}
                      onChange={handleChange}
                      options={[{ value: "None", label: "None" }]}
                    />

                    <InputField
                      name={"Employer ESI Share(%)"}
                      label={"Employer ESI Share(%)"}
                      value={formData["Employer ESI Share(%)"]}
                      onChange={handleChange}
                    />

                    <ToggleField
                      name={"Seprate ESI on OT"}
                      label={"Seprate ESI on OT"}
                      value={formData["Seprate ESI on OT"]}
                      onChange={handleChange}
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
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2">
                <h1 className="text-base font-semibold mb-1 text-gray-500">
                  Professional Tax (PT) Configuration
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ToggleField
                    name={"PT Applicable"}
                    label={"PT Applicable"}
                    value={formData["PT Applicable"]}
                    onChange={handleChange}
                  />
                  <InputField
                    name={"PT Certificate Number"}
                    label={"PT Certificate Number"}
                    value={formData["PT Certificate Number"]}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={"PT on Overtime"}
                    label={"PT on Overtime"}
                    value={formData["PT on Overtime"]}
                    onChange={handleChange}
                  />
                  <ToggleField
                    name={"Deposit Hold Employees PT"}
                    label={"Deposit Hold Employees PT"}
                    value={formData["Deposit Hold Employees PT"]}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <SelectField
                    label="Deduct PT on Arrear"
                    name="Deduct PT on Arrear"
                    value={formData["Deduct PT on Arrear"]}
                    onChange={handleChange}
                    options={[
                      { value: "PT (Salary + Arrear) on Salary", label: "PT (Salary + Arrear) on Salary" },
                    ]}
                  />

                  <div className="col-span-3 w-fit my-3">
                    <ToggleField
                      name={"Deduct PT Monthly on Half Yearly / Yearly slabs as per YTD Income"}
                      label={"Deduct PT Monthly on Half Yearly / Yearly slabs as per YTD Income :"}
                      value={
                        formData[
                        "Deduct PT Monthly on Half Yearly / Yearly slabs as per YTD Income"
                        ]
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "lwf" && (
          <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-2 gap-2">
            <h1 className="text-base font-semibold mb-1 text-gray-500">
              Labour Welfare Fund (LWF) Configuration
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SelectField
                label="LWF deduction on the basis of"
                name="LWF deduction on the basis of"
                value={formData["LWF deduction on the basis of"]}
                onChange={handleChange}
                options={[{ value: "Rate", label: "Rate" }]}
              />
              <SelectField
                label="Deduct LWF on Arrear"
                name="Deduct LWF on Arrear"
                value={formData["Deduct LWF on Arrear"]}
                onChange={handleChange}
                options={[{ value: "Do no Deduct LWF on Arrear", label: "Do no Deduct LWF on Arrear" }]}
              />
              <ToggleField
                name={"Deduct LWF on FNF"}
                label={"Deduct LWF on FNF"}
                className="my-3"
                value={formData["Deduct LWF on FNF"]}
                onChange={handleChange}
              />
              <ToggleField
                name={"Deduct LWF on Zero Attendance"}
                label={"Deduct LWF on Zero Attendance"}
                className="my-3"
                value={formData["Deduct LWF on Zero Attendance"]}
                onChange={handleChange}
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
            onClick={handleReset}
            className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24 py-1 w-full sm:w-auto md:w-24"
          >
            Reset
          </button>

          <button
            onClick={handleUpdate}
            className="bg-ds-primary text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-full sm:w-auto md:w-24 py-1 w-full sm:w-auto md:w-24"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default PfConfiguration;