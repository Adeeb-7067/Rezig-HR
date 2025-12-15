import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './LayOut/Layout';
import SignIn from './Pages/SignIn';
import ForgotPassword from './Pages/ForgotPassword';
import NewPassword from './Pages/NewPassword';
import OTPverification from './Pages/OTPverification';
import DashBoard from './Pages/DashBoard'; 
import EmployeList from './Pages/EmployeList'
import PersnalInfo from './Pages/PersonalInfo';
import StatutoryDatails from './Pages/StatutoryDetails';
import SalaryAssigment from './Pages/SalaryAssigment';
import FamilyDetail from './Pages/FamilyDetail';
import Info from './Pages/info';
import MonthlyAttendence from './Pages/MonthlyAttendence';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/OTP-verification" element={<OTPverification />} />

        {/* Protected routes with layout */}
        <Route
          path="/DashBoard"
          element={
            <Layout>
              <DashBoard />
            </Layout>
          }
        />
        <Route
          path="/EmployeeList"
          element={
            <Layout>
              <EmployeList />
            </Layout>
          }
        />
        <Route 
        path='/info'
        element={
          <Layout>
            <Info/>
          </Layout>
        }
        />
        <Route
        path='/monthlyAttendance'
        element={
          <Layout>
            <MonthlyAttendence/>
          </Layout>
        }
        />
      </Routes>
    </Router>
  );
};

export default App;
