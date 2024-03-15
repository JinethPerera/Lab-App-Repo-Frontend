import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  navbar: {
    marginBottom: theme.spacing(2),
  },
}));

function TestResultForm() {
    const classes = useStyles(); 
    const navigate = useNavigate(); 
    const [loggedIn, setLoggedIn] = useState(true); 
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);

    const handleLogout = () => {
        setLoggedIn(false);
        setShowLogoutMessage(true);
        setTimeout(() => {
            navigate('/staff-login');
        }, 1000); 
    };

    const handleClose = () => setShowLogoutMessage(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
    
        const formData = {
            patientName: form.patientName.value,
            testDate: form.testDate.value.split('T')[0],
            testType: form.testType.value,
            testResult: form.testResult.value,
            labTechnician: form.labTechnician.value,
            testMethod: form.testMethod.value,
            sampleType: form.sampleType.value,
            additionalComments: form.additionalComments.value
        };
    
        try {
            const response = await fetch('http://localhost:8091/testResults/submit', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

    
            if (response.ok) {
                console.log('Test result submitted successfully');
                form.reset();
            } else {
                console.error('Failed to submit test result');
            }
        } catch (error) {
            console.error('Error submitting test result:', error);
        }
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${classes.navbar}`}>
                <div className="container">
                    <a className="navbar-brand" href="#">Lab Technician</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/technician-view">Appointment Testing</a>
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
                <Typography variant="h4" gutterBottom>
                    Test Result Form
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="patientName"
                        label="Patient Name"
                        name="patientName"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="testDate"
                        label="Test Date"
                        name="testDate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="testType"
                        label="Test Type"
                        name="testType"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="testResult"
                        label="Test Result"
                        name="testResult"
                        multiline
                        rows={4}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="labTechnician"
                        label="Lab Technician"
                        name="labTechnician"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="testMethod"
                        label="Test Method"
                        name="testMethod"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="sampleType"
                        label="Sample Type"
                        name="sampleType"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="additionalComments"
                        label="Additional Comments"
                        name="additionalComments"
                        multiline
                        rows={4}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </form>
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

export default TestResultForm;
