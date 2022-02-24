import React from 'react';

import { useState } from 'react';
import { useHistory } from "react-router";
import { Button, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { LoginButton, LoginDialog, LoginDialogActions} from './Alert.styles.js';
import { SERVICE_URL } from '../../config'; 

const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 
const destination = '/create-ride'; 

// Function to integrate the Alert Pop-Up if user is not logged via Rice SSO
function AlertDialog() {

    const history = useHistory() 
    const id = localStorage.getItem('netid');

    // States to control for Dialog
    const [openAlert, setOpenAlert] = useState(false);

    // Determine the behavior of button, verify if user is in Rice SSO
    const handleClickOpen = () => {
        // User is logged in already via Rice Verification
        if (id != null) {
            // Verify if user is in Carpool Database by triggering the Query
            localStorage.setItem('nextPage', destination);
            history.push("/userAuth")
        } 
        // User is not logged in, prompt them to log in
        else {
            setOpenAlert(true);
        }
        
    };

    // Close the dialog box
    const handleClose = () => {
        setOpenAlert(false);
    };

    // Handle logging into SSO
    const handleLogin = () => {
        // Route to SSO
        localStorage.setItem('nextPage', destination);
        let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
        window.open(redirectURL, '_self');
    }
    

    return (
        <div>
            <Button onClick={handleClickOpen}> Create Ride </Button>
            <LoginDialog
                open={openAlert}
                onClose={handleClose}
            >
                <Grid container spacing = {12}>
                    <Grid item sm = {11} xs = {10}/>
                    <Grid item sm = {1} xs = {2}>
                        <IconButton onClick = {handleClose} size = "medium">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs = {12}>
                        <LoginDialogActions>
                            <LoginButton onClick={handleLogin} autoFocus>Rice SSO Login</LoginButton>
                        </LoginDialogActions>
                    </Grid>
                </Grid>
            </LoginDialog>
        </div>
    )
}

export default AlertDialog;
