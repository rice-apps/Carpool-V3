import React, { useState, useEffect, useRef } from 'react'
import Header from '../../common/Header/Header';
import Form from './Form';
import DisplayRides from './DisplayRides'
import { gql, useQuery } from "@apollo/client";
import LoadingDiv from '../../common/LoadingDiv';
import "@fontsource/source-sans-pro";
import './Search.css'
import { useAxios } from 'use-axios-client';
import axios from 'axios';


export const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Search = () => {
  // Set last page visited
  localStorage.setItem('lastPage', 'search');
  let resultDestArr = [];
  
  const [allRides, setAllRides] = useState([])
  const [nonMatchingRides, setNonMatchingRides] = useState([])
  const displayRef = useRef();

  const updateResultRides = (rides) => {
    resultDestArr = rides;
  }

  const GET_LOCATIONS = gql`
    query {
      locationMany {
        title
        address
      }
    }
  `;

  const { refetch: refetchLoc } = useQuery(GET_LOCATIONS);

  const { refetch: refetchRide, loading: rideLoading } = useAxios({
    url: 'http://localhost:3000/getRides',
    method: "get"
  });

  useEffect(() => {
    axios.get('http://localhost:3000/getRides').then((res) => {
      setAllRides(res.data.rides)
    })
  }, [])

  return (
    <React.Fragment>
      <div><Header subtitle = "Search Rides"/></div>
      <Form resultRides={resultDestArr} setResultRides={(rides) => {updateResultRides(rides)}} allRides={allRides} setAllRides={setAllRides} setNonMatchingRides={setNonMatchingRides} displayRef={displayRef} getRidesRefetch={() => refetchRide()} getLocsRefetch={() => refetchLoc()} />
        {rideLoading ? 
          <LoadingDiv height={'15vh'} /> : 
          <DisplayRides ref={displayRef} rides={resultDestArr} nonMatchingRides={nonMatchingRides} rideLoading={rideLoading} allRides={allRides} testVar={3}/>
        }
    </React.Fragment>
  )
}

export default Search
