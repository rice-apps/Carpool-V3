import React from 'react';
import { useState, useEffect } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import {
    MenuItem,
    Select,
    Grid, 
} from '@material-ui/core';

import "@fontsource/source-sans-pro"; 
import {
  Form,
  SelectBox,
  MenuBox,
  InputBox,
  BodyText,
} from './FormOnly.styles'

const FormOnly = (props) => {
  const PossibleLocations = props.testLocations;

  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  
  const [startLoc, setStartLoc] = useState('')
  const [endLoc, setEndLoc] = useState('')

  // state for filter date
  const [filterDate, setfilterDate] = useState(null);

  const [numberPeople, setNumberPeople] = useState(null)

  // does actual filtering, produces resultDestArr
  useEffect(() => {
    let resultDestArr = null;
    axios.get('http://localhost:3000/getRides')
    .then((res) => {
      console.log("Get rides refetch",  res.data.rides)
      resultDestArr = res.data.rides;
      if (startLoc !== "") {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.departureLocation.title === PossibleLocations[startLoc].title);});
      }
      if (endLoc !== "") {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.arrivalLocation.title === PossibleLocations[endLoc].title);});
      }
      // filters by only start date and only by year, month, day
      if (filterDate != null) {
        resultDestArr = resultDestArr.filter((ele) => { return isSameDay(new Date(ele.departureDate), new Date(filterDate));});
      }
      if (numberPeople != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.spots >= numberPeople);});
      }
      props.setAllRides(resultDestArr)
      props.setNonMatchingRides(res.data.rides.filter(x => !resultDestArr.includes(x)))
    }).catch((err) => {
      console.log("err=", err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLoc, endLoc, numberPeople, filterDate]);

  // returns true of date1 and date2 are on the same day, returns false otherwise
  const isSameDay = (date1, date2) => {
    return (date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate());
  };
  
  const handleClickStartLoc = (locInd) => {
    setStartLoc(locInd);
  }

  const handleClickEndLoc = (locInd) => {
    setEndLoc(locInd);
  }    
    
  return (
    <React.Fragment>

      <Form className= 'search-form'>

          
      <Grid
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='center'
          spacing='4'
      >
        <Grid 
            item
            xs = {12}
        >   

          <InputBox id = 'StartLoc'>Departure Location</InputBox>
          <SelectBox
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
              id="Start Location Search Bar"
              labelId='StartLoc'
              value={startLoc}
              onChange={(ev) => {handleClickStartLoc(ev.target.value)}}
              variant='outlined'
              size='small'
          >
              <MenuBox value="">
                None
              </MenuBox>
              { 
                  PossibleLocations.map((option, locInd) => (
                      <MenuBox key = {option._id} value = {locInd}>
                          {option.title}
                      </MenuBox>
                  ))
              }
          </SelectBox>
            
        </Grid>

        <Grid  item xs = {12}>
          <InputBox id = 'EndLoc'>Destination</InputBox>
            <SelectBox
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }}
                id="End Location Search Bar"
                labelId='EndLoc'
                value={endLoc}
                onChange={(ev) => {handleClickEndLoc(ev.target.value)}}
                variant='outlined'
                size='small'
            >
              <MenuBox value="">
                None
              </MenuBox>
              {
                  PossibleLocations.map((option, locInd) => (
                      <MenuBox key = {option._id} value = {locInd}>
                          {option.title}
                      </MenuBox>
                  ))
              }
            </SelectBox>
        </Grid>
        <Grid  item xs = {10} >
          <Grid 
            container
            direction='row'
            justifyContent='space-around'
            alignItems='center'
          >
            <Grid item xs = {12}>
              <InputBox id = 'Date'>Date</InputBox>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  clearable
                  value={filterDate}
                  onChange={date => setfilterDate(date)}
                  minDate={minDate}
                  format="MMM dd, yyyy"
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid  item xs = {12}>
          <Grid 
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing = "1"
          >
            <Grid item>
              <Select 
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }} 
                id="number-people" 
                value={numberPeople} 
                onChange={e => {setNumberPeople(e.target.value);}}>
                  { [1,2,3,4,5].map((ele) => (
                  <MenuItem value={ele}>{ele}</MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item>
              <BodyText>{"Number of People"}</BodyText> 
            </Grid>        
        </Grid>
      </Grid>
    </Grid>
  </Form>
</React.Fragment>
)
}

export default FormOnly;
