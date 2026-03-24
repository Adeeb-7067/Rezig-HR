;

import ShiftMasterForm from "./ShiftMasterForm";
import ShiftMasterTable from "./ShiftMasterTable";


const ShiftMaster = () => {
    return (
        <div className="flex flex-col md:flex-col gap-8">

            {/* FORM CARD */}
            <ShiftMasterForm />

            {/* TABLE CARD */}
            <ShiftMasterTable />

        </div>
    );
};

export default ShiftMaster;