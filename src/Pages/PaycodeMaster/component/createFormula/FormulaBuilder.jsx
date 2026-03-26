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
    <div className="  border border-gray-200 gap-2 p-4 rounded-lg space-y-4 transition-colors">
      <h1 className="text-lg font-semibold mb-1 text-gray-500">
        Formula Builder
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div
          className="
                    lg:col-span-3
                    bg-gray-100 dark:bg-gray-800
                    rounded-xl
                    p-6
                    min-h-[300px]
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
