;

;

import InputField from "@/components/inputfeild";
import SectionCard from "@/components/cards/SectionCard";
import { useState } from "react";

const LateArrivalSection = () => {
    const [form, setForm] = useState({
        graceDays: "",
        deductedHalfDay: "",
        graceMinutes: "",
        graceMinutesAfterDays: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <SectionCard title="Late Arrival Configuration">

          

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <InputField
                    label="Grace Days to Come Late"
                    name="graceDays"
                    value={form.graceDays}
                    onChange={handleChange}
                    placeholder="Select Shift"
                />

                <InputField
                    label="Deducted half day after Hrs"
                    name="deductedHalfDay"
                    value={form.deductedHalfDay}
                    onChange={handleChange}
                    placeholder="Select Shift"
                />

                <InputField
                    label="Grace minutes to come late"
                    name="graceMinutes"
                    value={form.graceMinutes}
                    onChange={handleChange}
                    placeholder="Select Shift"
                />

                <InputField
                    label="Grace Minutes (After Grace Days)"
                    name="graceMinutesAfterDays"
                    value={form.graceMinutesAfterDays}
                    onChange={handleChange}
                    placeholder="Select Shift"
                />

            </div>

        </SectionCard>
    );
};

export default LateArrivalSection;