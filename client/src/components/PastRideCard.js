import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { 
    UnpaidPastRide,
	PaidPastRide,
    PastRideCardData,
	RideTimeInfo,
	RideDate,
	RideTime,
	Locations,
    LocationText,
	PaidPaymentInfo,
	UnpaidPaymentInfo,
	PaymentText } 
    from './PastRideCard.styles.js';


  const ArrowForward = withStyles({
  })(ArrowForwardIcon);

  const UnpaidIcon = withStyles({
    root: {
        display: 'flex',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
      }
  })(PriorityHighIcon);

  const PaidIcon = withStyles({
    root: {
        display: 'flex',
        color: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
      }
  })(AttachMoneyIcon);


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


const PastRideCard = ({origin, destination, datetime, paid}) => {

    let month = 12
    let day =  24
    let hour = 14
    let minute = 32
    
    let dateString = monthNames[month - 1].substr(0, 3) + " " + day
    let timeString = hour < 12 ? hour + ":" + minute + " am" : hour - 12 + ":" + minute + " pm"

    const RideCardData = () => {
        return (
            <div>
                <PastRideCardData>
                    <RideTimeInfo>
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
                </PastRideCardData>
                
            </div>
        )

    }

    return (
        <div>
            { paid ? 
        
            <PaidPastRide>
                <RideCardData />
                <PaidPaymentInfo>
                    <PaidIcon />
                    <PaymentText>Payment Complete</PaymentText>
                </PaidPaymentInfo>
            </PaidPastRide>

            :

            <UnpaidPastRide>
                <RideCardData />
                <UnpaidPaymentInfo>
                    <UnpaidIcon />
                    <PaymentText>Payment Incomplete</PaymentText>
                </UnpaidPaymentInfo>
            </UnpaidPastRide>
            }
            


            
        </div>
    )

    
}

// FOR NOW, USING FOR TESTING FRONT END
// DO WE HAVE TO CHECK FOR TYPE OR SPECIFY AT LEAST?
PastRideCard.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    // WILL BE IN ISOstring
    datetime: Date.now(),
    notification: true,
    paid: true
}


export default PastRideCard;