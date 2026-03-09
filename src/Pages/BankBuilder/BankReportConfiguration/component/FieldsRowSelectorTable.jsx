import InputField from "@/components/inputfeild";
import { Equal, GripHorizontal, X } from "lucide-react";

const FieldsRowSelectorTable = ({ fields = [], selected = [], removeField }) => {

    return (

        <div className="border rounded-lg overflow-hidden">

            {/* HEADER */}

            <div className="grid grid-cols-2 bg-primary text-white text-xs font-medium">

                <div className="px-3 py-2 border-r border-purple-400">
                    Selected Fields
                </div>

                <div className="px-3 py-2">
                    Changed Captions
                </div>

            </div>


            {/* BODY */}

            <div className="max-h-[250px] overflow-y-auto table-scroll">

                {fields.map((field) => {

                    const isSelected = selected.includes(field);

                    return (

                        <div
                            key={field}
                            className={`grid grid-cols-2 border-b border-gray-200 dark:border-gray-700
              ${!isSelected && "opacity-40"}
              `}
                        >

                            {/* FIELD */}

                            <div className="flex items-center justify-between px-3 py-2 border-r border-gray-200 dark:border-gray-700">

                                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">

                                    <div
                                        className="w-6 h-6 flex items-center justify-center
    rounded-full bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    "
                                    >
                                        <Equal size={14} className="text-gray-400 dark:text-gray-300" />
                                    </div>

                                    {field}

                                </div>

                                {isSelected && (
                                    <div
                                        className="w-6 h-6 flex items-center justify-center
    rounded-full bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    "
                                    >
                                        <X
                                            size={14}
                                            className="cursor-pointer text-gray-400 hover:text-red-500"
                                            onClick={() => removeField(field)}
                                        /></div>
                                )}

                            </div>


                            {/* CAPTION */}

                            <div className="px-3 py-2">

                                <InputField
                                    label=""
                                    placeholder="Enter Caption"
                                    disabled={!isSelected}
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );
};

export default FieldsRowSelectorTable;