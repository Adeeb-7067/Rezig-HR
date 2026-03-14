export default function Stepper({ steps = [], currentStep = 0 }) {

    if (!steps.length) return null;

    return (
        <div className="relative flex items-center justify-between w-full mb-8">

            {/* Grey line */}
            <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-300" />

            {/* Purple progress */}
            <div
                className="absolute top-4 left-0 h-[2px] bg-purple-600 transition-all"
                style={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`
                }}
            />

            {steps.map((step, i) => {

                const completed = i < currentStep;
                const active = i === currentStep;

                return (
                    <div key={i} className="flex flex-col items-center flex-1 relative z-10">

                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full border-2
              ${completed
                                    ? "bg-purple-600 border-purple-600 text-white"
                                    : active
                                        ? "border-purple-600 text-purple-600 bg-white"
                                        : "border-gray-300 bg-white"
                                }`}
                        >
                            {completed ? "✓" : ""}
                        </div>

                        <p
                            className={`text-xs mt-2 text-center
              ${active ? "text-purple-600 font-medium" : "text-gray-500"}`}
                        >
                            {step}
                        </p>

                    </div>
                );
            })}
        </div>
    );
}