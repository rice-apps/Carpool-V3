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
import LoadingDiv from '../../common/LoadingDiv.js';


const GET_RIDES = gql`
	query {
		rideByUser {
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

    document.title = "Your Rides";

    let netid = localStorage.getItem("netid")

    // const [allRides, setAllRides] = useEffect([])
    const [prevRides, setPrevRides] = useState([])
    const [futureRides, setFutureRides] = useState([])
    const { data, loading, error } = useQuery(GET_RIDES);

    useEffect(() => {
        if (data) {
            let rides = data.rideByUser

            let previousrides = rides.filter(ride => moment(ride.departureDate) < new Date())
            previousrides.sort((a, b) => moment(b.departureDate) - moment(a.departureDate))
            let upcomingrides = rides.filter(ride => moment(ride.departureDate) >= new Date())
            upcomingrides.sort((a, b) => moment(a.departureDate) - moment(b.departureDate))

  
            setPrevRides(previousrides)
            setFutureRides(upcomingrides)
        }
    }, [data, netid])

    if (error) return <p>Error...</p>;
    if (loading) return <LoadingDiv />;

    return (
        // <div> 
            <OverallPage>
                <OverallPageTitle>Your Rides</OverallPageTitle>
                <UpcomingRidesSection>
                    <UpcomingRideTitle>Upcoming Rides</UpcomingRideTitle>
                    {futureRides.map(ride => {
                        return (
                            <UpcomingRideCard 
                                id={ride._id}
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
                                id={ride._id}
                                origin={ride.departureLocation.title} 
                                destination={ride.arrivalLocation.title}
                                datetime={ride.departureDate}
                            />
                        
                        )
                    })}
                </PastRidesSection>
            </OverallPage>
        // </div>
    )
}

YourRides.defaultProps = {
    origin: 'RMC',
    destination: 'IAH',
    datetime: Date.now(),
    notification: true,
    paid: true

}

export default YourRides;