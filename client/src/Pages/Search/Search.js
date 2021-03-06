import React, { useState } from "react";
import Header from "../../common/Header/Header";
import Form from "./Form";
import DisplayRides from "./DisplayRides";
import { gql, useQuery } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv";
import "@fontsource/source-sans-pro";
import "./Search.css";

export const monthToStr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Search = () => {

  document.title = "Find Rides";

  // Set last page visited
  localStorage.setItem("lastPage", "search");
  let resultDestArr = [];

  const [rides, setRides] = useState([]);
  const [ridesPossible, setRidesPossible] = useState([]);

  const displayRef = React.useRef();

  const updateResultRides = (rides) => {
    resultDestArr = rides;
  };

  const GET_RIDES = gql`
    query ($after: Date) {
      rideMany(filter: { _operators: { departureDate: { gte: $after } } }) {
        _id
        departureDate
        riders {
          netid
        }
        spots
        departureLocation {
          title
        }
        arrivalLocation {
          title
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

  const { data: locations, loading: locsLoading, refetch: refetchLoc } = useQuery(GET_LOCATIONS);

  const today = new Date().toDateString();
  const { refetch: refetchRide, loading: rideLoading } = useQuery(GET_RIDES, {
    variables: { after: today },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <React.Fragment>
      <div><Header subtitle = "Find Rides"/></div>
      {locsLoading ? <div/> : 
        <Form resultRides={resultDestArr} setResultRides={(rides) => {updateResultRides(rides)}} setRides={setRides} setRidesPossible={setRidesPossible} displayRef={displayRef} getRidesRefetch={() => refetchRide()} locationsAll = {locations} getLocsRefetch={() => refetchLoc()} />
      }
      {rideLoading ? 
        <LoadingDiv height={'15vh'} /> : 
        <DisplayRides ref={displayRef} ridesT={rides} ridesPossible={ridesPossible} rides={resultDestArr} rideLoading={rideLoading} testVar={3}/>
      }
    </React.Fragment>
  );
};

export default Search;
