import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { 
    RideCard, 
    RideTimeInfo, 
    RideDate, 
    RideTime, 
    Origin, 
    Destination, 
    Locations, 
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


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


const UpcomingRideCard = ({origin, destination, datetime, notification}) => {

    let month = 12
    let day =  24
    let hour = 14
    let minute = 32
    
    let dateString = monthNames[month - 1].substr(0, 3) + " " + day
    let timeString = hour < 12 ? hour + ":" + minute + " am" : hour - 12 + ":" + minute + " pm"


    return (
        <div>
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
                    <Origin>
                        { origin }
                    </Origin>
                    <ArrowForward />
                    <Destination>
                        { destination }
                    </Destination>
                </Locations>

                <Notifications>
                    { notification ? <NotificationsOn /> : <NotificationsOff /> }
                </Notifications>
            </RideCard>
        </div>
    )

    
}

// FOR NOW, USING FOR TESTING FRONT END
// DO WE HAVE TO CHECK FOR TYPE OR SPECIFY AT LEAST?
UpcomingRideCard.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    // WILL BE IN ISOstring
    datetime: Date.now(),
    notification: true
}


export default UpcomingRideCard;