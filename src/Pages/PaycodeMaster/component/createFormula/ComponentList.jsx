import React, { useState } from "react";
import { ChevronDown, ChevronUp, Triangle, X } from "lucide-react";
import ComponentFilter from "../../utils/ComponentFilter";
import ComponentSearch from "../../utils/ComponentSearch";
import { componentData } from "./componentData";

const ComponentList = () => {
    const allGroups = Object.keys(componentData);

    const [selectedGroups, setSelectedGroups] = useState(allGroups);
    const [search, setSearch] = useState("");
    const [openGroup, setOpenGroup] = useState(null);

    const toggleGroup = (group) =>
        setOpenGroup((prev) => (prev === group ? null : group));

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-5 shadow-sm transition-colors">

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Component List
            </h3>

            {/* Search + Filter */}
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <ComponentSearch
                        value={search}
                        onChange={setSearch}
                    />
                </div>
                <div>
                    <ComponentFilter
                        groups={allGroups}
                        selected={selectedGroups}
                        onApply={setSelectedGroups}
                    />
                </div>

            </div>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2">
                {selectedGroups.map((g) => (
                    <div
                        key={g}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 text-xs rounded-full flex items-center gap-2"
                    >
                        {g}
                        <X
                            size={12}
                            className="cursor-pointer"
                            onClick={() =>
                                setSelectedGroups((prev) =>
                                    prev.filter((i) => i !== g)
                                )
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Table Wrapper */}
            <div className="rounded-sm border border-gray-200 dark:border-gray-700">

                {/* Horizontal scroll */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[800px]">

                        {/* Header */}
                        <div
                            className="text-xs rounded-t-sm font-semibold text-white bg-primary py-3 px-6"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "120px 2fr 1.2fr 100px",
                                alignItems: "center",
                            }}
                        >
                            <div>Code</div>
                            <div>Description</div>
                            <div>Pay Head Type</div>
                            <div className="text-center">Add</div>
                        </div>

                        {/* Body */}
                        <div className="max-h-[450px] overflow-y-auto table-scroll">

                            {selectedGroups.map((group) => (
                                <React.Fragment key={group}>

                                    {/* Group Header */}
                                    <div
                                        onClick={() => toggleGroup(group)}
                                        className="
                flex items-center justify-between
                px-6 py-3
                bg-gray-100 dark:bg-gray-800
                cursor-pointer
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition
              "
                                    >
                                        <div className="flex items-center gap-3">

                                            <Triangle
                                                size={8}
                                                fill="currentColor"
                                                stroke="none"
                                                className={`transition-transform ${openGroup === group
                                                    ? "rotate-0 text-gray-800 dark:text-gray-200"
                                                    : "rotate-180 text-primary"
                                                    }`}
                                            />

                                            <span
                                                className={`text-sm font-medium ${openGroup === group
                                                    ? "text-gray-800 dark:text-gray-200"
                                                    : "text-primary"
                                                    }`}
                                            >
                                                {group}
                                            </span>

                                        </div>

                                        {openGroup === group ? (
                                            <ChevronUp size={16} />
                                        ) : (
                                            <ChevronDown size={16} className="text-primary" />
                                        )}
                                    </div>

                                    {/* Rows */}
                                    {openGroup === group &&
                                        componentData[group]
                                            .filter((item) => {
                                                if (!search.trim()) return true;

                                                const queryWords = search.toLowerCase().trim().split(/\s+/);

                                                const searchableText = `
                    ${item.code}
                    ${item.desc}
                    ${item.type}
                    ${group}
                  `.toLowerCase();

                                                return queryWords.every((word) =>
                                                    searchableText.includes(word)
                                                );
                                            })
                                            .map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="
                      text-xs py-3 px-6
                      border-b border-gray-200 dark:border-gray-700
                      hover:bg-gray-50 dark:hover:bg-gray-800
                    "
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "120px 2fr 1.2fr 100px",
                                                        alignItems: "center",
                                                    }}
                                                >

                                                    <div>
                                                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-1 rounded-md">
                                                            {item.code}
                                                        </span>
                                                    </div>

                                                    <div>{item.desc}</div>

                                                    <div>{item.type}</div>

                                                    <div className="flex justify-center">
                                                        <button className="w-8 h-8 rounded-md bg-purple-100 text-purple-600 hover:bg-[#8629DF] hover:text-white transition">
                                                            +
                                                        </button>
                                                    </div>

                                                </div>
                                            ))}

                                </React.Fragment>
                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ComponentList;