import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SwitchStartVariable = ({
    label,
    checked,
    onCheckedChange,
}) => {

    return (
        <div className="flex items-center gap-3 py-2">

            {/* Toggle */}
            <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="
          data-[state=checked]:bg-[#8629DF]
          data-[state=unchecked]:bg-gray-300
          dark:data-[state=unchecked]:bg-gray-600
        "
            />

            {/* Label */}
            <Label className="text-Secondary text-gray-700 dark:text-gray-200 font-[400]">
                {label}
            </Label>

        </div>
    );
};

export default SwitchStartVariable;