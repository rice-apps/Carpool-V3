import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    text: {
     fontSize: '1.3em',
     fontWeight: '500',
     fontFamily: 'Josefin Sans'
    },
    midtext: {
     fontSize: '1.1em',
     fontFamily: 'Josefin Sans'
    },
    subtext: {
     fontSize: '.9em',
     fontFamily: 'Josefin Sans'
    }, 
    fromtotext: {
     fontSize: '.9em',
     fontFamily: 'Josefin Sans',
     color: '#808080',
    }, 
    location: {
     display: 'flex',
     flexDirection: 'row', 
     alignItems: 'center',
     marginLeft: '1em',
     marginBottom: '.75em'
    }
 }));



const UpcomingRideCard = ({id, origin, destination, datetime, num_riders, notification}) => {
    const classes = useStyles();

    const time = moment(datetime)

    const history = useHistory();
    const summaryURL = "/ridesummary/" + id;

    const toRide = (url) => {
        localStorage.setItem("lastPage", "your-rides");
        history.push(url);
    }

    return (
        <div onClick={(e) => toRide(summaryURL)}>
        <Grid container style={{height: '100%', width: "100%", display: 'flex', borderRadius: '10px', backgroundColor: "white", boxShadow: '0px 3px 10px #bbdaff', marginTop: '2vh', marginBottom: '2vh'}}>
            <Grid item xs = {12} align='center' justify='space-between' style = {{display: 'flex', placeItems:'center'}}>
                <Box style = {{ display: 'flex', alignItems: 'center', borderRadius: '5px', border: '2px solid rgba(32, 117, 216, 0.42)',  backgroundColor: '#BBDAFF38', padding: '.3em', margin: '1em'}}>
                    <span>
                        <div className = {classes.text}> {time.format('MMM DD h:mm A')}</div>
                    </span>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column', margin: '1em'}}>
                    <span className={classes.midtext}>{num_riders}</span>
                    <span className={classes.subtext}>riders</span>  
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box className = {classes.location}>
                        <span className={classes.fromtotext}>from &nbsp;</span>
                        <span className={classes.midtext}>{origin} </span>  
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box className = {classes.location}>
                        <span className={classes.fromtotext}>&nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;</span>
                        <span className={classes.midtext}>{destination} </span>  
                </Box>
            </Grid>

        </Grid>
        </div>
    )
}


UpcomingRideCard.defaultProps = {
    origin: 'Rice',
    destination: 'Rice',
    datetime: Date.now(),
    notification: true
}


export default UpcomingRideCard;