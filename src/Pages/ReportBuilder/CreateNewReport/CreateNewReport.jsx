

import { useState } from "react";
import ReportHeader from "../ReportHeader";
import ComponentList from "./ComponentList";
import ReportActions from "./ReportActions";
import SelectedParameters from "./SelectedParameters";
import UserPermissionTable from "./UserPermissionTable";



const CreateNewReport = () => {
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
        <div className="p-6 space-y-6">

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

            <ReportActions />

        </div>
    );
};

export default CreateNewReport;