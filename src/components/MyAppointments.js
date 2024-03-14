import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridContainer: {
    marginTop: theme.spacing(2), 
  },
  appointmentBox: {
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    flexGrow: 1,
  },
}));

function MyAppointments() {
    const classes = useStyles(); 
    const [appointments, setAppointments] = useState([]);
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            fetchAppointments(username);
            fetchTestResults(username);
        }
    }, []);

    const fetchAppointments = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8091/appointment/appointments?username=${username}`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchTestResults = async (patientName) => {
        try {
            const response = await axios.get(`http://localhost:8091/testResults?patientName=${patientName}`);
            setTestResults(response.data);
        } catch (error) {
            console.error('Error fetching test results:', error);
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    ABC Laboratories Appointment System 
                    </Typography>
                    <Link to="/login" color="inherit" style={{ marginRight: '20px' }}>
                        My Appointments
                    </Link>
                    <Link to="/registration" color="inherit">
                        Register
                    </Link>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" className={classes.container}>
                <Box>
                    <h1>My Appointments</h1>
                    <Box className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Contact Information</th>
                                    <th>Date of Birth</th>
                                    <th>Appointment Date and Time</th>
                                    <th>Test Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appointment => (
                                    <tr key={appointment.id}>
                                        <td>{appointment.patientName}</td>
                                        <td>{appointment.contactInformation}</td>
                                        <td>{appointment.dateOfBirth}</td>
                                        <td>{appointment.appointmentDateTime}</td>
                                        <td>{appointment.testType}</td>
                                        <td>{appointment.status}</td>
                                        <td><button className="btn btn-primary">Pay</button></td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                    <h1>My Test Results</h1>
                    <Box className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Test Date</th>
                                    <th>Test Type</th>
                                    <th>Test Result</th>
                                    <th>Lab Technician</th>
                                    <th>Test Method</th>
                                    <th>Sample Type</th>
                                    <th>Additional Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testResults.map(testResult => (
                                    <tr key={testResult.id}>
                                        <td>{testResult.testDate}</td>
                                        <td>{testResult.testType}</td>
                                        <td>{testResult.testResult}</td>
                                        <td>{testResult.labTechnician}</td>
                                        <td>{testResult.testMethod}</td>
                                        <td>{testResult.sampleType}</td>
                                        <td>{testResult.additionalComments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default MyAppointments;
