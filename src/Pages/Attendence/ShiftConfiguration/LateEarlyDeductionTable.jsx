;

const LateEarlyDeductionTable = () => {
    const rows = Array.from({ length: 100 }, (_, i) => i + 1);

    return (
        <div className="rounded-lg border bg-[#EFEFEF]/70 dark:border-gray-700 overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-3 bg-primary  text-white text-xs font-medium px-4 py-2">
                <div>No of Late/Early</div>
                <div className="text-center">Late Deduction</div>
                <div className="text-center">Early Deduction</div>
            </div>

            {/* Scrollable Body */}
            <div className="max-h-[1010px] overflow-y-auto table-scroll bg-gray-50 dark:bg-gray-900">

                {rows.map((num) => (
                    <div
                        key={num}
                        className="
              grid grid-cols-3
              px-4 py-2
              text-xs
              border-b border-gray-200 dark:border-gray-700
              text-gray-700 dark:text-gray-300
            "
                    >
                        <div>If only {num} Late/Early</div>
                        <div className="text-center">0.00</div>
                        <div className="text-center">0.00</div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default LateEarlyDeductionTable;