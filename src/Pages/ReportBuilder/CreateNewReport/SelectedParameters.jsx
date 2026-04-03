"use client";

import { useState, useEffect } from "react";
import { Trash2, ArrowUpDown } from "lucide-react";

const SelectedParameters = ({ selectedParameters = [], onRemove = () => {}, onUpdateOrder = () => {} }) => {

    const fallback = [
        { id: 1, name: "Father Name", order: 1 },
        { id: 2, name: "Father Name", order: 1 },
        { id: 3, name: "Father Name", order: 1 },
        { id: 4, name: "Father Name", order: 1 },
        { id: 5, name: "Mother Name", order: 2 },
        { id: 6, name: "Mother Name", order: 2 },
        { id: 7, name: "Transport Allowance", order: 3 },
        { id: 8, name: "Transport Allowance", order: 4 },
        { id: 9, name: "HRA", order: 5 },
        { id: 10, name: "HRA", order: 6 },
        { id: 11, name: "Mother Name", order: 2 },
        { id: 12, name: "Mother Name", order: 2 },
        { id: 13, name: "Transport Allowance", order: 3 },
        { id: 14, name: "Transport Allowance", order: 4 },
        { id: 15, name: "HRA", order: 5 },
        { id: 16, name: "HRA", order: 6 },
    ];

    const source = selectedParameters?.length > 0 ? selectedParameters : fallback;

    const [data, setData] = useState(source);
    const [isSequenced, setIsSequenced] = useState(false);

    useEffect(() => {
        const incoming = selectedParameters?.length > 0 ? selectedParameters : fallback;
        setData(incoming);
        setIsSequenced(false);
    }, [selectedParameters]);

    const handleSequence = () => {
        if (isSequenced) {
            const incoming = selectedParameters?.length > 0 ? selectedParameters : fallback;
            setData([...incoming]);
        } else {
            setData(prev => [...prev].sort((a, b) => a.order - b.order));
        }
        setIsSequenced(prev => !prev);
    };

    const handleUpdateOrder = (id, value) => {
        setData(prev => prev.map(item => item.id === id ? { ...item, order: value } : item));
        onUpdateOrder(id, value);
    };

    const handleRemove = (id) => {
        setData(prev => prev.filter(item => item.id !== id));
        onRemove(id);
    };

    return (
        <div className="bg-white dark:bg-gray-800 h-full p-4">

            {/* Title */}
            <div className="flex items-center justify-between px-1 py-2">

                <h3 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                    Selected Parameters for the report
                </h3>

                <button
                    onClick={handleSequence}
                    className={`flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-sm border transition-all
                        ${isSequenced
                            ? "ds-bg-primary text-white ds-border-primary"
                        : "text-ds-primary bg-[#F7F2FD] dark:bg-[#2b1d3f] border-purple-100 dark:border-ds-primary/80 hover:bg-ds-primary hover:text-white"
                        }`}
                >
                    {/* <ArrowUpDown size={10} /> */}
                    {isSequenced ? "Sequence" : "Sequence"}
                </button>

            </div>

            {/* Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden shadow-sm">

                {/* Header */}
                <div className="grid grid-cols-3 ds-bg-primary text-white text-[0.65rem] font-bold uppercase tracking-wider px-4 py-2">
                    <div>DESCRIPTION</div>
                    <div className="text-center">Order</div>
                    <div className="text-center">Delete</div>
                </div>

                {/* Scroll Body */}
                <div className="max-h-[350px] overflow-y-auto table-scroll no-scrollbar bg-white dark:bg-gray-800">

                    {data.map((item, i) => (
                        <div
                            key={item.id || i}
                            className="grid grid-cols-3 px-4 py-2 items-center border-b
                                border-gray-100 dark:border-gray-700 ds-text-xs
                                hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all"
                        >
                            <div className="text-gray-600 dark:text-gray-200 font-medium">
                                {item.name}
                            </div>

                            <div className="flex justify-center">
                                <input
                                    type="number"
                                    value={item.order}
                                    onChange={(e) => handleUpdateOrder(item.id, parseInt(e.target.value))}
                                    className="w-12 h-6 text-center border border-gray-200 dark:border-gray-700
                                        bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200
                                        rounded-sm px-1 ds-text-xs
                                        focus:outline-none focus:ring-1 focus:ring-ds-primary"
                                />
                            </div>

                            <div className="flex justify-center">
                                <Trash2
                                    size={14}
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
                                />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default SelectedParameters;