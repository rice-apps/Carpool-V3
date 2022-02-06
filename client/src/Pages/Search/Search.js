import React from 'react'
import Header from '../../common/Header/Header';
import Form from './Form';
import DisplayRides from './DisplayRides'
import { gql, useQuery } from "@apollo/client";
import LoadingDiv from '../../common/LoadingDiv';
import "@fontsource/source-sans-pro";
import './Search.css'

export const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Search = () => {
  // Set last page visited
  localStorage.setItem('lastPage', 'search');
  let resultDestArr = [];
    
  const displayRef = React.useRef();

  const updateResultRides = (rides) => {
    resultDestArr = rides;
  }

  const GET_RIDES = gql`
  query($after: Date) {
    rideMany(filter: {
      _operators: { departureDate: { gte: $after } }
    }) {
      _id
      departureDate
      riders { netid }
      spots
      departureLocation { title }
      arrivalLocation { title }
    }
  }
`;

  const GET_LOCATIONS = gql`
    query {
      locationMany {
        title
        address
      }
    }
  `;

  const { refetch: refetchLoc } = useQuery(GET_LOCATIONS);

  const today = new Date().toDateString();
  const { refetch: refetchRide, loading: rideLoading } = useQuery(GET_RIDES,
    {
      variables: { after: today }
    }
  );

  return (
    <React.Fragment>
      <div><Header subtitle = "Search Rides"/></div>
      <Form resultRides={resultDestArr} setResultRides={(rides) => {updateResultRides(rides)}} displayRef={displayRef} getRidesRefetch={() => refetchRide()} getLocsRefetch={() => refetchLoc()} />
        {rideLoading ? 
          <LoadingDiv height={'15vh'} /> : 
          <DisplayRides ref={displayRef} rides={resultDestArr} rideLoading={rideLoading} testVar={3}/>
        }
    </React.Fragment>
  )
}

export default Search
