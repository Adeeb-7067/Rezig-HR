import React from "react";

const SectionCard = ({ title, children }) => {
    return (
        <div className=" bg-[#EFEFEF]/70 dark:bg-gray-900 rounded shadow border p-4">
            {title && <h2 className="text-sm font-semibold mb-4">{title}</h2>}
            {children}
        </div>
    );
};

export default SectionCard;