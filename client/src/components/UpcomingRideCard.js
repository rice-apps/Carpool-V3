import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { RideCard, RideTimeInfo, RideDate, RideTime, Locations, Notifications } from './UpcomingRideCard.styles.js';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const CalendarIcon = withStyles({
    root: {
      display: 'flex',
      color: '#2075D8',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })(CalendarTodayIcon);

  const ArrowForward = withStyles({
  })(ArrowForwardIcon);

  const NotificationsOn = withStyles({
 
  })(NotificationsActiveIcon);
  
  const NotificationsOff = withStyles({
  })(NotificationsOffIcon);


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


const UpcomingRideCard = ({origin, destination, datetime, notification}) => {


    let month = 12 // datetime.getMonth()
    let day =  24 // datetime.getDay()
    let hour = 14 // datetime.getHours()
    let minute = 32 // datetime.getMinutes()
    
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
                    { origin }
                    <ArrowForward />
                    { destination }
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