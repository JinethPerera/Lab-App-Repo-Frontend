// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Registration from './components/Registration'; 



function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
