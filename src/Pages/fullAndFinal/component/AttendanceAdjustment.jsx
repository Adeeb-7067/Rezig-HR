export default function AttendanceAdjustment({ onNext, onPrev }) {

    return (
        <div>

            <h2 className="text-lg font-semibold mb-4">
                Attendance Adjustment
            </h2>

            <div className="bg-gray-100 dark:bg-gray-800 rounded p-5">

                <p className="font-medium mb-2">
                    Attendance Calculation Method
                </p>

                <div className="flex items-center gap-3">

                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Optimistic Attendance
                    </label>

                    <span className="text-sm text-gray-500">
                        Mark Attendance According To Attendance Machine
                    </span>

                </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

                <button onClick={onPrev} className="border px-4 py-2 rounded">
                    Previous
                </button>

                <button className="border px-4 py-2 rounded">
                    Reset
                </button>

                <button
                    onClick={onNext}
                    className="bg-purple-600 text-white px-6 py-2 rounded"
                >
                    Save
                </button>

            </div>

        </div>
    );
}