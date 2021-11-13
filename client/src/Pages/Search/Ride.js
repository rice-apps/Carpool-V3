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
    return date.toLocaleTimeString('en-US', { timeStyle: 'short', hour12: false });
}

const Ride = ({ride}) => {
    const date = new Date(ride.departureDate);

    return (
        <Grid item container key={ride._id} xs={11} alignItems='stretch' style={{height: '100%', display: 'flex', borderRadius: '10px'}}>
            <Grid item container  style={{ backgroundColor: "white", borderRadius: '10px', boxShadow: '0px 5px 3px #bbdaff'}}>
                <Grid item xs={3} justify="center" align='center' style={{display: 'flex', alignItems: 'center'}}>
                    <Box width={"10vw"} height={"80%"} style={{display: 'flex', flexDirection: 'column', backgroundColor: '#BBDAFF', borderRadius: '5px'}}>
                        <div style={{height: '1.5vw'}}></div>
                        <span style={{fontSize: '3vw'}}>{ride.spots}</span>
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
                        {renderDate(date)}
                        <br/>
                        <div style={{fontSize: '2vw'}}>{renderTime(date)}</div>
                    </span>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Ride;