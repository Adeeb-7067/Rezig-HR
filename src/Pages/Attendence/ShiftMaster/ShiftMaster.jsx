;

import ShiftMasterForm from "./ShiftMasterForm";
import ShiftMasterTable from "./ShiftMasterTable";


const ShiftMaster = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">

            {/* FORM CARD */}
            <ShiftMasterForm />

            {/* TABLE CARD */}
            <ShiftMasterTable />

        </div>
    );
};

export default ShiftMaster;