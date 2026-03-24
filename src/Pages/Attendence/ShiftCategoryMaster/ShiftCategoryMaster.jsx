;

import ShiftCategoryForm from "./ShiftCategoryForm";
import ShiftCategoryTable from "./ShiftCategoryTable";

const ShiftCategoryMaster = () => {
    return (
        <div className="">

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">

                <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-100 mb-4">
                    Shift Category Master
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-6">

                    {/* LEFT FORM */}
                    <ShiftCategoryForm />

                    {/* RIGHT TABLE */}
                    <ShiftCategoryTable />

                </div>

            </div>
        </div>
    );
};

export default ShiftCategoryMaster;