import React from 'react'
import Header from '../components/Header';
import Form from '../components/Form';
import DisplayRides from '../components/DisplayRides'
import "@fontsource/source-sans-pro";
import './Search.css'

export const monthToStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Search = () => {

  let resultDestArr = [];
    
  const displayRef = React.useRef();

  const updateResultRides = (rides) => {
    resultDestArr = rides;
  }

  return (
    <React.Fragment>
      <div><Header subtitle  ="Search Rides"/></div>
      <Form resultRides={resultDestArr} setResultRides={(rides) => {updateResultRides(rides)}} displayRef={displayRef} />
      <DisplayRides ref={displayRef} rides={resultDestArr} testVar={3}/>
    </React.Fragment>
  )
}

export default Search
