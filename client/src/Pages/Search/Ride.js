import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Link } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
   text: {
    fontSize: '.9em',
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
  

const Ride = ({ride}) => {
    const classes = useStyles();
    const date = moment(ride.departureDate);

    return (
        <Link href={`/ridesummary/${ride._id}`} style={{textDecoration: 'none', color:'#002140' }}>
        <Grid container  key={ride._id} style={{height: '100%', width: "90vw", maxWidth: '500px', display: 'flex', borderRadius: '10px', backgroundColor: "white", boxShadow: '0px 3px 10px #bbdaff', justifyContent: 'center', alignItems: 'center'}}>
            {/* style = {{ display: 'flex', alignItems: 'center', borderRadius: '5px', border: '2px solid rgba(32, 117, 216, 0.42)',  backgroundColor: '#BBDAFF38', padding: '.3em', margin: '1em'}} */}
            {/* <Grid item align='center' justify='space-between'style = {{display: 'flex', placeItems:'center'}}> */}
                <div style = {{flex: '1'}}>
                <Box item align='center' justify='space-between' style={{display: 'flex', flexDirection: 'column', backgroundColor: '#BBDAFF38', marginBottom: '.8em',margin: '.8em',padding: '.7em', borderRadius: '5px',flex: '1'}}>
                    <span className={classes.midtext} style = {{marginBottom: '.4em'}}>{(ride.spots - ride.riders.length)}</span>
                    <span className={classes.subtext} style = {{fontSize: '.7em'}}>seats left</span>  
                </Box>
                </div>
                <Box item align='center' justify='space-between' className = {classes.location} style={{display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: '#BBDAFF38',margin: '.8em',padding: '.7em', paddingTop: '1.64em',paddingBottom: '1.64em',borderRadius: '5px'}}> 
                        {/* <span className={classes.fromtotext}>&nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;</span> */}
                        <span className={classes.midtext}>{ride.typeofcar} </span>  
                </Box>    
                

            {/* <Grid>  */}
                <Box item align='center'  className = {classes.location} style={{display: 'flex', flexDirection: 'column', marginTop: '1em', flex: '1'}}>
                        {/* <span className={classes.fromtotext}>from &nbsp;</span> */}
                        <span className={classes.midtext}>{ride.departureLocation.title} </span>  
                </Box>
            {/* </Grid> */}

            <Box align = 'center' style = {{flex: '1'}}>
                            

            </Box>

            {/* <Grid > */}
                <Box item align='center'  className = {classes.location} style={{display: 'flex', marginTop: '1em', flexDirection: 'column', flex: '1'}}> 
                        {/* <span className={classes.fromtotext}>&nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;</span> */}
                        <span className={classes.midtext}>{ride.arrivalLocation.title} </span>  
                </Box>
            {/* </Grid> */}

            

            {/* <Grid item xs={12}>
                <Box className = {classes.location}>
                        <span className={classes.fromtotext}>&nbsp;type&nbsp;</span>
                        <span className={classes.midtext}>{ride.typeofcar} </span>  
                </Box>
            </Grid> */}
            {/* <Grid > */}
                <Box item align='center' justify='space-between' style={{display: 'flex', flexDirection: 'column',  padding: '.7em', borderRadius: '5px', flex: '1'}}>
                    <span style = {{display: 'flex', flexDirection: 'column'}}>
                        <div className = {classes.text} > {date.format('MMM DD')}</div>
                        <div className = {classes.text} > {date.format('h:mm A')} </div>
                    </span>
                </Box>
            {/* </Grid> */}
            </Grid>
        {/* </Grid> */}
        </Link>
    );
}

export default Ride;