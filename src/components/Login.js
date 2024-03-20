import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  linkButton: {
    textDecoration: 'none',
    marginRight: theme.spacing(3),
    borderRadius: '20px', 
    padding: theme.spacing(1, 2), 
    backgroundColor: '#3f51b5', 
    color: '#fff', 
    '&:hover': {
      backgroundColor: '#303f9f', 
    },
  },
  textField: {
    marginBottom: theme.spacing(2), 
    '&:hover': {
      transform: 'scale(1.02)', 
    },
    '& .Mui-focused': {
      transform: 'scale(1.02)', 
    },
  },
}));

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8091/login', {
        username,
        password,
      });

      const userRole = response.data;

      localStorage.setItem('username', username);

      if (userRole === 'Admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'User') {
        navigate('/book-appointment');
      } else {
        setMessage('Unexpected response from server');
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setMessage('Incorrect username or password');
      } else {
        setMessage('Login failed: ' + error.message);
      }
      setOpenSnackbar(true);
      setLoginFailed(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Smartsupp Live Chat script
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
          <RouterLink to="/registration" className={classes.linkButton}>
            Register
          </RouterLink>
          <RouterLink to="/contact" className={classes.linkButton}>
            Contact
          </RouterLink>
          <RouterLink to="/staff-login" className={classes.linkButton}>
            Staff Login
          </RouterLink>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.box}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
            id="outlined-basic" 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.textField}
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
              className={classes.textField}
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

export default Login;
