import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { BoxRide } from './DisplayRides.styles';
import { Link } from '@material-ui/core';
import moment from 'moment';

function renderDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderTime(date) {
    return date.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: true });
}

const useStyles = makeStyles((theme) => ({
   text: {
    fontSize: '1.3em',
    fontFamily: 'Josefin Sans'
   },
   midtext: {
    fontSize: '1.1em',
    fontFamily: 'Josefin Sans'
   },
   subtext: {
    fontSize: '.9em',
    fontFamily: 'Josefin Sans'
   }
}));
  

const Ride = ({ride}) => {
    const classes = useStyles();
    const date = moment(ride.departureDate);

    return (
        <Link href={`/ridesummary/${ride._id}`} style={{textDecoration: 'none', color:'#002140' }}>
        <Grid container key={ride._id} xs={12} alignItems='stretch' style={{height: '100%', width: "90vw", display: 'flex', borderRadius: '10px'}}>
            <Grid item container  style={{height:"16vh", backgroundColor: "white", borderRadius: '10px', borderColor:'', boxShadow: '0px 3px 10px #bbdaff'}}>
                <Grid item xs={3} justify="center" align='center' style={{display: 'flex', placeItems: 'center'}}> 
                        <Box width={"60%"} height={"75%"} style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(187, 218, 255, 0.22)', borderRadius: '5px', justifyContent: 'center'}}>
                            <span className={classes.text}>{(ride.spots - ride.riders.length)}</span>
                            <span className={classes.subtext}>seats left</span>  
                        </Box>
                </Grid>

                <Grid item container xs = {6}>
                    <Grid item xs={5} justify="center" align='center'>
                        <BoxRide className = {classes.text}>
                                {ride.departureLocation.title}      
                        </BoxRide>
                    </Grid>
                    
                    <Grid item xs={2} justify="center" style={{display: 'flex', alignItems: 'center'}}>
                            <ArrowForwardIcon/>
                    </Grid>
                    
                    <Grid item xs={5} justify="center" align='center'>
                        <BoxRide className = {classes.text}>
                            {ride.arrivalLocation.title}
                        </BoxRide>
                    </Grid>
                </Grid>

                
                <Grid item xs = {3} align='center'>
                    <Box width={"100%"} height={"100%"} style={{ display: 'flex', alignItems: 'center', justifyContent:"center", gap: "1vh"}}>
                        <span>
                            <CalendarTodayIcon className = {classes.midtext}/>
                            <div className = {classes.midtext}> {date.format('MMM DD')}</div>
                            <div className = {classes.subtext}>{date.format('hh:mm a')}</div>
                        </span>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        </Link>
    );
}

export default Ride;