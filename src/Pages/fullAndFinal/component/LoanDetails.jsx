import React from "react";

const LoanDetails = () => {

    const data = [
        { head: "Loan", amount: "142238.00", date: "Mar - 2026", status: "UNPAID" },
        { head: "Loan", amount: "88401.00", date: "Mar - 2026", status: "UNPAID" },
        { head: "Loan", amount: "88401.00", date: "Apr - 2026", status: "UNPAID" },
        { head: "Loan", amount: "142238.00", date: "Apr - 2026", status: "UNPAID" },
        { head: "Loan", amount: "142238.00", date: "May - 2026", status: "UNPAID" },
        { head: "Loan", amount: "88401.00", date: "May - 2026", status: "UNPAID" },
        { head: "Loan", amount: "88401.00", date: "Jun - 2026", status: "UNPAID" },
        { head: "Loan", amount: "142238.00", date: "Jun - 2026", status: "UNPAID" },
        { head: "Loan", amount: "142238.00", date: "Jul - 2026", status: "UNPAID" },
        { head: "Loan", amount: "88401.00", date: "Jul - 2026", status: "UNPAID" },
        { head: "Loan", amount: "88401.00", date: "Aug - 2026", status: "UNPAID" },
    ];

    return (
        <div className="space-y-2 mt-4">

            {/* Title */}
            <h2 className="text-base font-semibold text-gray-500 dark:text-gray-200">
                Loan Details
            </h2>

            {/* Table Container */}
            <div className="rounded-sm shadow drop-shadow-xs border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                <div className="overflow-x-auto no-scrollbar">
                    
                    {/* Header */}
                    <div
                        className="text-[0.7rem] min-w-[600px] lg:min-w-full sm:text-[0.8rem] font-semibold text-white dark:text-gray-50 rounded-t-md dark:border-gray-700 bg-[#8629DF] dark:bg-gray-900 py-1 px-4 min-h-[40px]"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.5fr 1.5fr 1.5fr 1fr",
                            gap: "6px",
                            alignItems: "center",
                        }}
                    >
                        <div>Pay Head</div>
                        <div>Install Amount</div>
                        <div>Pay Date</div>
                        <div>Status</div>
                    </div>

                    {/* Body */}
                    <div className="max-h-[260px] overflow-y-auto table-scroll rounded-b-sm">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="min-w-[600px] lg:min-w-full text-[0.7rem] sm:text-[0.72rem] py-2 px-4 border-b border-gray-100 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200/30 dark:hover:bg-gray-500/30 dark:bg-[#A1A1AA]/5 transition-colors"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1.5fr 1.5fr 1.5fr 1fr",
                                    gap: "6px",
                                    alignItems: "center",
                                }}
                            >
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    {item.head}
                                </div>

                                <div className="text-gray-700 dark:text-gray-300">
                                    {item.amount}
                                </div>

                                <div className="text-gray-700 dark:text-gray-300">
                                    {item.date}
                                </div>

                                <div className="text-gray-800 dark:text-gray-300 font-medium">
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default LoanDetails;