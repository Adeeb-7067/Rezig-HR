import { IoMdSearch } from "react-icons/io";

const ComponentSearch = ({ value, onChange }) => {
    return (
        <div
            className="flex gap-2 rounded-sm px-3 items-center shadow drop-shadow-xs border border-gray-300 dark:border-gray-500 dark:bg-gray-800 w-full xl:h-[35px] 
  focus-within:border-ds-primary focus-within:border-2 focus-within:shadow-md transition-all"
        >
            <input
                type="text"
                placeholder="Search here"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="px-3 py-2 w-full text-xs md:text-[0.8rem] outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-50"
            />
            <IoMdSearch className="w-5 h-5 text-gray-500" />
        </div>
    );
};

export default ComponentSearch;