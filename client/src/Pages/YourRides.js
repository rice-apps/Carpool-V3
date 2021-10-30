import React from 'react';
import { Title, UpcomingRidesSection, PastRidesandPayments, OverallPage, PastRideCard, Paid, Unpaid } from './YourRidesStyles';
import UpcomingRideCard from '../components/UpcomingRideCard.js';


const YourRides = (paid) => {
    return (
        <div> 
            <OverallPage>
                <Title>Your Rides</Title>
                <UpcomingRidesSection>
                    
                    <UpcomingRideCard>
                    </UpcomingRideCard>

                    {/* <UpcomingRideCard>
                    </UpcomingRideCard>

                    <UpcomingRideCard>
                    </UpcomingRideCard>

                    <UpcomingRideCard>
                    </UpcomingRideCard> */}
                    
                    
                    {/* WE WANT A FOR LOOP FOR ALL OUR UPCOMING RIDES */}

                </UpcomingRidesSection>

                <PastRidesandPayments>
                    <PastRideCard>

                    </PastRideCard>

                    { paid ? <Paid /> : <Unpaid />}

                </PastRidesandPayments>
            </OverallPage>
        </div>
    )
}

// FOR NOW, USING FOR TESTING FRONT END
// DO WE HAVE TO CHECK FOR TYPE OR SPECIFY AT LEAST?
YourRides.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    // WILL BE IN ISOstring
    datetime: Date.now(),
    notification: true,
    paid: true

}

export default YourRides;