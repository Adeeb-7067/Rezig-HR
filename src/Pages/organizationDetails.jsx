import { Info } from "lucide-react";
import Tabs from "@/components/Tabs";
import React, { useEffect, useState } from "react";
import SelectField from "@/components/SelectFeild";
import DragandUpload from "@/components/ui/DragandUpload";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import InputField from "@/components/inputfeild";
import { useRef } from "react";

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

const organizationDetails = () => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { label: "Organization Details", value: "details" },
    { label: "Organization Configuration", value: "config" },
  ];
  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="col-span-1">
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  Organization Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    label="Organization Code"
                    name="organizationCode"
                    className="mb-2"
                  />

                  <InputField
                    label="Organization Name"
                    name="organizationName"
                    className="mb-2"
                  />
                  <InputField
                    label="Address Line 1*"
                    name="dependentsCount"
                    className="mb-2"
                  />
                  <SelectField
                    label="Country"
                    name="country"
                    options={[
                      { value: "", label: "Select Title" },
                      { value: "india", label: "India" },
                      { value: "Brazil", label: "Brazil" },
                    ]}
                  />

                  <InputField label="Address Line 2*" name="addressline2" />

                  <SelectField
                    label="State"
                    name="state"
                    options={[
                      { value: "", label: "Select Title" },
                      { value: "india", label: "India" },
                      { value: "Brazil", label: "Brazil" },
                    ]}
                  />

                  <InputField label="Address Line 3" name="addressline3" />
                  <SelectField
                    label="City"
                    name="city"
                    options={[
                      { value: "", label: "Select Title" },
                      { value: "india", label: "India" },
                      { value: "Brazil", label: "Brazil" },
                    ]}
                  />

                  <InputField label="Zip Code*" name="addressline3" />
                </div>
              </div>
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-6">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  Organization Admin Images
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
                  <div>
                    <h1 className="text-[0.7rem] mb-1  text-gray-500 ">
                      Organization Logo
                    </h1>
                    <DragandUpload />
                    <span className="text-[0.7rem] text-gray-700">
                      Image size must be 250 × 250{" "}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-[0.7rem] mb-1 text-gray-500">
                      Organization Dashboard Image
                    </h1>
                    <DragandUpload />
                    <span className="text-[0.7rem] text-gray-700">
                      Image size must be 980 × 102{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  Organization Communication Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4  ">
                  <div className="col-span-1 w-full items-end ">
                    <InputField
                      label="Country Code "
                      name="countryCode"
                      className="mb-2 "
                      style={{ width: "90px" }}
                    />
                    <InputField
                      label="Country Code "
                      name="countryCode"
                      className="mb-2 "
                      style={{ width: "90px" }}
                    />
                  </div>
                  <div className="col-span-3">
                    <InputField
                      label="Phone 1 "
                      name="phone1"
                      className="mb-2"
                    />
                    <InputField
                      label="Phone 2 "
                      name="phone2"
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField label="E-Mail*" name="email" className="mb-2" />
                  <InputField label="Fax" name="Fax" className="mb-2" />
                </div>
                <InputField label="Website*" name="website" className="mb-2" />
              </div>

              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  Database Configuration
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <InputField
                    label="Database Server Name *"
                    name="dbServerName"
                    disabled
                    className="mb-2 disabled:bg-[#E0E4E7]"
                  />
                  <InputField
                    label="Database *"
                    name="Database"
                    className="mb-2"
                  />
                </div>
              </div>
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-3">
                <h1 className="text-xl font-semibold  mb-1 text-gray-500">
                  Organization ESS Images
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
                  <div>
                    <h1 className="text-[0.7rem] mb-1  text-gray-500 ">
                      ESS Dashboard Image
                    </h1>
                    <DragandUpload />
                    <span className="text-[0.7rem] text-gray-700">
                      Image size must be 250 × 250{" "}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-[0.7rem] mb-1 text-gray-500">
                      Login Page Background Image
                    </h1>
                    <DragandUpload />
                    <span className="text-[0.7rem] text-gray-700">
                      Image size must be 980 × 102{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div>
            <div>
              <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
                    <h1 className="text-xl font-semibold  mb-3 text-gray-500 ">
                      Organization Configuration
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-3">
                      <SelectField
                        label="Default Employee Password Type"
                        name="defaultEmployeePasswordType"
                        info="Default Employee Password Type"
                        options={[
                          { value: "", label: "First 4 Char of Your Name" },
                        ]}
                      />
                      <InputField
                        label="Pension Age Limit"
                        name="pensionAgeLimit"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Force ESS Password Change"
                        name="forceEssPasswordChange"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Max No. of EMI Loan"
                        name="forceEssPasswordChange"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />

                      <ToggleField
                        label="Loan/advc intrest on OB"
                        name="autoHoliday"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Display History Message"
                        name="displayHistoryMessage"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Automatic LWF Applicable"
                        name="automaticLWFApplicable"
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Group Company Trasfer"
                        name="groupCompanyTransfer"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Automatic PT Applicable"
                        name="automaticPTApplicable"
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                    <h1 className="text-xl font-semibold  mb-3 text-gray-500">
                      Attendance Parameters
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-3">
                      <SelectField
                        label="Attendance Process Method"
                        name="attendanceProcessMethod"
                        info="Default Employee Password Type"
                        options={[
                          { value: "", label: "Biometric Attendance int...." },
                        ]}
                      />
                      <InputField
                        label="Max No. of Holidays for Employee"
                        name="maxNoOfHolidayForEmployee"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />

                      <ToggleField
                        label="Att Punch data import using Staff ID"
                        name="attPunchdataimportusingStaffID"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Allow Night Allowance On Day Shift"
                        name="allowNightAllowanceOnDayShift"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Fooding Part Of Gross "
                        name="foodingPartofGross"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Enable Audit Mode "
                        name="enableAuditMode"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Auto Assign Holiday "
                        name="autoAssignHoliday"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="State Wise Holiday "
                        name="stateWiseHoliday"
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                    <h1 className="text-xl font-semibold  mb-3 text-gray-500">
                      Attendance Parameters
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2">
                      <SelectField
                        label="Edit Reimbrusment Request"
                        name="editReimbrusmentRequest "
                        info="Default Employee Password Type"
                        options={[
                          { value: "", label: "50 paise without adjust" },
                        ]}
                      />
                      <SelectField
                        label="Authorize To Edit Expense"
                        name="authorizeToEditExpense "
                        info="Default Employee Password Type"
                        options={[{ value: "", label: "none" }]}
                      />
                      <InputField
                        label="Maximum FBP Request"
                        name="maximumFBPRequest"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Maximum Leave Encasement Days"
                        name="maximumLeaveEncasementDays"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Allowed Image Extensions"
                        name="allowedImageExtensions"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Allowed Document Type"
                        name="allowedDocumentType"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />

                      <InputField
                        label="Gratuity Eligibility on Years"
                        name="gratuityEligibilityonYears"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Gratuity Eligibility on Months"
                        name="gratuityEligibilityonMonths"
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                    </div>

                    <InputField
                      label="Gratuity Limit"
                      name="gratuityLimit"
                      type="text"
                      className="col-span-2"
                      info="Maximum number of holidays allowed per employee per year"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2 mt-3">
                      <SelectField
                        label="Gratuity Round-off By"
                        name="gratuityRoundOffBy "
                        info="Default Employee Password Type"
                        options={[{ value: "", label: "6 Month" }]}
                      />
                      <SelectField
                        label="Search Employee By"
                        name="searchEmployeeBy "
                        info="Default Employee Password Type"
                        options={[{ value: "", label: "Employee Code" }]}
                      />
                      <ToggleField
                        label="Check Employee Pending Task on FNF"
                        name="checkEmployeePendingTaskonFNF"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Recovery Loan/Advance on FNF "
                        name="attPunchdataimportusingStaffID"
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg ">
                    <h1 className="text-xl font-semibold  mb-3 text-gray-500">
                      E-Mail Parameters
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2">
                      <ToggleField
                        label="Investment Declaration mail to Admin"
                        name="investmentDeclarationMailToAdmin"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Investment Declaration Approval Email"
                        name="attPunchdataimportusingStaffID"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Ticket Email To Employee"
                        name="ticketEmailToEmployee"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Mail to Help-Desk"
                        name="mailToHelpDesk"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Ticket Email to Next Level"
                        name="attPunchdataimportusingStaffID"
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Ticket Email to Admin"
                        name="ticketEmailtoAdmin"
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Ticket Reopen mail to Help-Desk"
                        name="ticketReopenMailtoHelpDesk"
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Reimbrusment Request Email"
                        name="reimbrusmentRequestEmail"
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Reimbrusment Approval Email"
                        name="ticketReopenMailtoHelpDesk"
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4 ">
                    <h1 className="text-lg font-semibold  mb-3 text-gray-500">
                      Salary, Arrear, Reimbursement and Overtime Parameters
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <SelectField
                        label="Net Salary Round Off"
                        name="netSalaryRoundOff "
                        info="Default Employee Password Type"
                        options={[
                          { value: "", label: "50 paise without adjust" },
                        ]}
                      />
                      <SelectField
                        label="Overtime Rounding"
                        name="overtimeRounding "
                        info="Default Employee Password Type"
                        options={[
                          { value: "", label: "50 paise without adjust" },
                        ]}
                      />
                      <SelectField
                        label="Organization Address on FNF slips"
                        name="netSalaryRoundOff "
                        info="Default Employee Password Type"
                        options={[{ value: "", label: "organization" }]}
                      />
                      <InputField
                        label="Default Notice Days"
                        name="defaultNoticePeriod "
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Pay Arrear with Salary "
                        name="payArrearwithSalary "
                        info="Default Employee Password Type"
                      />
                      <InputField
                        label="Salary Process Cut Off Day"
                        name="salaryProcessCutOffDay "
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Organization Address on Salary Register Excel "
                        name="Organization Address on Salary Register Excel "
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Staff Id as Employee Code On Reports "
                        name="Staff Id as Employee Code On Reports"
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Show Balance column Import Reimb "
                        name="Show Balance column Import Reimb"
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Variable Payhead on Mannual Arrear "
                        name="Variable Payhead on Mannual Arrear"
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Estimate Reimbursement Amount"
                        name="Estimate Reimbursement Amount"
                        info="Default Employee Password Type"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4 ">
                    <h1 className="text-lg font-semibold  mb-3 text-gray-500">
                      Apply Admin/ESS Password Configuration
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-1">
                      <ToggleField
                        label="Apply Confuguration "
                        name="Apply Confuguration"
                        info="Default Employee Password Type"
                      />
                      <span>{""}</span>

                      <InputField
                        name={"Minimum Length"}
                        label={"Minimum Length"}
                        info={"this is minimum length"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <InputField
                        name={"MaximumLength"}
                        label={"Maximum Length"}
                        info={"this is maximum length"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <InputField
                        name={"Min of Special Characters"}
                        label={"Min of Special Characters"}
                        info={"Min of Special Characters"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <InputField
                        name={"Max of Special Characters"}
                        label={"Max  of Special Characters"}
                        info={"Max of Special Characters"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <ToggleField
                        name="Must be Alpha Numeric"
                        label="Must be Alpha Numeric"
                        info="Must be Alpha Numeric"
                      />
                      <ToggleField
                        name="Must have one UpperCase"
                        label="Must have one UpperCase"
                        info="Must have one UpperCase"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4 ">
                    <h1 className="text-lg font-semibold  mb-3 text-gray-500">
                      Select feilds for identical check on Employee Master
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-4">
                      <InputField
                        name={"First Feild"}
                        label={"First Feild"}
                        info={"First Feild"}
                      />
                      <SelectField
                        label=" Second Feild  "
                        name=" Second Feild "
                        info=" Second Feild   "
                        options={[{ value: "", label: "Select Feild " }]}
                      />
                      <InputField
                        name={"Third Feild"}
                        label={"Third Feild"}
                        info={"Third Feild"}
                      />
                      <InputField
                        name={"Fourth Feild"}
                        label={"Fourth Feild"}
                        info={"Fourth Feild"}
                      />
                    </div>
                    <InputField
                      name={"Fifth Feild"}
                      label={"Fifth Feild"}
                      info={"Fifth Feild"}
                    />
                  </div>
                </div>
              </div>
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

export default organizationDetails;
