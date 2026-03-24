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
          placeholder="Enter"
          className="h-8.5"
        />
      </div>

      <div>
        <InputField
          label=" Category Name"
          placeholder="Enter"
          className="h-8.5"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          className="bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ShiftCategoryForm;
