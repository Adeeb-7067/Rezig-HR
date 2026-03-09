;

import ShiftCategoryForm from "./ShiftCategoryForm";
import ShiftCategoryTable from "./ShiftCategoryTable";

const ShiftCategoryMaster = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-6 py-6">

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">

                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-8">
                    Shift Category Master
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 items-start">

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