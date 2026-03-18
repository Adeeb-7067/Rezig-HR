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
  const [formData, setFormData] = useState({
    // Organization Details
    organizationCode: "",
    organizationName: "",
    dependentsCount: "", // Address Line 1
    country: "",
    addressline2: "",
    state: "",
    addressline3: "", // Used for both Line 3 and Zip Code in original code, I'll keep names as is for minimal change but ideally they should be unique
    city: "",
    zipCode: "", // Added to distinguish from addressline3

    // Communication Details
    countryCode1: "",
    countryCode2: "",
    phone1: "",
    phone2: "",
    email: "",
    Fax: "",
    website: "",

    // Database Configuration
    dbServerName: "",
    Database: "",

    // Organization Configuration
    defaultEmployeePasswordType: "First 4 Char of Your Name",
    pensionAgeLimit: "",
    forceEssPasswordChange: "",
    maxNoOfEMILoan: "",
    autoHoliday: "No",
    displayHistoryMessage: "No",
    automaticLWFApplicable: "No",
    groupCompanyTransfer: "No",
    automaticPTApplicable: "No",

    // Attendance Parameters
    attendanceProcessMethod: "Biometric Attendance int....",
    maxNoOfHolidayForEmployee: "",
    attPunchdataimportusingStaffID: "No",
    allowNightAllowanceOnDayShift: "No",
    foodingPartofGross: "No",
    enableAuditMode: "No",
    autoAssignHoliday: "No",
    stateWiseHoliday: "No",

    // More Attendance/Expense Parameters
    editReimbrusmentRequest: "50 paise without adjust",
    authorizeToEditExpense: "none",
    maximumFBPRequest: "",
    maximumLeaveEncasementDays: "",
    allowedImageExtensions: "",
    allowedDocumentType: "",
    gratuityEligibilityonYears: "",
    gratuityEligibilityonMonths: "",
    gratuityLimit: "",
    gratuityRoundOffBy: "6 Month",
    searchEmployeeBy: "Employee Code",
    checkEmployeePendingTaskonFNF: "No",
    recoveryLoanAdvanceOnFNF: "No",

    // E-Mail Parameters
    investmentDeclarationMailToAdmin: "No",
    investmentDeclarationApprovalEmail: "No",
    ticketEmailToEmployee: "No",
    mailToHelpDesk: "No",
    ticketEmailToNextLevel: "No",
    ticketEmailtoAdmin: "No",
    ticketReopenMailtoHelpDesk: "No",
    reimbrusmentRequestEmail: "No",
    reimbrusmentApprovalEmail: "No",

    // Salary/Arrear/Reimbursement Parameters
    netSalaryRoundOff: "50 paise without adjust",
    overtimeRounding: "50 paise without adjust",
    organizationAddressOnFNFSlips: "organization",
    defaultNoticePeriod: "",
    payArrearwithSalary: "No",
    salaryProcessCutOffDay: "",
    organizationAddressOnSalaryRegisterExcel: "No",
    staffIdAsEmployeeCodeOnReports: "No",
    showBalanceColumnImportReimb: "No",
    variablePayheadOnManualArrear: "No",
    estimateReimbursementAmount: "No",

    // Password Configuration
    applyConfiguration: "No",
    minimumLength: "",
    maximumLength: "",
    minOfSpecialCharacters: "",
    maxOfSpecialCharacters: "",
    mustBeAlphaNumeric: "No",
    mustHaveOneUpperCase: "No",

    // Identical Check
    firstField: "",
    secondField: "",
    thirdField: "",
    fourthField: "",
    fifthField: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    console.log("Resetting organization form...");
  };

  const handleUpdate = () => {
    console.log("Updating organization details:", formData);
  };

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
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
                  Organization Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    label="Organization Code"
                    name="organizationCode"
                    value={formData.organizationCode}
                    onChange={handleChange}
                    className="mb-2"
                  />

                  <InputField
                    label="Organization Name"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <InputField
                    label="Address Line 1*"
                    name="dependentsCount"
                    value={formData.dependentsCount}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <SelectField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Title" },
                      { value: "india", label: "India" },
                      { value: "Brazil", label: "Brazil" },
                    ]}
                  />

                  <InputField
                    label="Address Line 2*"
                    name="addressline2"
                    value={formData.addressline2}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Title" },
                      { value: "india", label: "India" },
                      { value: "Brazil", label: "Brazil" },
                    ]}
                  />

                  <InputField
                    label="Address Line 3"
                    name="addressline3"
                    value={formData.addressline3}
                    onChange={handleChange}
                  />
                  <SelectField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select Title" },
                      { value: "india", label: "India" },
                      { value: "Brazil", label: "Brazil" },
                    ]}
                  />

                  <InputField
                    label="Zip Code*"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-6">
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
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
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
                  Organization Communication Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4  ">
                  <div className="col-span-1 w-full items-end ">
                    <InputField
                      label="Country Code "
                      name="countryCode1"
                      value={formData.countryCode1}
                      onChange={handleChange}
                      className="mb-2 "
                      style={{ width: "90px" }}
                    />
                    <InputField
                      label="Country Code "
                      name="countryCode2"
                      value={formData.countryCode2}
                      onChange={handleChange}
                      className="mb-2 "
                      style={{ width: "90px" }}
                    />
                  </div>
                  <div className="col-span-3">
                    <InputField
                      label="Phone 1 "
                      name="phone1"
                      value={formData.phone1}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <InputField
                      label="Phone 2 "
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleChange}
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <InputField
                    label="E-Mail*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <InputField
                    label="Fax"
                    name="Fax"
                    value={formData.Fax}
                    onChange={handleChange}
                    className="mb-2"
                  />
                </div>
                <InputField
                  label="Website*"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="mb-2"
                />
              </div>

              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
                  Database Configuration
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <InputField
                    label="Database Server Name *"
                    name="dbServerName"
                    value={formData.dbServerName}
                    onChange={handleChange}
                    disabled
                    className="mb-2 disabled:bg-[#E0E4E7]"
                  />
                  <InputField
                    label="Database *"
                    name="Database"
                    value={formData.Database}
                    onChange={handleChange}
                    className="mb-2"
                  />
                </div>
              </div>
              <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-3">
                <h1 className="text-base font-semibold  mb-1 text-gray-500">
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
                    <h1 className="text-base font-semibold  mb-3 text-gray-500 ">
                      Organization Configuration
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-3">
                      <SelectField
                        label="Default Employee Password Type"
                        name="defaultEmployeePasswordType"
                        value={formData.defaultEmployeePasswordType}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[
                          { value: "First 4 Char of Your Name", label: "First 4 Char of Your Name" },
                        ]}
                      />
                      <InputField
                        label="Pension Age Limit"
                        name="pensionAgeLimit"
                        value={formData.pensionAgeLimit}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Force ESS Password Change"
                        name="forceEssPasswordChange"
                        value={formData.forceEssPasswordChange}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Max No. of EMI Loan"
                        name="maxNoOfEMILoan"
                        value={formData.maxNoOfEMILoan}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />

                      <ToggleField
                        label="Loan/advc intrest on OB"
                        name="autoHoliday"
                        value={formData.autoHoliday}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Display History Message"
                        name="displayHistoryMessage"
                        value={formData.displayHistoryMessage}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Automatic LWF Applicable"
                        name="automaticLWFApplicable"
                        value={formData.automaticLWFApplicable}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Group Company Trasfer"
                        name="groupCompanyTransfer"
                        value={formData.groupCompanyTransfer}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Automatic PT Applicable"
                        name="automaticPTApplicable"
                        value={formData.automaticPTApplicable}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                    <h1 className="text-base font-semibold  mb-3 text-gray-500">
                      Attendance Parameters
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-3">
                      <SelectField
                        label="Attendance Process Method"
                        name="attendanceProcessMethod"
                        value={formData.attendanceProcessMethod}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[
                          { value: "Biometric Attendance int....", label: "Biometric Attendance int...." },
                        ]}
                      />
                      <InputField
                        label="Max No. of Holidays for Employee"
                        name="maxNoOfHolidayForEmployee"
                        value={formData.maxNoOfHolidayForEmployee}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />

                      <ToggleField
                        label="Att Punch data import using Staff ID"
                        name="attPunchdataimportusingStaffID"
                        value={formData.attPunchdataimportusingStaffID}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Allow Night Allowance On Day Shift"
                        name="allowNightAllowanceOnDayShift"
                        value={formData.allowNightAllowanceOnDayShift}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Fooding Part Of Gross "
                        name="foodingPartofGross"
                        value={formData.foodingPartofGross}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Enable Audit Mode "
                        name="enableAuditMode"
                        value={formData.enableAuditMode}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Auto Assign Holiday "
                        name="autoAssignHoliday"
                        value={formData.autoAssignHoliday}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="State Wise Holiday "
                        name="stateWiseHoliday"
                        value={formData.stateWiseHoliday}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4">
                    <h1 className="text-base font-semibold  mb-3 text-gray-500">
                      Attendance Parameters
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2">
                      <SelectField
                        label="Edit Reimbrusment Request"
                        name="editReimbrusmentRequest"
                        value={formData.editReimbrusmentRequest}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[
                          { value: "50 paise without adjust", label: "50 paise without adjust" },
                        ]}
                      />
                      <SelectField
                        label="Authorize To Edit Expense"
                        name="authorizeToEditExpense"
                        value={formData.authorizeToEditExpense}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[{ value: "none", label: "none" }]}
                      />
                      <InputField
                        label="Maximum FBP Request"
                        name="maximumFBPRequest"
                        value={formData.maximumFBPRequest}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Maximum Leave Encasement Days"
                        name="maximumLeaveEncasementDays"
                        value={formData.maximumLeaveEncasementDays}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Allowed Image Extensions"
                        name="allowedImageExtensions"
                        value={formData.allowedImageExtensions}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Allowed Document Type"
                        name="allowedDocumentType"
                        value={formData.allowedDocumentType}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />

                      <InputField
                        label="Gratuity Eligibility on Years"
                        name="gratuityEligibilityonYears"
                        value={formData.gratuityEligibilityonYears}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                      <InputField
                        label="Gratuity Eligibility on Months"
                        name="gratuityEligibilityonMonths"
                        value={formData.gratuityEligibilityonMonths}
                        onChange={handleChange}
                        type="text"
                        info="Maximum number of holidays allowed per employee per year"
                      />
                    </div>

                    <InputField
                      label="Gratuity Limit"
                      name="gratuityLimit"
                      value={formData.gratuityLimit}
                      onChange={handleChange}
                      type="text"
                      className="col-span-2"
                      info="Maximum number of holidays allowed per employee per year"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2 mt-3">
                      <SelectField
                        label="Gratuity Round-off By"
                        name="gratuityRoundOffBy"
                        value={formData.gratuityRoundOffBy}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[{ value: "6 Month", label: "6 Month" }]}
                      />
                      <SelectField
                        label="Search Employee By"
                        name="searchEmployeeBy"
                        value={formData.searchEmployeeBy}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[{ value: "Employee Code", label: "Employee Code" }]}
                      />
                      <ToggleField
                        label="Check Employee Pending Task on FNF"
                        name="checkEmployeePendingTaskonFNF"
                        value={formData.checkEmployeePendingTaskonFNF}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Recovery Loan/Advance on FNF "
                        name="recoveryLoanAdvanceOnFNF"
                        value={formData.recoveryLoanAdvanceOnFNF}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg ">
                    <h1 className="text-base font-semibold  mb-3 text-gray-500">
                      E-Mail Parameters
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-2">
                      <ToggleField
                        label="Investment Declaration mail to Admin"
                        name="investmentDeclarationMailToAdmin"
                        value={formData.investmentDeclarationMailToAdmin}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Investment Declaration Approval Email"
                        name="investmentDeclarationApprovalEmail"
                        value={formData.investmentDeclarationApprovalEmail}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Ticket Email To Employee"
                        name="ticketEmailToEmployee"
                        value={formData.ticketEmailToEmployee}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Mail to Help-Desk"
                        name="mailToHelpDesk"
                        value={formData.mailToHelpDesk}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Ticket Email to Next Level"
                        name="ticketEmailToNextLevel"
                        value={formData.ticketEmailToNextLevel}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Ticket Email to Admin"
                        name="ticketEmailtoAdmin"
                        value={formData.ticketEmailtoAdmin}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Ticket Reopen mail to Help-Desk"
                        name="ticketReopenMailtoHelpDesk"
                        value={formData.ticketReopenMailtoHelpDesk}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                      <ToggleField
                        label="Reimbrusment Request Email"
                        name="reimbrusmentRequestEmail"
                        value={formData.reimbrusmentRequestEmail}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />

                      <ToggleField
                        label="Reimbrusment Approval Email"
                        name="reimbrusmentApprovalEmail"
                        value={formData.reimbrusmentApprovalEmail}
                        onChange={handleChange}
                        info="Automatically assign holidays based on calendar"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4 ">
                    <h1 className="text-base font-semibold  mb-3 text-gray-500">
                      Salary, Arrear, Reimbursement and Overtime Parameters
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <SelectField
                        label="Net Salary Round Off"
                        name="netSalaryRoundOff"
                        value={formData.netSalaryRoundOff}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[
                          { value: "50 paise without adjust", label: "50 paise without adjust" },
                        ]}
                      />
                      <SelectField
                        label="Overtime Rounding"
                        name="overtimeRounding"
                        value={formData.overtimeRounding}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[
                          { value: "50 paise without adjust", label: "50 paise without adjust" },
                        ]}
                      />
                      <SelectField
                        label="Organization Address on FNF slips"
                        name="organizationAddressOnFNFSlips"
                        value={formData.organizationAddressOnFNFSlips}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                        options={[{ value: "organization", label: "organization" }]}
                      />
                      <InputField
                        label="Default Notice Days"
                        name="defaultNoticePeriod"
                        value={formData.defaultNoticePeriod}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Pay Arrear with Salary "
                        name="payArrearwithSalary"
                        value={formData.payArrearwithSalary}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <InputField
                        label="Salary Process Cut Off Day"
                        name="salaryProcessCutOffDay"
                        value={formData.salaryProcessCutOffDay}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Organization Address on Salary Register Excel "
                        name="organizationAddressOnSalaryRegisterExcel"
                        value={formData.organizationAddressOnSalaryRegisterExcel}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Staff Id as Employee Code On Reports "
                        name="staffIdAsEmployeeCodeOnReports"
                        value={formData.staffIdAsEmployeeCodeOnReports}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Show Balance column Import Reimb "
                        name="showBalanceColumnImportReimb"
                        value={formData.showBalanceColumnImportReimb}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Variable Payhead on Mannual Arrear "
                        name="variablePayheadOnManualArrear"
                        value={formData.variablePayheadOnManualArrear}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <ToggleField
                        label="Estimate Reimbursement Amount"
                        name="estimateReimbursementAmount"
                        value={formData.estimateReimbursementAmount}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4 ">
                    <h1 className="text-base font-semibold  mb-3 text-gray-500">
                      Apply Admin/ESS Password Configuration
                      </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-1">
                      <ToggleField
                        label="Apply Confuguration "
                        name="applyConfiguration"
                        value={formData.applyConfiguration}
                        onChange={handleChange}
                        info="Default Employee Password Type"
                      />
                      <span>{""}</span>

                      <InputField
                        name={"minimumLength"}
                        label={"Minimum Length"}
                        value={formData.minimumLength}
                        onChange={handleChange}
                        info={"this is minimum length"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <InputField
                        name={"maximumLength"}
                        label={"Maximum Length"}
                        value={formData.maximumLength}
                        onChange={handleChange}
                        info={"this is maximum length"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <InputField
                        name={"minOfSpecialCharacters"}
                        label={"Min of Special Characters"}
                        value={formData.minOfSpecialCharacters}
                        onChange={handleChange}
                        info={"Min of Special Characters"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <InputField
                        name={"maxOfSpecialCharacters"}
                        label={"Max  of Special Characters"}
                        value={formData.maxOfSpecialCharacters}
                        onChange={handleChange}
                        info={"Max of Special Characters"}
                        disabled
                        className="disabled:bg-[#E0E4E7]"
                      />
                      <ToggleField
                        name="mustBeAlphaNumeric"
                        label="Must be Alpha Numeric"
                        value={formData.mustBeAlphaNumeric}
                        onChange={handleChange}
                        info="Must be Alpha Numeric"
                      />
                      <ToggleField
                        name="mustHaveOneUpperCase"
                        label="Must have one UpperCase"
                        value={formData.mustHaveOneUpperCase}
                        onChange={handleChange}
                        info="Must have one UpperCase"
                      />
                    </div>
                  </div>

                  <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg mt-4 ">
                    <h1 className="text-base font-semibold  mb-3 text-gray-500">
                      Select feilds for identical check on Employee Master
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-4">
                      <InputField
                        name={"firstField"}
                        label={"First Feild"}
                        value={formData.firstField}
                        onChange={handleChange}
                        info={"First Feild"}
                      />
                      <SelectField
                        label=" Second Feild  "
                        name="secondField"
                        value={formData.secondField}
                        onChange={handleChange}
                        info=" Second Feild   "
                        options={[{ value: "", label: "Select Feild " }]}
                      />
                      <InputField
                        name={"thirdField"}
                        label={"Third Feild"}
                        value={formData.thirdField}
                        onChange={handleChange}
                        info={"Third Feild"}
                      />
                      <InputField
                        name={"fourthField"}
                        label={"Fourth Feild"}
                        value={formData.fourthField}
                        onChange={handleChange}
                        info={"Fourth Feild"}
                      />
                    </div>
                    <InputField
                      name={"fifthField"}
                      label={"Fifth Feild"}
                      value={formData.fifthField}
                      onChange={handleChange}
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
            onClick={handleReset}
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
            onClick={handleUpdate}
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
