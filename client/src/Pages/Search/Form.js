import React from 'react'
import { gql, useQuery } from "@apollo/client";
import FormOnly from './FormOnly.js'
import LoadingDiv from "../../common/LoadingDiv.js";

export const ridesPossible = [];

const Form = (props) => {

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;
  const locations = props.locationsAll;

  const {locationMany : locationsArr} = locations

  // May cause 401 error if a request is made to the database before it's ready
  return (
    <React.Fragment>
    <FormOnly setRides={props.setRides} setRidesPossible={props.setRidesPossible} resultRides={resultRides} displayRef={displayRef} getRidesRefetch={props.getRidesRefetch} getLocsRefetch={props.getLocsRefetch} testLocations={locationsArr}/>
    </React.Fragment>
  )
}

export default Form;