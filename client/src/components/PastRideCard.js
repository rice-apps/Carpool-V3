import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { 
    RideCard, 
    RideTimeInfo, 
    RideDate, 
    RideTime, 
    Origin, 
    Destination, 
    Locations,
    PaidPaymentInfo,
    PaymentText } 
    from './PastRideCard.styles.js';


  const ArrowForward = withStyles({
  })(ArrowForwardIcon);

//   const UnpaidIcon = withStyles({
//     root: {
//         display: 'flex',
//         color: '#002140',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }
//   })(<p>!</p>);

//   const PaidIcon = withStyles({
//     root: {
//         display: 'flex',
//         color: '#002140',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }
//   })(<p>$</p>);


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


    return (
        <div>
            <RideCard>
                <RideTimeInfo>
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

                <PaidPaymentInfo>
                    {/* <PaidIcon /> */}
                    <PaymentText>Payment Incomplete</PaymentText>
                </PaidPaymentInfo>

{/* 
                <PaidPaymentInfo>
                    <UnpaidIcon />
                    <PaymentText>Payment Complete</PaymentText>
                </PaidPaymentInfo> */}

               
            </RideCard>
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