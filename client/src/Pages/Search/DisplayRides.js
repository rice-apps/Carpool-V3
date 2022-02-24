import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Ride from './Ride.js';
import { GridT, StyledButton } from './DisplayRides.styles'
import { LoginButton, LoginDialog, LoginDialogActions} from '../Onboarding/Alert.styles.js';

// SSO Imports
import { SERVICE_URL } from '../../config'; 
const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 

const DisplayRides = (props) => {

    const [openAlert, setOpenAlert] = useState(false);

    const isEqualRides = (ride1, ride2) => {
        if (ride1._id == null || ride2._id == null) {
            return false;
        }

        return ride1._id === ride2._id;
    }
    
    // Determine action when create ride is pressed
    const handleClickCreateRide = () => {

        localStorage.setItem('nextPage', 'create-ride');
    
        let token = localStorage.getItem('token');

        if (token != null) { 
            // Route to UserAuth if user is logged in
            localStorage.setItem('nextPage', 'create-ride');
            window.open('/userAuth', '_self');
        } else {
            // Open Login Dialog if not
            setOpenAlert(true);
        }
        
    }
    
    // Close the dialog box
    const handleClose = () => {
        setOpenAlert(false);
    };

    // Handle logging into SSO
    const handleLogin = () => {
        // Route to SSO
        localStorage.setItem('nextPage', 'create-ride');
        let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
        window.open(redirectURL, '_self');
    }

    const handleClickSearchAgain = () => {
        window.scrollTo(0, 0);
    }


    const displayRideBottomOfPage = () => {
    
    
        return <div style = {{display: "flex", alignItems: "center", flexDirection: "column", gap: "1vh"}}>
            <div style={{ fontSize: '2vw', fontFamily: "Josefin Sans"}}>
                <Link to="/search" style = {{textDecoration: "none"}}>
                    <StyledButton
                    onClick={() => handleClickSearchAgain()}> 
                        Continue Searching
                    </StyledButton>
                </Link>
            </div>
            <div style={{ fontSize: '2vh', fontFamily: "Josefin Sans", color: "#C7CBD3"}}>
                OR
            </div>
            <div>
                <StyledButton
                        onClick={() => handleClickCreateRide()}> 
                        Create New Ride 
                </StyledButton>
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
            </div>
    }

    const rideBox = (ridesT) =>  {

        console.log("ridesT", ridesT)
        
        if (ridesT === null || ridesT === undefined) {
            return null;
        }

        const isValidRidesT = (ridesT!==null && ridesT!==undefined && ridesT.length>0);

        return <GridT container style={{gap: "2vh"}} direction="column" alignItems="center">
            <Box style={{fontSize: "4vh", paddingTop: '4vh', fontFamily: "Josefin Sans"}}>
                Matching Rides: 
            </Box>
            {
                (isValidRidesT) && ridesT.map((ride, ind) => (<Ride ride={ride} />))
            }
            {
                (!isValidRidesT) && 
                <Grid item xs={9} justify="center" align='center' alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px', backgroundColor:"#ddddff"}}>
                    <Box width={"100%"} height={"100%"} style={{fontSize: "2vh", fontFamily: "Josefin Sans", padding: "1vh"}}>
                        No rides matched.
                    </Box>
                </Grid>
            }
            <StyledButton style={{fontSize: "1em", color:"#2075D8",  height: '100%', display: 'flex', borderRadius: '10px'}} onClick={() => handleClickCreateRide()}> 
                    <p> Don't see a match? </p> &nbsp; Create a new ride 
            </StyledButton>
            {
                <div style = {{paddingTop: '1vh', fontSize: "4vh", fontFamily: "Josefin Sans"}}>All Rides:</div>
            }
            {
                props.ridesPossible.filter((ride) => { return !ridesT.some(e => isEqualRides(ride, e))}).map((ride, ind) => (<Ride ride={ride} />))
            }
            <Grid item justify="center" align='center' style={{ display: 'flex', alignItems: 'center', fontFamily: "Josefin Sans", fontSize: "2vh", color: "#C7CBD3"}}>
                no more results
            </Grid>
        </GridT>;
      }

    return (
        <div>
            <div>
                {
                    rideBox(props.ridesT)
                }
            </div>
            <div>
                {
                    displayRideBottomOfPage()
                }
            </div>
        </div>
    )
}

export default DisplayRides