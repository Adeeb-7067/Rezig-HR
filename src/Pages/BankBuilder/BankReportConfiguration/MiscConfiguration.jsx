import { useState } from "react";
import { Switch } from "@/components/ui/switch";
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
        header1Align: "",
        header2Align: "",
        breakSheet: ""
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

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6">

            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Miscellaneous Configuration
            </h3>


            {/* TOP FILTERS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <MultiSelectDropdown
                    label="All Banks"
                    options={bankOptions}
                    value={selectedBanks}
                    onChange={setSelectedBanks}
                />

                <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Consider Other Bank(s)
                    </span>

                    <Switch
                        checked={considerOtherBank}
                        onCheckedChange={setConsiderOtherBank}
                    />
                </div>

                <SelectField
                    name="reportVisibility"
                    value={formData.reportVisibility}
                    onChange={handleChange}
                    label="Report visibility"
                    unSelectLabel="Select"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <SelectField
                    name="reportTitle"
                    value={formData.reportTitle}
                    onChange={handleChange}
                    label="Report Title / Heading"
                    unSelectLabel="All Sheets"
                    options={[
                        { label: "Right", value: "right" },
                        { label: "Center", value: "center" },
                        { label: "Left", value: "left" }
                    ]}
                />

                <InputField label="Report Name" />

                <InputField label="Report Sub Title / Heading" />

                <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Show Company Name & Address
                    </span>

                    <Switch
                        checked={showCompanyAddress}
                        onCheckedChange={setShowCompanyAddress}
                    />
                </div>

            </div>


            {/* HEADER CONTENT */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <InputField label="Upper Header 1 Content" />

                <InputField label="Upper Header 2 Content" />

                <SelectField
                    name="header1Align"
                    value={formData.header1Align}
                    onChange={handleChange}
                    label="Upper Header 1 Alignment"
                    unSelectLabel="Select"
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
                    options={[
                        { label: "Right", value: "right" },
                        { label: "Center", value: "center" },
                        { label: "Left", value: "left" }
                    ]}
                />

            </div>


            {/* BREAK SHEET */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <SelectField
                    name="breakSheet"
                    value={formData.breakSheet}
                    onChange={handleChange}
                    label="Break Sheet According (Customized)"
                    unSelectLabel="Select"
                    options={[
                        { label: "Left", value: "left" },
                        { label: "Right", value: "right" }
                    ]}
                />

                <InputField label="Next sheet after value" />

            </div>

        </div>

    );
};

export default MiscConfiguration;