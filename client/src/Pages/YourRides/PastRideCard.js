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


const PastRideCard = ({id, origin, destination, datetime, paid}) => {
    const classes = useStyles();

    const time = moment(datetime)

    const history = useHistory();
    const summaryURL = "/ridesummary/" + id;


    return (
        <div onClick={e => history.push(summaryURL)}>
            <Grid container style={{height: '100%', width: "100%", display: 'flex', borderRadius: '10px', backgroundColor: "white", boxShadow: '0px 3px 10px #bbdaff', marginTop: '2vh', marginBottom: '2vh'}}>
                <Grid item xs = {12} align='center' justify='space-between' style = {{display: 'flex', placeItems:'center'}}>
                    <Box style = {{ display: 'flex', alignItems: 'center', borderRadius: '5px', border: '2px solid rgba(32, 117, 216, 0.42)',  backgroundColor: '#BBDAFF38', padding: '.3em', margin: '1em'}}>
                        <span>
                            <div className = {classes.text}> {time.format('MMM DD h:mm A')}</div>
                        </span>
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

PastRideCard.defaultProps = {
    origin: 'Rice',
    destination: 'Rice',
    datetime: Date.now(),
    notification: true,
    paid: true
}


export default PastRideCard;