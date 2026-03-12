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
        <div className="max-w-[1400px] mx-auto px-6">

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

                {/* ================= LEFT COLUMN ================= */}
                <div className="flex flex-col gap-6">
                    <ShiftGeneralSection />
                    <EarlyGoerSection />
                    <OvertimeSection />

                    {/* 👉 When toggle ON move Other here */}
                    {expandLate && <OtherConfigurationSection />}
                </div>

                {/* ================= RIGHT COLUMN ================= */}
                <div className="flex flex-col gap-6">

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
                <button className="px-6 py-2 text-xs font-medium border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition">
                    Reset
                </button>

                <button className="px-6 py-2 text-xs font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
                    Update
                </button>
            </div>

        </div>
    );
};

export default ShiftConfiguration;