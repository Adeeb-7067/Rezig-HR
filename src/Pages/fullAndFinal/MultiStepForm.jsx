import { useState } from "react";

import FullAndFinal from "./FullAndFinal";
import AttendanceAdjustment from "./component/AttendanceAdjustment";
import Stepper from "@/Pages/Stepper";
import VariablePayment from "./component/VariablePayment";
import CompliancePayment from "./component/CompliancePayment";
import InvestmentDetails from "./component/InvestmentDetails";
import ViewFinalizedReports from "./component/ViewFinalizedReports";

export default function MultiStepForm() {

    const [step, setStep] = useState(0);

    const steps = [
        "Personal Info",
        "Attendance Adjustment",
        "Variable payment",
        "Compliance payment",
        "Investment Details",
        "View Finalized Reports"
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
                    onNext={() => setStep(3)}
                    onPrev={() => setStep(1)}
                />
            )}

            {step === 3 && (
                <CompliancePayment
                    onNext={() => setStep(4)}
                    onPrev={() => setStep(2)}
                />
            )}

            {step === 4 && (
                <InvestmentDetails
                    onNext={() => setStep(5)}
                    onPrev={() => setStep(3)}
                />
            )}

            {step === 5 && <ViewFinalizedReports />}

        </div>
    );
}