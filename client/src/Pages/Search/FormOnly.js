import React from 'react'
import { useState, useEffect } from 'react'
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import {
    MenuItem,
    Grid, 
} from '@material-ui/core';

import "@fontsource/source-sans-pro";
import TextField from '@material-ui/core/TextField';
import {
  Form,
  SelectBox,
  MenuBox,
  InputBox,
  BodyText,
} from './FormOnly.styles'

const FormOnly = (props) => {
  console.log("PROPS", props);

  const PossibleLocations = props.testLocations;

  const currentDate = new Date();

  const [ridesPossibleForm, setRidesPossibleForm] = useState([]);

  // initial filter: filters rides that are past current date
  useEffect(() => {
    console.log("useEffect run()");
    props.getRidesRefetch()
    .then((res) => {
      console.log("in useEffect refetchRide().then() res.data.rideMany=", res.data.rideMany);

      const ridesPossibleNotBefore = res.data.rideMany.filter((ride) => {
        const rideDateAfterCurrentDate = compareDates(new Date(ride.departureDate), currentDate, true);
        return rideDateAfterCurrentDate;
      });
      
      setRidesPossibleForm(ridesPossibleNotBefore);
      displayRef.current.setRidesPossible(ridesPossibleNotBefore);
    })
    .catch((err) => {
      console.log("err=", err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayRef = props.displayRef;

  let temp = 3;

  // preselected values
  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+14);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const maxDate = new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate());

  console.log("startValue=" + startValue + " endValue=" + endValue + " minDate=" + minDate + " maxDate=" + maxDate);

  const dictNames = {startLoc: 0, endLoc: 1, date: 2, numberPeople: 3}
  
  const [startLoc, setStartLoc] = useState('')
  const [endLoc, setEndLoc] = useState('')

  // state for date range (to be removed)
  const [dateRange, setDateRange] = useState([startValue, endValue])

  // state for start date
  const [startDate, setStartDate] = useState(startValue);

  // state for end date (to be removed)
  //const [endDate, setEndDate] = useState(endValue);
  
  const [numberPeople, setNumberPeople] = useState(null)

  const [indSelected, setIndSelected] = useState(-1)

  // does actual filtering, produces resultDestArr
  useEffect(() => {
    console.log("form changed!");
    let resultDestArr = null;
    props.getRidesRefetch()
    .then((res) => {
      resultDestArr = ridesPossibleForm;
      if (startLoc !== "") {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.departureLocation.title === PossibleLocations[startLoc].title);});
      }
      if (endLoc !== "") {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.arrivalLocation.title === PossibleLocations[endLoc].title);});
      }
      // filters by only start date and only by year, month, day
      if (startDate != null) {
        resultDestArr = resultDestArr.filter((ele) => { return isSameDay(new Date(ele.departureDate), new Date(startDate));});
      }
      if (numberPeople != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.spots >= numberPeople);});
      }
      console.log("RESULTDESTARR", resultDestArr);
      displayRef.current.setRides(resultDestArr);
    }).catch((err) => {
      console.log("err=", err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLoc, endLoc, numberPeople, startDate]);

  // returns true of date1 and date2 are on the same day, returns false otherwise
  const isSameDay = (date1, date2) => {
    return (date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate());
  };

  // checks that date1 < date2 (still need for the initial filter)
  const compareDates = (date1, date2, equals) => {
    const d1 = [date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes()]
    const d2 = [date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes()]

    if (d1[0] === d2[0]) {
      if (d1[1] === d2[1]) {
        if (d1[2] === d2[2]) {
          if (d1[3] === d2[3]) {
            return d1[4] > d2[4] || (equals && d1[4] === d2[4]);
          }
          return d1[3] > d2[3] || (equals && d1[3] === d2[3]);
        }
        return d1[2] > d2[2] || (equals && d1[2] === d2[2]);
      }
      return d1[1] > d2[1] || (equals && d1[1] === d2[1]);
    }

    return d1[0] > d2[0] || (equals && d1[0] === d2[0]);
  }
  
  const handleClickStartLoc = (locInd) => {
    console.log("handleClickStartLoc() run, locInd=", locInd);
    setStartLoc(locInd);

    //setIsSelectedDestAny(true);
    setIndSelected(dictNames.startLoc);
    console.log(JSON.parse(JSON.stringify(indSelected)));
  }

  const handleClickEndLoc = (locInd) => {
    console.log("handleClickEndLoc() run, locInd=", locInd);
    setEndLoc(locInd);

    //setIsSelectedDestAny(true);
    setIndSelected(dictNames.endLoc);
    console.log(JSON.parse(JSON.stringify(indSelected)));
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
              id="Start Location Search Bar"
              labelId='StartLoc'
              value={startLoc}
              onChange={(ev) => {handleClickStartLoc(ev.target.value)}}
              variant='outlined'
              size='small'
          >
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
                id="End Location Search Bar"
                labelId='EndLoc'
                value={endLoc}
                onChange={(ev) => {handleClickEndLoc(ev.target.value)}}
                variant='outlined'
                size='small'
            >
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
              <DateRangePickerComponent placeholder="Enter Date Range"
                startDate={startValue}
                endDate={endValue}
                min={minDate}
                max={maxDate}
                format="dd-MMM-yy"
                value={dateRange}
                change={(e) => {setStartDate([e.startDate]); console.log("DateRangePickerComponent new e=", e);}}
              >
              </DateRangePickerComponent>
            </Grid>
          </Grid>
        </Grid>
        <Grid  item xs = {12}>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing = '1'
          >
            <Grid item>   
            <TextField id="number-people" select value={numberPeople} onChange={e => {setNumberPeople(e.target.value); temp=e.target.value; console.log("temp=" + temp)}}>
              { [1,2,3,4,5,6,7,8,9,10,11,12,13].map((ele) => (
                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
              ))}
            </TextField>
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
