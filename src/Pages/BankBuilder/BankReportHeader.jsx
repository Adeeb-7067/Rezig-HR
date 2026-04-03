import { Plus } from "lucide-react";

const BankReportHeader = ({ onCreate, showConfig }) => {

    if (showConfig) return null;   // button hide

    return (
        <div className="flex items-center justify-end">

            <button
                onClick={onCreate}
                className="
          flex items-center gap-2
          ds-bg-primary
          text-white
          h-8.5 px-4
          rounded-sm
          text-[0.8rem] font-semibold
          shadow-sm
          hover:opacity-90
          transition-all
          cursor-pointer
        "
            >
                <Plus size={14} />
                Create New Report
            </button>

        </div>
    );
};

export default BankReportHeader;