import React, { useRef } from "react";
import { Calendar } from "lucide-react";

export default function DateInput({ label, value, setValue, placeholder = "Select a Date" }) {
    const dateRef = useRef(null);

    const openPicker = () => {
        if (dateRef.current?.showPicker) {
            dateRef.current.showPicker();
        } else {
            dateRef.current.focus();
        }
    };

    return (
        <div className="w-full">
            <label className="text-xs text-gray-500 dark:text-gray-400">
                {label}
            </label>

            <div
                onClick={openPicker}
                className="relative mt-1 cursor-pointer"
            >
                <div className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 
                bg-gray-100 dark:bg-gray-800 flex items-center justify-between">

                    <span
                        className={`text-sm ${value
                                ? "text-gray-800 dark:text-gray-200"
                                : "text-gray-400"
                            }`}
                    >
                        {value || placeholder}
                    </span>

                    <Calendar size={16} className="text-gray-600 dark:text-gray-400" />
                </div>

                <input
                    ref={dateRef}
                    type="date"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}