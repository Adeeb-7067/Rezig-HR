// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import Layout from './LayOut/Layout';
// import SignIn from './Pages/SignIn';
// import ForgotPassword from './Pages/ForgotPassword';
// import NewPassword from './Pages/NewPassword';
// import OTPverification from './Pages/OTPverification';
// import DashBoard from './Pages/DashBoard';
// import EmployeList from './Pages/EmployeList'
// import OrganizationDetails from './Pages/organizationDetails'
// import PfConfiguration from './Pages/pfConfiguration';

// import Info from './Pages/info';
// import MonthlyAttendence from './Pages/MonthlyAttendence';
// import IncomeTaxConfiguration from './Pages/IncomeTaxConfiguration';
// import PaycodeMaster from './Pages/PaycodeMaster/PaycodeMaster';
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth routes without layout */}
//         <Route path="/" element={<SignIn />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/new-password" element={<NewPassword />} />
//         <Route path="/OTP-verification" element={<OTPverification />} />

//         {/* Protected routes with layout */}
//         <Route
//           path="/DashBoard"
//           element={
//             <Layout>
//               <DashBoard />
//             </Layout>
//           }
//         />
//         <Route
//           path="/EmployeeList"
//           element={
//             <Layout>
//               <EmployeList />
//             </Layout>
//           }
//         />
//         <Route
//           path='/info'
//           element={
//             <Layout>
//               <Info />
//             </Layout>
//           }
//         />
//         <Route
//           path='/monthlyAttendance'
//           element={
//             <Layout>
//               <MonthlyAttendence />
//             </Layout>
//           }
//         />
//         <Route
//           path="/organizationDetails"
//           element={
//             <Layout>
//               <OrganizationDetails />
//             </Layout>
//           }
//         />

//         <Route
//           path="/pfConfiguration"
//           element={
//             <Layout>
//               < PfConfiguration />
//             </Layout>
//           }
//         />
//         <Route
//           path="/incomeTax"
//           element={
//             <Layout>
//               < IncomeTaxConfiguration />
//             </Layout>
//           }
//         />
//         <Route
//           path="/paycodeMaster"
//           element={
//             <Layout>
//               <PaycodeMaster />
//             </Layout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;






import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./LayOut/Layout";

/* ================= LAZY LOAD PAGES ================= */

const SignIn = lazy(() => import("./Pages/SignIn"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const NewPassword = lazy(() => import("./Pages/NewPassword"));
const OTPverification = lazy(() => import("./Pages/OTPverification"));

const DashBoard = lazy(() => import("./Pages/DashBoard"));
const EmployeList = lazy(() => import("./Pages/EmployeList"));
const OrganizationDetails = lazy(() => import("./Pages/organizationDetails"));
const PfConfiguration = lazy(() => import("./Pages/pfConfiguration"));
const Info = lazy(() => import("./Pages/info"));
const MonthlyAttendence = lazy(() => import("./Pages/MonthlyAttendence"));
const IncomeTaxConfiguration = lazy(() => import("./Pages/IncomeTaxConfiguration"));
const PaycodeMaster = lazy(() => import("./Pages/PaycodeMaster/PaycodeMaster"));

const LeaveConfiguration = lazy(() => import("./Pages/Leave/LeaveConfiguration"));
const AttendanceLayout = lazy(() => import("./Pages/Attendence/AttendanceLayout"));
const ReportBuilder = lazy(() => import("./Pages/ReportBuilder/ReportBuilder"));
const BankBuilder = lazy(() => import("./Pages/BankBuilder/BankBuilder"));

const PayrollDashboard = lazy(() => import("./Pages/Payroll Dashboard/PayrollDashboard"));
const LoanAssignment = lazy(() => import("./Pages/LoanAssigment/loanAssigment"));
const LoanAssignmentDetail = lazy(() => import("./Pages/LoanAssigment/loanAssigmentDetails"));
const AddLoan = lazy(() => import("./Pages/LoanAssigment/addLoan"));

/* ================= PAGE LOADER ================= */

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
  </div>
);

/* ================= APP ================= */

const App = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ========= AUTH ROUTES ========= */}

          <Route path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/otp-verification" element={<OTPverification />} />

          {/* ========= PROTECTED ROUTES ========= */}

          <Route path="/dashboard" element={<Layout><DashBoard /></Layout>} />
          <Route path="/employeelist" element={<Layout><EmployeList /></Layout>} />
          <Route path="/info" element={<Layout><Info /></Layout>} />
          <Route path="/monthlyattendance" element={<Layout><MonthlyAttendence /></Layout>} />

          {/* Configuration */}
          <Route path="/organizationdetails" element={<Layout><OrganizationDetails /></Layout>} />
          <Route path="/pfconfiguration" element={<Layout><PfConfiguration /></Layout>} />
          <Route path="/incometax" element={<Layout><IncomeTaxConfiguration /></Layout>} />
          <Route path="/paycodemaster" element={<Layout><PaycodeMaster /></Layout>} />

          {/* Attendance & Leave */}
          <Route path="/leave" element={<Layout><LeaveConfiguration /></Layout>} />
          <Route path="/attendence-configuration" element={<Layout><AttendanceLayout /></Layout>} />

          {/* Reports */}
          <Route path="/report-builder" element={<Layout><ReportBuilder /></Layout>} />
          <Route path="/bank-builder" element={<Layout><BankBuilder /></Layout>} />

          {/* Payroll */}
          <Route path="/payrolldashboard" element={<Layout><PayrollDashboard /></Layout>} />

          {/* Loan */}
          <Route path="/loanassignment" element={<Layout><LoanAssignment /></Layout>} />
          <Route path="/loanassignmentdetails" element={<Layout><LoanAssignmentDetail /></Layout>} />
          <Route path="/addloan" element={<Layout><AddLoan /></Layout>} />

        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
