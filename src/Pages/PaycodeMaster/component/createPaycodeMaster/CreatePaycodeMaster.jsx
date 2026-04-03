import React, { useState } from "react";
import PayheadMasterDetails from "./PayheadMasterDetails";
import PayheadSection from "./PayheadSection";
import CardReportingConfig from "./CardReportingConfig";
import StatutoryTaxParameter from "./StatutoryTaxParameter";
import ReimbursementSection from "./ReimbursementSection";

const CreatePaycodeMaster = ({ onBack }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({});
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form Data:", formData);
  };

  return (
    <div>
      {/* Desktop Layout (2 columns) */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        <div className="col-span-1 space-y-4">
          {/* Left Column */}
          <PayheadMasterDetails />
          <CardReportingConfig />
        </div>

        <div className="col-span-1 space-y-4">
          {/* Right Column */}
          <PayheadSection />
          <StatutoryTaxParameter />
          <ReimbursementSection />
        </div>
      </div>

      {/* Mobile Layout (single column) */}
      <div className="lg:hidden space-y-4">
        <PayheadMasterDetails />
        <PayheadSection />
        <CardReportingConfig />
        <StatutoryTaxParameter />
        <ReimbursementSection />
      </div>

      {/* Buttons - Styled like PersonalInfo */}
      <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-4">
        <button
          type="button"
          onClick={handleReset}
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white ds-bg-primary text-white hover:bg-ds-primary/80"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onBack}
          className="bg-white dark:bg-[#E4E6EB]/10 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreatePaycodeMaster;