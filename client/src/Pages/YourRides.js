import React from 'react';
import { Title, UpcomingRidesSection, PastRidesandPayments, OverallPage } from './YourRidesStyles';
import UpcomingRideCard from '../components/UpcomingRideCard.js';


const YourRides = () => {
    return (
        <div> 
            <OverallPage>
                <Title>Your Rides</Title>
                <UpcomingRidesSection>
                    
                    <UpcomingRideCard>
                    </UpcomingRideCard>

                    <UpcomingRideCard>
                    </UpcomingRideCard>

                    <UpcomingRideCard>
                    </UpcomingRideCard>

                    <UpcomingRideCard>
                    </UpcomingRideCard>
                    
                    
                    {/* WE WANT A FOR LOOP FOR ALL OUR UPCOMING RIDES */}

                </UpcomingRidesSection>

                <PastRidesandPayments>
                    <p>Past Rides</p>
                    <p>Payments</p>
                </PastRidesandPayments>
            </OverallPage>
        </div>
    )
}

export default YourRides;