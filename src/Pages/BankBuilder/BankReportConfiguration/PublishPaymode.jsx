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

            <h4 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                Publish Paymode Type
            </h4>

            <div className="grid grid-cols-3 gap-4">

                {/* All Fields */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden shadow-sm">

                    <div className="bg-[#8629DF] text-white text-[0.7rem] px-3 py-1.5 font-semibold uppercase tracking-wider">
                        All Fields
                    </div>

                    <div className="max-h-[200px] overflow-y-auto no-scrollbar bg-white dark:bg-gray-800">

                        {payModes.map((mode, i) => (

                            <div
                                key={i}
                                className="flex justify-between items-center px-3 py-1.5 text-[0.7rem] border-b border-gray-50 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >

                                <span className="font-medium">{mode}</span>

                                <button
                                    onClick={() => addField(mode)}
                                    className="w-5 h-5 flex items-center justify-center rounded-sm bg-purple-50 dark:bg-purple-900/30 text-[#8629DF] hover:bg-[#8629DF] hover:text-white transition-all cursor-pointer"
                                >
                                    <Plus size={12} />
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Selected Fields */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden shadow-sm">

                    <div className="bg-[#8629DF] text-white text-[0.7rem] px-3 py-1.5 font-semibold uppercase tracking-wider">
                        Selected Fields
                    </div>

                    <div className="max-h-[200px] overflow-y-auto no-scrollbar bg-white dark:bg-gray-800">

                        {selected.map((mode, i) => (

                            <div
                                key={i}
                                className="flex justify-between items-center px-3 py-1.5 text-[0.7rem] border-b border-gray-50 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >

                                <span className="font-medium">{mode}</span>

                                <button
                                    onClick={() => removeField(mode)}
                                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                    <X size={12} />
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Changed Captions */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden p-3 bg-white dark:bg-gray-800 shadow-sm">

                    <div className="text-[#8629DF] text-[0.7rem] font-bold uppercase tracking-wider mb-3 border-b border-gray-100 dark:border-gray-700 pb-1">
                        Changed Captions
                    </div>

                    <div className="space-y-3">

                        {selected.map((mode, i) => (

                            <div key={i} className="space-y-1">
                                <label className="text-[0.65rem] text-gray-400 font-semibold">{mode} Caption</label>
                                <InputField
                                    label=""
                                    placeholder="Enter Caption"
                                    className="h-7.5 text-[0.7rem] px-3"
                                />
                            </div>

                        ))}

                        {selected.length === 0 && (
                            <div className="text-[0.7rem] text-gray-400 italic text-center py-4">
                                Select fields to edit captions
                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default PublishPaymode;