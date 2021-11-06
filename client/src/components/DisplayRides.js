import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {monthToStr} from '../Pages/Search.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
    GridT,
    BoxRide, 
    StyledButton
} from './DisplayRides.styles'

// SSO Imports
import { SERVICE_URL } from '../config'; 
const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 


// const id = localStorage.getItem('netid');
// console.log('The net ID initially is: ', id);
// console.log('The token is: ', localStorage.getItem('token'));
const ridesPossible = [];
const locsPossible = [];

const isEqualRides = (ride1, ride2) => {
    if (ride1._id == null || ride2._id == null) {
        return false;
    }

    return ride1._id === ride2._id;
}

const handleClickCreateRide = () => {

    console.log("handleClickCreateRide() run");
    localStorage.setItem('nextPage', '/create-ride');
    console.log('Next Page is: ', localStorage.getItem('nextPage'));

    let token = localStorage.getItem('token');

    if (token != null) { 
        // Route to UserAuth
        console.log('In the userAuth stage'); 
        window.open('/userAuth', '_self');
    } else {
        console.log('Need to redirect to SSO');
        // Route to SSO
        let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
        window.open(redirectURL, '_self');
    }
    
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
        </div>
        </div>
}

const renderTime = (date) => {
    var hours = date.getHours();
    const minutes = date.getMinutes();
    var ampm = "";

    if (hours >= 12){
        if (hours !== 12){
            hours = hours - 12;
        }
        ampm = " PM"; 
    } else {
        if (hours === 0){
            hours += 12
        }
        ampm = "AM"
    }

    const hoursStr = (String)(hours);
    const minutesStr = (String)(minutes).padStart(2, '0');

    return hoursStr+':'+minutesStr+ampm;
}

class DisplayRides extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rides: props.rides,
            ridesPossible: ridesPossible,
            locsPossible: locsPossible,
            testVar: props.testVar
        }
    }

    displayRideRows(ride) {

        const numLeft = ride.spots;

        const date = new Date(ride.departureDate);

        return  <Grid item container key={ride._id} xs={11} alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px'}}>
            <Grid item container  style={{ backgroundColor: "white", borderRadius: '10px', boxShadow: '0px 5px 3px #bbdaff'}}>
                <Grid item xs={3} justify="center" align='center' style={{display: 'flex', placeItems: 'center'}}>
                    <Box width={"12vw"} height={"80%"} style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(187, 218, 255, 0.22)', borderRadius: '5px', justifyContent: 'center'}}>
                        <span style={{fontSize: '4vw', fontFamily: 'Josefin Sans'}}>{numLeft}</span>
                        <span style={{fontSize: '2.5vw', fontFamily: 'Josefin Sans'}}>seats left</span>  
                    </Box>
                </Grid>
                <Grid item xs={2} justify="center" align='center'>
                    <BoxRide style={{fontSize: '3vw', fontFamily: 'Josefin Sans'}}>
                            {ride.departureLocation.title}      
                    </BoxRide>
                </Grid>
                <Grid item xs={2} justify="center" align='center'style={{display: 'flex', alignItems: 'center'}}>
                        <ArrowForwardIcon/>
                </Grid>
                <Grid item xs={2} justify="center" align='center'>
                    <BoxRide style={{fontSize: '3vw', fontFamily: 'Josefin Sans'}}>
                        {ride.arrivalLocation.title}
                    </BoxRide>
                </Grid>
                <Grid item xs={3} justify="center" align='center'>
                    <Box width={"15vw"} height={"15vw"} style={{ display: 'flex', alignItems: 'center', gap: "1vh"}}>
                        <CalendarTodayIcon style ={{fontSize: "3vw"}}/>
                        <span>
                            <div style = {{fontSize: '3vw', fontFamily: 'Josefin Sans'}}> {monthToStr[date.getMonth()-1] + " " + date.getDate()}</div>
                            <div style={{fontSize: '2.5vw', fontFamily: "Josefin Sans"}}>{renderTime(date)}</div>
                        </span>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    }

    displayRides(ridesT)  {
        console.log("ridesT=", ridesT);
        console.log("ridesT.length=", ridesT.length);
        console.log("Typeof(ridesT)=", typeof(ridesT))
        
        if (ridesT === null || ridesT === undefined) {
            return null;
        }

        const isValidRidesT = (ridesT!==null && ridesT!==undefined && ridesT.length>0);

        return <GridT container style={{gap: "2vh"}} direction="column" alignItems="center">
            <Box style={{fontSize: "4vh", paddingTop: '4vh', fontFamily: "Josefin Sans"}}>
                Matching Rides: 
            </Box>
            {
            (isValidRidesT) && ridesT.map((ride, ind) => (this.displayRideRows(ride)))
            }
            {
            (!isValidRidesT) && <Grid item xs={9} justify="center" align='center' alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px', backgroundColor:"#ddddff"}}>
                <Box width={"100%"} height={"100%"} style={{fontSize: "2vh", fontFamily: "Josefin Sans", padding: "1vh"}}>
                    Either you have not clicked the submit button yet or no rides matched.
                </Box>
            </Grid>
            }
            {
            <div style = {{fontSize: "4vh", fontFamily: "Josefin Sans"}}>All Rides:</div>
            }
            {
            this.state.ridesPossible.filter((ride) => { return !ridesT.some(e => isEqualRides(ride, e))}).map((ride, ind) => (this.displayRideRows(ride)))
            }
            <Grid item justify="center" align='center' style={{ display: 'flex', alignItems: 'center', fontFamily: "Josefin Sans", fontSize: "2vh", color: "#C7CBD3"}}>
                no more results
            </Grid>
            </GridT>;

      }
    
        setRides(ridesTest) {
        console.log("setRides() run");

        this.setState({
            ...this.state,
            rides: ridesTest
        })
        }

        setRidesPossible(ridesTest) {
        console.log("setRidesPossible() run");

        this.setState({
            ...this.state,
            ridesPossible: ridesTest
        })

        console.log("this.state.ridesPossible=", this.state.ridesPossible);
        }

        setLocsPossible(locsTest) {
            console.log("setLocsPossible() run");
    
            this.setState({
                ...this.state,
                locsPossible: locsTest
            })
    
            console.log("this.state.locsPossible=", this.state.locsPossible);
        }

      incrementVar() {
        this.setState({
            ...this.state,
            testVar: this.state.testVar + 1
        });

      }

      render() {
            return (
                <div >
                    <div >
                        {
                        this.displayRides(this.state.rides)
                    }
                    </div>
                    <div >
                        {
                    displayRideBottomOfPage()
                        }
                    </div>
                </div>
            )
      }
}

export default DisplayRides