import React from 'react'
import Header from '../../common/Header/Header';
import Form from './Form';
import DisplayRides from './DisplayRides'
import { gql, useQuery } from "@apollo/client";
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components'
import "@fontsource/source-sans-pro";
import './Search.css'

export const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 15vh;
  justify-content: center;
  align-items: center;
`
const Search = () => {
  // Set last page visited
  localStorage.setItem('lastPage', 'search');
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
        {rideLoading ? 
          <LoadingDiv>
            <ClipLoader />
          </LoadingDiv> : 
          <DisplayRides ref={displayRef} rides={resultDestArr} rideLoading={rideLoading} testVar={3}/>
        }
    </React.Fragment>
  )
}

export default Search
