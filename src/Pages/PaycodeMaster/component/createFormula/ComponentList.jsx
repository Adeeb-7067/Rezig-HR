// import React, { useState } from "react";
// import { ChevronDown, ChevronUp, Triangle, X } from "lucide-react";
// import ComponentFilter from "../../utils/ComponentFilter";
// import ComponentSearch from "../../utils/ComponentSearch";
// import { componentData } from "./componentData";

// const ComponentList = () => {
//     const allGroups = Object.keys(componentData);

//     const [selectedGroups, setSelectedGroups] = useState(allGroups);
//     const [search, setSearch] = useState("");
//     const [openGroup, setOpenGroup] = useState(null);

//     const toggleGroup = (group) =>
//         setOpenGroup((prev) => (prev === group ? null : group));

//     return (
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-5 shadow-sm transition-colors">

//             {/* Title */}
//             <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                 Component List
//             </h3>

//             {/* Search + Filter */}
//             <div className="flex items-center gap-3">
//                 <div className="flex-1">
//                     <ComponentSearch
//                         value={search}
//                         onChange={setSearch}
//                     />
//                 </div>
//                 <div>
//                     <ComponentFilter
//                         groups={allGroups}
//                         selected={selectedGroups}
//                         onApply={setSelectedGroups}
//                     />
//                 </div>

//             </div>

//             {/* Selected Chips */}
//             <div className="flex flex-wrap gap-2">
//                 {selectedGroups.map((g) => (
//                     <div
//                         key={g}
//                         className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 text-xs rounded-full flex items-center gap-2"
//                     >
//                         {g}
//                         <X
//                             size={12}
//                             className="cursor-pointer"
//                             onClick={() =>
//                                 setSelectedGroups((prev) =>
//                                     prev.filter((i) => i !== g)
//                                 )
//                             }
//                         />
//                     </div>
//                 ))}
//             </div>

//             {/* Table Wrapper */}
//             <div className="rounded-sm border border-gray-200 dark:border-gray-700">

//                 {/* Horizontal scroll */}
//                 <div className="overflow-x-auto no-scrollbar">

//                     <div className="min-w-[800px]">

//                         {/* Header */}
//                         <div
//                             className="text-xs rounded-t-sm font-semibold text-white bg-primary py-3 px-6"
//                             style={{
//                                 display: "grid",
//                                 gridTemplateColumns: "120px 2fr 1.2fr 100px",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <div>Code</div>
//                             <div>Description</div>
//                             <div>Pay Head Type</div>
//                             <div className="text-center">Add</div>
//                         </div>

//                         {/* Body */}
//                         <div className="max-h-[450px] overflow-y-auto table-scroll">

//                             {selectedGroups.map((group) => (
//                                 <React.Fragment key={group}>

//                                     {/* Group Header */}
//                                     <div
//                                         onClick={() => toggleGroup(group)}
//                                         className="
//                 flex items-center justify-between
//                 px-6 py-3
//                 bg-gray-100 dark:bg-gray-800
//                 cursor-pointer
//                 hover:bg-gray-200 dark:hover:bg-gray-700
//                 transition
//               "
//                                     >
//                                         <div className="flex items-center gap-3">

//                                             <Triangle
//                                                 size={8}
//                                                 fill="currentColor"
//                                                 stroke="none"
//                                                 className={`transition-transform ${openGroup === group
//                                                     ? "rotate-0 text-gray-800 dark:text-gray-200"
//                                                     : "rotate-180 text-primary"
//                                                     }`}
//                                             />

//                                             <span
//                                                 className={`text-sm font-medium ${openGroup === group
//                                                     ? "text-gray-800 dark:text-gray-200"
//                                                     : "text-primary"
//                                                     }`}
//                                             >
//                                                 {group}
//                                             </span>

//                                         </div>

//                                         {openGroup === group ? (
//                                             <ChevronUp size={16} />
//                                         ) : (
//                                             <ChevronDown size={16} className="text-primary" />
//                                         )}
//                                     </div>

//                                     {/* Rows */}
//                                     {openGroup === group &&
//                                         componentData[group]
//                                             .filter((item) => {
//                                                 if (!search.trim()) return true;

//                                                 const queryWords = search.toLowerCase().trim().split(/\s+/);

//                                                 const searchableText = `
//                     ${item.code}
//                     ${item.desc}
//                     ${item.type}
//                     ${group}
//                   `.toLowerCase();

//                                                 return queryWords.every((word) =>
//                                                     searchableText.includes(word)
//                                                 );
//                                             })
//                                             .map((item, i) => (
//                                                 <div
//                                                     key={i}
//                                                     className="
//                       text-xs py-3 px-6
//                       border-b border-gray-200 dark:border-gray-700
//                       hover:bg-gray-50 dark:hover:bg-gray-800
//                     "
//                                                     style={{
//                                                         display: "grid",
//                                                         gridTemplateColumns: "120px 2fr 1.2fr 100px",
//                                                         alignItems: "center",
//                                                     }}
//                                                 >

//                                                     <div>
//                                                         <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-1 rounded-md">
//                                                             {item.code}
//                                                         </span>
//                                                     </div>

//                                                     <div>{item.desc}</div>

//                                                     <div>{item.type}</div>

//                                                     <div className="flex justify-center">
//                                                         <button className="w-8 h-8 rounded-md bg-purple-100 text-purple-600 hover:bg-[#8629DF] hover:text-white transition">
//                                                             +
//                                                         </button>
//                                                     </div>

//                                                 </div>
//                                             ))}

//                                 </React.Fragment>
//                             ))}

//                         </div>

//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// };

// export default ComponentList;






import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Triangle, X } from "lucide-react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ComponentSearch from "../../utils/ComponentSearch";
import { componentData } from "./componentData";

const ComponentList = () => {

    const allGroups = Object.keys(componentData);

    const [search, setSearch] = useState("");
    const [openGroup, setOpenGroup] = useState(null);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [selectedGroups, setSelectedGroups] = useState(allGroups);
    const [tempGroups, setTempGroups] = useState(allGroups);

    const dropdownRef = useRef(null);

    const isAnyFilterChecked = tempGroups.length > 0;

    // Toggle accordion group
    const toggleGroup = (group) =>
        setOpenGroup((prev) => (prev === group ? null : group));

    // Toggle checkbox
    const toggleTempGroup = (group) => {
        setTempGroups((prev) =>
            prev.includes(group)
                ? prev.filter((g) => g !== group)
                : [...prev, group]
        );
    };

    // Apply filter
    const handleApplyFilter = () => {
        setSelectedGroups(tempGroups);
        setIsFilterOpen(false);
    };

    // Reset filter
    const handleResetFilter = () => {
        setTempGroups([]);
    };

    // Close filter on outside click
    useEffect(() => {
        const close = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-5 shadow-sm">

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Component List
            </h3>

            {/* Search + Filter */}
            <div className="flex items-center gap-3">

                <div className="flex-1">
                    <ComponentSearch value={search} onChange={setSearch} />
                </div>

                {/* Filter */}
                <div className="relative" ref={dropdownRef}>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="bg-primary text-white text-xs px-4 py-2 rounded-md flex items-center gap-1"
                    >
                        <HiAdjustmentsHorizontal size={14} />
                        Filter
                        {isFilterOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">

                            <h4 className="text-sm font-semibold border-b pb-2 mb-3">
                                Components
                            </h4>

                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {allGroups.map((group) => (
                                    <label
                                        key={group}
                                        className="flex items-center gap-2 text-sm cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={tempGroups.includes(group)}
                                            onChange={() => toggleTempGroup(group)}
                                            className="accent-[#8629DF]"
                                        />
                                        {group}
                                    </label>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex gap-2 mt-4 pt-3 border-t">

                                <button
                                    onClick={handleResetFilter}
                                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-xs px-3 py-2 rounded-md"
                                >
                                    Reset
                                </button>

                                <button
                                    onClick={handleApplyFilter}
                                    disabled={!isAnyFilterChecked}
                                    className={`flex-1 text-xs px-3 py-2 rounded-md transition
                    ${isAnyFilterChecked
                                            ? "bg-[#8629DF] hover:bg-[#8629DF]/80 text-white"
                                            : "bg-[#8629DF]/50 text-white cursor-not-allowed"
                                        }`}
                                >
                                    Apply
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            </div>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2">
                {selectedGroups.map((group) => (
                    <div
                        key={group}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 text-xs rounded-full flex items-center gap-2"
                    >
                        {group}
                        <X
                            size={12}
                            className="cursor-pointer"
                            onClick={() =>
                                setSelectedGroups((prev) =>
                                    prev.filter((g) => g !== group)
                                )
                            }
                        />
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">

                <div className="min-w-[800px]">

                    {/* Header */}
                    <div
                        className="text-xs font-semibold text-white bg-primary py-3 px-6"
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
                    <div className="max-h-[450px] overflow-y-auto">

                        {selectedGroups.map((group) => (
                            <React.Fragment key={group}>

                                {/* Group Header */}
                                <div
                                    onClick={() => toggleGroup(group)}
                                    className="flex items-center justify-between px-6 py-3 bg-gray-100 dark:bg-gray-800 cursor-pointer"
                                >

                                    <div className="flex items-center gap-3">
                                        <Triangle
                                            size={8}
                                            fill="currentColor"
                                            stroke="none"
                                            className={`transition-transform ${openGroup === group
                                                ? "rotate-0"
                                                : "rotate-180 text-primary"
                                                }`}
                                        />

                                        <span className="text-sm font-medium">
                                            {group}
                                        </span>
                                    </div>

                                    {openGroup === group
                                        ? <ChevronUp size={16} />
                                        : <ChevronDown size={16} />}
                                </div>

                                {/* Rows */}
                                {openGroup === group &&
                                    componentData[group]
                                        .filter((item) => {
                                            if (!search.trim()) return true;

                                            const q = search.toLowerCase();

                                            return (
                                                item.code.toLowerCase().includes(q) ||
                                                item.desc.toLowerCase().includes(q) ||
                                                item.type.toLowerCase().includes(q)
                                            );
                                        })
                                        .map((item, i) => (

                                            <div
                                                key={i}
                                                className="text-xs py-3 px-6 border-b border-gray-200 dark:border-gray-700"
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns: "120px 2fr 1.2fr 100px",
                                                    alignItems: "center",
                                                }}
                                            >

                                                <div>
                                                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md">
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
    );
};

export default ComponentList;