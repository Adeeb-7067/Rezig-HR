import React, { useState } from "react";
import CalculatorPad from "./CalculatorPad";

const FormulaBuilder = () => {
  const [formula, setFormula] = useState("");

  const handleKeyPress = (key) => {
    if (key === "=") return;
    setFormula((prev) => prev + key);
  };

  const handleClear = () => setFormula("");

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm transition-colors">
      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Formula Builder
      </h3>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div
          className="
                    lg:col-span-3
                    bg-gray-100 dark:bg-gray-800
                    rounded-xl
                    p-6
                    min-h-[360px]
                    text-sm
                    text-gray-600 dark:text-gray-300
                    transition
                "
        >
          {formula || (
            <span className="text-gray-400 dark:text-gray-500">
              Build your formula using components and operators.
            </span>
          )}
        </div>

        {/* Calculator Section */}
        <div className="lg:col-span-2">
          <CalculatorPad onKeyPress={handleKeyPress} onClear={handleClear} />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
        <button
          className="
                    w-full sm:w-auto
                    border border-primary
                    text-primary
                   text-xs px-6 py-1.5
                    rounded-md
               
                    hover:bg-purple-50 dark:hover:bg-purple-900/20
                    transition
                "
          onClick={() => handleClear()}
        >
          Reset
        </button>

        <button
          className="
                    w-full sm:w-auto
                    bg-primary
                    text-white
                   text-xs px-6 py-1.5
                    rounded-md
                
                    font-medium
                    shadow-md
                    hover:opacity-90
                    transition
                "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormulaBuilder;
