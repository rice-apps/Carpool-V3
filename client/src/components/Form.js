import React from 'react'

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

  console.log("Rice date=", new Date("2021-09-01T01:30:49.000+00:00"));

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;

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
  
  console.log("First time on Form.js, getRides=", dataRide);
  console.log("errorRide=", errorRide);

  const getLocsCall = async () => {
    console.log("getLocsCall() run");

    try {
    let locsPossible = await refetchLoc().then((res) => {console.log("await refetchLoc().then res=", res); return res;}).catch((err) => {console.log("getLocsCall err=", err);});
    
    } catch (err) {
      console.log("getLocsCall catch err=", err);
    }

    /*
        refetchLoc()
        .then((res) => {console.log("res=", res); ridesPossible = res;})
        .catch((err) => {
          console.log("error=", err);
        });
        */

    return null;
  }

  const getRidesCall = async () => {
    console.log("getRidesCall() run");

    try {
    let ridesPossible = await refetchRide().then((res) => {console.log("await refetchRide().then res=", res); return res;}).catch((err) => {console.log("getRidesCall err=", err);});
    
    } catch (err) {
      console.log("getRidesCall catch err=", err);
    }

    /*
        refetchRide()
        .then((res) => {console.log("res=", res); ridesPossible = res;})
        .catch((err) => {
          console.log("error=", err);
        });
        */

    return null;
  }


  return (
    <React.Fragment>
    <FormOnly resultRides={resultRides} displayRef={displayRef} getRidesCall={() => {getRidesCall()}} getRidesRefetch={() => refetchRide()} getLocsRefetch={() => refetchLoc()}/>
    <Button onClick={() => {getRidesCall()
    .then((res) => {console.log("getRidesCall() res=", res)})
    .catch((err) => {console.log("getRidesCall() err=", err)})
    }}>Click Me to run getRidesCall() from Form.js</Button>
    </React.Fragment>
  )
}

export default Form;
