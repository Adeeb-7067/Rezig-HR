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
        w-full
        rounded-xl
        p-5
        space-y-5
        bg-[#EFEFEF]/70
        dark:bg-gray-800
        border border-gray-200
        dark:border-gray-700
        transition-colors
      "
        >
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Early Goer Configuration
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

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