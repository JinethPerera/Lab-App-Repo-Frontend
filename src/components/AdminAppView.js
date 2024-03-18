import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    marginBottom: theme.spacing(2),
    width: '30%', // Adjust as needed
    minWidth: 300, 
    backgroundColor: '#3498db', 
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
    transition: 'transform 0.3s ease', 
    '&:hover': {
      transform: 'scale(1.05)', 
    },
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  navbar: {
    marginBottom: theme.spacing(2),
  },
}));

function AdminAppointments() {
    const classes = useStyles();
    const [appointments, setAppointments] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true); 
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);

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

    const handleLogout = () => {
        setLoggedIn(false);
        setShowLogoutMessage(true);
        setTimeout(() => {
            window.location.href = '/staff-login';
        }, 1000); 
    };

    const handleClose = () => setShowLogoutMessage(false);

    const handleUpdate = (id) => {
        console.log(`Update appointment with ID: ${id}`);
        // Implement your update logic here
    };

    const handleDelete = (id) => {
        console.log(`Delete appointment with ID: ${id}`);
        // Implement your delete logic here
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${classes.navbar}`}>
                <div className="container">
                    <a className="navbar-brand" href="#">Doctor Managment</a>
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
                            {loggedIn && (
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <Container maxWidth="md" className={classes.container}>
                <Box>
                    <h1>Appointments</h1>
                    <div className={classes.cardContainer}>
                        {appointments.map(appointment => (
                            <Card key={appointment.id} className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h5" component="h2">
                                        Patient Name: {appointment.patientName}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Contact Information: {appointment.contactInformation}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Date of Birth: {appointment.dateOfBirth}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Appointment Date and Time: {appointment.appointmentDateTime}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Test Type: {appointment.testType}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Status: {appointment.status}
                                    </Typography>
                                    <Button variant="contained" color="primary" onClick={() => handleUpdate(appointment.id)}>
                                        Update
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(appointment.id)}>
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Box>
            </Container>

            <Modal show={showLogoutMessage} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have successfully logged out.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminAppointments;
