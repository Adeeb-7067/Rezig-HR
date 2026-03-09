"use client";

import ConfigurationActions from "./ConfigurationActions";
import MiscConfiguration from "./MiscConfiguration";
import NonSummaryConfiguration from "./NonSummaryConfiguration";

import SummaryConfiguration from "./SummaryConfiguration";

// import SummaryConfiguration from "./SummaryConfiguration";
// import NonSummaryConfiguration from "./NonSummaryConfiguration";
// import MiscConfiguration from "./MiscConfiguration";
// import ConfigurationActions from "./ConfigurationActions";

const BankConfiguration = () => {

    return (
        <div className="space-y-6">

            <SummaryConfiguration />

            <NonSummaryConfiguration />

            <MiscConfiguration />

            <ConfigurationActions />

        </div>
    );
};

export default BankConfiguration;