;

import InputField from "@/components/inputfeild";
import { useState } from "react";

const ShiftCategoryForm = () => {
    const [form, setForm] = useState({
        code: "",
        name: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="flex flex-col gap-5 pr-6 border-r border-gray-200 dark:border-gray-700">

            <div>
                <InputField label=" Category Code" placeholder="Enter" className="h-8.5" />
            </div>

            <div>
                <InputField label=" Category Name" placeholder="Enter" className="h-8.5" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-2">

                <button className="px-8 py-1 text-sm bg-primary text-white rounded-md shadow hover:opacity-90 transition">
                    Save
                </button>

                <button className="px-8 py-1 text-sm border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 transition">
                    Reset
                </button>

            </div>

        </div>
    );
};

export default ShiftCategoryForm;