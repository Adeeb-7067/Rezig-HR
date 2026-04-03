import { useState } from "react";
import VariableTypeRow from "@/components/ui/VariableTypeRow";
import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import RowFieldsSelector from "./component/RowFieldsSelector";
import MultiSelectDropdown from "./component/MultiSelectDropdown";

const MiscConfiguration = () => {

    const fields = ["Cash", "Cheque", "Draft", "NEFT"];

    const bankOptions = [
        { label: "American Express", value: "amex" },
        { label: "SBI", value: "sbi" },
        { label: "Andhra Bank", value: "andhra" },
        { label: "Axis Bank", value: "axis" }
    ];

    const groupOptions = [
        { label: "Unit Name", value: "unitname" },
        { label: "Location", value: "location" },
        { label: "Unit", value: "unit" },
        { label: "Department", value: "department" }
    ];

    /* ---------- FORM STATE ---------- */

    const [formData, setFormData] = useState({
        reportVisibility: "",
        reportTitle: "",
        reportName: "",
        reportSubtitle: "",
        header1Align: "",
        header2Align: "",
        header1Content: "",
        header2Content: "",
        breakSheet: "",
        nextSheetValue: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /* ---------- OTHER STATES ---------- */

    const [selectedBanks, setSelectedBanks] = useState(
        bankOptions.map((b) => b.value)
    );

    const [selectedGroup, setSelectedGroup] = useState(
        groupOptions.map((g) => g.value)
    );

    const [considerOtherBank, setConsiderOtherBank] = useState(false);
    const [showCompanyAddress, setShowCompanyAddress] = useState(false);

    return (

        <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-4 rounded-sm space-y-4">

            <h3 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                Miscellaneous Configuration
            </h3>


            {/* TOP FILTERS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

                <MultiSelectDropdown
                    label="All Banks"
                    options={bankOptions}
                    value={selectedBanks}
                    onChange={setSelectedBanks}
                />

                <VariableTypeRow 
                    label="Consider Other Bank(s)"
                    checked={considerOtherBank}
                    onCheckedChange={setConsiderOtherBank}
                    containerClass="justify-between"
                />

                <SelectField
                    name="reportVisibility"
                    value={formData.reportVisibility}
                    onChange={handleChange}
                    label="Report visibility"
                    unSelectLabel="Select"
                    className="h-7.5 ds-text-xs"
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]}
                />

                <MultiSelectDropdown
                    label="Group By"
                    options={groupOptions}
                    value={selectedGroup}
                    onChange={setSelectedGroup}
                />

            </div>


            {/* PAYMODE */}

            <RowFieldsSelector
                title="Publish Paymode Type"
                fields={fields}
                headerRow="Type"
            />


            {/* REPORT HEADER */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

                <SelectField
                    name="reportTitle"
                    value={formData.reportTitle}
                    onChange={handleChange}
                    label="Report Title / Heading"
                    unSelectLabel="All Sheets"
                    className="h-7.5 ds-text-xs"
                    options={[
                        { label: "Right", value: "right" },
                        { label: "Center", value: "center" },
                        { label: "Left", value: "left" }
                    ]}
                />

                <InputField 
                    label="Report Name" 
                    name="reportName"
                    value={formData.reportName}
                    onChange={handleChange}
                    className="h-7.5 ds-text-xs" 
                />

                <InputField 
                    label="Report Sub Title / Heading"
                    name="reportSubtitle"
                    value={formData.reportSubtitle}
                    onChange={handleChange}
                    className="h-7.5 ds-text-xs" 
                />

                <VariableTypeRow 
                    label="Show Company Name & Address"
                    checked={showCompanyAddress}
                    onCheckedChange={setShowCompanyAddress}
                    containerClass="justify-between"
                />

            </div>


            {/* HEADER CONTENT */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <InputField 
                    label="Upper Header 1 Content"
                    name="header1Content"
                    value={formData.header1Content}
                    onChange={handleChange}
                    className="h-7.5 text-[0.7rem]" 
                />

                <InputField 
                    label="Upper Header 2 Content"
                    name="header2Content"
                    value={formData.header2Content}
                    onChange={handleChange}
                    className="h-7.5 text-[0.7rem]" 
                />

                <SelectField
                    name="header1Align"
                    value={formData.header1Align}
                    onChange={handleChange}
                    label="Upper Header 1 Alignment"
                    unSelectLabel="Select"
                    className="h-7.5 text-[0.7rem]"
                    options={[
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" }
                    ]}
                />

                <SelectField
                    name="header2Align"
                    value={formData.header2Align}
                    onChange={handleChange}
                    label="Upper Header 2 Alignment"
                    unSelectLabel="Select"
                    className="h-7.5 text-[0.7rem]"
                    options={[
                        { label: "Right", value: "right" },
                        { label: "Center", value: "center" },
                        { label: "Left", value: "left" }
                    ]}
                />

            </div>


            {/* BREAK SHEET */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <SelectField
                    name="breakSheet"
                    value={formData.breakSheet}
                    onChange={handleChange}
                    label="Break Sheet According (Customized)"
                    unSelectLabel="Select"
                    className="h-7.5 text-[0.7rem]"
                    options={[
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" }
                    ]}
                />

                <InputField 
                    label="Next sheet after value"
                    name="nextSheetValue"
                    value={formData.nextSheetValue}
                    onChange={handleChange}
                    className="h-7.5 text-[0.7rem]" 
                />

            </div>

        </div>

    );
};

export default MiscConfiguration;