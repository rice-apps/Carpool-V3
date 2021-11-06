import React, {useEffect} from 'react';
import UpcomingRideCard from '../components/UpcomingRideCard.js';
import PastRideCard from '../components/PastRideCard.js';
import { gql, useQuery, useMutation} from "@apollo/client";


import { 
    OverallPageTitle, 
    UpcomingRidesSection, 
    UpcomingRideTitle,
    PastRidesSection, 
    OverallPage, 
    Paid,
    Unpaid } from './YourRidesStyles';


const GET_RIDE = gql`
query GetRide($netID: String) {
	userOne (filter:{netid: $netID}) { 
			rides {
			_id
			departureDate
			riders {
					netid
					firstName
					lastName
			}
			spots
			departureLocation {
					title
					address
			}
			arrivalLocation {
					title
					address
			}
			owner {
					netid
					firstName
					lastName
			}
			}     
	}
} 
`


const YourRides = (paid) => {

    let netid = localStorage.getItem("netid")

		const [allRides, setAllRides] = useEffect([])
		const [prevRides, setPrevRides] = useEffect([])
		const [futureRides, setFutureRides] = useEffect([])
    const { data, loading, error } = useQuery(GET_RIDE, {
        variables: { netid: netid },
      });
    ;

    useEffect(() => {
        if (data) {
            console.log("netid", netid)
            console.log("rides got: ", data)
						setAllRides(data["userOne"]["rides"])
        }
    }, [data])

		// useEffect(() => {

		// })

    if (error) return <p>Error...</p>;
    if (loading) return <p>loading...</p>;

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