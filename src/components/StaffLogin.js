import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, Navigate, Redirect } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  box: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
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
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function TechnicianLogin() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [redirectToAppointments, setRedirectToAppointments] = useState(false); 

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8091/lab-technicians/login', {
        email,
        password
      });

      
      localStorage.setItem('email', email);
      localStorage.setItem('isLoggedIn', true);
      setRedirectToAppointments(true); 
    } catch (error) {
      setMessage('Incorrect email or password');
      setOpenSnackbar(true);
      setLoginFailed(true);
    }
    setIsLoading(false);
  };

  if (redirectToAppointments) {
    return <Navigate to="/technician-view" />; 
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ABC Laboratories Appointment System
          </Typography>
          <Link to="/login" color="inherit" style={{ marginRight: '20px' }}>
            Patient Login
          </Link>
          <Link to="/technician-login" color="inherit" style={{ marginRight: '20px' }}>
            Technician Login
          </Link>
          <Link to="/admin-login" color="inherit">
            Admin Login
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.box}>
          <Typography component="h1" variant="h5" align="center">
            Technician Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
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
                backgroundColor: loginFailed ? '#f44336' : '#4caf50',
              }}
              message={
                <span className={classes.message}>
                  {loginFailed ? <ErrorIcon className={classes.icon} /> : <CheckCircleIcon className={classes.icon} />}
                  {message}
                </span>
              }
            />
          </Snackbar>
        </Box>
      </Container>
    </div>
  );
}

export default TechnicianLogin;
