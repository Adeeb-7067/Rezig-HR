import { useState } from "react";

import FullAndFinal from "./FullAndFinal";
import AttendanceAdjustment from "./component/AttendanceAdjustment";
import Stepper from "@/Pages/Stepper";
import VariablePayment from "./component/VariablePayment";

export default function MultiStepForm() {

    const [step, setStep] = useState(0);

    const steps = [
        "Personal Info",
        "Attendance Adjustment",
        "Variable payment",
        "Compliance payment"
    ];

    return (
        <div className="p-6">
            <div className="items-center mb-8">
                <Stepper steps={steps} currentStep={step} />
            </div>


            {step === 0 && (
                <FullAndFinal onNext={() => setStep(1)} />
            )}

            {step === 1 && (
                <AttendanceAdjustment
                    onNext={() => setStep(2)}
                    onPrev={() => setStep(0)}
                />
            )}

            {step === 2 && (
                <VariablePayment
                    onNext={() => setStep(2)}
                    onPrev={() => setStep(0)}
                />
            )}

        </div>
    );
}