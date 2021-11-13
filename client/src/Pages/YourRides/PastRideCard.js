import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import moment from 'moment';

import { 
    UnpaidPastRide,
	PaidPastRide,
	RideTimeInfo,
    DateTime,
	RideDate,
	RideTime,
	Locations,
    OriginDestination,
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

    const DateTimeInfo = () => {
        return (
            <DateTime>
                <RideDate>
                    { dateString }
                </RideDate>
                <RideTime>
                    { timeString }
                </RideTime>
            </DateTime>
        )
    }

    const LocationInfo = () => {
        return (
            <OriginDestination>
                <LocationText>{ origin }</LocationText>
                    <ArrowForward />
                <LocationText>{ destination }</LocationText>
            </OriginDestination>
        )
    }

    return (
        <div>
            { paid ? 
            <PaidPastRide>
                <RideTimeInfo>
                    <DateTimeInfo />
                </RideTimeInfo>

                <Locations>
                    <LocationInfo />
                </Locations>

                <PaidPaymentInfo>
                    <PaidIcon />
                    <PaymentText>Payment Complete</PaymentText>
                </PaidPaymentInfo>
            </PaidPastRide>
            :
            <UnpaidPastRide>
                <RideTimeInfo>
                    <DateTimeInfo />
                </RideTimeInfo>

                <Locations>
                    <LocationInfo />
                </Locations>

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