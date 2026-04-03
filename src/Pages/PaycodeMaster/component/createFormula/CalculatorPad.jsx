import React from "react";

const CalculatorPad = ({ onKeyPress, onClear }) => {
    const keys = [
        "C", ">", ">=", "<", "<=",
        "!=", "+/-", "(", ")", "%", "÷",
        "7", "8", "9", "×",
        "4", "5", "6", "−",
        "1", "2", "3", "+",
        "0", ".", ",", "=",
    ];

    const isOperator = (key) =>
        ["+", "−", "×", "÷", "%", ">", ">=", "<", "<=", "!=", "+/-"].includes(key);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 transition-colors">

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4">

                {keys.map((key, i) => {

                    const isEqual = key === "=";
                    const isClear = key === "C";
                    const isZero = key === "0";

                    return (
                        <button
                            key={i}
                            onClick={() =>
                                key === "C" ? onClear() : onKeyPress(key)
                            }
                            className={`
                                ${isZero ? "col-span-2 sm:col-span-2" : ""}
                                h-10 sm:h-12
                                rounded-xl
                                flex items-center justify-center
                                text-base sm:text-xl
                                font-medium
                                transition-all duration-150
                                active:scale-95

                                ${isEqual
                                    ? "bg-ds-primary text-white shadow-md"
                                    : isOperator
                                        ? "text-ds-primary dark:text-ds-primary bg-gray-200 dark:bg-gray-700 shadow-inner"
                                        : isClear
                                            ? "text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 shadow-inner"
                                            : "text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 shadow-inner"
                                }

                                hover:bg-gray-300 dark:hover:bg-gray-600
                            `}
                        >
                            {key}
                        </button>
                    );
                })}

            </div>

        </div>
    );
};

export default CalculatorPad;