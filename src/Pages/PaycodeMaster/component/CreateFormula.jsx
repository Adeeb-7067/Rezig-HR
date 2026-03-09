import React, { useState } from "react";
import FormulaBuilder from "./createFormula/FormulaBuilder";
import FormulaHeader from "./createFormula/FormulaHeader";
import ComponentList from "./createFormula/ComponentList";


const CreateFormula = () => {


    return (
        <div className="
      space-y-6
      pb-20
      max-w-7xl
      mx-auto
    ">
            <FormulaHeader />
            <FormulaBuilder />
            <ComponentList />
        </div>
    );
};

export default CreateFormula;