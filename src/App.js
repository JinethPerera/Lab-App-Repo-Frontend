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






function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<TechnicianAppView/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/book-appointment" element={<AppointmentBooking />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-dashboardTest" element={<AdminDashboardTest />} />
                    <Route path="/my-appointment" element={<MyAppointments />} />
                    <Route path="/lab-technician" element={<LabTechnicianManag />} />
                    <Route path="/technician-view" element={<TechnicianAppView />} />
                   
                   
                  
                  
                </Routes>
            </div>
        </Router>
    );
}


export default App;
