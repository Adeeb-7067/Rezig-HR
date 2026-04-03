import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import SelectField from "../../../../components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const StatutoryTaxParameter = () => {
    const [pfGross, setPfGross] = useState("");
    const [taxable, setTaxable] = useState("");
    const [taxDeduct, setTaxDeduct] = useState("");
    const [subSection, setSubSection] = useState("");
    const [section, setSection] = useState("");

    const [professionalTax, setProfessionalTax] = useState(false);
    const [esiGross, setEsiGross] = useState(false);
    const [esiRateGross, setEsiRateGross] = useState(false);
    const [lwf, setLwf] = useState(false);

    return (
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 gap-2 p-2 rounded-lg px-3">
            <h1 className="text-base font-semibold mb-1 text-gray-500 dark:text-gray-50">
                Statutory & Tax Parameter
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SelectField
                    label="Part of PF/VolPF Gross"
                    name="pfGross"
                    value={pfGross}
                    onChange={(e) => setPfGross(e.target.value)}
                    unSelectLabel="Select"
                    options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                    ]}
                />

                <VariableTypeRow
                    label="Part of Professional Tax"
                    checked={professionalTax}
                    onCheckedChange={setProfessionalTax}
                    gapClass="justify-between"
                    showIcon
                    info="Part of Professional Tax"
                />

                <VariableTypeRow
                    label="Part of ESI Gross"
                    checked={esiGross}
                    onCheckedChange={setEsiGross}
                    gapClass="justify-between"
                    showIcon
                    info="Part of ESI Gross"
                />

                <VariableTypeRow
                    label="Part of ESI Rate Gross"
                    checked={esiRateGross}
                    onCheckedChange={setEsiRateGross}
                    gapClass="justify-between"
                    showIcon
                    info="Part of ESI Rate Gross"
                />

                <SelectField
                    label="Taxable"
                    name="taxable"
                    value={taxable}
                    onChange={(e) => setTaxable(e.target.value)}
                    unSelectLabel="Select Taxable"
                    options={[
                        { value: "taxable", label: "Taxable" },
                        { value: "nonTaxable", label: "Non-Taxable" },
                    ]}
                />

                <InputField
                    label="Non Taxable Limit (PA)"
                    placeholder="Enter Amount"
                />

                <SelectField
                    label="Tax to be deducted"
                    name="taxDeduct"
                    value={taxDeduct}
                    onChange={(e) => setTaxDeduct(e.target.value)}
                    unSelectLabel="Select Tax deducted"
                    options={[
                        { value: "monthly", label: "Monthly" },
                        { value: "yearly", label: "Yearly" },
                    ]}
                />

                <VariableTypeRow
                    label="Part of LWF"
                    checked={lwf}
                    onCheckedChange={setLwf}
                    gapClass="justify-between"
                    showIcon
                    info="Part of LWF"
                />

                <SelectField
                    label="Sub Section For Form-16"
                    name="subSection"
                    value={subSection}
                    onChange={(e) => setSubSection(e.target.value)}
                    unSelectLabel="Select Sub Section"
                    options={[
                        { value: "80C", label: "80C" },
                        { value: "80D", label: "80D" },
                    ]}
                />

                <SelectField
                    label="Section For Form-16"
                    name="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    unSelectLabel="Select Section"
                    options={[
                        { value: "sectionA", label: "Section A" },
                        { value: "sectionB", label: "Section B" },
                    ]}
                />
            </div>
        </div>
    );
};

export default StatutoryTaxParameter;