// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Registration from './components/Registration'; 
import AppointmentBooking from './components/AppointmentBooking';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardTest from './components/AdminDashboardTest';
import MyAppointments from './components/MyAppointments';
import LabTechnicianManage from './components/LabTechnicianManag';




function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LabTechnicianManage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/book-appointment" element={<AppointmentBooking />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-dashboardTest" element={<AdminDashboardTest />} />
                    <Route path="/my-appointment" element={<MyAppointments />} />
                    <Route path="/my-appointment" element={<LabTechnicianManage />} />
                  
                </Routes>
            </div>
        </Router>
    );
}


export default App;
