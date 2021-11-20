import React, {Component, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Ride from './Ride.js';
import { GridT, StyledButton } from './DisplayRides.styles'

// SSO Imports
import { SERVICE_URL } from '../../config'; 
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

    localStorage.setItem('nextPage', '/create-ride');

    let token = localStorage.getItem('token');

    if (token != null) { 
        // Route to UserAuth
        window.open('/userAuth', '_self');
    } else {
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
            (isValidRidesT) && ridesT.sort(function(a,b){
                console.log("hihihihihihihihihihihihi")
                console.log(a);
                console.log(b);
                console.log(a.departureDate);
                console.log(b.departureDate);
                return new Date(b.departureDate) - new Date(a.departureDate);
            }
            ).map((ride, ind) => (<Ride ride={ride} />))
            }
            {
            (!isValidRidesT) && <Grid item xs={9} justify="center" align='center' alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px', backgroundColor:"#ddddff"}}>
                <Box width={"100%"} height={"100%"} style={{fontSize: "2vh", fontFamily: "Josefin Sans", padding: "1vh"}}>
                    No rides matched.
                </Box>
            </Grid>
            }
            {
            <div style = {{paddingTop: '4vh', fontSize: "4vh", fontFamily: "Josefin Sans"}}>All Rides:</div>
            }
            {
            this.state.ridesPossible.filter((ride) => { return !ridesT.some(e => isEqualRides(ride, e))}).map((ride, ind) => (<Ride ride={ride} />))
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