import Stepper from "./Stepper";

export default function MultiStepForm() {

    const steps = [
        "Personal Info",
        "Attendance Adjustment",
        "Variable payment",
        "Compliance payment"
    ];

    const [step, setStep] = useState(0);

    return (
        <div className="p-6">

            <Stepper
                steps={steps}
                currentStep={step}
            />

        </div>
    );
}