import React from "react";
import InputField from "../../../../components/inputfeild";
import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";

const FormulaHeader = () => {
    return (
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg space-y-4 transition-colors">
            {/* Top Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-base font-semibold mb-1 text-gray-500">
                    Formula
                </h1>

                <button
                    className="
            flex items-center gap-2
            text-xs font-medium
            border border-ds-primary
            text-ds-primary
            px-4 py-1.5
            rounded-md
            hover:bg-ds-primary/10
            dark:hover:bg-ds-primary/30
            transition
          "
                >
                    Help
                    <HelpCircle size={14} />
                </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                        <Switch className="data-[state=checked]:bg-ds-primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormulaHeader;