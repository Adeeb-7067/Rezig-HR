"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import ComponentSearch from "@/Pages/PaycodeMaster/utils/ComponentSearch";
import ComponentGroupTable from "./ComponentGroupTable";
import { componentdummyData } from "./component/componentdummyData";

const ComponentList = () => {

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
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">

            {/* HEADER */}
            <div className="p-5 space-y-4">

                <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
                    Component List
                </h3>

                {/* SEARCH + FILTER */}
                <div className="flex gap-3">

                    <div className="flex-1">
                        <ComponentSearch
                            value={search}
                            onChange={setSearch}
                        />
                    </div>

                    {/* FILTER */}
                    <div ref={dropdownRef} className="relative">

                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="bg-primary text-white text-xs px-4 py-2 rounded-sm flex items-center gap-1"
                        >
                            <HiAdjustmentsHorizontal size={14} />

                            Filter

                            {isFilterOpen
                                ? <IoMdArrowDropup />
                                : <IoMdArrowDropdown />}
                        </button>

                        {/* DROPDOWN */}
                        {isFilterOpen && (

                            <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">

                                <h4 className="text-sm font-semibold border-b pb-2 mb-3">
                                    Components
                                </h4>

                                {/* CHECKBOX LIST */}
                                <div className="space-y-2 max-h-60 overflow-y-auto">

                                    {groups.map((group) => (

                                        <label
                                            key={group}
                                            className="flex items-center gap-2 text-sm cursor-pointer"
                                        >

                                            <input
                                                type="checkbox"
                                                className="accent-[#8629DF]"
                                                checked={tempGroups.includes(group)}
                                                onChange={() => toggleGroup(group)}
                                            />

                                            {group}

                                        </label>

                                    ))}

                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex gap-2 mt-4 pt-3 border-t">

                                    <button
                                        onClick={handleReset}
                                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-xs px-3 py-2 rounded-md"
                                    >
                                        Reset
                                    </button>

                                    <button
                                        onClick={handleApply}
                                        disabled={!isAnySelected}
                                        className={`flex-1 text-xs px-3 py-2 rounded-md transition
                      ${isAnySelected
                                                ? "bg-[#8629DF] hover:bg-[#8629DF]/80 text-white"
                                                : "bg-[#8629DF]/50 text-white cursor-not-allowed"
                                            }
                    `}
                                    >
                                        Apply
                                    </button>

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
                            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-md text-xs"
                        >

                            {group}

                            <X
                                size={12}
                                className="cursor-pointer text-gray-500 hover:text-red-500"
                                onClick={() => removeChip(group)}
                            />

                        </div>

                    ))}

                </div>

            </div>

            {/* TABLE HEADER */}
            <div className="bg-primary rounded-t-sm  text-white px-5 py-3 text-sm font-medium">
                Report Parameters
            </div>

            {/* TABLE */}
            <ComponentGroupTable
                search={search}
                groups={selectedGroups}
            />

        </div>
    );
};

export default ComponentList;