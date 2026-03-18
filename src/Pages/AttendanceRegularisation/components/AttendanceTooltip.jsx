import { Sun, Moon } from "lucide-react";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const STATUS_DISPLAY = {
    P: "Present",
    A: "LOP",
    W: "Week Off",
    H: "Holiday",
    M: "Missed Punch",
    S: "Leave",
};

function getOrdinal(n) {
    const v = n % 100;
    if (v >= 11 && v <= 13) return n + "th";
    const d = n % 10;
    if (d === 1) return n + "st";
    if (d === 2) return n + "nd";
    if (d === 3) return n + "rd";
    return n + "th";
}

function formatTooltipDate(day, month, year) {
    if (day == null || month == null || year == null) return null;
    const d = new Date(Number(year), Number(month), Number(day));
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const ord = getOrdinal(Number(day));
    const mon = MONTH_NAMES[Number(month)];
    return `${weekday}, ${ord} ${mon} ${year}`;
}

function formatTime(t) {
    if (!t) return "--";
    const [h, m] = String(t).split(":");
    return `${h.padStart(2, "0")} : ${(m || "00").padStart(2, "0")}`;
}

const TOOLTIP_WRAPPER = "absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 w-[260px] overflow-visible pointer-events-none";
const TOOLTIP_BOX = "bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-[16.26px] overflow-visible";
const ARROW_LEFT = "absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[10px] border-r-white dark:border-r-gray-800";

const AttendanceTooltip = ({ data, column, compact = false, day, month, year, statusLabels = {} }) => {

    if (!data && !compact) return null;
    if (compact && (day == null || month == null || year == null)) return null;

    const dateStr = formatTooltipDate(day, month, year);
    const labels = { ...STATUS_DISPLAY, ...statusLabels };

    if (compact) {
        const statuses = data?.status == null ? [] : Array.isArray(data.status) ? data.status : [data.status];
        const statusText = statuses.map((s) => labels[s] || s).join(", ");

        return (
            <div className={TOOLTIP_WRAPPER}>
                <div className={ARROW_LEFT} />
                <div className={`${TOOLTIP_BOX} ml-[10px] overflow-hidden`}>
                    <div className="bg-purple-100 dark:bg-purple-900/40 px-4 py-2.5 rounded-t-[16.26px] flex justify-between items-center gap-2">
                        <p className="text-gray-800 dark:text-white font-semibold text-sm shrink-0">
                            {dateStr}
                        </p>
                        <div className="bg-amber-400 rounded p-1 shrink-0">
                            <Sun size={14} className="text-white" />
                        </div>
                    </div>
                    <div className="px-4 pt-3 pb-4">
                        {statusText && (
                            <div className="flex justify-between items-center gap-4">
                                <span className="text-[13px] text-gray-800 dark:text-gray-200 shrink-0">Status :-</span>
                                <span className="text-[13px] text-amber-600 dark:text-amber-400 font-medium text-right">
                                    {statusText}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const statusDisplay = labels[data.status] || data.status || "—";
    const inTime = formatTime(data.in);
    const outTime = formatTime(data.out);
    const shortDateStr = (day != null && month != null && year != null)
        ? `${day} ${MONTH_NAMES[Number(month)]} ${year}`
        : "22 May 2025";

    return (
        <div className={TOOLTIP_WRAPPER}>
            <div className={ARROW_LEFT} />
            <div className={`${TOOLTIP_BOX} ml-[10px] overflow-hidden`}>
                {/* Header - solid purple bg, white date text */}
                <div className="bg-[#8629DF] px-4 py-2.5 rounded-t-[16.26px] flex justify-between items-center gap-2">
                    <p className="text-white font-semibold text-sm shrink-0">
                        {dateStr || "Thu, 1st May 2025"}
                    </p>
                    {data?.icon === "sun" && (
                        <div className="bg-amber-400 rounded p-1 shrink-0">
                            <Sun size={14} className="text-white" />
                        </div>
                    )}
                    {data?.icon === "moon" && (
                        <div className="bg-gray-600 rounded p-1 shrink-0">
                            <Moon size={14} className="text-white" />
                        </div>
                    )}
                </div>

                {/* Body - key-value rows with gap 9.45px, keys dark gray/black */}
                <div className="px-4 pt-3 pb-4 flex flex-col gap-[9.45px] text-[13px]">
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200 shrink-0">Shift :-</span>
                        <span className="text-gray-800 dark:text-gray-200 text-right">Gurugram Office</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200 shrink-0">In Date :-</span>
                        <span className="text-gray-800 dark:text-gray-200 text-right">{shortDateStr}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200 shrink-0">In Time :-</span>
                        <span className="text-gray-800 dark:text-gray-200 text-right">{inTime}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200 shrink-0">Out Date :-</span>
                        <span className="text-gray-800 dark:text-gray-200 text-right">{shortDateStr}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200 shrink-0">Out Time :-</span>
                        <span className="text-gray-800 dark:text-gray-200 text-right">{outTime}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200 shrink-0">Status :-</span>
                        <span className="text-amber-600 dark:text-amber-400 font-medium text-right">
                            {statusDisplay}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTooltip;