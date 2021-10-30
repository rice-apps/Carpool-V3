import React from 'react'
import Header from '../components/Header';
import Form from '../components/Form';
import DisplayRides from '../components/DisplayRides'
import { gql, useQuery } from "@apollo/client";
import "@fontsource/source-sans-pro";
import './Search.css'

export const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Search = () => {

  let resultDestArr = [];
    
  const displayRef = React.useRef();

  const updateResultRides = (rides) => {
    resultDestArr = rides;
  }

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

  const GET_LOCATIONS = gql`
    query {
      locationMany {
        title
        address
      }
    }
  `;

  const { refetch: refetchLoc } = useQuery(GET_LOCATIONS);

  const { refetch: refetchRide, loading: rideLoading } = useQuery(GET_RIDES,
    {
      variables: {}
    }
  );

  return (
    <React.Fragment>
      <div><Header subtitle = "Search Rides"/></div>
      <Form resultRides={resultDestArr} setResultRides={(rides) => {updateResultRides(rides)}} displayRef={displayRef} getRidesRefetch={() => refetchRide()} getLocsRefetch={() => refetchLoc()} />
      <DisplayRides ref={displayRef} rides={resultDestArr} rideLoading={rideLoading} testVar={3}/>
    </React.Fragment>
  )
}

export default Search
