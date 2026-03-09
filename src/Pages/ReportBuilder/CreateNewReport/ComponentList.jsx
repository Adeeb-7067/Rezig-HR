"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ComponentSearch from "@/Pages/PaycodeMaster/utils/ComponentSearch";
import ComponentFilter from "./component/ComponentFilter";
import ComponentGroupTable from "./ComponentGroupTable";
import { componentdummyData } from "./component/componentdummyData";

const ComponentList = () => {

    const allGroups = Object.keys(componentdummyData);

    const [search, setSearch] = useState("");
    const [selectedGroups, setSelectedGroups] = useState(allGroups);

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-colors">

            {/* Header */}
            <div className="p-5 space-y-4">

                <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
                    Component List
                </h3>

                {/* Search + Filter */}
                <div className="flex gap-3">

                    <div className="flex-1">
                        <ComponentSearch
                            value={search}
                            onChange={setSearch}
                        />
                    </div>

                    <ComponentFilter
                        groups={allGroups}
                        selected={selectedGroups}
                        onApply={setSelectedGroups}
                    />

                </div>

                {/* Selected Chips */}
                <div className="flex flex-wrap gap-2">

                    {selectedGroups.map((g) => (
                        <div
                            key={g}
                            className="
                                flex items-center gap-2
                                bg-gray-100 dark:bg-gray-800
                                text-gray-700 dark:text-gray-200
                                px-3 py-1
                                rounded-md
                                text-xs
                            "
                        >
                            {g}

                            <X
                                size={12}
                                className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500"
                                onClick={() =>
                                    setSelectedGroups((prev) =>
                                        prev.filter((i) => i !== g)
                                    )
                                }
                            />

                        </div>
                    ))}

                </div>

            </div>

            {/* Report Parameters Header */}
            <div className="bg-primary text-white px-5 py-3 text-sm font-medium rounded-t-sm">
                Report Parameters
            </div>

            {/* Table */}

            <ComponentGroupTable
                search={search}
                groups={selectedGroups}
            />


        </div>
    );
};

export default ComponentList;