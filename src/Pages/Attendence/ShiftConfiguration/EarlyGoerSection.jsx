;

import { useState } from "react";
import InputField from "@/components/inputfeild";

const EarlyGoerSection = () => {
    const [form, setForm] = useState({
        graceDays: "",
        graceMinutes: "",
        halfDayBefore: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
           <div
      className="
      bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg"
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">
                Early Goer Configuration
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* Grace Days */}
                <InputField
                    label="Grace Days for Early Out"
                    name="graceDays"
                    value={form.graceDays}
                    onChange={handleChange}
                    placeholder="Select Shift"
                    info="Number of grace days allowed for early leaving."
                />

                {/* Grace Minutes */}
                <InputField
                    label="Grace minutes to go early"
                    name="graceMinutes"
                    value={form.graceMinutes}
                    onChange={handleChange}
                    placeholder="Select Shift"
                    info="Allowed grace minutes before marking early goer."
                />

                {/* Full Width Field */}
                <div className="md:col-span-2">
                    <InputField
                        label="Deducted half day before Hrs"
                        name="halfDayBefore"
                        value={form.halfDayBefore}
                        onChange={handleChange}
                        placeholder="Select Shift"
                        info="If employee leaves before these hours, half-day will be deducted."
                    />
                </div>

            </div>
        </div>
    );
};

export default EarlyGoerSection;