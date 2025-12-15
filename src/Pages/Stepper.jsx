import React from "react";
import { FiCheck } from "react-icons/fi"; // tick icon

export default function Stepper({ steps, currentStep = 0 }) {
  return (
    <div className="w-full flex flex-col items-center px-2">
      {/* Wrapper for line + dots */}
      <div className="relative flex items-center justify-between w-full max-w-[85%] mx-auto">
        {/* Solid base line */}
       {/* Solid base line */}
<div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-300 dark:bg-gray-600 z-0" />

{/* Progress line */}
<div
  className="absolute top-1/2 left-0 h-[2px] bg-[#8629DF] dark:bg-purple-600 z-10"
  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
/>

{/* Dots */}
{steps.map((_, index) => (
  <div key={index} className="relative flex items-center justify-center">
    {/* Mask to break only the base line */}
    <div className="absolute w-6 h-4 bg-white dark:bg-gray-900 z-20"></div>

    {/* Dot or Tick */}
    <div
      className={`
        relative flex items-center justify-center rounded-full z-30
        ${index === currentStep
          ? "w-5 h-5 border-6 border-[#8629DF] bg-white dark:bg-gray-900"
          : ""}
        ${index < currentStep ? "bg-[#8629DF] h-5 w-5" : index > currentStep ? "bg-gray-300 h-3 w-3" : ""}
      `}
    >
      {index < currentStep && (
        <FiCheck className="text-white text-lg" />
      )}
    </div>
  </div>
))}
      </div>

      {/* Labels */}
      <div className="mt-2 flex justify-between w-full max-w-[100%] space-x-4">
        {steps.map((label, index) => (
          <div key={index} className="flex justify-center flex-1">
            <span
              className={`text-xs sm:text-sm md:text-[16px] text-center ${
                index === currentStep ? "text-[#8629DF]" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
