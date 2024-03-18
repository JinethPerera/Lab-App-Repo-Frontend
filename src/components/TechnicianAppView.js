import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
    backgroundColor: '#3498db',
    transition: 'transform 0.3s ease', // Animation transition
    '&:hover': {
      transform: 'scale(1.05)', // Scale up on hover
    },
  },
}));

function LabTechnicianAppointments() {
    const classes = useStyles();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8091/lab-technician/appointments/');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    return (
        <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">Lab Technician Appointment Managment</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/lab-technician">Lab Tachnicians</a>
                </li>
                {/* Add more navbar items as needed */}
              </ul>
            </div>
          </div>
        </nav>
            <Container maxWidth="md" className={classes.container}>
                <Box>
                    <h1>Appointments</h1>
                    <Grid container spacing={2}>
                        {appointments.map(appointment => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {appointment.patientName}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            Contact Information: {appointment.contactInformation}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            Date of Birth: {appointment.dateOfBirth}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            Appointment Date and Time: {appointment.appointmentDateTime}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            Test Type: {appointment.testType}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            Status: {appointment.status}
                                        </Typography>
                                        <Link to="/lab-result" className="btn btn-primary">Test</Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default LabTechnicianAppointments;
