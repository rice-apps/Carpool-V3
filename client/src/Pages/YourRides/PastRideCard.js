import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import moment from 'moment';
import { useHistory } from 'react-router';

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


const PastRideCard = ({id, origin, destination, datetime, paid}) => {
    const time = moment(datetime)
    const dateString = time.format('MMM DD')
    const timeString = time.format('h:mm a')

    const history = useHistory();
    const summaryURL = "/ridesummary/" + id;

    const RideCardData = () => {
        return (
            <div onClick={e => history.push(summaryURL)}>
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

PastRideCard.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    datetime: Date.now(),
    notification: true,
    paid: true
}


export default PastRideCard;