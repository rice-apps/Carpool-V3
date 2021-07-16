import React, {Component} from 'react'
import { useState } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header';
import Form from '../components/Form';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import DisplayRides from '../components/DisplayRides'

import "@fontsource/source-sans-pro";

import './Search.css'

const Search = () => {

    const [resultDestArr, setResultDestArr] = useState([{startLoc: 'S2', endLoc: 'IAH', date: new Date("7/13/21"), numberPeople: 3}, {startLoc: 'Shop3', endLoc: 'Shop1', date: new Date("7/17/21"), numberPeople: 5}])

    const displayRef = React.useRef();

    const changeDisplay = () => {
      displayRef.current.incrementVar();
    }

    return (
      <React.Fragment>
      <div><Header subtitle  ="Search Rides"/></div>

        <Form resultRides={resultDestArr} displayRef={displayRef}/>

      {/*
        <button onClick={changeDisplay}>CLICK TO CHANGE DISPLAY RIDES</button>
      */}
      
        <DisplayRides ref={displayRef} rides={resultDestArr} testVar={3}/>

           </React.Fragment>
      )
}

export default Search
