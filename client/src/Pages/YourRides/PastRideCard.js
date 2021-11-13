import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import moment from 'moment';

import { 
    UnpaidPastRide,
	PaidPastRide,
    TimeLocationData,
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

const PastRideCard = ({origin, destination, datetime, paid}) => {
    const time = moment(datetime)
    const dateString = time.format('MMM DD')
    const timeString = time.format('h:mm a')
    
    const RideTimeLocationData = () => {
        return (
            <div>
                <TimeLocationData>
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
                </TimeLocationData>
            </div>
        )
    }

    return (
        <div>
            { paid ? 
            <PaidPastRide>
                <RideTimeLocationData />
                <PaidPaymentInfo>
                    <PaidIcon />
                    <PaymentText>Payment Complete</PaymentText>
                </PaidPaymentInfo>
            </PaidPastRide>
            :
            <UnpaidPastRide>
                <RideTimeLocationData />
                <UnpaidPaymentInfo>
                    <UnpaidIcon />
                    <PaymentText>Payment Incomplete</PaymentText>
                </UnpaidPaymentInfo>
            </UnpaidPastRide>
            }
        </div>
    )
}

export default PastRideCard;