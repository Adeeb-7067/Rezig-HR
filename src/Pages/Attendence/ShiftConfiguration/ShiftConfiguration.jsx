;

import { useState } from "react";
import EarlyGoerSection from "./EarlyGoerSection";
import LateArrivalSection from "./LateArrivalSection";
import OtherConfigurationSection from "./OtherConfigurationSection";
import OvertimeSection from "./OvertimeSection";
import ShiftGeneralSection from "./ShiftGeneralSection";
import LateEarlyDeductionTable from "./LateEarlyDeductionTable";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const ShiftConfiguration = () => {
    const [expandLate, setExpandLate] = useState(false);

    return (
        <div className="">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* ================= LEFT COLUMN ================= */}
                <div className="col-span-1 space-y-4">
                    <ShiftGeneralSection />
                    <EarlyGoerSection />
                    <OvertimeSection />

                    {expandLate && <OtherConfigurationSection />}
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className="col-span-1 space-y-4">

                    <LateArrivalSection />

                    <VariableTypeRow
                        label="Late/Early Deduction Parameters"
                        checked={expandLate}
                        onCheckedChange={setExpandLate}
                    />

                    {expandLate && (
                        <div className="h-full">
                            <LateEarlyDeductionTable />
                        </div>
                    )}

                    {/* 👉 When toggle OFF keep Other here */}
                    {!expandLate && <OtherConfigurationSection />}
                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 mt-8">
  <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
        <button
          type="button"
          className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer"
        >
          Update
        </button>
            </div>

        </div>
    );
};

export default ShiftConfiguration;