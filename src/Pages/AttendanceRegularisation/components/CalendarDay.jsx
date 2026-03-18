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

const statusLabels = {
    P: "Present",
    A: "LOP",
    W: "Week Off",
    H: "Holiday",
    M: "Half Day",
    S: "Leave",
};

const CalendarDay = ({
    day,
    data,
    multipleCorrection,
    selectedDays,
    setSelectedDays,
    openSingleModal,
    compact = false,
    isCurrentMonth = true,
    month,
    year,
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
        if (multipleCorrection && setSelectedDays) {
            toggleDay();
        } else if (openSingleModal) {
            openSingleModal(day);
        }
    };

    const statuses = data?.status == null ? [] : Array.isArray(data.status) ? data.status : [data.status];

    return (
        <div
            className={`bg-white dark:bg-gray-800 border flex flex-col justify-between relative
      ${compact ? "p-1.5 min-h-[52px] overflow-visible" : "p-3 min-h-[110px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"}
      ${compact && openSingleModal && isCurrentMonth ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" : compact ? "cursor-default" : ""}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={compact && isCurrentMonth ? (multipleCorrection ? handleClick : openSingleModal ? () => openSingleModal(day) : undefined) : !compact ? handleClick : undefined}
        >

            {/* TOP ROW: checkbox left of date when multiple correction; otherwise date only */}
            <div className="flex items-center gap-1.5">
                {multipleCorrection && (
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={toggleDay}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 w-3 h-3 rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-[#8629DF] focus:ring-[#8629DF] cursor-pointer"
                        aria-label={`Select ${day}`}
                    />
                )}
                <span className={`font-semibold ${isCurrentMonth ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-500"} ${compact ? "text-[0.7rem]" : "text-sm"}`}>
                    {day}
                </span>
            </div>

            {/* STATUS ROW */}
            <div className={`flex items-center gap-1 flex-wrap ${compact ? "mt-0.5" : "mt-2 justify-between"}`}>

                <div className="flex items-center gap-1 flex-wrap">
                    {compact ? (
                        statuses.map((s) => (
                            <span key={s} className="inline-flex items-center gap-0.5 shrink-0">
                                <span
                                    className={`w-2 h-2 rounded-full shrink-0 ${statusColors[s] || "bg-gray-400"}`}
                                    aria-hidden
                                />
                                <span className="text-[0.6rem] font-semibold text-gray-800 dark:text-gray-200">
                                    {s}
                                </span>
                            </span>
                        ))
                    ) : (
                        data?.status && (
                            <>
                                <span
                                    className={`w-3 h-3 rounded-full ${statusColors[Array.isArray(data.status) ? data.status[0] : data.status]}`}
                                />
                                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {Array.isArray(data.status) ? data.status.join(" ") : data.status}
                                </span>
                            </>
                        )
                    )}
                </div>

                {/* SHIFT ICON - hide in compact */}
                {!compact && data?.icon === "sun" && (
                    <Sun size={20} className="text-yellow-500" />
                )}

                {!compact && data?.icon === "moon" && (
                    <Moon size={20} className="text-gray-500" />
                )}

            </div>

            {/* TIME - hide in compact */}
            {!compact && (
                <p className="text-sm text-gray-500 mt-2">
                    {data?.in ? `${data.in} - ${data.out}` : "---"}
                </p>
            )}

            {/* TOOLTIP - full when data has in/out (or non-compact); compact (date+status only) when compact and no in/out */}
            {showTooltip && data && (
                compact && isCurrentMonth && month != null && year != null && data.in == null
                    ? (
                        <AttendanceTooltip
                            data={data}
                            compact={true}
                            day={day}
                            month={month}
                            year={year}
                            statusLabels={statusLabels}
                        />
                    )
                    : (
                        <AttendanceTooltip data={data} day={day} month={month} year={year} />
                    )
            )}

        </div>
    );
};

export default CalendarDay;