// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Registration from './components/Registration'; 
import AppointmentBooking from './components/AppointmentBooking';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardTest from './components/AdminDashboardTest';
import MyAppointments from './components/MyAppointments';
import LabTechnicianManag from './components/LabTechnicianManag';
import TechnicianAppView from './components/TechnicianAppView';
import LabTestResult from './components/LabTestResult';
import StaffLogin from './components/StaffLogin';
import AdminAppView from './components/AdminAppView';
import Testing from './components/Testing';
import ReportGenerating from './components/ReportGenerating';
import Home from './components/Home';







function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/book-appointment" element={<AppointmentBooking />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-dashboardTest" element={<AdminDashboardTest />} />
                    <Route path="/my-appointment" element={<MyAppointments />} />
                    <Route path="/lab-technician" element={<LabTechnicianManag />} />
                    <Route path="/technician-view" element={<TechnicianAppView />} />
                    <Route path="/lab-result" element={<LabTestResult />} />
                    <Route path="/staff-login" element={<StaffLogin />} />
                    <Route path="/adminapp-view" element={<AdminAppView />} />
                    <Route path="/testing" element={<Testing />} />
                    <Route path="/report-generating" element={<ReportGenerating />} />
                    <Route path="/home" element={<Home />} />
                   

                  
                    

                   
                   
                  
                  
                </Routes>
            </div>
        </Router>
    );
}


export default App;
