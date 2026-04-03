

import { useState } from "react";
import ReportHeader from "../ReportHeader";
import ComponentList from "./ComponentList";
import ReportActions from "./ReportActions";
import SelectedParameters from "./SelectedParameters";
import UserPermissionTable from "./UserPermissionTable";



const CreateNewReport = ({ onBack }) => {
    const [selectedParams, setSelectedParams] = useState([]);

    const handleAddParameter = (item) => {
        const newParam = {
            id: Date.now(),
            name: item.desc,
            code: item.code,
            order: selectedParams.length + 1
        };
        setSelectedParams((prev) => [...prev, newParam]);
    };

    const handleRemoveParameter = (id) => {
        setSelectedParams((prev) => prev.filter((param) => param.id !== id));
    };

    const handleUpdateOrder = (id, newOrder) => {
        setSelectedParams((prev) =>
            prev.map((param) =>
                param.id === id ? { ...param, order: newOrder } : param
            )
        );
    };

    return (
        <div className="space-y-6">

            {/* <ReportHeader /> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <ComponentList onAddParameter={handleAddParameter} />

                <SelectedParameters
                    selectedParameters={selectedParams}
                    onRemove={handleRemoveParameter}
                    onUpdateOrder={handleUpdateOrder}
                />

            </div>

            <UserPermissionTable />

      <div className="flex flex-row sm:flex-row justify-end w-full gap-2 mt-4">
                    <button
                        onClick={() => { onBack() }}
                        type="button"
                        className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
                    >
                        Back
                    </button>
                <button className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24">
                    Reset
                </button>

                <button className="font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer bg-ds-primary text-white hover:bg-ds-primary/80">
                    Create Report
                </button>

            </div>
        </div>
    );
};

export default CreateNewReport;