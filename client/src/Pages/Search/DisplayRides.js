// uber, lyft, and own car. button on front page to click filter and show dropdown. If you choose Uber then only show Uber rides.
// will need to do export default filter at bottom of filter.js

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, MenuItem, Box, Grid, IconButton, AppBar, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Ride from './Ride.js';
import { GridT, StyledButton } from './DisplayRides.styles'
import { LoginButton, LoginDialog, LoginDialogActions} from '../Onboarding/Alert.styles.js';

// New import for the Filter component
//import FilterRide from './FilterRide.js';

// SSO Imports
import { SERVICE_URL } from '../../config'; 
const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login';



const DisplayRides = (props) => {

    const [openAlert, setOpenAlert] = useState(false);

    // New state for the filter
    const [filter, setFilter] = useState('');

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

    // New component for the filter
    // This will render a dropdown with options for Uber, Lyft, and Own Car
    // The current filter state is used as the value, and when it changes, it updates the filter state
    const Filter = () => {
        return (
            <Select
                value={filter} // current filter state
                onChange={(event) => setFilter(event.target.value)} // function to update the filter state when the value changes
            >
                <MenuItem value=''>All</MenuItem> // Option for all rides
                <MenuItem value='Uber'>Uber</MenuItem> // Option for Uber rides
                <MenuItem value='Lyft'>Lyft</MenuItem> // Option for Lyft rides
                <MenuItem value='Own Car'>Own Car</MenuItem> // Option for own car rides
            </Select>
        );
    }

    // Define AppBar with Filter
    const AppBarWithFilter = () => (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Ride App
                </Typography>
                <Filter />
            </Toolbar>
        </AppBar>
    );

    const displayRideBottomOfPage = () => {
    
    
        return <div style = {{display: "flex", alignItems: "center", flexDirection: "column", gap: "1vh"}}>
            <div style={{ fontSize: '2vw', fontFamily: "Josefin Sans"}}>
                <Link to="/search" style = {{textDecoration: "none"}}>
                    <StyledButton style ={{color:"#2075D8", paddingBottom:"0", lineHeight: "1.3"}}
                    onClick={() => handleClickSearchAgain()}> 
                        Try another search
                    </StyledButton>
                </Link>
            </div>
            <div style={{ fontSize: '2vh', fontFamily: "Josefin Sans", color: "#012E62"}}>
                OR
            </div>
            <div style={{paddingBottom: "2vh"}}>
                <StyledButton
                        style ={{backgroundColor:"#2075D8", color:"white"}}
                        onClick={() => handleClickCreateRide()}> 
                        Create a new ride 
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
        if (ridesT === null || ridesT === undefined) {
            return null;
        }
    
        const isValidRidesT = (ridesT!==null && ridesT!==undefined && ridesT.length>0);
    
        // New: Filter rides based on the selected filter before mapping to Ride components
        // If no filter is selected (filter === ''), display all rides
        let filteredRides = ridesT;
        if (filter) {
            filteredRides = ridesT.filter(ride => ride.type === filter);
        }
    
        return (
            <GridT container style={{gap: "2vh"}} direction="column" alignItems="center">
                <Box style={{fontSize: "4vh", paddingTop: '4vh', fontFamily: "Josefin Sans"}}>
                    Matching Rides: 
                </Box>
                <Box style={{fontSize: "2.5vh", paddingTop: '.5vh', fontFamily: "Josefin Sans"}}>
                    *All times are in CST
                </Box>
                {
                    (isValidRidesT) && filteredRides.map((ride, ind) => (<Ride ride={ride} />))
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
                    <div style = {{paddingTop: '1vh', fontSize: "4vh", fontFamily: "Josefin Sans"}}>All Open Rides:</div>
                }
                {
                    props.ridesPossible.filter((ride) => { 
                        return !ridesT.some(e => isEqualRides(ride, e))}).filter(ride => (ride.spots - ride.riders.length > 0)).map((ride, ind) => (<Ride ride={ride} />))
                }
                <Grid item justify="center" align='center' style={{ display: 'flex', alignItems: 'center', fontFamily: "Josefin Sans", fontSize: "2vh", color: "#012E62"}}>
                    no more results
                </Grid>
            </GridT>
        );
    }
    

          // The component returns a div containing the filter and the rides
    // It first renders the Filter component, then it calls the rideBox function to render the rides
    // Finally, it calls the displayRideBottomOfPage function to render the bottom of the page
    return (
        <div>
            {/* Add the Filter component to the return statement */}
            <AppBarWithFilter />
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
