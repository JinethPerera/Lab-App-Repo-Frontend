// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Registration from './components/Registration'; 
import AppointmentBooking from './components/AppointmentBooking'; // Import the AppointmentBooking component




function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Registration/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/book-appointment" element={<AppointmentBooking />} /> {/* Add the new route for appointment booking */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
