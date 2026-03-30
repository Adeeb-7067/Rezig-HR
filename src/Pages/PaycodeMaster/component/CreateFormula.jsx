import React, { useState } from "react";
import FormulaBuilder from "./createFormula/FormulaBuilder";
import FormulaHeader from "./createFormula/FormulaHeader";
import ComponentList from "./createFormula/ComponentList";


const CreateFormula = () => {
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
        </div>
    );
};

export default CreateFormula;