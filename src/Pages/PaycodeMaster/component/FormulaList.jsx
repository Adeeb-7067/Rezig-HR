import React, { useState } from "react";
import { Eye, Pencil, Trash2, Check, X } from "lucide-react";
import ViewFormulaModal from "./createFormula/ViewFormulaModal";

// ══════════════════════════════════════════════════════════
//  Mock Data (used by the parent wrapper below)
// ══════════════════════════════════════════════════════════
const MOCK_DATA = [
  { code: "FRM-001", desc: "Basic Salary Calculation", formula: "Base Pay × Hours Worked", sequence: 1 },
  { code: "FRM-002", desc: "Overtime Allowance", formula: "(Hours - 160) × Rate × 1.5", sequence: 2 },
  { code: "FRM-003", desc: "Tax Deduction", formula: "Gross Pay × Tax Rate", sequence: 3 },
  { code: "FRM-004", desc: "Provident Fund", formula: "Basic Salary × 0.12", sequence: 4 },
  { code: "FRM-005", desc: "Net Pay Calculation", formula: "Gross - Tax - PF - Deductions", sequence: 5 },
  { code: "FRM-006", desc: "Leave Encashment", formula: "Daily Rate × Unused Leave Days", sequence: 6 },
  { code: "FRM-007", desc: "Bonus Calculation", formula: "Annual Salary × Performance %", sequence: 7 },
];

// ══════════════════════════════════════════════════════════
//  Inline Edit Row (controlled)
// ══════════════════════════════════════════════════════════
const EditableRow = ({ values, onChange, onSave, onCancel }) => {
  const inputClass =
    "w-full h-7 px-2 text-[0.7rem] border border-blue-400 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400";

  return (
    <>
      <div>
        <input
          type="text"
          value={values.code}
          onChange={(e) => onChange("code", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <input
          type="text"
          value={values.desc}
          onChange={(e) => onChange("desc", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <input
          type="text"
          value={values.formula}
          onChange={(e) => onChange("formula", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <input
          type="number"
          value={values.sequence}
          onChange={(e) => onChange("sequence", Number(e.target.value))}
          className="w-16 h-7 text-center text-[0.7rem] border border-blue-400 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={onSave}
          className="p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/30"
          title="Save"
        >
          <Check size={14} className="text-green-600" />
        </button>
        <button
          onClick={onCancel}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Cancel"
        >
          <X size={14} className="text-gray-500" />
        </button>
      </div>
    </>
  );
};


const FormulaList = ({ data, onView, onEdit, onDelete }) => {
  const [viewData, setViewData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState({});

  // ── View ──
  const handleView = (item, index) => {
    setViewData(item);
    onView?.(item, index);
  };

  // ── Edit ──
  const startEdit = (index) => {
    setEditIndex(index);
    setEditValues({ ...data[index] });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValues({});
  };

  const saveEdit = () => {
    onEdit?.(editValues, editIndex);
    setEditIndex(null);
    setEditValues({});
  };

  const handleEditChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  // ── Delete ──
  const handleDelete = (item, index) => {
    onDelete?.(item, index);
  };

  // ── Grid columns (shared between header & rows) ──
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "140px 1.5fr 1.5fr 100px 120px",
    alignItems: "center",
  };

  return (
    <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#252C58] dark:text-gray-50 mb-3 ">
        Formula List
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">

            {/* Header */}
            <div
              className="ds-text-xs font-semibold text-white bg-primary py-3 px-6"
              style={gridStyle}
            >
              <div>Formula Code</div>
              <div>Formula Description</div>
              <div>Formula</div>
              <div>Sequence</div>
              <div className="text-center">Action</div>
            </div>

            {/* Body */}
            <div className="max-h-[200px] overflow-y-auto table-scroll">
              {(!data || data.length === 0) && (
                <div className="text-center text-gray-400 text-sm py-6">
                  No formulas found.
                </div>
              )}

              {data?.map((item, i) => (
                <div
                  key={item.code || i}
                  className="ds-text-xs py-3 px-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  style={gridStyle}
                >
                  {editIndex === i ? (
                    <EditableRow
                      values={editValues}
                      onChange={handleEditChange}
                      onSave={saveEdit}
                      onCancel={cancelEdit}
                    />
                  ) : (
                    <>
                      <div>{item.code}</div>
                      <div>{item.desc}</div>
                      <div>{item.formula}</div>
                      <div>
                        <input
                          type="text"
                          value={item.sequence}
                          readOnly
                          className="w-16 h-7 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div className="flex justify-center gap-4">
                        <Eye
                          size={14}
                          className="cursor-pointer hover:text-ds-primary"
                          onClick={() => handleView(item, i)}
                        />
                        <Pencil
                          size={14}
                          className="cursor-pointer hover:text-ds-primary"
                          onClick={() => startEdit(i)}
                        />
                        <Trash2
                          size={14}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(item, i)}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <ViewFormulaModal
        open={!!viewData}
        data={viewData}
        onClose={() => setViewData(null)}
      />
    </div>
  );
};

// ══════════════════════════════════════════════════════════
//  Parent Wrapper — owns the state & passes callbacks
//  (Replace this with your actual page / parent component)
// ══════════════════════════════════════════════════════════
const FormulaListPage = () => {
  const [formulas, setFormulas] = useState(MOCK_DATA);

  const handleView = (item, index) => {
    console.log("Viewed:", item, "at index", index);
  };

  const handleEdit = (updatedItem, index) => {
    setFormulas((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    );
  };

  const handleDelete = (item, index) => {
    setFormulas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FormulaList
      data={formulas}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export { FormulaList };
export default FormulaListPage;