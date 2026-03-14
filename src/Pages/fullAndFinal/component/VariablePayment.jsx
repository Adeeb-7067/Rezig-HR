export default function VariablePayment({ onNext, onPrev }) {

    return (
        <div className="space-y-6">

            <h2 className="text-lg font-semibold">
                Variable List
            </h2>

            {/* Table Component */}
            <div className="border rounded overflow-hidden">
                <table className="w-full text-sm">

                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="p-2">Pay Head</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Formula</th>
                            <th>Monthly Amount</th>
                            <th>Annual Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t">
                            <td className="p-2">Basic</td>
                            <td>21 July 2025</td>
                            <td>21 July 2025</td>
                            <td>Select Formula</td>
                            <td>12000</td>
                            <td>144000</td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* <div className="flex justify-end gap-3">

                <button onClick={onPrev} className="border px-4 py-2 rounded">
                    Previous
                </button>

                <button className="border px-4 py-2 rounded">
                    Reset
                </button>

                <button
                    onClick={onNext}
                    className="bg-purple-600 text-white px-6 py-2 rounded"
                >
                    Save
                </button>

            </div> */}
            <div
                className="
    flex flex-row sm:flex-row 
    justify-end 
    w-full 
    gap-2 
    mt-3
  "
            >
                <button
                    className="
      bg-white dark:bg-[#E4E6EB]/10
      border border-[#8629DF]
      text-[#8629DF]
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
                    onClick={onPrev}
                >
                    Previous
                </button>
                <button
                    className="
      bg-white dark:bg-[#E4E6EB]/10
      border border-[#8629DF]
      text-[#8629DF]
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
                >
                    Reset
                </button>
                <button
                    className="
      bg-[#8629DF]
      text-white
      font-semibold
      text-xs sm:text-[0.7rem]
      py-1
      rounded-sm
      w-full sm:w-auto md:w-24
    "
                    onClick={onNext}
                >
                    Save
                </button>
            </div>
        </div>
    );
}