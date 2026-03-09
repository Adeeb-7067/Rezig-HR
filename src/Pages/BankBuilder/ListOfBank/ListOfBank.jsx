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
        <div>

            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                List Of Bank Advice(S)
            </h2>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto">

                    <div className="min-w-[900px]">

                        {/* Header */}
                        <div
                            className="text-[0.75rem] font-semibold text-white bg-primary py-3 px-4"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1.5fr 1.5fr 1.5fr 120px 120px 120px",
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
                        <div className="max-h-[170px] overflow-y-auto table-scroll bg-white dark:bg-gray-900">

                            {rows.map((row, i) => (

                                <div
                                    key={i}
                                    className="text-Primary py-3 px-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1.5fr 1.5fr 1.5fr 120px 120px 120px",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>{row.name}</div>

                                    <div>{row.summary}</div>

                                    <div>{row.nonsummary}</div>

                                    <div className="flex justify-center">
                                        <Switch
                                            checked={row.status}
                                            onCheckedChange={() => toggleStatus(i)}
                                            className="data-[state=checked]:bg-[#8629df]"
                                        />
                                    </div>

                                    <div className="flex justify-center">
                                        <Copy size={14} className="cursor-pointer text-gray-500 hover:text-purple-600" />
                                    </div>

                                    <div className="flex justify-center gap-3">

                                        <Download size={14} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-purple-600" />

                                        <Pencil size={14} className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-purple-600" />

                                        <Trash2 size={14} className="cursor-pointer text-red-500 hover:text-red-700" />

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