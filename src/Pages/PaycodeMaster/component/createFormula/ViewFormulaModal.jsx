import React from "react";
import { X } from "lucide-react";

const ViewFormulaModal = ({ open, onClose, data }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="
        relative w-full max-w-2xl
        bg-white dark:bg-gray-900
        rounded-xl shadow-2xl
        overflow-hidden
        animate-in fade-in zoom-in-95
      ">

                {/* Header */}
                <div className="
          flex justify-between items-center
          px-6 py-4
          bg-gradient-to-r bg-primary
          text-white
        ">
                    <h2 className="text-sm font-semibold">
                        View Formula
                    </h2>

                    <button
                        onClick={onClose}
                        className="
              w-8 h-8 flex items-center justify-center
              rounded-full bg-white/20 hover:bg-white/30
              transition
            "
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 text-sm">

                    {/* Status Box */}
                    <div className="
            bg-gray-50 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg p-4 space-y-4
          ">
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                            Status
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-gray-600 dark:text-gray-300">

                            <div className="flex gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Formula Code :
                                </span>
                                <span>{data?.code}</span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Description :
                                </span>
                                <span>{data?.desc}</span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Sequence :
                                </span>
                                <span>{data?.sequence}</span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Calculation Based On :
                                </span>
                                <span>Monthly CTC</span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Actual Payhead Amount :
                                </span>
                                <span>No</span>
                            </div>

                        </div>
                    </div>

                    {/* Formula Expression */}
                    <div className="
            bg-gray-50 dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg p-4
          ">
                        <p className="font-medium mb-3 text-gray-700 dark:text-gray-200">
                            Formula Expression
                        </p>

                        <div className="
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-700
              rounded-md p-3 text-gray-700 dark:text-gray-200
              font-mono
            ">
                            {data?.formula}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewFormulaModal;