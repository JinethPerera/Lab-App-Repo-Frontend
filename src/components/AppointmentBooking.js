
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    marginTop: theme.spacing(8),
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppointmentBooking() {
  const classes = useStyles();
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    contactInformation: '',
    dateOfBirth: '',
    appointmentDateTime: '',
    testType: '',
    status: 'Pending',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bookingFailed, setBookingFailed] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    for (const key in appointmentData) {
      if (appointmentData[key] === '') {
        setDialogMessage('Please fill in all fields.');
        setOpenDialog(true);
        setIsLoading(false);
        return;
      }
    }

    // Check if date is chosen
    if (!appointmentData.appointmentDateTime) {
      setDialogMessage('Please choose a date.');
      setOpenDialog(true);
      setIsLoading(false);
      return;
    }

    
    const patientId = 1; 

    try {
      const appointmentDataWithPatientId = {
        ...appointmentData,
        patientId: patientId
      };

      const response = await axios.post('http://localhost:8091/appointment/book', appointmentDataWithPatientId);
      setMessage('Appointment booked successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Appointment booking failed: ' + error.message);
      setOpenSnackbar(true);
      setBookingFailed(true);
    }
    setIsLoading(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
  
    const smartsuppScript = document.createElement("script");
    smartsuppScript.type = "text/javascript";
    smartsuppScript.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = 'b7263d274eeeba44b8a69f7a54df4924ea4f62bd';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `;
    document.body.appendChild(smartsuppScript);
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ABC Laboratories Appointment System
          </Typography>
          <Link to="/my-appointment" color="inherit" style={{ marginRight: '20px' }}>
            My Appointments
          </Link>
          <Link to="/registration" color="inherit">
            Register
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.box}>
          <Typography component="h1" variant="h5" align="center">
            Book Appointment
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Patient Name"
              name="patientName"
              value={appointmentData.patientName || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contact Information"
              name="contactInformation"
              value={appointmentData.contactInformation || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={appointmentData.dateOfBirth || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Appointment Date and Time"
              type="datetime-local"
              name="appointmentDateTime"
              value={appointmentData.appointmentDateTime || ""}
              onChange={handleChange}
            />
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Test Type"
              name="testType"
              value={appointmentData.testType || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Status"
              name="status"
              value={appointmentData.status || ""}
              onChange={handleChange}
              select
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Book Appointment'}
            </Button>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <SnackbarContent
              style={{
                backgroundColor: bookingFailed ? '#f44336' : '#4caf50',
              }}
              message={
                <span className={classes.message}>
                  {bookingFailed ? <ErrorIcon className={classes.icon} /> : <CheckCircleIcon className={classes.icon} />}
                  {message}
                </span>
              }
            />
          </Snackbar>
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" color="error">
                {dialogMessage}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}

export default AppointmentBooking;
