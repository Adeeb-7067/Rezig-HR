import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import AttendanceTooltip from "./AttendanceTooltip";

const statusColors = {
    P: "bg-green-500",
    A: "bg-red-500",
    W: "bg-gray-400",
    H: "bg-blue-500",
    M: "bg-yellow-500",
    S: "bg-purple-500",
};

const CalendarDay = ({
    day,
    data,
    multipleCorrection,
    selectedDays,
    setSelectedDays,
    openSingleModal,
}) => {

    const [showTooltip, setShowTooltip] = useState(false);

    const checked = selectedDays?.includes(day);

    const toggleDay = () => {
        if (checked) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleClick = () => {
        if (multipleCorrection) {
            toggleDay();
        } else {
            openSingleModal(day);
        }
    };

    return (
        <div
            className={`bg-white dark:bg-gray-800 border p-3 min-h-[110px] relative cursor-pointer
      hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col justify-between`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
        >

            {/* TOP ROW */}
            <div className="flex justify-between items-center ">

                <span className="text-sm  font-semibold text-gray-800 dark:text-gray-200">
                    {day}
                </span>

                {multipleCorrection && (
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={toggleDay}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4"
                    />
                )}

            </div>

            {/* STATUS ROW */}
            <div className="flex justify-between items-center mt-2">

                <div className="flex items-center gap-2">

                    {data?.status && (
                        <>
                            <span
                                className={`w-3 h-3 rounded-full ${statusColors[data.status]}`}
                            />

                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {data.status}
                            </span>
                        </>
                    )}

                </div>

                {/* SHIFT ICON */}
                {data?.icon === "sun" && (
                    <Sun size={20} className="text-yellow-500" />
                )}

                {data?.icon === "moon" && (
                    <Moon size={20} className="text-gray-500" />
                )}

            </div>

            {/* TIME */}
            <p className="text-sm text-gray-500 mt-2">
                {data?.in ? `${data.in} - ${data.out}` : "---"}
            </p>

            {/* TOOLTIP */}
            {showTooltip && (
                <AttendanceTooltip data={data} />
            )}

        </div>
    );
};

export default CalendarDay;