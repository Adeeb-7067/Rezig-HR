import { useState } from "react";
import { Save, RotateCcw, RefreshCcw } from "lucide-react";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import SelectField from "@/components/SelectFeild";
import SelectFieldScroll from "@/components/SelectFieldScroll";
import InputField from "@/components/inputfeild";

const ShiftMasterForm = () => {
  const [form, setForm] = useState({
    shiftCode: "",
    shiftName: "",
    startHour: "",
    startMinute: "",
    endHour: "",
    endMinute: "",
  });

  const [nightShift, setNightShift] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-100 mb-4">
        Shift Master
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_2.5fr] gap-5">
        {/* LEFT SIDE */}
        <div className="space-y-2.5 ">
          <InputField
            label="Shift Code"
            name="shiftCode"
            value={form.shiftCode}
            onChange={handleChange}
            placeholder="Enter Shift Code"
          />
          <InputField
            label="Shift Name"
            name="shiftName"
            value={form.shiftName}
            onChange={handleChange}
            placeholder="Enter Shift Name"
          />

          <div className="flex gap-4 pt-2">
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

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-700" />

        {/* RIGHT SIDE */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.5fr] gap-6 ">
            {/* START TIME */}
            <div>
              <p className="text-Secondary font-medium text-gray-700 dark:text-gray-300 mb-3">
                Start Time
              </p>

              <div className="flex items-center gap-3">
                <div className="w-20">
                  <SelectFieldScroll
                    label="Hours"
                    name="startHour"
                    value={form.startHour}
                    onChange={handleChange}
                    options={hours}
                    unSelectLabel="00"
                  />
                </div>

                <span className="mt-5 text-lg font-semibold">:</span>

                <div className="w-20">
                  <SelectFieldScroll
                    label="Minute"
                    name="startMinute"
                    value={form.startMinute}
                    onChange={handleChange}
                    options={minutes}
                    unSelectLabel="00"
                  />
                </div>
              </div>
            </div>

            {/* END TIME */}
            <div>
              <p className="text-Secondary font-medium text-gray-700 dark:text-gray-300 mb-3">
                End Time
              </p>

              <div className="flex flex-row items-center gap-3 flex-wrap">
                <div className="w-20">
                  <SelectFieldScroll
                    label="Hours"
                    name="endHour"
                    value={form.endHour}
                    onChange={handleChange}
                    options={hours}
                    unSelectLabel="00"
                  />
                </div>

                <span className="mt-5 text-lg font-semibold">:</span>

                <div className="w-20">
                  <SelectFieldScroll
                    label="Minute"
                    name="endMinute"
                    value={form.endMinute}
                    onChange={handleChange}
                    options={minutes}
                    unSelectLabel="00"
                  />
                </div>

                <div className="">
                  <VariableTypeRow
                    label="Night Shift"
                    checked={nightShift}
                    onCheckedChange={setNightShift}
                    gapClass="gap-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftMasterForm;
