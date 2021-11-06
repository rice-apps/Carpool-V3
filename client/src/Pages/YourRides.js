import React from 'react';
import UpcomingRideCard from '../components/UpcomingRideCard.js';
import PastRideCard from '../components/PastRideCard.js';

import { 
    OverallPageTitle, 
    UpcomingRidesSection, 
    UpcomingRideTitle,
    PastRidesSection, 
    PastRideTitle,
    TitleText,
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
                        <TitleText>Upcoming Rides</TitleText>
                    </UpcomingRideTitle>

                    {/* for (var i=0; i < numrows; i++) {
                        <UpcomingRideCard origin="" destination=""" datetime= notification= />
                        
                    } */}
                    <UpcomingRideCard />
                    <UpcomingRideCard />
                    <UpcomingRideCard />


            
                </UpcomingRidesSection>

                <PastRidesSection>


                    <PastRideTitle>
                        <TitleText>Past Rides</TitleText>
                        <TitleText>Payments</TitleText>
                    </PastRideTitle>

                    <PastRideCard />
                    <PastRideCard paid={false} />
                    <PastRideCard />

                    {/* for (var i=0; i < numrows; i++) {
                        <PastRideCard />
                    } */}

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