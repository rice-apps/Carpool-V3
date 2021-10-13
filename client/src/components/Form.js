import React from 'react'
import FormOnly from './FormOnly.js'
import { gql, useQuery } from "@apollo/client";

export const ridesPossible = [];

const Form = (props) => {

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;

  console.log("Rice date=", new Date("2021-09-01T01:30:49.000+00:00"));

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

const testDate = new Date("2021-09-01T01:30:49.000+00:00");

const { refetch: refetchRide } = useQuery(GET_RIDES,
  {
  variables: {
    spotsNum: 3,
    date: testDate
  }
});
  
  
// TODO: Get this from the API!!
let PossibleLocations = [
  {
      _id: "60dd1f608211a44ac40b33ef",
      title: "Rice University",
      address: "6100 Main St, Houston, TX 77005, USA"
  },
  {
    _id: "60dd1f608211a44ac40b33f0",
    title: "Hobby Airport",
    address: "Hobby Airport Loop, Houston, TX 77061, USA"
  },
  {
    _id: "60dd1fff8211a44ac40b33f2",
    title: "George Bush Intercontinental Airport",
    address: "2800 N Terminal Rd, Houston, TX 77032, USA"
  },
  {
    _id: "60dd20008211a44ac40b33f3",
    title: "Will Rice College",
    address: "6330 Main St, Houston, TX 77005, USA"
  }];

  // May cause 401 error if a request is made to the database before it's ready
  return (
    <React.Fragment>
    <FormOnly resultRides={resultRides} displayRef={displayRef} getRidesRefetch={() => refetchRide()} getLocsRefetch={() => refetchLoc()} testLocations={PossibleLocations}/>
    </React.Fragment>
  )
}

export default Form;