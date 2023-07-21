import React from 'react'
import FormOnly from './FormOnly.js'

export const ridesPossible = [];

const Form = (props) => {

  const resultRides = props.resultRides;
  const displayRef = props.displayRef;
  if (props.locationsAll) {
    var locations = props.locationsAll
    var {locationMany : locationsArr} = locations 
  } else {
    var locationsArr = [{title:'Rice',address:'6100 Main St, Houston, TX 77005, USA'},
    {title:'Hobby (HOU) Airport',address:'Hobby Airport Loop, Houston, TX 77061, USA'},
    {title:'IAH Airport',address:'2800 N Terminal Rd, Houston, TX 77032, USA'},
    {title:'Galleria',address:'5085 Westheimer Rd, Houston, TX 77056'},
    {title:'Target',address:'8500 Main St, Houston, TX 77025'},
    {title:'H-E-B',address:'1701 W Alabama St, Houston, TX 77098'},
    {title:'Houston',address:'[specify Houston address in notes]'},
    {title:'Austin',address:'[specify Austin address in notes]'},
    {title:'Dallas/Fort Worth',address:'[specify Dallas/Fort Worth address in notes]'},
    {title:'San Antonio',address:'[specify San Antonio address in notes]'}];
  }


  // May cause 401 error if a request is made to the database before it's ready
  return (
    <React.Fragment>
    <FormOnly setRides={props.setRides} setRidesPossible={props.setRidesPossible} resultRides={resultRides} displayRef={displayRef} getRidesRefetch={props.getRidesRefetch} getLocsRefetch={props.getLocsRefetch} testLocations={locationsArr}/>
    </React.Fragment>
  )
}

export default Form;