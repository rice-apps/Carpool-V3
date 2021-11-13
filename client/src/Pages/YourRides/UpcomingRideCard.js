import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import moment from 'moment';
import { 
    RideCard,
	RideTimeInfo,
	RideDate,
	RideTime,
	Locations,
	LocationText,
	Notifications } 
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

  const NotificationsOn = withStyles({
    root: {
        display: 'flex',
        color: '#2075D8',
        justifyContent: 'center',
        alignItems: 'center'
      }
  })(NotificationsActiveIcon);
  
  const NotificationsOff = withStyles({
    root: {
        display: 'flex',
        color: 'rgba(32, 117, 216, 0.42)',
        justifyContent: 'center',
        alignItems: 'center'
      }
  })(NotificationsOffIcon);


const UpcomingRideCard = ({origin, destination, datetime, notification}) => {
    const time = moment(datetime)
    const dateString = time.format('MMM DD')
    const timeString = time.format('h:mm a')

    return (
        <div onclick="toRideSummary">
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
                    <LocationText>{ origin }</LocationText>
                    <ArrowForward />
                    <LocationText>{ destination }</LocationText>
                </Locations>
                <Notifications>
                    { notification ? <NotificationsOn /> : <NotificationsOff /> }
                </Notifications>
            </RideCard>
        </div>
    ) 
}


export default UpcomingRideCard;