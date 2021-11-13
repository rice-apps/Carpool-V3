import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { BoxRide } from './DisplayRides.styles';

function renderDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderTime(date) {
    return date.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: true });
}

const Ride = ({ride}) => {
    const date = new Date(ride.departureDate);

    return (
        <Grid item container key={ride._id} xs={11} alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px'}}>
            <Grid item container  style={{ backgroundColor: "white", borderRadius: '10px', boxShadow: '0px 5px 3px #bbdaff'}}>
                <Grid item xs={3} justify="center" align='center' style={{display: 'flex', placeItems: 'center'}}>
                    <Box width={"12vw"} height={"80%"} style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(187, 218, 255, 0.22)', borderRadius: '5px', justifyContent: 'center'}}>
                        <span style={{fontSize: '4vw', fontFamily: 'Josefin Sans'}}>{ride.spots}</span>
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
                            <div style = {{fontSize: '3vw', fontFamily: 'Josefin Sans'}}> {renderDate(date)}</div>
                            <div style={{fontSize: '2.5vw', fontFamily: "Josefin Sans"}}>{renderTime(date)}</div>
                        </span>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Ride;