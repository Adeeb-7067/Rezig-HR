import React from "react";
import InputField from "../../../../components/inputfeild";
import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";

const FormulaHeader = () => {
    return (
        <div
            className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        rounded-2xl
        p-5 sm:p-6
        space-y-6
        shadow-sm
        transition-colors
      "
        >
            {/* Top Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Formula
                </h2>

                <button
                    className="
            flex items-center gap-2
            text-xs font-medium
            border border-[#7B2FF7]
            text-[#7B2FF7]
            px-4 py-1.5
            rounded-md
            hover:bg-purple-50
            dark:hover:bg-purple-900/30
            transition
          "
                >
                    Help
                    <HelpCircle size={14} />
                </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="*Formula Code" placeholder="Enter" />
                <InputField label="*Description" placeholder="Enter" />

                {/* Toggle Section */}
                <div className="flex flex-col justify-center md:justify-end">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                Calculate formula on Actual Payhead Amount
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                If enabled, calculation will use actual pay head values
                            </p>
                        </div>

                        <Switch className="data-[state=checked]:bg-[#7B2FF7]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormulaHeader;