import React, { useState } from "react";
import FormulaBuilder from "./createFormula/FormulaBuilder";
import FormulaHeader from "./createFormula/FormulaHeader";
import ComponentList from "./createFormula/ComponentList";


const CreateFormula = ({onCancel}) => {
    const [formula, setFormula] = useState("");

    const handleComponentSelect = (componentCode) => {
        setFormula((prev) => prev + componentCode);
    };

    return (
        <div className="
      space-y-6
      pb-20
      max-w-7xl
      mx-auto
    ">
            <FormulaHeader />
            <FormulaBuilder formula={formula} setFormula={setFormula} />
            <ComponentList onComponentSelect={handleComponentSelect} />
            <div className="flex justify-end">

             <button
          onClick={()=>{onCancel()}}
          type="button"
          className="bg-white dark:bg-[#E4E6EB]/10 border border-ds-primary text-ds-primary font-semibold text-xs sm:text-[0.7rem] py-1 rounded-sm w-[50%] sm:w-auto md:w-24"
          >
          Back
        </button>
            </div>
        </div>
    );
};

export default CreateFormula;