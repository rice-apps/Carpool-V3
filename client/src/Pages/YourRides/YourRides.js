import React, {useState, useEffect} from 'react';
import UpcomingRideCard from './UpcomingRideCard.js';
import PastRideCard from './PastRideCard.js';
import { gql, useQuery} from "@apollo/client";
import moment from "moment";


import { 
    OverallPageTitle, 
    UpcomingRidesSection, 
    UpcomingRideTitle,
    PastRidesSection, 
    PastRideTitle,
    TitleText,
    OverallPage, 
    } from './YourRidesStyles';


const GET_RIDES = gql`
	query {
		rideMany {
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
`;


const YourRides = (paid) => {

    let netid = localStorage.getItem("netid")

		// const [allRides, setAllRides] = useEffect([])
		const [prevRides, setPrevRides] = useState([])
		const [futureRides, setFutureRides] = useState([])
    const { data, loading, error } = useQuery(GET_RIDES);

    useEffect(() => {
        if (data) {
            let rides = data.rideMany.filter(ride => {
                let ownerTrue = false
                let riderTrue = false
                if (ride.owner) {
                    ownerTrue = ride.owner.netid === netid
                }
                ride.riders.forEach(rider => riderTrue = rider.netid === netid)
                return ownerTrue || riderTrue
            })

            let previousrides = rides.filter(ride => moment(ride.departureDate) < new Date())
            previousrides.sort((a, b) => moment(b.departureDate) - moment(a.departureDate))
            let upcomingrides = rides.filter(ride => moment(ride.departureDate) >= new Date())
            upcomingrides.sort((a, b) => moment(b.departureDate) - moment(a.departureDate))

            console.log("previousRides", previousrides)
            console.log("upcomingRides", upcomingrides)

            setPrevRides(previousrides)
            setFutureRides(upcomingrides)
        }
    }, [data, netid])

    if (error) return <p>Error...</p>;
    if (loading) return <p>loading...</p>;

    return (
        <div> 
            <OverallPage>
                <OverallPageTitle>Your Rides</OverallPageTitle>
                <UpcomingRidesSection>
                    <UpcomingRideTitle>Upcoming Rides</UpcomingRideTitle>
                    {futureRides.map(ride => {
                        return (
                            <UpcomingRideCard 
                                origin={ride.departureLocation.title} 
                                destination={ride.arrivalLocation.title}
                                datetime={ride.departureDate}
                            />
                        )
                    })}
                </UpcomingRidesSection>

                <PastRidesSection>
                    <PastRideTitle><TitleText>Past Rides</TitleText><TitleText>Payments</TitleText></PastRideTitle>
                    {prevRides.map(ride => {
                        return (
                            <PastRideCard 
                                origin={ride.departureLocation.title} 
                                destination={ride.arrivalLocation.title}
                                datetime={ride.departureDate}
                            />
                        )
                    })}
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