import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Link } from '@material-ui/core';
import moment from 'moment';

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
  
//single ride card
const Ride = ({ride}) => {
    const classes = useStyles();
    const date = moment(ride.departureDate);

    return (
        <Link href={`/ridesummary/${ride._id}`} style={{textDecoration: 'none', color:'#002140' }}>
        <Grid container key={ride._id} style={{height: '100%', width: "90vw", maxWidth: '500px', display: 'flex', borderRadius: '10px', backgroundColor: "white", boxShadow: '0px 3px 10px #bbdaff'}}>
            <Grid item xs = {12} align='center' justify='space-between' style = {{display: 'flex', placeItems:'center'}}>
                <Box style = {{ display: 'flex', alignItems: 'center', borderRadius: '5px', border: '2px solid rgba(32, 117, 216, 0.42)',  backgroundColor: '#BBDAFF38', padding: '.3em', margin: '1em'}}>
                    <span>
                        <div className = {classes.text}> {date.format('MMM DD h:mm A')}</div>
                    </span>
                </Box>
                <Box style={{display: 'flex', flexDirection: 'column', margin: '1em'}}>
                    <span className={classes.midtext}>{(ride.spots - ride.riders.length)}</span>
                    <span className={classes.subtext}>seats left</span>  
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box className = {classes.location}>
                        <span className={classes.fromtotext}>from &nbsp;</span>
                        <span className={classes.midtext}>{ride.departureLocation.title} </span>  
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box className = {classes.location}>
                        <span className={classes.fromtotext}>&nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;</span>
                        <span className={classes.midtext}>{ride.arrivalLocation.title} </span>  
                </Box>
            </Grid>
        </Grid>
        </Link>
    );
}

export default Ride;