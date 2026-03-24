;

import InputField from "@/components/inputfeild";
import SectionCard from "@/components/cards/SectionCard";

const LateArrivalSection = () => {
    return (
        <SectionCard title="Late Arrival Configuration">

          

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <InputField
                    label="Grace Days to Come Late"
                    placeholder="Select Shift"
                />

                <InputField
                    label="Deducted half day after Hrs"
                    placeholder="Select Shift"
                />

                <InputField
                    label="Grace minutes to come late"
                    placeholder="Select Shift"
                />

                <InputField
                    label="Grace Minutes (After Grace Days)"
                    placeholder="Select Shift"
                />

            </div>

        </SectionCard>
    );
};

export default LateArrivalSection;