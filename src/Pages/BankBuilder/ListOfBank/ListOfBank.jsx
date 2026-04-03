import { Copy, Download, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const ListOfBank = ({ onCreate }) => {

    const data = [
        { name: "Bank Report", summary: "Active", nonsummary: "Active", status: false },
        { name: "Employee Report", summary: "Active", nonsummary: "Active", status: false },
        { name: "Grade Report", summary: "Active", nonsummary: "Active", status: false },
        { name: "Bank Report", summary: "Active", nonsummary: "Active", status: false },
        { name: "Grade Report", summary: "Active", nonsummary: "Active", status: false },

    ];

    const [rows, setRows] = useState(data);

    const toggleStatus = (index) => {
        const updated = [...rows];
        updated[index].status = !updated[index].status;
        setRows(updated);
    };

    return (
        <div className="space-y-3">

            <h2 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                List Of Bank Advice(s)
            </h2>

            <div className="rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[900px]">

                        {/* Header */}
                        <div
                            className="ds-text-xs font-semibold text-white ds-bg-primary py-2 px-4 uppercase tracking-wider"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "0.8fr 1.7fr 2fr 80px 80px 120px",
                                gap: "10px",
                                alignItems: "center"
                            }}
                        >
                            <div>Report Name</div>
                            <div>Summary Sheet Configuration</div>
                            <div>Non-Summary Sheet Configuration</div>
                            <div className="text-center">Status</div>
                            <div className="text-center">Duplicate</div>
                            <div className="text-center">Action</div>
                        </div>

                        {/* Body Scroll */}
                        <div className="max-h-[400px] overflow-y-auto table-scroll bg-white dark:bg-gray-800 no-scrollbar">

                            {rows.map((row, i) => (

                                <div
                                    key={i}
                                    className="text-gray-700 dark:text-gray-200 py-2 px-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all ds-text-xs"
                                    style={{
                                        display: "grid",
                                gridTemplateColumns: "0.8fr 1.7fr 2fr 80px 80px 120px",
                                        gap: "10px",
                                        alignItems: "center"
                                    }}
                                >

                                    <div className="font-medium">{row.name}</div>

                                    <div className="text-center">{row.summary}</div>

                                    <div className="text-center">{row.nonsummary}</div>

                                    <div className="flex justify-center">
                                        <Switch
                                            checked={row.status}
                                            onCheckedChange={() => toggleStatus(i)}
                                            className="scale-75 data-[state=checked]:bg-ds-primary data-[state=checked]:border-ds-primary data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                                        />
                                    </div>

                                    <div className="flex justify-center">
                                        <Copy size={14} className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-ds-primary transition-colors" />
                                    </div>

                                    <div className="flex justify-center gap-4">

                                        <Download size={14} className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-ds-primary transition-colors" />

                                        <Pencil size={14} className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-ds-primary transition-colors" />

                                        <Trash2 size={14} className="cursor-pointer text-red-400 hover:text-red-600 transition-colors" />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ListOfBank;