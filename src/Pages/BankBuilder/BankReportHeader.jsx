import { Plus } from "lucide-react";

const BankReportHeader = ({ onCreate, showConfig }) => {

    if (showConfig) return null;   // button hide

    return (
        <div className="flex items-center justify-end">

            <button
                onClick={onCreate}
                className="
          flex items-center gap-2
          bg-primary
          text-white
          px-4 py-2
          rounded-md
          text-sm
          shadow
          hover:opacity-90
          transition
        "
            >
                <Plus size={16} />
                Create New Report
            </button>

        </div>
    );
};

export default BankReportHeader;