import InputField from "@/components/inputfeild";
import { Plus, X } from "lucide-react";
import { useState } from "react";


const PublishPaymode = () => {

    const payModes = [
        "Cash",
        "Cheque",
        "Draft",
        "NEFT"
    ];

    const [selected, setSelected] = useState([]);

    const addField = (field) => {
        if (!selected.includes(field)) {
            setSelected([...selected, field]);
        }
    };

    const removeField = (field) => {
        setSelected(selected.filter((f) => f !== field));
    };

    return (

        <div className="space-y-3">

            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Publish Paymode Type
            </h4>

            <div className="grid grid-cols-3 gap-4">

                {/* All Fields */}
                <div className="border rounded-lg overflow-hidden">

                    <div className="bg-primary text-white text-xs px-3 py-2 font-medium">
                        All Fields
                    </div>

                    <div className="max-h-[160px] overflow-y-auto">

                        {payModes.map((mode, i) => (

                            <div
                                key={i}
                                className="flex justify-between items-center px-3 py-2 text-xs border-b"
                            >

                                <span>{mode}</span>

                                <button
                                    onClick={() => addField(mode)}
                                    className="w-6 h-6 flex items-center justify-center rounded bg-purple-100 text-primary"
                                >
                                    <Plus size={12} />
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Selected Fields */}
                <div className="border rounded-lg overflow-hidden">

                    <div className="bg-primary text-white text-xs px-3 py-2 font-medium">
                        Selected Fields
                    </div>

                    <div className="max-h-[160px] overflow-y-auto">

                        {selected.map((mode, i) => (

                            <div
                                key={i}
                                className="flex justify-between items-center px-3 py-2 text-xs border-b"
                            >

                                <span>{mode}</span>

                                <button
                                    onClick={() => removeField(mode)}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <X size={12} />
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Changed Captions */}
                <div className="border rounded-lg overflow-hidden p-2">

                    <div className="bg-primary text-white text-xs px-3 py-2 font-medium mb-2">
                        Changed Captions
                    </div>

                    <div className="space-y-2">

                        {selected.map((mode, i) => (

                            <InputField
                                key={i}
                                label=""
                                placeholder="Enter Caption"
                            />

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default PublishPaymode;