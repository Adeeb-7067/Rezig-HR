import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import AttendanceTooltip from "./AttendanceTooltip";

const statusColors = {
    P: "bg-green-500",
    A: "bg-red-500",
    W: "bg-gray-400",
    H: "bg-blue-500",
    M: "bg-yellow-500",
    S: "bg-ds-primary/100",
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
    selectedDays = [],
    setSelectedDays,
    openSingleModal,
    compact = false,
    isCurrentMonth = true,
    month,
    year,
}) => {
    const [tooltip, setTooltip] = useState(null);

    const checked = selectedDays.includes(day);

    const toggleDay = () => {
        if (!setSelectedDays) return;
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

    const statuses =
        data?.status == null
            ? []
            : Array.isArray(data.status)
                ? data.status
                : [data.status];

    return (
        <div
            className={`
                bg-white dark:bg-gray-800 border flex flex-col justify-between relative
                ${compact
                    /* compact mode: unchanged */
                    ? "p-1.5 min-h-[52px]"
                    /* full mode: small screens look like compact, md+ gets the full treatment */
                    : "p-1 min-h-[56px] sm:p-2 sm:min-h-[80px] md:p-3 md:min-h-[110px] cursor-pointer hover:bg-[#F5EDFC] dark:hover:bg-gray-700"
                }
                ${compact && openSingleModal && isCurrentMonth
                    ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                    : compact
                        ? "cursor-default"
                        : ""
                }
            `}
            onMouseMove={(e) => {
                setTooltip({ x: e.clientX + 10, y: e.clientY + 10 });
            }}
            onMouseLeave={() => setTooltip(null)}
            onClick={
                compact && isCurrentMonth
                    ? multipleCorrection
                        ? handleClick
                        : openSingleModal
                            ? () => openSingleModal(day)
                            : undefined
                    : !compact
                        ? handleClick
                        : undefined
            }
        >
            {/* DAY + CHECKBOX */}
            <div className="flex justify-between items-center gap-1">
                <span
                    className={`font-semibold leading-none
                        ${isCurrentMonth
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-400 dark:text-gray-500"
                        }
                        ${compact
                            ? "ds-text-xs"
                            : "text-[0.65rem] sm:text-xs md:text-sm"
                        }
                    `}
                >
                    {day}
                </span>

                {multipleCorrection && (
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={toggleDay}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 w-3 h-3 rounded border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 ds-text-primary focus:ring-1 focus:ring-ds-primary cursor-pointer accent-ds-primary"
                        aria-label={`Select ${day}`}
                    />
                )}
            </div>

            {/* STATUS ROW */}
            <div
                className={`flex items-center gap-1 flex-wrap ${
                    compact ? "mt-0.5" : "mt-1 md:mt-2 justify-between"
                }`}
            >
                <div className="flex items-center gap-0.5 flex-wrap">
                    {compact ? (
                        /* Compact mode: dot + letter */
                        statuses.map((s) => (
                            <span key={s} className="inline-flex items-center gap-0.5 shrink-0">
                                <span
                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                        statusColors[s] || "bg-gray-400"
                                    }`}
                                />
                                <span className="text-[0.6rem] font-semibold text-gray-800 dark:text-gray-200">
                                    {s}
                                </span>
                            </span>
                        ))
                    ) : (
                        /* Full mode: responsive — dot only on xs/sm, dot+letter on md+ */
                        data?.status && (
                            <>
                                <span
                                    className={`rounded-full shrink-0 ${
                                        statusColors[
                                            Array.isArray(data.status) ? data.status[0] : data.status
                                        ]
                                    } w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3`}
                                />
                                {/* Hide status letter on very small screens to save space */}
                                <span className=" inline ds-text-xs md:text-[0.9rem] font-semibold text-gray-800 dark:text-gray-200">
                                    {Array.isArray(data.status)
                                        ? data.status.join(" ")
                                        : data.status}
                                </span>
                            </>
                        )
                    )}
                </div>

                {/* SHIFT ICON — hidden on xs, shown on md+ */}
                {!compact && data?.icon === "sun" && (
                    <Sun
                        size={14}
                        className="hidden md:block text-white bg-yellow-500 rounded-[2px] p-0.5"
                    />
                )}
                {!compact && data?.icon === "moon" && (
                    <Moon
                        size={14}
                        className="hidden md:block text-white bg-gray-500 rounded-[2px] p-0.5"
                    />
                )}
            </div>

            {/* TIME — hidden on xs/sm, shown on md+ */}
            {!compact && (
                <p className="hidden md:block text-xs text-gray-500 mt-1 md:mt-2 truncate">
                    {data?.in ? `${data.in} - ${data.out}` : "---"}
                </p>
            )}

            {/* TOOLTIP */}
            {tooltip &&
                data &&
                (compact &&
                isCurrentMonth &&
                month != null &&
                year != null &&
                data.in == null ? (
                    <AttendanceTooltip
                        data={data}
                        compact={true}
                        day={day}
                        month={month}
                        year={year}
                        statusLabels={statusLabels}
                        x={Math.min(tooltip.x, window.innerWidth - 260)}
                        y={Math.min(tooltip.y, window.innerHeight - 180)}
                    />
                ) : (
                    <AttendanceTooltip
                        data={data}
                        day={day}
                        month={month}
                        year={year}
                        x={Math.min(tooltip.x, window.innerWidth - 260)}
                        y={Math.min(tooltip.y, window.innerHeight - 180)}
                    />
                ))}
        </div>
    );
};

export default CalendarDay;