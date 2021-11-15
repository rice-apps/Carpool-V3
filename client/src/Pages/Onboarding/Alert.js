import React from 'react';

import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { LoginButton, LoginDialog, LoginDialogActions, ExitDialogActions, LoginIconButton } from './Alert.styles.js';
import { SERVICE_URL } from '../../config'; 

const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 
const destination = '/create-ride'; 

// Function to integrate the Alert Pop-Up if user is not logged via Rice SSO
function AlertDialog() {

    const history = useHistory() 
    const id = localStorage.getItem('netid');

    // States to control for Dialog
    const [openAlert, setOpenAlert] = useState(false);
    const [skipQuery, setSkipQuery] = useState(true);
    const [userData, setUserData] = useState();

    const GET_USER = gql`
    query GetUserInfo ($netID: String)
    {
      userOne (filter:{netid : $netID}) {
        _id
        firstName
        lastName
        netid
        phone
      }
    }`
  
    // Query for retrieving the user's information once logged into Rice SSO, 
    // skipped while their net ID is not confirmed. 
    useQuery(GET_USER, 
      {
        skip: skipQuery, 
        variables: 
        {
          netID: id
        },
        onCompleted: data => {
            setUserData(data)
            setSkipQuery(true)
        }
      }
    );

    // Determine the behavior of button, verify if user is in Rice SSO
    const handleClickOpen = () => {
        // User is logged in already via Rice Verification
        if (id != null) {
            // Verify if user is in Carpool Database by triggering the Query
            setSkipQuery(false)
            
        } 
        // User is not logged in, prompt them to log in
        else {
            setOpenAlert(true);
        }
        
    };

    useEffect(() => {
        if (userData) {
            if (!userData.userOne.firstName) {
                // Route to onboarding prompt.. need to be replaced with proper component
                history.push('/search'); 
            } else {
                history.push(destination);
            }
        }
        
    }, [userData, history])

    // Close the dialog box
    const handleClose = () => {
        setOpenAlert(false);
    };

    // Handle logging into SSO
    const handleLogin = () => {
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
                <ExitDialogActions>
                    <LoginIconButton onClick={handleClose}>
                            <CloseIcon />
                    </LoginIconButton>
                </ExitDialogActions>
                <LoginDialogActions>
                    <LoginButton onClick={handleLogin} autoFocus>Login</LoginButton>
                </LoginDialogActions>
            </LoginDialog>
        </div>
    )
}

export default AlertDialog;
