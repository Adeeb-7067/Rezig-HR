import { useState } from "react";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const ESSSection = () => {
  const [toggles, setToggles] = useState({
    sendLwpToHr: false,
    autoEscalation: false,
    leaveDebitSequence: false,
  });

  const handleToggle = (key, val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  return (
    <div
      className="
      bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10  gap-2 p-2 rounded-lg"
    >
      <h1 className="text-base font-semibold mb-1 text-gray-500">
        Leave Request Configuration For ESS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <VariableTypeRow
          label="Send LWP Request Direct To HR"
          checked={toggles.sendLwpToHr}
          onCheckedChange={(val) => handleToggle("sendLwpToHr", val)}
        />

        <VariableTypeRow
          label="Auto Escalation"
          checked={toggles.autoEscalation}
          onCheckedChange={(val) => handleToggle("autoEscalation", val)}
        />

        <VariableTypeRow
          label="Leave Debit Sequence and Value"
          checked={toggles.leaveDebitSequence}
          onCheckedChange={(val) => handleToggle("leaveDebitSequence", val)}
        />
      </div>
    </div>
  );
};

export default ESSSection;
