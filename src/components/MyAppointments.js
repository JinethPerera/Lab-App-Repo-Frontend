import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  paymentFormContainer: {
    position: 'relative',
    transition: 'transform 0.5s ease',
    transform: 'scale(0)',
    zIndex: 1,
  },
  paymentFormContainerOpen: {
    transform: 'scale(1)',
  },
  paymentForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  generateReportButton: {
    marginBottom: theme.spacing(2),
  },
}));

function MyAppointments() {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8091/appointment/pay?patientName=${localStorage.getItem('username')}`);
      const updatedAppointments = appointments.map(appointment => {
        if (appointment.patientName === localStorage.getItem('username')) {
          return {...appointment, status: 'paid'};
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
   
    setCardNumber('');
    setCVC('');
    setExpireDate('');
    
    setShowPaymentForm(false);
  };

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  const handleGenerateReport = async () => {
    try {
        const patientName = localStorage.getItem('username'); // Get the logged-in patientName
        const response = await axios.get(`http://localhost:8091/appointment/report?patientName=${patientName}`, {
            responseType: 'arraybuffer',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    } catch (error) {
        console.error('Error generating report:', error);
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
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.contactInformation}</td>
                    <td>{appointment.dateOfBirth}</td>
                    <td>{appointment.appointmentDateTime}</td>
                    <td>{appointment.testType}</td>
                    <td>{appointment.status}</td>
                    <td>
                      <button className="btn btn-primary" onClick={togglePaymentForm}>
                        Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          <Button onClick={handleGenerateReport} variant="contained" color="primary" className={classes.generateReportButton}>
            Generate Report
          </Button>
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
                {testResults.map((testResult) => (
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
          <Box
            className={`${classes.paymentFormContainer} ${
              showPaymentForm ? classes.paymentFormContainerOpen : ''
            }`}
          >
            <form className={classes.paymentForm} onSubmit={handlePaymentSubmit}>
              <TextField
                className={classes.textField}
                label="Card Number"
                variant="outlined"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <TextField
                className={classes.textField}
                label="CVC"
                variant="outlined"
                value={cvc}
                onChange={(e) => setCVC(e.target.value)}
                required
              />
              <TextField
                className={classes.textField}
                label="Expiration Date"
                variant="outlined"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Pay Now
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default MyAppointments;
