import React from 'react';

import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { LoginButton } from './Alert.styles.js';
import { SERVICE_URL } from '../config'; 

const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 
const destinationURL = '/create-ride'; 

function AlertDialog() {
    const [openAlert, setOpenAlert] = useState(false);
    const [skipQuery, setSkipQuery] = useState(true);
    const [destination] = useState(destinationURL);
    const [userData, setUserData] = useState();
    const history = useHistory() 
    const id = localStorage.getItem('netid');

    // Backend Query to Confirm User
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

    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;

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
        
    }, [userData, history, destination])

    const handleClose = () => {
        setOpenAlert(false);
    };

    const handleLogin = () => {
        localStorage.setItem('nextPage', destination);
        console.log('Next Page is: ', localStorage.getItem('nextPage'));
        let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
        window.open(redirectURL, '_self');
    }
    

    return (
        <div>
            <Button onClick={handleClickOpen}> Create Ride </Button>
            <Dialog
                open={openAlert}
                onClose={handleClose}
            >
                <DialogActions>
                    <Button onClick={handleClose}>Nevermind</Button>
                    <LoginButton onClick={handleLogin} autoFocus>Login</LoginButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AlertDialog;