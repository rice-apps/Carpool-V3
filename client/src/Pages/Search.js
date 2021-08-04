import React, {Component} from 'react'
import { useState, useEffect } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header';
import Form from '../components/Form';
import Create from '../components/Create'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import { gql, useQuery } from "@apollo/client";

import DisplayRides from '../components/DisplayRides'

import "@fontsource/source-sans-pro";

import './Search.css'

export const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Search = () => {
      //const [resultDestArr, setResultDestArr] = useState([{id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3}, {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5}, {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8}, {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}])
    //const [resultDestArr, setResultDestArr] = useState([{id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3}, {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5}, {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}])
    //const resultDestArr = [{id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3}, {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5}, {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}];
    let resultDestArr = [];

    //console.log("resultDestArr at the start=", resultDestArr);
     
    const displayRef = React.useRef();

    const changeDisplay = () => {
      displayRef.current.incrementVar();
    }

    const updateResultRides = (rides) => {
      resultDestArr = rides;
    }

    return (
      <React.Fragment>
      <div><Header subtitle  ="Search Rides"/></div>

        <Form resultRides={resultDestArr} setResultRides={(rides) => {updateResultRides(rides)}} displayRef={displayRef} />

      {/*
        <button onClick={changeDisplay}>CLICK TO CHANGE DISPLAY RIDES</button>
      */}
  
  <DisplayRides ref={displayRef} rides={resultDestArr} testVar={3}/>

           </React.Fragment>
      )
}

export default Search
