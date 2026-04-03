import { useState } from "react";
import DatePickerField from "@/components/ui/datePicker";
import SelectField from "@/components/SelectFeild";

const InputField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    className = "",
    ...props
}) => (
    <div>
        <label className="block text-gray-500 font-semibold dark:text-gray-50 ds-text-xs mb-1">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full ds-text-xs h-7.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9853F9] focus:ring-inset rounded-sm px-4 py-1.5 ${className}`}
            {...props}
        />
    </div>
);

export default function PersonalDetails({ onSave }) {
    const [formData, setFormData] = useState({
        leavingReason: "",
        resignDate: "",
        leavingDate: "",
        form10Date: "",
        settlementDate: "",
        pfReason: "",
        lastSalary: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="">
            <h2 className="text-base font-semibold mb-1 text-gray-500">
                Personal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <InputField
                    label="Leaving Reason"
                    name="leavingReason"
                    value={formData.leavingReason}
                    onChange={handleChange}
                    placeholder="Enter Reason"
                />

                <DatePickerField
                    label="Date of Resignation"
                    type="date"
                    name="resignDate"
                    value={formData.resignDate}
                    onChange={handleChange}
                />

                <DatePickerField
                    label="Leaving Date"
                    type="date"
                    name="leavingDate"
                    value={formData.leavingDate}
                    onChange={handleChange}
                />

                <div />

                <DatePickerField
                    label="Leaving Date Form 10"
                    type="date"
                    name="form10Date"
                    value={formData.form10Date}
                    onChange={handleChange}
                />

                <DatePickerField
                    label="Settlement Date"
                    type="date"
                    name="settlementDate"
                    value={formData.settlementDate}
                    onChange={handleChange}
                />

                <SelectField
                    label="Leaving Reason (PF ECR File)"
                    name="pfReason"
                    value={formData.pfReason}
                    onChange={handleChange}
                    options={[
                        { value: "", label: "Select Reason" },
                        { value: "Cessation", label: "Cessation" },
                        { value: "Retirement", label: "Retirement" }
                    ]}
                />

                <DatePickerField
                    label="Last Salary Processed"
                    type="date"
                    name="lastSalary"
                    value={formData.lastSalary}
                    onChange={handleChange}
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-3">
                <button
                    className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
                    onClick={() => setFormData({
                        leavingReason: "",
                        resignDate: "",
                        leavingDate: "",
                        form10Date: "",
                        settlementDate: "",
                        pfReason: "",
                        lastSalary: ""
                    })}
                >
                    Reset
                </button>

                <button
                    className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white hover:bg-ds-primary/80"
                    onClick={() => onSave(formData)}
                >
                    Save
                </button>
            </div>

        </div>
    );
}