import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from 'moment';
import { useHistory } from 'react-router';
import { Grid } from "@material-ui/core";

import { 
    RideCard, 
    RideTimeInfo, 
    RideDate, 
    RideTime, 
    LocationText, 
    Locations,
    RiderText, 
    // Notifications 
} 
    from './UpcomingRideCard.styles.js';

const CalendarIcon = withStyles({
    root: {
      display: 'flex',
      color: '#002140',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })(CalendarTodayIcon);

  const ArrowForward = withStyles({
  })(ArrowForwardIcon);

//   const NotificationsOn = withStyles({
//     root: {
//         display: 'flex',
//         color: '#2075D8',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }
 
//   })(NotificationsActiveIcon);
  
//   const NotificationsOff = withStyles({
//     root: {
//         display: 'flex',
//         color: 'rgba(32, 117, 216, 0.42)',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }
//   })(NotificationsOffIcon);



const UpcomingRideCard = ({id, origin, destination, datetime, num_riders, notification}) => {

    const time = moment(datetime)
    const dateString = time.format('MMM DD')
    const timeString = time.format('h:mm a')

    const history = useHistory();
    const summaryURL = "/ridesummary/" + id;

    const toRide = (url) => {
        localStorage.setItem("lastPage", "your-rides");
        history.push(url);
    }

    return (
        <div onClick={(e) => toRide(summaryURL)}>
            <RideCard>
                <RideTimeInfo>
                    <CalendarIcon />
                    <RideDate>
                        { dateString }
                    </RideDate>
                    <RideTime>
                        { timeString }
                    </RideTime>
                </RideTimeInfo>
                
                <Locations>
                    <Grid container justifyContent='space-around'>
                            <LocationText>{ origin }</LocationText>
                            <ArrowForward />
                            <LocationText>{ destination }</LocationText>
                        <Grid sm = {9} xs = {11} justifyContent='center'>
                            <RiderText>{num_riders + " rider"}</RiderText>
                        </Grid>
                    </Grid>
                </Locations>

                {/* <Notifications>
                    { notification ? <NotificationsOn /> : <NotificationsOff /> }
                </Notifications> */}
            </RideCard>
        </div>
    )
}


UpcomingRideCard.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    datetime: Date.now(),
    notification: true
}


export default UpcomingRideCard;