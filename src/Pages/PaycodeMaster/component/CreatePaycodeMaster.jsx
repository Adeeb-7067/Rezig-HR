import React from "react";
import PayheadMasterDetails from "../component/createPaycodeMaster/PayheadMasterDetails";
import PayheadSection from "../component/createPaycodeMaster/PayheadSection";
import StatutoryTaxParameter from "../component/createPaycodeMaster/StatutoryTaxParameter";
import ReimbursementSection from "../component/createPaycodeMaster/ReimbursementSection";
import CardReportingConfig from "../component/createPaycodeMaster/CardReportingConfig";

const CreatePaycodeMaster = ({ onBack }) => {
  return (
    <div className="space-y-4">
      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <PayheadMasterDetails />
        <PayheadSection />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <StatutoryTaxParameter />

        <div className="space-y-3">
          <ReimbursementSection />
          <CardReportingConfig />
        </div>
      </div>

      {/* Buttons Section */}
      <div
        className="
        pt-6
        flex
        flex-col
        sm:flex-row
        sm:justify-end
        gap-3
      "
      >
        <button
          onClick={() => {
            onBack();
          }}
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Back
        </button>
        <button className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
          Reset
        </button>

        <button className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
          Log Report
        </button>

        <button
          className="
            w-full sm:w-auto
            ds-bg-primary
            text-white
            px-6 py-1.5
            text-xs font-medium
            rounded-md
            hover:opacity-90
            transition
          "
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CreatePaycodeMaster;
