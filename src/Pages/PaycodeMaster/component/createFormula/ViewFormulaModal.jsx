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
            <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-3 m-6 rounded-sm bg-gradient-to-r bg-ds-primary text-white">
                    <h2 className="text-sm font-semibold">View Formula</h2>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center  rounded-full bg-white hover:bg-white/40 transition"
                    >
                        <X size={16} color="black" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 space-y-6 text-sm">

                    {/* Status Section */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 shadow-sm bg-white dark:bg-gray-800">

                        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                            Status
                        </p>

                        <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-gray-600 dark:text-gray-300">

                            <div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Formula Code
                                </span>
                                <span className="mx-2">:</span>
                                {data?.code}
                            </div>

                            <div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Description
                                </span>
                                <span className="mx-2">:</span>
                                {data?.desc}
                            </div>

                            <div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Sequence
                                </span>
                                <span className="mx-2">:</span>
                                {data?.sequence}
                            </div>

                            <div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Calculation Based On
                                </span>
                                <span className="mx-2">:</span>
                                Monthly CTC
                            </div>

                            <div>
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    Actual Payhead Amount
                                </span>
                                <span className="mx-2">:</span>
                                No
                            </div>

                        </div>
                    </div>

                    {/* Formula Section */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md px-3 pt-3 bg-white shadow-sm dark:bg-gray-800">

                        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            Formula Expression
                        </p>



                        <div className="bg-white dark:bg-gray-800  rounded-md py-3 text-gray-700 dark:text-gray-200 font-mono">
                            {data?.formula}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewFormulaModal;