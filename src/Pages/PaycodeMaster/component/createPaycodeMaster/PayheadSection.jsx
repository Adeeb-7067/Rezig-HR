import React, { useState } from "react";
import InputField from "../../../../components/inputfeild";
import SelectField from "../../../../components/SelectFeild";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const PayheadSection = () => {
    const [form, setForm] = useState({
        prorateMethod: "",
        prorateType: "",
        amount: "",
        calcOrder: "",
        sortOrder: "",
    });

    const [partOfGross, setPartOfGross] = useState(false);
    const [partOfRateGross, setPartOfRateGross] = useState(false);
    const [runtime, setRuntime] = useState(false);

    const [rounding, setRounding] = useState("");
    const [formula, setFormula] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 px-3 rounded-lg">
            <h1 className="text-base font-semibold mb-1 text-gray-500 dark:text-gray-50">
                Payhead
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <SelectField
                    label="Prorate as per paid days"
                    name="prorateMethod"
                    value={form.prorateMethod}
                    onChange={handleChange}
                    unSelectLabel="Paid Days"
                    options={[
                        { value: "paid", label: "Paid Days" },
                        { value: "calendar", label: "Calendar Days" },
                    ]}
                />

                <SelectField
                    label="Prorate as of DOJ/DOL"
                    name="prorateType"
                    value={form.prorateType}
                    onChange={handleChange}
                    unSelectLabel="Doj/Dol"
                    options={[
                        { value: "doj", label: "DOJ" },
                        { value: "dol", label: "DOL" },
                    ]}
                />

                <VariableTypeRow
                    label="Part of Gross"
                    checked={partOfGross}
                    onCheckedChange={setPartOfGross}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Variable Type"
                />

                <VariableTypeRow
                    label="Part of Rate Gross"
                    checked={partOfRateGross}
                    onCheckedChange={setPartOfRateGross}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Variable Type"
                />

                <SelectField
                    label="Formula"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    unSelectLabel="Select Formula"
                    options={[
                        { value: "basic", label: "Basic" },
                        { value: "esi", label: "ESI" },
                        { value: "hra", label: "HRA" },
                    ]}
                />

                <InputField
                    label="Amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                />

                <VariableTypeRow
                    label="Calculate at Runtime"
                    checked={runtime}
                    onCheckedChange={setRuntime}
                    gapClass="justify-between"
                    showIcon={true}
                    info="Calculate at Runtime"
                />

                <SelectField
                    label="Rounding"
                    value={rounding}
                    onChange={(e) => setRounding(e.target.value)}
                    unSelectLabel="Select Pay Head Name"
                    options={[
                        { value: "roundup", label: "Round Up" },
                        { value: "rounddown", label: "Round Down" },
                    ]}
                />

                <InputField
                    label="Pay Head Calculation Order"
                    name="calcOrder"
                    value={form.calcOrder}
                    onChange={handleChange}
                    placeholder="63"
                />

                <InputField
                    label="Pay Slip / Register Sort Order"
                    name="sortOrder"
                    value={form.sortOrder}
                    onChange={handleChange}
                    placeholder="63"
                />
            </div>

            </div>
    );
};

export default PayheadSection;