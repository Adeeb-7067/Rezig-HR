import React, { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import SectionCard from "../../../components/cards/SectionCard";
import ViewFormulaModal from "./createFormula/ViewFormulaModal";

const FormulaList = ({ data }) => {

    const [viewData, setViewData] = useState(null);

    return (
        <div>
            <h1 className="text-lg text-[#58585A] font-semibold mb-3">
                Formula List
            </h1>
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">

                {/* Horizontal Scroll */}
                <div className="overflow-x-auto">

                    <div className="min-w-[700px]">

                        {/* Header */}
                        <div
                            className="text-[0.7rem] font-semibold text-white bg-primary py-3 px-6"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "140px 1.5fr 1.5fr 100px 120px",
                                alignItems: "center"
                            }}
                        >
                            <div>Formula Code</div>
                            <div>Formula Description</div>
                            <div>Formula</div>
                            <div>Sequence</div>
                            <div className="text-center">Action</div>
                        </div>

                        {/* Body */}
                        <div className="max-h-[200px] overflow-y-auto table-scroll">

                            {data.map((item, i) => (

                                <div
                                    key={i}
                                    className="text-[0.7rem] py-3 px-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "140px 1.5fr 1.5fr 100px 120px",
                                        alignItems: "center"
                                    }}
                                >

                                    <div>{item.code}</div>

                                    <div>{item.desc}</div>

                                    <div>{item.formula}</div>

                                    <div>
                                        <input
                                            type="text"
                                            value={item.sequence}
                                            readOnly
                                            className="w-16 h-7 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>

                                    <div className="flex justify-center gap-4">
                                        <Eye
                                            size={14}
                                            className="cursor-pointer hover:text-[#7B2FF7]"
                                            onClick={() => setViewData(item)}
                                        />
                                        <Pencil
                                            size={14}
                                            className="cursor-pointer hover:text-[#7B2FF7]"
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

            <ViewFormulaModal
                open={!!viewData}
                data={viewData}
                onClose={() => setViewData(null)}
            />

        </div>
    );
};

export default FormulaList;