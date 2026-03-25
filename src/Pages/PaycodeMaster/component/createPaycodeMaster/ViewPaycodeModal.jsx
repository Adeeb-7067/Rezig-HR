import React from "react";
import { X } from "lucide-react";

const Dot = ({ color }) => (
    <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
    />
);

const InfoCard = ({ title, rows }) => {
    return (
        <div className="
      bg-white dark:bg-gray-900
      rounded-md
      shadow-sm
      border border-gray-200 dark:border-gray-700
      overflow-hidden
      hover:shadow-md
      transition-all duration-200
    ">

            {/* Header Strip */}
            <div className="
        bg-primary
        text-white
        text-[11px]
        font-semibold
        text-center
        py-1.5
        tracking-wide
      ">
                {title}
            </div>

            {/* Setting / Value Header */}
            <div className="
        flex justify-between
        px-3 py-1.5
        text-[11px]
        font-medium
        text-purple-600
        bg-gray-50 dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
      ">
                <span>Setting</span>
                <span>Value</span>
            </div>

            {/* Rows */}
            <div className="text-[11px]">
                {rows.map((row, index) => (
                    <div
                        key={index}
                        className="
              flex justify-between items-center gap-3
              px-3 py-1.5
              border-b border-gray-100 dark:border-gray-800
              last:border-none
              hover:bg-gray-50 dark:hover:bg-gray-800/60
              transition
            "
                    >
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: row.color }}
                            />
                            <span className="truncate">{row.label}</span>
                        </div>

                        <span className="font-medium text-gray-800 dark:text-gray-200 text-right">
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ViewPaycodeModal = ({ open, onClose, data }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="
        relative
        w-full
        h-full
        sm:h-auto
        sm:max-w-5xl
        md:max-w-2xl
        sm:rounded-2xl
        bg-gray-100 dark:bg-gray-900
        shadow-2xl
        flex flex-col
        overflow-hidden
      "
            >
                {/* Scroll Container */}
                <div className="overflow-y-auto p-4 sm:p-8 space-y-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                            Pay Head Details
                        </h2>

                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Employee Code */}
                    <div className="text-center text-sm sm:text-base font-medium text-purple-600">
                        Employee Code :-{" "}
                        <span className="font-semibold text-purple-700">
                            {data?.code}
                        </span>
                    </div>

                    <div className="border-b border-gray-300 dark:border-gray-700" />

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                        <InfoCard
                            title="BASIC SETUP"
                            rows={[
                                { label: "Pay Head Type", value: "Addition", color: "#84cc16" },
                                { label: "Pay Sequence", value: "1", color: "#ef4444" },
                                { label: "Assignment", value: "Manual", color: "#1e3a8a" },
                                { label: "Taxable", value: "Yes", color: "#f59e0b" },
                            ]}
                        />

                        <InfoCard
                            title="TAX RULES"
                            rows={[
                                { label: "Tax Deducted", value: "Proportionately", color: "#84cc16" },
                                { label: "Mapped With", value: "Basic Pay", color: "#ef4444" },
                                { label: "Rounding", value: "50 Paise", color: "#1e3a8a" },
                                { label: "Part of Gross", value: "Yes", color: "#f59e0b" },
                            ]}
                        />

                        <InfoCard
                            title="RUNTIME & DISPLAY"
                            rows={[
                                { label: "Calculate Runtime", value: "No", color: "#84cc16" },
                                { label: "Show on Payslip", value: "Yes", color: "#ef4444" },
                                { label: "Variable", value: "No", color: "#1e3a8a" },
                                { label: "Part of Tax", value: "Yes", color: "#f59e0b" },
                                { label: "Prorate DOJ & DOL", value: "No", color: "#84cc16" },
                            ]}
                        />

                        <InfoCard
                            title="STATUTORY PARTS"
                            rows={[
                                { label: "Present Dependent", value: "No", color: "#84cc16" },
                                { label: "Part of PF/VolPF Gross", value: "Yes", color: "#ef4444" },
                                { label: "Part of ESI Gross", value: "No", color: "#1e3a8a" },
                                { label: "Part of Prof. Tax", value: "Yes", color: "#f59e0b" },
                                { label: "Part of Rate Gross", value: "No", color: "#84cc16" },
                            ]}
                        />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewPaycodeModal;