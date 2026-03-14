import { useState } from "react";
import DateInput from "@/components/ui/DateInput";

export default function PersonalDetails({ onSave }) {

    const [resignDate, setResignDate] = useState("");
    const [leavingDate, setLeavingDate] = useState("");
    const [form10Date, setForm10Date] = useState("");
    const [settlementDate, setSettlementDate] = useState("");
    const [lastSalary, setLastSalary] = useState("");

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">

            <h2 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-200">
                Personal Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* Leaving Reason */}
                <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400">
                        Leaving Reason
                    </label>
                    <input
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mt-1
                        bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        placeholder="Enter Name"
                    />
                </div>

                <DateInput
                    label="Date of Resignation"
                    value={resignDate}
                    setValue={setResignDate}
                />

                <DateInput
                    label="Leaving Date"
                    value={leavingDate}
                    setValue={setLeavingDate}
                />
                <h1 />
                <DateInput
                    label="Leaving Date Form 10"
                    value={form10Date}
                    setValue={setForm10Date}
                />

                <DateInput
                    label="Settlement Date"
                    value={settlementDate}
                    setValue={setSettlementDate}
                />

                {/* PF Reason */}
                <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400">
                        Leaving Reason (PF ECR File)
                    </label>

                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mt-1
                    bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <option>Cessation</option>
                        <option>Retirement</option>
                    </select>
                </div>

                <DateInput
                    label="Last Salary Processed"
                    value={lastSalary}
                    setValue={setLastSalary}
                />

            </div>

            {/* Buttons */}
            {/* <div className="flex justify-end gap-3 mt-6">

                <button className="border border-purple-500 text-purple-600 px-5  rounded-md">
                    Reset
                </button>

                <button
                    onClick={onSave}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
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
                    onClick={onSave}
                >
                    Save
                </button>
            </div>

        </div>
    );
}