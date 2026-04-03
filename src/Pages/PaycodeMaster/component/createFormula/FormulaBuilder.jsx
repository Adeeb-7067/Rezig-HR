import React, { useRef } from "react";
import CalculatorPad from "./CalculatorPad";

const FormulaBuilder = ({ formula = "", setFormula = () => {} }) => {
  const textareaRef = useRef(null);

  const handleKeyPress = (key) => {
    if (key === "=") return;
    const textarea = textareaRef.current;
    if (!textarea) {
      setFormula((prev) => prev + key);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setFormula((prev) => prev.slice(0, start) + key + prev.slice(end));
    // Restore cursor position after insert
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + key.length;
      textarea.focus();
    }, 0);
  };

  const handleClear = () => setFormula("");

  return (
    <div className="border border-gray-200 dark:border-gray-600 gap-2 p-4 rounded-lg space-y-4 transition-colors">
      <h1 className="text-lg font-semibold mb-1 text-gray-500">
        Formula Builder
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <textarea
          ref={textareaRef}
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="Build your formula using components and operators."
          className="
            lg:col-span-3
            bg-gray-100 dark:bg-gray-800
            rounded-xl
            p-6
            min-h-[300px]
            text-sm
            text-gray-600 dark:text-gray-300
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            transition
            resize-none
            outline-none
            focus:ring-2 focus:ring-2 focus:ring-ds-primary/30
            break-all
          "
        />

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
            border ds-border-primary
            ds-text-primary
            text-xs px-6 py-1
            rounded-sm
            hover:bg-purple-50 dark:hover:bg-ds-primary/20
            transition
          "
          onClick={() => handleClear()}
        >
          Reset
        </button>

        <button
          className="
            w-full sm:w-auto
            bg-ds-primary
            text-white
            text-xs px-6 py-1
            rounded-sm
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