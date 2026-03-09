import { useState } from "react";
import { ChevronDown, ChevronUp, Triangle } from "lucide-react";
import { componentdummyData } from "./component/componentdummyData";

const ComponentGroupTable = ({ search = "", groups }) => {

    const [openGroup, setOpenGroup] = useState(null);

    const toggleGroup = (group) => {
        setOpenGroup((prev) => (prev === group ? null : group));
    };

    return (

        <div className="border border-gray-200 dark:border-gray-700 overflow-hidden">

            {/* Scroll only body */}
            <div className="max-h-[350px] overflow-y-auto table-scroll">

                <table className="w-full text-sm">

                    <tbody>

                        {groups.map((group) => (

                            <>

                                {/* Group Header */}
                                <tr key={group}>
                                    <td colSpan={3} className="p-0">

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

                                            <div className="flex items-center gap-2">

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
                                                    className={`font-medium ${openGroup === group
                                                        ? "text-gray-800 dark:text-gray-200"
                                                        : "text-primary dark:text-purple-400"
                                                        }`}
                                                >
                                                    {group}
                                                </span>

                                            </div>

                                            {openGroup === group ? (
                                                <ChevronUp
                                                    size={16}
                                                    className="text-gray-700 dark:text-gray-300"
                                                />
                                            ) : (
                                                <ChevronDown
                                                    size={16}
                                                    className="text-primary dark:text-purple-400"
                                                />
                                            )}

                                        </div>

                                    </td>
                                </tr>

                                {/* Column Header */}
                                {openGroup === group && (
                                    <tr className="bg-gray-200 dark:bg-gray-700 text-xs sticky top-0">
                                        <th className="px-6 py-2 text-left text-gray-700 dark:text-gray-200">
                                            Code
                                        </th>
                                        <th className="px-6 py-2 text-left text-gray-700 dark:text-gray-200">
                                            Description
                                        </th>
                                        <th className="px-6 py-2 text-center text-gray-700 dark:text-gray-200">
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
                                                    border-b border-gray-200 dark:border-gray-700
                                                    hover:bg-gray-50 dark:hover:bg-gray-800
                                                    transition
                                                "
                                            >

                                                <td className="px-6 py-3 text-xs font-medium">

                                                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-1 rounded-md">
                                                        {item.code}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                                                    {item.desc}
                                                </td>

                                                <td className="px-6 py-3 text-center">

                                                    <button
                                                        className="
                                                            w-8 h-8 rounded-md
                                                            bg-purple-100 dark:bg-purple-900
                                                            text-purple-600 dark:text-purple-300
                                                            hover:bg-primary hover:text-white
                                                            transition
                                                        "
                                                    >
                                                        +
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                            </>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default ComponentGroupTable;