import React from 'react'
import FormOnly from './FormOnly.js'

export const ridesPossible = [];

const Form = (props) => {

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;

  console.log("Rice date=", new Date("2021-09-01T01:30:49.000+00:00"));

// TODO: Get this from the API!!
let PossibleLocations = [
  {
      _id: "60dd1f608211a44ac40b33ef",
      title: "Rice",
      address: "6100 Main St, Houston, TX 77005, USA"
  },
  {
    _id: "60dd1f608211a44ac40b33f0",
    title: "HOU",
    address: "Hobby Airport Loop, Houston, TX 77061, USA"
  },
  {
    _id: "60dd1fff8211a44ac40b33f2",
    title: "IAH",
    address: "2800 N Terminal Rd, Houston, TX 77032, USA"
  }];

  // May cause 401 error if a request is made to the database before it's ready
  return (
    <React.Fragment>
    <FormOnly resultRides={resultRides} displayRef={displayRef} getRidesRefetch={props.getRidesRefetch} getLocsRefetch={props.getLocsRefetch} testLocations={PossibleLocations}/>
    </React.Fragment>
  )
}

export default Form;