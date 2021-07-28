import React from 'react'

import FormOnly from './FormOnly.js'

import { gql, useQuery } from "@apollo/client";

//rides is Database of current rides (to be more specific, all rides after the current IRL time)
export const ridesPossible = [
  {id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3},
  {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5},
  {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8},
  {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}
];

const Form = (props) => {

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;

  const GET_RIDES = gql`
query {
  rideMany {
    _id
    departureDate
    riders
    spots
    ownerDriving
    departureLocation
    arrivalLocation
    owner
  }
}
`;

  const { loading, error, data, refetch } = useQuery(GET_RIDES);
  console.log("First time on Form.js, getRides=", data);

  const getRidesCall = () => {
    console.log("getRidesCall() run");
    refetch()
        .then((res) => {console.log("res=", res)})
        .catch((err) => {
          console.log("error=", err);
        });

  }

  return (
    <FormOnly resultRides={resultRides} displayRef={displayRef} getRidesCall={() => {getRidesCall()}}/>
  )
}

export default Form;
