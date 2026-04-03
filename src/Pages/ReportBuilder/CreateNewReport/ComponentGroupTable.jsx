import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Triangle } from "lucide-react";
import { componentdummyData } from "./component/componentdummyData";

const CODE_GROUPS = ["Salary Field"];

const ComponentGroupTable = ({ search = "", groups, onAddParameter = () => {} }) => {

    const [openGroups, setOpenGroups] = useState(new Set());

    const toggleGroup = (group) => {
        setOpenGroups((prev) => {
            const next = new Set(prev);
            next.has(group) ? next.delete(group) : next.add(group);
            return next;
        });
    };

    const isOpen = (group) => openGroups.has(group);
    const uniqueGroups = [...new Set(groups)];

    return (
        <div className="border border-gray-200 dark:border-gray-700 overflow-hidden rounded-sm">
            <div className="max-h-[350px] overflow-y-auto table-scroll no-scrollbar bg-white dark:bg-gray-800">

                {/* ✅ Fix: always 3 fixed columns so layout never shifts */}
                <table className="w-full ds-text-xs table-fixed">
                    <colgroup>
                        <col className="w-[30%]" />
                        <col className="w-[55%]" />
                        <col className="w-[15%]" />
                    </colgroup>

                    <tbody>
                        {uniqueGroups.map((group) => {

                            const hasCode = CODE_GROUPS.includes(group);
                            const open = isOpen(group);

                            const seen = new Set();
                            const uniqueItems = (componentdummyData[group] || []).filter((item) => {
                                const key = `${item.code}__${item.desc}`;
                                if (seen.has(key)) return false;
                                seen.add(key);
                                return true;
                            });

                            const filteredItems = uniqueItems.filter((item) => {
                                if (!search.trim()) return true;
                                const q = search.toLowerCase();
                                return (
                                    item.code?.toLowerCase().includes(q) ||
                                    item.desc?.toLowerCase().includes(q)
                                );
                            });

                            return (
                                <React.Fragment key={group}>

                                    {/* Group Header — always colSpan 3 */}
                                    <tr>
                                        <td colSpan={3} className="p-0">
                                            <div
                                                onClick={() => toggleGroup(group)}
                                                className="
                                                    flex items-center justify-between
                                                    px-4 py-2
                                                    bg-gray-50 dark:bg-gray-700/50
                                                    cursor-pointer
                                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                                    transition-all
                                                "
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Triangle
                                                        size={6}
                                                        fill="currentColor"
                                                        stroke="none"
                                                        className={`transition-transform duration-200 ${
                                                            open
                                                                ? "rotate-180 text-gray-500 dark:text-gray-400"
                                                                : "rotate-90 ds-text-primary"
                                                        }`}
                                                    />
                                                    <span
                                                        className={`font-bold uppercase tracking-tight ${
                                                            open
                                                                ? "text-gray-600 dark:text-gray-200"
                                                                : "ds-text-primary dark:text-ds-primary"
                                                        }`}
                                                    >
                                                        {group}
                                                    </span>
                                                </div>

                                                {open ? (
                                                    <ChevronUp size={14} className="text-gray-400 dark:text-gray-500" />
                                                ) : (
                                                    <ChevronDown size={14} className="ds-text-primary dark:text-ds-primary" />
                                                )}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Column Headers — always 3 cols */}
                                    {open && (
                                        <tr className="bg-gray-100 dark:bg-gray-700/80 text-[0.65rem] font-bold uppercase tracking-wider sticky top-0 z-10">
                                            {hasCode ? (
                                                <>
                                                    <th className="px-4 py-1.5 text-left text-gray-500 dark:text-gray-300">Code</th>
                                                    <th className="px-4 py-1.5 text-left text-gray-500 dark:text-gray-300">Description</th>
                                                </>
                                            ) : (
                                                // ✅ Name spans col 1 + col 2 so Add stays in col 3
                                                <th colSpan={2} className="px-4 py-1.5 text-left text-gray-500 dark:text-gray-300">Name</th>
                                            )}
                                            <th className="px-4 py-1.5 text-center text-gray-500 dark:text-gray-300">Add</th>
                                        </tr>
                                    )}

                                    {/* Rows — always 3 cols */}
                                    {open &&
                                        filteredItems.map((item, i) => (
                                            <tr
                                                key={i}
                                                className="
                                                    border-b border-gray-100 dark:border-gray-700
                                                    hover:bg-gray-50 dark:hover:bg-gray-700/30
                                                    transition-all
                                                "
                                            >
                                                {hasCode ? (
                                                    <>
                                                        <td className="px-4 py-2 text-[0.65rem] font-bold">
                                                            <span className="bg-purple-50 dark:bg-ds-primary/40 ds-text-primary dark:text-ds-primary px-2 py-0.5 rounded-sm border border-purple-100 dark:border-ds-primary/50">
                                                                {item.code}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2 text-gray-600 dark:text-gray-200">
                                                            {item.desc}
                                                        </td>
                                                    </>
                                                ) : (
                                                    // ✅ Name spans col 1 + col 2
                                                    <td colSpan={2} className="px-4 py-2 text-gray-600 dark:text-gray-200">
                                                        {item.desc}
                                                    </td>
                                                )}

                                                <td className="px-4 py-2 text-center">
                                                    <button
                                                        onClick={() => onAddParameter(item)}
                                                        className="
                                                            w-full px-3 py-1 flex justify-center items-center rounded-sm
                                                            bg-ds-primary dark:bg-gray-700
                                                            text-white dark:text-ds-primary
                                                            hover:bg-ds-primary/60 hover:text-white
                                                            dark:hover:bg-ds-primary dark:hover:text-white
                                                            transition-all font-bold text-sm cursor-pointer
                                                        "
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ComponentGroupTable;