import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Triangle } from "lucide-react";
import { componentdummyData } from "./component/componentdummyData";

const ComponentGroupTable = ({ search = "", groups, onAddParameter = () => {} }) => {

    const [openGroup, setOpenGroup] = useState(null);

    const toggleGroup = (group) => {
        setOpenGroup((prev) => (prev === group ? null : group));
    };

    return (

        <div className="border border-gray-200 dark:border-gray-700 overflow-hidden rounded-sm">

            {/* Scroll only body */}
            <div className="max-h-[350px] overflow-y-auto table-scroll no-scrollbar bg-white dark:bg-gray-800">

                <table className="w-full text-[0.7rem]">

                    <tbody>

                        {groups.map((group) => (

                            <React.Fragment key={group}>

                                {/* Group Header */}
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
                                                    className={`transition-transform duration-200 ${openGroup === group
                                                        ? "rotate-180 text-gray-500 dark:text-gray-400"
                                                        : "rotate-90 text-[#8629DF]"
                                                        }`}
                                                />

                                                <span
                                                    className={`font-bold uppercase tracking-tight ${openGroup === group
                                                        ? "text-gray-600 dark:text-gray-200"
                                                        : "text-[#8629DF] dark:text-purple-400"
                                                        }`}
                                                >
                                                    {group}
                                                </span>

                                            </div>

                                            {openGroup === group ? (
                                                <ChevronUp
                                                    size={14}
                                                    className="text-gray-400 dark:text-gray-500"
                                                />
                                            ) : (
                                                <ChevronDown
                                                    size={14}
                                                    className="text-[#8629DF] dark:text-purple-400"
                                                />
                                            )}

                                        </div>

                                    </td>
                                </tr>

                                {/* Column Header */}
                                {openGroup === group && (
                                    <tr className="bg-gray-100 dark:bg-gray-700/80 text-[0.65rem] font-bold uppercase tracking-wider sticky top-0 z-10">
                                        <th className="px-6 py-1.5 text-left text-gray-500 dark:text-gray-300">
                                            Code
                                        </th>
                                        <th className="px-6 py-1.5 text-left text-gray-500 dark:text-gray-300">
                                            Description
                                        </th>
                                        <th className="px-6 py-1.5 text-center text-gray-500 dark:text-gray-300">
                                            Add
                                        </th>
                                    </tr>
                                )}

                                {/* Rows */}
                                {openGroup === group &&
                                    componentdummyData[group]
                                        .filter((item) => {

                                            if (!search.trim()) return true;

                                            const q = search.toLowerCase();

                                            return (
                                                item.code.toLowerCase().includes(q) ||
                                                item.desc.toLowerCase().includes(q)
                                            );
                                        })
                                        .map((item, i) => (

                                            <tr
                                                key={i}
                                                className="
                                                    border-b border-gray-100 dark:border-gray-700
                                                    hover:bg-gray-50 dark:hover:bg-gray-700/30
                                                    transition-all
                                                "
                                            >

                                                <td className="px-6 py-2 text-[0.65rem] font-bold">

                                                    <span className="bg-purple-50 dark:bg-purple-900/40 text-[#8629DF] dark:text-purple-300 px-2 py-0.5 rounded-sm border border-purple-100 dark:border-purple-800">
                                                        {item.code}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-2 text-gray-600 dark:text-gray-200">
                                                    {item.desc}
                                                </td>

                                                <td className="px-6 py-2 text-center">

                                                    <button
                                                        onClick={() => onAddParameter(item)}
                                                        className="
                                                            w-full  px-3 py-1 flex justify-center items-center  rounded-sm
                                                            bg-[#8629DF] dark:bg-gray-700
                                                            text-[#FFFFFF] dark:text-purple-300
                                                            hover:bg-[#8629DF]/60 hover:text-white
                                                            dark:hover:bg-[#8629DF] dark:hover:text-white

                                                            transition-all font-bold text-sm cursor-pointer 
                                                        "
                                                    >
                                                        <Plus className='w-5 h-5'/>
                                                        
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                            </React.Fragment>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default ComponentGroupTable;