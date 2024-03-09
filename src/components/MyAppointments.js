// Import necessary Bootstrap styles
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
    marginTop: theme.spacing(2), // Add margin top to the grid container
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
    const classes = useStyles(); // Instantiate styles using useStyles hook
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const patientId = 123; // Replace with the actual patient ID
            const response = await axios.get(`http://localhost:8091/appointment/appointments`);
            console.log('Response Data:', response.data); // Log the response data
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lab Appointment System
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
                          <th>Action</th> {/* Add a new column for the button */}
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
                              <td><button className="btn btn-primary">Pay</button></td> {/* Add the button */}
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
