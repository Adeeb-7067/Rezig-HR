"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import ComponentSearch from "@/Pages/PaycodeMaster/utils/ComponentSearch";
import ComponentGroupTable from "./ComponentGroupTable";
import { componentdummyData } from "./component/componentdummyData";

const ComponentList = ({ onAddParameter = () => {} }) => {

    const groups = Object.keys(componentdummyData);

    const [search, setSearch] = useState("");
    const [selectedGroups, setSelectedGroups] = useState(groups);
    const [tempGroups, setTempGroups] = useState(groups);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const dropdownRef = useRef(null);

    const isAnySelected = tempGroups.length > 0;

    /* -----------------------------
        CLOSE DROPDOWN ON OUTSIDE CLICK
    ------------------------------*/
    useEffect(() => {

        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);

    }, []);

    /* -----------------------------
        TOGGLE GROUP CHECKBOX
    ------------------------------*/
    const toggleGroup = (group) => {

        setTempGroups((prev) =>
            prev.includes(group)
                ? prev.filter((g) => g !== group)
                : [...prev, group]
        );

    };

    /* -----------------------------
        APPLY FILTER
    ------------------------------*/
    const handleApply = () => {

        setSelectedGroups(tempGroups);
        setIsFilterOpen(false);

    };

    /* -----------------------------
        RESET FILTER
    ------------------------------*/
    const handleReset = () => {

        setTempGroups([]);

    };

    /* -----------------------------
        REMOVE CHIP
    ------------------------------*/
    const removeChip = (group) => {

        setSelectedGroups((prev) =>
            prev.filter((g) => g !== group)
        );

    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">

            {/* HEADER */}
            <div className="p-4 space-y-4">

                <h3 className="font-bold text-gray-500 dark:text-gray-300 text-[0.8rem]">
                    Component List
                </h3>

                {/* SEARCH + FILTER */}
                <div className="grid grid-cols-2 md:flex md:justify-around gap-2 md:gap-2 w-full flex-wrap-reverse md:flex-nowrap">
                    <div className="w-full md:w-[70%]">
                        <ComponentSearch
                            value={search}
                            onChange={setSearch}
                        />
                    </div>

                    {/* FILTER */}
                    <div ref={dropdownRef} className="relative min-w-[50%] md:min-w-[5.5rem] flex items-center justify-center gap-1">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="bg-[#8629DF] dark:border dark:border-gray-500 text-white cursor-pointer text-xs md:text-[0.7rem] px-4 p-1 md:p-0 min-w-full md:min-w-[5.5rem] rounded-sm flex items-center justify-center gap-1 h-[35px]"
                        >
                            <HiAdjustmentsHorizontal className="md:w-4 md:h-4" />
                            Filter{" "}
                            {isFilterOpen ? (
                                <IoMdArrowDropup className="w-3 mt-0.5 h-3" />
                            ) : (
                                <IoMdArrowDropdown className="w-3 mt-0.5 h-3" />
                            )}
                        </button>

                        {/* DROPDOWN */}
                        {isFilterOpen && (
                            <div className="absolute right-0 top-full mt-1 z-[100] shadow-lg h-fit">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-48 p-4 overflow-y-auto border border-gray-200 dark:border-gray-400 no-scrollbar">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-50 mb-3 border-b-2 pb-2">
                                        Filter
                                    </h2>

                                    {/* CHECKBOX LIST */}
                                    <div className="space-y-1 h-fit max-h-42 overflow-y-auto pr-2 no-scrollbar">
                                        {groups.map((group) => (
                                            <label
                                                key={group}
                                                className="flex items-center gap-2 text-[0.7rem] text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-[#8629DF]"
                                                    checked={tempGroups.includes(group)}
                                                    onChange={() => toggleGroup(group)}
                                                />
                                                {group}
                                            </label>
                                        ))}
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="mt-4 flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <button
                                            onClick={handleReset}
                                            className="flex-1 flex items-center justify-center gap-1 cursor-pointer bg-gray-200 dark:bg-gray-800 border px-3 py-2 rounded-md text-gray-700 dark:text-gray-50 dark:border-gray-400 hover:bg-gray-300 text-sm"
                                        >
                                            Reset
                                        </button>

                                        <button
                                            onClick={handleApply}
                                            disabled={!isAnySelected}
                                            className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm transition-all duration-200
                        ${isAnySelected
                                                    ? "bg-[#8629DF] hover:bg-[#8629DF]/70 text-white cursor-pointer"
                                                    : "bg-[#8629DF]/80 opacity-50 cursor-not-allowed text-white"
                                                }
                      `}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* SELECTED CHIPS */}
                <div className="flex flex-wrap gap-2">
                    {selectedGroups.map((group) => (
                        <div
                            key={group}
                            className="bg-gray-100 dark:bg-gray-800 dark:border-gray-400 px-3 py-1 rounded-sm text-[0.7rem] flex items-center gap-2 border border-gray-200"
                        >
                            <span className="text-gray-900 dark:text-gray-50 text-[0.7rem]">
                                {group}
                            </span>
                            <button
                                onClick={() => removeChip(group)}
                                className="text-gray-500 hover:text-red-500 text-lg cursor-pointer leading-none w-4 h-4 flex items-center justify-center transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            {/* TABLE HEADER */}
            <div className="bg-[#8629DF] rounded-t-sm text-white px-5 py-2 text-[0.75rem] font-bold uppercase tracking-wider">
                Report Parameters
            </div>

            {/* TABLE */}
            <ComponentGroupTable
                search={search}
                groups={selectedGroups}
                onAddParameter={onAddParameter}
            />

        </div>
    );
};

export default ComponentList;