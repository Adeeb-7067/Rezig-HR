

import ReportHeader from "../ReportHeader";
import ComponentList from "./ComponentList";
import ReportActions from "./ReportActions";
import SelectedParameters from "./SelectedParameters";
import UserPermissionTable from "./UserPermissionTable";



const CreateNewReport = () => {
    return (
        <div className="p-6 space-y-6">

            {/* <ReportHeader /> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <ComponentList />

                <SelectedParameters />

            </div>

            <UserPermissionTable />

            <ReportActions />

        </div>
    );
};

export default CreateNewReport;