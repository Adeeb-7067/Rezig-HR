import React, { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionCard from "../../../components/cards/SectionCard";
import PaycodeFilters from "../utils/PaycodeFilters";
import ViewPaycodeModal from "./createPaycodeMaster/ViewPaycodeModal";

const PaycodeList = ({ data }) => {

    const [payHeadType, setPayHeadType] = useState("");
    const [variableType, setVariableType] = useState("");
    const [rows, setRows] = useState(data);
    const [viewData, setViewData] = useState(null);

    const filteredData = useMemo(() => {
        return rows.filter((item) => {
            return (
                (!payHeadType || item.type === payHeadType) &&
                (!variableType || item.variableType === variableType)
            );
        });
    }, [rows, payHeadType, variableType]);

    const handleToggle = (index) => {
        const updated = [...rows];
        updated[index].status = !updated[index].status;
        setRows(updated);
    };

    return (
        <div>

            <PaycodeFilters
                payHeadType={payHeadType}
                setPayHeadType={setPayHeadType}
                variableType={variableType}
                setVariableType={setVariableType}
            />

            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto no-scrollbar">

                    <div className="min-w-[900px]">

                        {/* Header */}
                        <div
                            className="text-xs font-semibold text-white ds-bg-primary py-3 px-6"
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "120px 2fr 1.5fr 120px 120px 140px",
                                alignItems: "center",
                            }}
                        >
                            <div>Code</div>
                            <div>Description</div>
                            <div>Formula</div>
                            <div>Type</div>
                            <div>Status</div>
                            <div className="text-center">Action</div>
                        </div>

                        {/* Body */}
                        <div className="max-h-[110px] overflow-y-auto table-scroll">

                            {filteredData.map((item, i) => (
                                <div
                                    key={i}
                                    className="ds-text-xs text-gray-800 dark:text-gray-200 py-2 px-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "120px 2fr 1.5fr 120px 120px 140px",
                                        alignItems: "center",
                                    }}
                                >

                                    <div>{item.code}</div>

                                    <div>{item.desc}</div>

                                    <div>{item.formula}</div>

                                    <div>{item.type}</div>

                                    <div>
                                        <Switch
                                            checked={item.status}
                                            onCheckedChange={() => handleToggle(i)}
                                            className="data-[state=checked]:bg-ds-primary"
                                        />
                                    </div>

                                    <div className="flex justify-center gap-4">
                                        <Eye
                                            size={14}
                                            className="cursor-pointer hover:text-ds-primary"
                                            onClick={() => setViewData(item)}
                                        />
                                        <Pencil
                                            size={14}
                                            className="cursor-pointer hover:text-ds-primary"
                                        />
                                        <Trash2
                                            size={14}
                                            className="cursor-pointer text-red-500 hover:text-red-700"
                                        />
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>



            </div>
            {/* Footer */}
            <div className="flex justify-end p-4">
                <button className="border border-ds-primary text-ds-primary text-xs sm:text-[0.7rem]   py-1   rounded-sm w-full sm:w-auto md:w-24 hover:bg-ds-primary hover:text-white transition">
                    Log Report
                </button>
            </div>
            <ViewPaycodeModal
                open={!!viewData}
                data={viewData}
                onClose={() => setViewData(null)}
            />

        </div>
    );
};

export default PaycodeList;