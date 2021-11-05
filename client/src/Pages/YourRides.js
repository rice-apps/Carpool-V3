import React from 'react';
import UpcomingRideCard from '../components/UpcomingRideCard.js';
import PastRideCard from '../components/PastRideCard.js';

import { 
    OverallPageTitle, 
    UpcomingRidesSection, 
    UpcomingRideTitle,
    PastRidesSection, 
    OverallPage, 
    Paid,
    Unpaid } from './YourRidesStyles';


const YourRides = (paid) => {
    return (
        <div> 
            <OverallPage>
                <OverallPageTitle>Your Rides</OverallPageTitle>
                <UpcomingRidesSection>
                    
                    <UpcomingRideTitle>
                        Upcoming Rides
                    </UpcomingRideTitle>


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

                <PastRidesSection>
                    <PastRideCard>
                    </PastRideCard>


                </PastRidesSection>
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