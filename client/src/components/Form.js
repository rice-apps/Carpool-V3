import React, { useEffect } from 'react'

import FormOnly from './FormOnly.js'

import { gql, useQuery } from "@apollo/client";

import Button from '@material-ui/core/Button'

//rides is Database of current rides (to be more specific, all rides after the current IRL time)

/*
export const ridesPossible = [
  {id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3},
  {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5},
  {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8},
  {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}
];
*/

export const ridesPossible = [];

const Form = (props) => {

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;

  console.log("Rice date=", new Date("2021-09-01T01:30:49.000+00:00"));

  //in RideModel.js, spots is defined as type Number
  
  /*
  const GET_RIDES = gql`
  query GetRides($date: Date) {
    rideMany(filter: {departureDate: $date}) {
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
*/

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

const { loading: loadingLoc, error: errorLoc, data: dataLoc, refetch: refetchLoc} = useQuery(GET_LOCATIONS);

  const testDate = new Date("2021-09-01T01:30:49.000+00:00");

  const { loading: loadingRide, error: errorRide, data: dataRide, refetch: refetchRide } = useQuery(GET_RIDES,
    {
    variables: {
      spotsNum: 3,
      date: testDate
    }
  });
  
  //const {loading, error, data, refetch} = useQuery(GET_RIDES);
  
 
let PossibleLocations = [
  {
    _id: "60dd1f608211a44ac40b33ef",
  title: "Rice University",
  address: "6100 Main St, Houston, TX 77005, USA"},
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

  const getRidesCall = async () => {
    console.log("getRidesCall() run");

    try {
    let ridesPossible = await refetchRide().then((res) => {console.log("await refetchRide().then res=", res); return res;}).catch((err) => {console.log("getRidesCall err=", err);});
    
    } catch (err) {
      console.log("getRidesCall catch err=", err);
    }

    return null;
  }

  return (
    <React.Fragment>
    <FormOnly resultRides={resultRides} displayRef={displayRef} getRidesRefetch={() => refetchRide()} getLocsRefetch={() => refetchLoc()} testLocations={PossibleLocations}/>
    {/*}
    <Button onClick={() => {getRidesCall()
    .then((res) => {console.log("getRidesCall() res=", res)})
    .catch((err) => {console.log("getRidesCall() err=", err)})
    }}>Click Me to run getRidesCall() from Form.js</Button>
  */}
    </React.Fragment>
  )
}

export default Form;
