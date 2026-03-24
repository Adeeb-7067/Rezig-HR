import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SwitchStartVariable = ({
    label,
    checked,
    onCheckedChange,
}) => {

    return (
        <div className="flex items-center gap-3 py-1">

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
            <Label className="text-[0.7rem] text-gray-600 dark:text-gray-200 ">
                {label}
            </Label>

        </div>
    );
};

export default SwitchStartVariable;