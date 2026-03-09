import { Search } from "lucide-react";

const ComponentSearch = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search here"
                className="
                    w-full
                    pl-4 pr-10
                    py-2.5
                    rounded-lg
                    border border-gray-200 dark:border-gray-700
                    bg-gray-50 dark:bg-gray-800
                    text-sm text-gray-800 dark:text-gray-200
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#8629DF]/30
                    focus:border-[#8629DF]
                    transition
                "
            />

            <Search
                size={16}
                className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-gray-400 dark:text-gray-500
                "
            />
        </div>
    );
};

export default ComponentSearch;