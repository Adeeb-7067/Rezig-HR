import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

const ComponentFilter = ({ groups, selected, onApply }) => {
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(selected);
    const ref = useRef(null);

    useEffect(() => {
        setTemp(selected);
    }, [selected]);

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const toggle = (g) =>
        setTemp((prev) =>
            prev.includes(g) ? prev.filter((i) => i !== g) : [...prev, g]
        );

    const handleApply = () => {
        onApply(temp);
        setOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            {/* Filter Button */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm shadow hover:opacity-90 transition"
            >
                <SlidersHorizontal size={16} />
                Fields
            </button>

            {open && (
                <>
                    {/* Overlay (Mobile Only) */}
                    <div className="fixed inset-0 bg-black/30 z-40 sm:hidden" />

                    {/* Filter Panel */}
                    <div
                        className="
                        fixed sm:absolute
                        right-0 sm:mt-3
                        bottom-0 sm:bottom-auto
                        w-full sm:w-80
                        bg-white dark:bg-gray-900
                        rounded-t-3xl sm:rounded-2xl
                        shadow-2xl
                        z-50
                        p-6
                        space-y-5
                        border border-gray-200 dark:border-gray-700
                        transition-colors
                    "
                    >
                        {/* Header */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Components
                            </h3>
                            <div className="h-px bg-gray-300 dark:bg-gray-700 mt-3"></div>
                        </div>

                        {/* Checkbox List */}
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                            {groups.map((g) => (
                                <label
                                    key={g}
                                    className="flex items-center gap-3 cursor-pointer text-base text-gray-700 dark:text-gray-300"
                                >
                                    <input
                                        type="checkbox"
                                        checked={temp.includes(g)}
                                        onChange={() => toggle(g)}
                                        className="w-5 h-5 accent-[#8629DF] rounded"
                                    />
                                    {g}
                                </label>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between pt-4">
                            <button
                                onClick={() => setTemp([])}
                                className="
                                    bg-gray-300 dark:bg-gray-700
                                    text-gray-600 dark:text-gray-200
                                    px-6 py-2
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    hover:bg-gray-400 dark:hover:bg-gray-600
                                    transition
                                "
                            >
                                Reset
                            </button>

                            <button
                                onClick={handleApply}
                                className="
                                    bg-gradient-to-r
                                    from-[#8629DF]
                                    to-[#6D1FC7]
                                    text-white
                                    px-8 py-2
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    shadow-md
                                    hover:opacity-90
                                    transition
                                "
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ComponentFilter;