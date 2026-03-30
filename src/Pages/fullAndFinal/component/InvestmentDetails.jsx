import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import InputField from "@/components/inputfeild";
import SelectField from "@/components/SelectFeild";
import DatePickerField from "@/components/ui/datePicker";
import VariableTypeRow from "@/components/ui/VariableTypeRow";

const btnPrevReset =
  "bg-white dark:bg-[#E4E6EB]/10 border border-[#8629DF] text-[#8629DF] font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24";
const btnSave =
  "bg-[#8629DF] text-white font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24 cursor-pointer";

/* ─── Section 80C / Other Section accordion ─── */
function SectionAccordion({ label, rows, setRows }) {
  const [open, setOpen] = useState(false);

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { section: "", description: "", amount: "" },
    ]);

  const removeRow = (idx) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const updateRow = (idx, field, value) =>
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );

  return (
    <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 rounded-lg overflow-visible">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex flex-row justify-between w-[50%]">
          <h3 className="text-[0.85rem] font-bold text-gray-800 dark:text-gray-100">
            {label}
          </h3>

          <div className="flex flex-col leading-tight">
            <h1 className="text-[1rem] font-semibold text-center text-[#8629DF] dark:text-purple-400">
              50,000,00
            </h1>
            <span className="text-[0.7rem] text-start text-gray-500 dark:text-gray-400">
              Amount
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addRow}
            className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-[0.7rem] font-semibold px-3 py-1.5 rounded-sm"
          >
            Add Fields
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center w-7 h-7 rounded-sm bg-[#8629DF] text-white hover:bg-[#7620c7] shrink-0 transition-transform"
            aria-expanded={open}
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {open && rows.length > 0 && (
        <div className="px-3 pb-3 space-y-3">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_0.5fr_1fr_auto] gap-3 items-end border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0"
            >
              <div>
                <SelectField
                  label="Section/Sub-Section"
                  name={`section-${idx}`}
                  value={row.section}
                  onChange={(e) => updateRow(idx, "section", e.target.value)}
                  options={[
                    { value: "", label: "Select Section/Sub Section" },
                    { value: "80C", label: "80C" },
                    { value: "80CCC", label: "80CCC" },
                    { value: "80CCD", label: "80CCD(1)" },
                    { value: "80CCD2", label: "80CCD(2)" },
                  ]}
                />
              </div>

              <div className="flex flex-col mx-3">
                <label className="text-gray-500 dark:text-gray-400 font-semibold text-[0.7rem]">
                  Description
                </label>
                <span className="text-[0.7rem] text-gray-500 dark:text-gray-400">
                  Description
                </span>
              </div>

              <div className="w-fit mx-3">
                <InputField
                  label="Amount"
                  name={`amount-${idx}`}
                  value={row.amount}
                  onChange={(e) => updateRow(idx, "amount", e.target.value)}
                  placeholder=""
                />
              </div>

              <button
                type="button"
                onClick={() => removeRow(idx)}
                className="flex items-center justify-center w-8 h-8 bg-white/70 dark:bg-gray-700/50 text-red-500 hover:text-red-700 dark:hover:text-red-400 mb-0.5 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── House Rent Details accordion ─── */
function HouseRentAccordion({ rows, setRows }) {
  const [open, setOpen] = useState(false);

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { fromDate: "", toDate: "", amount: "", city: "", landlordName: "", address: "" },
    ]);

  const removeRow = (idx) =>
    setRows((prev) => prev.filter((_, i) => i !== idx));

  const updateRow = (idx, field, value) =>
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );

  return (
    <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 rounded-lg overflow-visible">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex flex-row justify-between w-[50%]">
          <h3 className="text-[0.85rem] font-bold text-gray-800 dark:text-gray-100">
            House Rent Details
          </h3>

          <div className="flex flex-col leading-tight">
            <h1 className="text-[1rem] font-semibold text-center text-[#8629DF] dark:text-purple-400">
              50,000,00
            </h1>
            <span className="text-[0.7rem] text-start text-gray-500 dark:text-gray-400">
              Amount
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addRow}
            className="bg-[#8629DF] hover:bg-[#7620c7] text-white text-[0.7rem] font-semibold px-3 py-1.5 rounded-sm"
          >
            Add Fields
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center w-7 h-7 rounded-sm bg-[#8629DF] text-white hover:bg-[#7620c7] shrink-0 transition-transform"
            aria-expanded={open}
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {open && rows.length > 0 && (
        <div className="px-3 pb-3 space-y-4">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_0.5fr_auto] gap-5 items-end">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <DatePickerField
                    label="From Date"
                    name={`fromDate-${idx}`}
                    value={row.fromDate}
                    onChange={(e) => updateRow(idx, "fromDate", e.target.value)}
                  />
                  <DatePickerField
                    label="TO Date"
                    name={`toDate-${idx}`}
                    value={row.toDate}
                    onChange={(e) => updateRow(idx, "toDate", e.target.value)}
                  />
                  <InputField
                    label="Amount"
                    name={`rentAmount-${idx}`}
                    value={row.amount}
                    className="w-full"
                    onChange={(e) => updateRow(idx, "amount", e.target.value)}
                  />
                  <SelectField
                    label="City"
                    name={`city-${idx}`}
                    value={row.city}
                    onChange={(e) => updateRow(idx, "city", e.target.value)}
                    options={[
                      { value: "", label: "Select Section/Sub Section" },
                      { value: "mumbai", label: "Mumbai" },
                      { value: "delhi", label: "Delhi" },
                      { value: "bangalore", label: "Bangalore" },
                      { value: "chennai", label: "Chennai" },
                      { value: "kolkata", label: "Kolkata" },
                      { value: "hyderabad", label: "Hyderabad" },
                      { value: "pune", label: "Pune" },
                    ]}
                  />
                  <InputField
                    label="Landlord Name"
                    name={`landlord-${idx}`}
                    value={row.landlordName}
                    onChange={(e) => updateRow(idx, "landlordName", e.target.value)}
                  />
                  <InputField
                    label="Address"
                    name={`address-${idx}`}
                    value={row.address}
                    onChange={(e) => updateRow(idx, "address", e.target.value)}
                  />
                </div>
                <div></div>
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 dark:hover:text-red-400 mb-0.5 bg-white dark:bg-gray-700/50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function InvestmentDetails({ onNext, onPrev }) {
  const [section80CLimit, setSection80CLimit] = useState("");

  // Accordion rows state
  const [section80CRows, setSection80CRows] = useState([
    { section: "", description: "", amount: "10,000.00" },
    { section: "", description: "", amount: "75,000.00" },
  ]);
  const [otherSectionRows, setOtherSectionRows] = useState([
    { section: "", description: "", amount: "10,000.00" },
    { section: "", description: "", amount: "10,000.00" },
  ]);
  const [houseRentRows, setHouseRentRows] = useState([
    { fromDate: "", toDate: "", amount: "10,000.00", city: "", landlordName: "", address: "" },
    { fromDate: "", toDate: "", amount: "30,000.00", city: "", landlordName: "", address: "" },
  ]);

  // Other Income / Deduction
  const [otherIncome, setOtherIncome] = useState({
    dateOfPossession: "",
    nameOfLender: "",
    panOfLender: "",
    addressOfLender: "",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-500 dark:text-gray-400">
        Investment Details
      </h2>

      {/* Under Section 80C Limit */}
      <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 px-3 rounded-lg">
        <div className="w-fit">
          <InputField
            label="Under Section 80C Limit"
            value={section80CLimit}
            onChange={(e) => setSection80CLimit(e.target.value)}
          />
        </div>
      </div>

      {/* Section 80C, 80CCC & 80CCD */}
      <SectionAccordion
        label="Section 80C, 80CCC & 80CCD"
        rows={section80CRows}
        setRows={setSection80CRows}
      />

      {/* Other Section */}
      <SectionAccordion
        label="Other Section"
        rows={otherSectionRows}
        setRows={setOtherSectionRows}
      />

      {/* House Rent Details */}
      <HouseRentAccordion rows={houseRentRows} setRows={setHouseRentRows} />

      <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 px-3 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <InputField label={"Landlord PAN"} />
          <VariableTypeRow label={"Landlord Declarations"} />
        </div>
      </div>

      {/* Other Income / Deduction */}
      <div className="bg-[#EFEFEF]/70 dark:bg-[#E4E6EB]/10 p-2 px-3 rounded-lg">
        <h3 className="text-base font-semibold mb-2 text-gray-500 dark:text-gray-400">
          Other Income / Deduction
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <DatePickerField
            label="Date of Possession"
            name="dateOfPossession"
            value={otherIncome.dateOfPossession}
            onChange={(e) =>
              setOtherIncome((p) => ({ ...p, dateOfPossession: e.target.value }))
            }
          />
          <InputField
            label="Name of the Lender"
            name="nameOfLender"
            value={otherIncome.nameOfLender}
            onChange={(e) =>
              setOtherIncome((p) => ({ ...p, nameOfLender: e.target.value }))
            }
          />
          <InputField
            label="PAN of the Lender"
            name="panOfLender"
            value={otherIncome.panOfLender}
            onChange={(e) =>
              setOtherIncome((p) => ({ ...p, panOfLender: e.target.value }))
            }
          />
          <InputField
            label="Address of the Lender"
            name="addressOfLender"
            value={otherIncome.addressOfLender}
            onChange={(e) =>
              setOtherIncome((p) => ({ ...p, addressOfLender: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex flex-row justify-end w-full gap-2 mt-3">
        <button type="button" className={btnPrevReset} onClick={onPrev}>
          Previous
        </button>
        <button type="button" className={btnPrevReset}>
          Reset
        </button>
        <button type="button" className={btnSave} onClick={onNext}>
          Save
        </button>
      </div>
    </div>
  );
}