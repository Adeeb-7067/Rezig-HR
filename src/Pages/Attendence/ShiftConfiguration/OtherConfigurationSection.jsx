;

import { useState } from "react";
import InputField from "@/components/inputfeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import SectionCard from "@/components/cards/SectionCard";

const OtherConfigurationSection = () => {
    const [adjustLate, setAdjustLate] = useState(false);

    // 🔥 Field configuration array (clean & scalable)
    const topFields = [
        {
            label: "OT Lunch Start Time (WO/Holiday)",
            info: "Define overtime lunch start time for working/holiday shifts.",
        },
        {
            label: "OT Lunch End Time",
            info: "Define overtime lunch end time.",
        },
        {
            label: "Min Working Hours for Half-Day",
            info: "Minimum hours required to mark attendance as half-day.",
        },
        {
            label: "Min Working Hours for Full-Day",
            info: "Minimum hours required to mark attendance as full-day.",
        },
        {
            label: "Next Day Shift Deadline Time",
            info: "Last allowed time to assign attendance to next day shift.",
        },
        {
            label: "Total Hours in a Day (Custom Shift)",
            info: "Define total shift hours for custom shift type.",
        },
        {
            label: "Daily Hours (for calculation)",
            info: "Used for attendance and salary calculations.",
        },
        {
            label: "Late not counted if hours ok",
            info: "Ignore late marking if total working hours are completed.",
        },
    ];

    const lateCycleFields = [
        {
            label: "Late Coming Cycle",
            info: "Define late-coming frequency cycle.",
        },
        {
            label: "Add minutes to late-coming cycle",
            info: "Extra grace minutes added to late-coming cycle.",
        },
    ];

    const bottomFields = [
        {
            label: "Post-shift minutes (Granted)",
            info: "Additional minutes granted after shift completion.",
        },
        {
            label: "Daily grace minutes for lateness",
            info: "Daily allowed grace minutes before marking late.",
        },
    ];

    return (
        <SectionCard title="Other Configuration">

            {/* ================= TOP GRID ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                {topFields.map((field, index) => (
                    <InputField
                        key={index}
                        label={field.label}
                        placeholder="Select Shift"
                        info={field.info}
                    />
                ))}

            </div>

            {/* ================= TOGGLE ================= */}
            <div className="pt-3">
                <VariableTypeRow
                    label="Adjust Late Coming with OT"
                    checked={adjustLate}
                    onCheckedChange={setAdjustLate}
                    info="Enable to adjust late coming against overtime hours."
                />
            </div>

            {/* ================= CONDITIONAL LATE CYCLE ================= */}
            {adjustLate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                    {lateCycleFields.map((field, index) => (
                        <InputField
                            key={index}
                            label={field.label}
                            placeholder="Select Shift"
                            info={field.info}
                        />
                    ))}
                </div>
            )}

            {/* ================= DIVIDER TEXT ================= */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                If the employee stays for
            </p>

            {/* ================= BOTTOM GRID ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2">
                {bottomFields.map((field, index) => (
                    <InputField
                        key={index}
                        label={field.label}
                        placeholder="Select Shift"
                        info={field.info}
                    />
                ))}
            </div>

        </SectionCard>
    );
};

export default OtherConfigurationSection;