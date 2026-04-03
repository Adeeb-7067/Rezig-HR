import { useState, useRef, useEffect } from "react";

import FullAndFinal from "./FullAndFinal";
import AttendanceAdjustment from "./component/AttendanceAdjustment";
import Stepper from "@/Pages/Stepper";
import VariablePayment from "./component/VariablePayment";
import CompliancePayment from "./component/CompliancePayment";
import InvestmentDetails from "./component/InvestmentDetails";
import ViewFinalizedReports from "./component/ViewFinalizedReports";

export default function MultiStepForm() {

    const [step, setStep] = useState(0);
    const topRef = useRef(null);
    const stepperRef = useRef(null);  // ← ref to auto-scroll active step into view

    const steps = [
        "Personal Info",
        "Attendance Adjustment",
        "Variable payment",
        "Compliance payment",
        "Investment Details",
        "View Finalized Reports"
    ];

    // Scroll page to top on step change
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

    // Auto-scroll the stepper horizontally so the active step is always visible on mobile
    useEffect(() => {
        if (!stepperRef.current) return;
        const activeEl = stepperRef.current.querySelector("[data-active='true']");
        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",   // centres the active step in the scroll container
            });
        }
    }, [step]);

    const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

    return (
        /*
         * overflow-x-hidden  → prevents the whole page from shifting sideways
         * min-h-0            → lets flex/grid children shrink correctly on iOS
         */
        <div ref={topRef} className="w-full overflow-x-hidden">

            {/*
             * Stepper wrapper
             * • overflow-x-auto       → horizontal scroll when steps don't fit
             * • scrollbar-thin        → (Tailwind Scrollbar plugin) slim bar
             * • pb-2                  → small bottom padding so the scrollbar
             *                           doesn't sit flush against the steps
             * • -mx-4 px-4            → bleed to screen edge on mobile so the
             *                           first/last step aren't clipped
             */}
            <div
                ref={stepperRef}
                className="overflow-x-auto overscroll-x-contain
                           scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                           pb-2 -mx-4 px-4
                           sm:mx-0 sm:px-0 sm:overflow-x-visible sm:pb-0"
            >
                {/*
                 * min-w-max keeps all steps on one line so they don't wrap;
                 * the outer div handles the scroll.
                 */}
                <div className="min-w-max sm:min-w-0 items-center">
                    <Stepper steps={steps} currentStep={step} />
                </div>
            </div>

            {/*
             * Step content area
             * • overflow-y-auto   → vertical scroll inside the bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg if content
             *                       is taller than the viewport (e.g. long forms)
             * • overflow-x-hidden → no accidental horizontal bleed from children
             */}
            <div className="mt-8 overflow-x-hidden overflow-y-auto">
                {step === 0 && <FullAndFinal onNext={handleNext} />}
                {step === 1 && <AttendanceAdjustment onNext={handleNext} onPrev={handlePrev} />}
                {step === 2 && <VariablePayment      onNext={handleNext} onPrev={handlePrev} />}
                {step === 3 && <CompliancePayment    onNext={handleNext} onPrev={handlePrev} />}
                {step === 4 && <InvestmentDetails    onNext={handleNext} onPrev={handlePrev} />}
                {step === 5 && <ViewFinalizedReports />}
            </div>
        </div>
    );
}