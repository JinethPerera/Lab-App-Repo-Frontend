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
  title: {
    flexGrow: 1,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: theme.spacing(2),
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px 15px',
    textAlign: 'left',
  },
  td: {
    padding: '8px 15px',
    borderBottom: '1px solid #ddd',
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
                {/* Add more navbar items as needed */}
              </ul>
            </div>
          </div>
        </nav>
            <Container maxWidth="md" className={classes.container}>
                <Box>
                    <h1>Appointments</h1>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th className={classes.th}>Patient Name</th>
                                <th className={classes.th}>Contact Information</th>
                                <th className={classes.th}>Date of Birth</th>
                                <th className={classes.th}>Appointment Date and Time</th>
                                <th className={classes.th}>Test Type</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td className={classes.td}>{appointment.patientName}</td>
                                    <td className={classes.td}>{appointment.contactInformation}</td>
                                    <td className={classes.td}>{appointment.dateOfBirth}</td>
                                    <td className={classes.td}>{appointment.appointmentDateTime}</td>
                                    <td className={classes.td}>{appointment.testType}</td>
                                    <td className={classes.td}>{appointment.status}</td>
                                    <td className={classes.td}>
    <Link to="/lab-result" className="btn btn-primary">Test</Link>
</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Container>
        </div>
    );
}

export default LabTechnicianAppointments;
