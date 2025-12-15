import React, { useEffect, useRef, useState } from "react";
import Stepper from "./Stepper";
import FormOne from "./PersonalInfo";
import FormTwo from "./StatutoryDetails";
import FormThree from "./SalaryAssigment";
import FormFour from "./FamilyDetail";

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const topRef = useRef(null);

  const steps = [
    " Personal Info",
    " Statutory Details",
    "Salary Assignment",
    "Family Details",
    "Other Info",
  ];

  useEffect(() => {
    const doScroll = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const el = document.scrollingElement || document.documentElement || document.body;
        el.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(doScroll));
  }, [step]);

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <div ref={topRef} className="w-full">
      <div className="items-center">
        <Stepper steps={steps} currentStep={step} />
      </div>

      <div className="mt-8">
        {step === 0 && <FormOne onNext={handleNext}  />}
        {step === 1 && <FormTwo onNext={handleNext} onPrev={handlePrev}  />}
        {step === 2 && <FormThree onNext={handleNext} onPrev={handlePrev}  />}
        {step === 3 && <FormFour onPrev={handlePrev}  />}
      </div>
    </div>
  );
}
