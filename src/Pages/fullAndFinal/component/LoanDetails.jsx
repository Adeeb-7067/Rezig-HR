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
        <div className="space-y-6">

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Loan Details
            </h2>

            {/* Card */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">

                {/* Header */}
                <div
                    className="text-Secondary font-semibold text-white bg-[#8629DF] py-3 px-6 rounded-t-lg"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.5fr 1.5fr 1.5fr 1fr",
                        alignItems: "center",
                    }}
                >
                    <div>Pay Head</div>
                    <div>Install Amount</div>
                    <div>Pay Date</div>
                    <div>Status</div>
                </div>

                {/* Body */}
                <div className="max-h-[260px] overflow-y-auto table-scroll">

                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="text-Primary py-3 px-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1.5fr 1.5fr 1.5fr 1fr",
                                alignItems: "center",
                            }}
                        >

                            <div className="text-gray-700 dark:text-gray-200">
                                {item.head}
                            </div>

                            <div className="text-gray-600 dark:text-gray-300">
                                {item.amount}
                            </div>

                            <div className="text-gray-600 dark:text-gray-300">
                                {item.date}
                            </div>

                            <div className="text-gray-600 dark:text-gray-300 font-medium">
                                {item.status}
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default LoanDetails;