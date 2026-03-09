import React from "react";
import PayheadMasterDetails from "../component/createPaycodeMaster/PayheadMasterDetails";
import PayheadSection from "../component/createPaycodeMaster/PayheadSection";
import StatutoryTaxParameter from "../component/createPaycodeMaster/StatutoryTaxParameter";
import ReimbursementSection from "../component/createPaycodeMaster/ReimbursementSection";
import CardReportingConfig from "../component/createPaycodeMaster/CardReportingConfig";

const CreatePaycodeMaster = ({ onBack }) => {
    return (
        <div className="space-y-6">

            {/* Top Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PayheadMasterDetails />
                <PayheadSection />
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StatutoryTaxParameter />

                <div className="space-y-6">
                    <ReimbursementSection />
                    <CardReportingConfig />
                </div>
            </div>

            {/* Buttons Section */}
            <div className="
        pt-6
        flex
        flex-col
        sm:flex-row
        sm:justify-end
        gap-3
      ">

                <button
                    onClick={onBack}
                    className="
            w-full sm:w-auto
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-200
            px-4 py-2
            text-sm
            rounded-md
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
                >
                    Reset
                </button>

                <button
                    className="
            w-full sm:w-auto
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-200
            px-4 py-2
            text-sm
            rounded-md
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
                >
                    Log Report
                </button>

                <button
                    className="
            w-full sm:w-auto
            bg-primary
            text-white
            px-6 py-2
            text-sm font-medium
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