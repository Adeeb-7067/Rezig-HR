import React from "react";

const SectionCard = ({ title, children }) => {
    return (
        <div className="bg-gray-100/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg">
            {title && <h1 className="text-base font-semibold mb-1 text-gray-500">{title}</h1>}
            {children}
        </div>
    );
};

export default SectionCard;