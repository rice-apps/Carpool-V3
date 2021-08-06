import React, {Component} from 'react'
import { useHistory, Link } from 'react-router-dom';

import {monthToStr} from '../Pages/Search.js'
//import ridesPossible from './Form.js'

import styled from 'styled-components'
import { styled as styledM } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/*
const useStylesContainer = makeStyles(theme => ({
    root: {
      height: '100vh',
    }
  }));
*/

/*
const RideContainer = styled.div`
    background-color: #1111aa;
    padding-top: 10vh;
    padding-bottom: 10vh;
    border: 3px solid black;
`;
*/

/*
const ridesPossible = [
    {id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3},
    {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5},
    {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8},
    {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}
];
*/

const ridesPossible = [];
const locsPossible = [];

const GridT = styledM(Grid)({
        backgroundColor: 'clear',
        
})

const GridInside = styledM(Grid)({
    backgroundColor: '#007777',
})

const BoxRide = styledM(Box)({
    width: '10vw',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

//{"Ride #" + ride.uid + " startLoc=" + ride.startLoc + " endLoc=" + ride.endLoc + " date=" + ride.date + " time=" + ride.time + " numberPeople=" + ride.numberPeople}

//const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const isEqualRides = (ride1, ride2) => {
    if (ride1._id == null || ride2._id == null) {
        return false;
    }

    return ride1._id == ride2._id;
}

const handleClickCreateRide = () => {
    console.log("handleClickCreateRide() run");
}
const handleClickSearchAgain = () => {
    window.scrollTo(0, 0);
}

const displayRideButtons = () => {
    return <Grid container spacing={2} direction="column" alignItems="center" style={{fontFamily: 'Josefin Sans', marginBottom: '5vh'}}>
        <Grid item xs={11} justify="center" align='center' style={{paddingTop: "3vh", display: 'flex', alignItems: 'center'}}>
            End of Results
        </Grid>
        <Grid container spacing = {1} direction="row" alignItems="center"  justifyContent='space-evenly'>
        <Grid item xs={5} justify="center" align='center' style={{ display: 'flex', alignItems: 'center', fontSize: '2vw'}}>

        <Link to="/search">
        <Button
            
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleClickSearchAgain()}> Search Again </Button>
        </Link>
        </Grid>
        <Grid item xs={1} justify="center" align='center' style={{display: 'flex', alignItems: 'center',  fontSize: '5vw'}}>
            OR
        </Grid>
        <Grid item xs={5} justify="center" align='center' style={{ display: 'flex', alignItems: 'center', fontSize: '2vw'}}>
        <Link to="/create">
        <Button
            
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleClickCreateRide()}> Create New Ride </Button>
        </Link>
        </Grid>
        </Grid>
       
    </Grid>
}

const renderTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const hoursStr = (String)(hours).padStart(2, '0');
    const minutesStr = (String)(minutes).padStart(2, '0');

    return hoursStr+':'+minutesStr;
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
        
        //const numLeft = ride.spots - ride.riders.length();
        const numLeft = ride.spots;

        const date = new Date(ride.departureDate);

        return  <Grid item container key={ride._id} xs={11} alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px'}}>
        <Grid item container  style={{ backgroundColor: "white", borderRadius: '10px', boxShadow: '0px 5px 3px #bbdaff'}}>
  <Grid item xs={3} justify="center" align='center' style={{display: 'flex', alignItems: 'center'}}>
      <Box width={"10vw"} height={"80%"} style={{display: 'flex', flexDirection: 'column', backgroundColor: '#BBDAFF', borderRadius: '5px'}}>
        <div style={{height: '1.5vw'}}></div>
        <span style={{fontSize: '3vw'}}>{numLeft}</span>
        
        <span style={{fontSize: '1.5vw'}}>seats left</span>
        
    </Box>
  </Grid>
  <Grid item xs={2} justify="center" align='center'>
   <BoxRide style={{fontSize: '2vw'}}>
           {ride.departureLocation.title}
        
   </BoxRide>
  </Grid>
  <Grid item xs={2} justify="center" align='center'style={{display: 'flex', alignItems: 'center'}}>
        <ArrowForwardIcon/>
  </Grid>
  <Grid item xs={2} justify="center" align='center'>
      <BoxRide style={{fontSize: '2vw'}}>
           {ride.arrivalLocation.title}
      </BoxRide>
  </Grid>
  <Grid item xs={3} justify="center" align='center'>
   <Box width={"15vw"} height={"100%"} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
    <CalendarTodayIcon />
    <span>
        {monthToStr[date.getMonth()-1] + " " + date.getDate()}
        <br/>
        <div style={{fontSize: '2vw'}}>{renderTime(date)}</div>
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
        //return ridesT[0].startLoc;
        
        if (ridesT == null || ridesT == undefined) {
            return null;
        }

        const isValidRidesT = (ridesT!=null && ridesT!=undefined && ridesT.length>0);

        /*
 direction="column"
        alignItems="center"
       
        */

        /*
        return <Grid container
        spacing={5}
        style={{backgroundColor: '#eeffff'}}
        >
            <Grid item>
                <div style={{backgroundColor: 'yellow'}}>TESTING 1</div>
            </Grid>
            <Grid item>
                <div style={{backgroundColor: 'red'}}>TESTING 2</div>
            </Grid>
        </Grid>;
        */

        return <GridT container spacing={5}  direction="column"
        alignItems="center">
            {
            <Box style={{fontSize: "5vw", paddingTop: '3vh' }}>Matching Rides: </Box>
            }
            {
            (isValidRidesT) && ridesT.map((ride, ind) => (this.displayRideRows(ride)))
            }
            {
            (!isValidRidesT) && <Grid item xs={9} justify="center" align='center' alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px', backgroundColor:"#ddddff", marginTop: "3vw", marginBottom: "3vw"}}>
                <Box width={"100%"} height={"100%"} style={{fontSize: "3vw"}}>
            Either you have not clicked the submit button yet or no rides matched.
            </Box>
            </Grid>
            }
            {
            <div style = {{fontSize: "5vw"}}>All Rides:</div>
            }
            {
            this.state.ridesPossible.filter((ride) => { return !ridesT.some(e => isEqualRides(ride, e))}).map((ride, ind) => (this.displayRideRows(ride)))
            }
            </GridT>;

      }
    
        setRides(ridesTest) {
        console.log("setRides() run");
        //console.log("monthToStr=", monthToStr);

        this.setState({
            ...this.state,
            rides: ridesTest
        })
        }

        setRidesPossible(ridesTest) {
        console.log("setRidesPossible() run");

        //console.log("monthToStr=", monthToStr);

        this.setState({
            ...this.state,
            ridesPossible: ridesTest
        })

        console.log("this.state.ridesPossible=", this.state.ridesPossible);
        }

        setLocsPossible(locsTest) {
            console.log("setLocsPossible() run");
    
            //console.log("monthToStr=", monthToStr);
    
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
                    {
                        /*
                        this.displayRides([
                            {id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3},
                            {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5},
                            {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8},
                            {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}
                          ])
                          */
                    }
                    </div>
                    <div >
                        {
                    displayRideButtons()
                        }
                    </div>
                </div>
            )
      }
}

export default DisplayRides