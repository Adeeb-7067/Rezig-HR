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
    <div className="flex flex-col gap-3 pr-4 border-r my-2 border-gray-200 dark:border-gray-700">
      <div>
        <InputField
          label=" Category Code"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Enter"
          className="h-8.5"
        />
      </div>

      <div>
        <InputField
          label=" Category Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter"
          className="h-8.5"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white py-1"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 py-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ShiftCategoryForm;
