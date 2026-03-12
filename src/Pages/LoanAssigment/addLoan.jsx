import InputField from "@/components/inputfeild";
import React, { useState,useRef,useEffect } from "react";
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

  return (
    <div>
      {/* Header */}
      <div className="flex flex-row sm:flex-row justify-between gap-3 mt-2 mb-8 w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#252C58] dark:text-gray-50">
          Loan Assignment
        </h1>
      </div>

      {/* Employee Info Card */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-5 bg-white dark:bg-gray-800 w-[50%]">
        <div className="flex items-start gap-4 ">
          {/* Avatar */}
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

          {/* Right section */}
          <div className="flex-1">
            {/* Name + Status */}
            <div className="flex justify-between items-center gap-2 mb-0.5">
              <span className="text-[1.1rem] font-semibold text-gray-900 dark:text-gray-50">
                {employee.name}
              </span>

              <span className="text-[0.65rem] font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                {employee.status}
              </span>
            </div>

            {/* Emp Code */}
            <p className="text-[0.8rem] font-semibold text-gray-400 mb-2">
              {employee.empCode}
            </p>

            {/* Existing Loan */}
            <div className="mb-3 mx-1">
              <p className="text-[0.7rem] font-medium text-gray-700 dark:text-gray-200 mb-0.5">
                {employee.existingLoan.type}
              </p>

              <div className="text-[0.7rem] text-gray-500 dark:text-gray-400 space-y-0.5">
                <p>
                  Current Loan –{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {employee.existingLoan.currentLoan}
                  </span>
                </p>

                <p>
                  EMI –{" "}
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

        {/* Tags */}
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
 <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg">
              <h1 className="text-base font-semibold  mb-1 text-gray-500">
                Loan / Advance Detail
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <SelectField
               label={'Pay Code'}
               name={'Pay Code'}
               unSelectLabel={'Select Payhead '}
             options={[
                {
                    label:'payhead',value:'payhead'
                }
             ]}
               />
                 <SelectField
               label={'Loan / Advance'}
               name={'Loan / Advance'}
               unSelectLabel={'Select Loan / Advance '}
               options={[
                {
                    label:'loan/advance',value:'loan/advance'
                }
             ]}
               />
                  <SelectField
               label={'Calculation Method'}
               name={'Calculation Method'}
               unSelectLabel={'Select Type '}
               options={[
                {
                    label:'Addition',value:'Addition'
                }
             ]}
               />
               <span></span>

               <InputField
               name={'Principal'}
               label={'Principal'}
               />
               
               <InputField
               name={'Intrest'}
               label={'Intrest'}
               />
                   <SelectField
               label={'Installment to be deducted'}
               name={' Installment to be deducted'}
               unSelectLabel={'Deduction Type '}
               options={[
                {
                    label:'Addition',value:'Addition'
                }
             ]}
               />
               <InputField
               name={'No of Installments'}
               label={'No of Installments'}
               />
                <InputField
                name={' Installment Amount '}
                label={'Installment Amount '}
                />
                   <InputField
                name={' Due Amount '}
                label={'Due Amount '}
                />
               <InputField
               name={' Balance'}
               label={'Balance'}
               />
               <SelectField
               label={'Start Deducting From'}
               name={' Start Deducting From'}
               unSelectLabel={'March 2026 '}
               options={[
                {
                    label:'April 2026',value:'April 2026'
                }
             ]}
               />

               <DatePickerField 
               name={' Transaction Date '}
               label={'Transaction Date '}/>

                <SelectField
               label={'Loan Type(Perk Map)'}
               name={' Loan Type(Perk Map)'}
               unSelectLabel={'Select Type '}
               options={[
                {
                    label:'Addition',value:'Addition'
                }
             ]}
               />
               <InputField
               name={' Loan / Advance A/c No '}
               label={'Loan / Advance A/c No '}
               />

              </div>
            </div>




    </div>
  );
};

export default AddLoan;
