;

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
        w-full
        rounded-xl
        p-6
        space-y-6
        bg-[#EFEFEF]/70
        dark:bg-gray-800
        border border-gray-200
        dark:border-gray-700
        transition-colors
      "
        >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Leave Request Configuration For ESS
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <VariableTypeRow
                    label="Send LWP Request Direct To HR"
                    checked={toggles.sendLwpToHr}
                    onCheckedChange={(val) =>
                        handleToggle("sendLwpToHr", val)
                    }
                />

                <VariableTypeRow
                    label="Auto Escalation"
                    checked={toggles.autoEscalation}
                    onCheckedChange={(val) =>
                        handleToggle("autoEscalation", val)
                    }
                />

                <VariableTypeRow
                    label="Leave Debit Sequence and Value"
                    checked={toggles.leaveDebitSequence}
                    onCheckedChange={(val) =>
                        handleToggle("leaveDebitSequence", val)
                    }
                />

            </div>
        </div>
    );
};

export default ESSSection;