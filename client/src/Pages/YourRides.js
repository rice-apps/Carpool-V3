import React, {useState, useEffect} from 'react';
import UpcomingRideCard from '../components/UpcomingRideCard.js';
import PastRideCard from '../components/PastRideCard.js';
import { gql, useQuery} from "@apollo/client";
import moment from "moment";


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

		// const [allRides, setAllRides] = useEffect([])
		const [prevRides, setPrevRides] = useState([])
		const [futureRides, setFutureRides] = useState([])
    const { data, loading, error } = useQuery(GET_RIDE, {
        variables: { netid: netid },
      });
    ;

    useEffect(() => {
        if (data) {
						let rides = data["userOne"]["rides"]

						console.log("rides", rides)

						let previousrides = rides.filter(ride => moment(ride.departureDate) < new Date())
						previousrides.sort((a, b) => moment(b.departureDate) - moment(a.departureDate))
						let upcomingrides = rides.filter(ride => moment(ride.departureDate) >= new Date())
						upcomingrides.sort((a, b) => moment(b.departureDate) - moment(a.departureDate))

						console.log("previousRides", previousrides)
						console.log("upcomingRides", upcomingrides)

						setPrevRides(previousrides)
						setFutureRides(upcomingrides)
        }
    }, [data])

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