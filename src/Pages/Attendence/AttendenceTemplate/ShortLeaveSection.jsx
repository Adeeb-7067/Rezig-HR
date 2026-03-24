import { useState } from "react";
import InputField from "@/components/inputfeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const ShortLeaveSection = () => {
  const [toggles, setToggles] = useState({
    allowShort: false,
    allowMultiple: false,
  });

  const handleToggle = (key, val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  return (
    <div
      className="
   bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg"
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">
        Short Leave Configuration
      </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Allow employee to request Short Leave"
          checked={toggles.allowShort}
          onCheckedChange={(val) => handleToggle("allowShort", val)}
        />

        <VariableTypeRow
          label="Allow multiple Short Leave in 1 Day"
          checked={toggles.allowMultiple}
          onCheckedChange={(val) => handleToggle("allowMultiple", val)}
        />
           <InputField
          label="No. of Short Leave allow in 1 Month"
          placeholder="0"
        />

        <InputField
          label="No. of Hrs. in Short Leave one slot"
          placeholder="0"
        />
      </div>

    
    </div>
  );
};

export default ShortLeaveSection;
