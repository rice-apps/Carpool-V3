import React from 'react'
import { useState } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import DisplayRides from '../components/DisplayRides'

import "@fontsource/source-sans-pro";

import { gql, useQuery } from "@apollo/client";

/*
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
*/

//import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker'

import TextField from '@material-ui/core/TextField';

/*
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
*/

//import Box from '@material-ui/core/Box';

import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';





const PossibleLocations = ['IAH', 'Greenbriar Lot', 'Rice Village', 'S1', 'S2', 'S3', 'S4', 'Shop1', 'Shop2', 'Shop3']

//rides is Database of current rides (to be more specific, all rides after the current IRL time)
export const rides = [{id: 1, startLoc: 'S2', endLoc: 'IAH', date:  new Date("2021-07-13T09:00:00"), numberPeople: 3}, {id: 2, startLoc: 'Shop3', endLoc: 'Shop1', date:  new Date("2021-07-17T10:00:00"), numberPeople: 5}, {id: 3, startLoc: 'S3', endLoc: 'IAH', date:  new Date("2021-07-18T05:00:00"), numberPeople: 8}, {id: 4, startLoc: 'S4', endLoc: 'Shop3', date:  new Date("2021-07-25T17:00:00"), numberPeople: 10}];

//DefaultDestinations should only contain the dest property of each element ideally (can use map function for this)
const DefaultLocations = {
  startLoc: PossibleLocations,
  endLoc: PossibleLocations
};

const Form = (props) => {
  
  /*
const GET_RIDES = gql`
query GetRides(
    $startLoc: Float, $endLoc: Float, $date: Date, $passengers: Float) 
    {
      ride
      departureDate,
      spots
    }
`
*/

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
console.log("getRides=", data);

  const getAllRides = () => {
    console.log("getAllRides() run");
    

  }

  getAllRides();
  
  const displayRef = props.displayRef;

  let resultDestArr = null;
  let testKey = 1;

  let temp = 3;

  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 20);

  const testValue = [new Date("7/12/21"), new Date("7/15/21")]

    const dictNames = {startLoc: 0, endLoc: 1, date: 2, time: 3, numberPeople: 4}
    
    const [startLoc, setStartLoc] = useState(null)
    const [endLoc, setEndLoc] = useState(null)

    //const [date, setDate] = useState('2020-09-11T12:00:00')
    //const [date, setDate] = useState(new Date())
    
    const [dateRange, setDateRange] = useState([startValue, endValue])

    //const [open, setOpen] = useState(false)
    
    const [time, setTime] = useState(null)
    const [numberPeople, setNumberPeople] = useState(null)

    const [isSelected, setIsSelected] = useState({startLoc: new Array(DefaultLocations.startLoc.length).fill(false), endLoc: new Array(DefaultLocations.endLoc.length).fill(false), date: [false]})
    const selectedColors = ['white', 'blue']

    const [indSelected, setIndSelected] = useState(-1)

    //const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const SearchDiv = styled.div`
    border: 5px solid #ddddff;
    padding: 10vw;
    display: flex;
    align-content: space-between;
    justify-content: center;
    @media (max-width: 480px) {
      background-color: #a9d5e8;
    }
    `;

    //Got rid of overflow-x: auto. overflox-x determines what happens when the content of an element is too big for the element to display within its boundaries
    //when that happens, the value of overflow-x determines if there is a scrollbar or if the excess content is displayed outside of the element's boundaries or not displayed at all
    const SearchControl = styled.div`
    margin-top: 10vw;
    margin-bottom: 10vw;
    white-space: nowrap;
    text-align: right;
    `;

    const SearchControl2 = styled.div`
    margin-top: 10vw;
    margin-bottom: 10vw;
    white-space: nowrap;
    text-align: right;
    background-color: #ff7777;
    `;

    const SubHeading = styled.div`
    
    `;

    const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    `;

    const compareDates = (date1, date2, equals) => {
      //date1 = 1st date, date2 = 2nd date, equals = boolean variable if equals is true then the function returns true for date1 >= date2, not just date1 > date2
      const d1 = [date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes()]
      const d2 = [date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes()]

      if (d1[0] == d2[0]) {
        if (d1[1] == d2[1]) {
          if (d1[2] == d2[2]) {
            if (d1[3] == d2[3]) {
              return d1[4] > d2[4] || (equals && d1[4] == d2[4]);
            }
            return d1[3] > d2[3] || (equals && d1[3] == d2[3]);
          }
          return d1[2] > d2[2] || (equals && d1[2] == d2[2]);
        }
        return d1[1] > d2[1] || (equals && d1[1] == d2[1]);
      }

      return d1[0] > d2[0] || (equals && d1[0] == d2[0]);
    }
    
    //console.log(compareDates(testValue[1], testValue[0], true));
    
    const combineDateWithTime = (d, t) => {
      if (d == null) {
        return null;
      }
      let useT = t;
      if (t == null) {
        useT = "00:00";
      }

      const splitT = useT.split(":");
      
      return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      parseInt(splitT[0]),
      parseInt(splitT[1]),
      );
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Search form submitted.");
        console.log("Search query = [ startLoc=" + startLoc + " endLoc=" + endLoc + " dateRange=" + dateRange + " time=" + time + " numberPeople=" + numberPeople + " ]");

        refetch().
        then((res) => {console.log("res=", res)})
        .catch((err) => {
          console.log("error=", error);
        });
        //console.log("data=", data);

        const dateTimeRange = [combineDateWithTime(dateRange[0], time), combineDateWithTime(dateRange[1], time)];
        console.log("dateTimeRange=", dateTimeRange);

        resultDestArr = rides;
        if (startLoc != null) {
          resultDestArr = resultDestArr.filter((ele) => { return (ele.startLoc == startLoc);});
        }
        if (endLoc != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.endLoc == endLoc);});
        }
        if (dateTimeRange[0] != null && dateTimeRange[1] != null) {
        resultDestArr = resultDestArr.filter((ele) => { return compareDates(ele.date, dateTimeRange[0], true) && !compareDates(ele.date, dateTimeRange[1], false);});
        }
        if (numberPeople != null) {
        resultDestArr = resultDestArr.filter((ele) => { return (ele.numberPeople >= numberPeople);});
        }
        console.log(resultDestArr);
        displayRef.current.setRides(resultDestArr);

        testKey++;
    }

    const handleClickStartLoc = (text, ind) => {
      console.log("handleClickStartLoc() run, text=", text);
      setStartLoc(text);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.startLoc);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      const isSelectedDest = Array.from(isSelected.startLoc);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      console.log("isSelectedDest=", isSelectedDest);
      setIsSelected({...isSelected, startLoc: isSelectedDest, });
      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const handleChangeStartLoc = (dest) => {
      setStartLoc(dest);

      setIndSelected(dictNames.startLoc);
    }

    const handleClickEndLoc = (text, ind) => {
      console.log("handleClickEndLoc() run, text=", text);
      setEndLoc(text);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.endLoc);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      const isSelectedDest = Array.from(isSelected.endLoc);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      console.log("isSelectedDest=", isSelectedDest);

      setIsSelected({...isSelected, endLoc: isSelectedDest, });
      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const handleChangeEndLoc = (dest) => {
      setEndLoc(dest);

      setIndSelected(dictNames.endLoc);
    }

    /*
    const handleChangeDate = (date) => {
      console.log("handleChangeDate() run, date=", date);
      setDate(date);

      setIndSelected(dictNames.date);

    }
    */

    const handleChangeTime = (time) => {
      console.log("handleChangeTime() run, time=" +  time + " temp=" + temp);
      setTime(time);

      setIndSelected(dictNames.time);

      console.log("handleChangeTime() run, time=" +  time + " temp=" + temp);

    }
    
    const handleClickPropName = (text, ind, propName) => {
      console.log("handleClickPropName() run, text=", text);
      this["set" + propName](text);
      //Error: "Search.js:218 Uncaught TypeError: Cannot read property 'setstartLoc' of undefined"

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames[propName]);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      const isSelectedDest = Array.from(isSelected[propName]);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      const newIsSelected = Array.from(isSelected)
      newIsSelected[propName] = isSelectedDest
      setIsSelected(newIsSelected);
      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const displayDefaultProps = (arr, propName) => {
      return arr.map((ele, ind) => {
        return <Button key={ele} variant="outlined" color="primary" onClick={() => {handleClickPropName(ele, ind, propName);}} style={{backgroundColor: (isSelected[propName][ind] ? selectedColors[1] : selectedColors[0]),
          color: (isSelected[propName][ind] ? selectedColors[0] : selectedColors[1])}}>{ele}</Button>
      })
    }

    return (
      <React.Fragment>

        <SearchDiv>
          <FormControl className= 'search-form'>

            <SearchControl>
              <label>Start Location</label>
              <TextField id="filled-basic" label="Starting Location" variant="filled" 
                        value={startLoc} 
                        onChange={(e) => handleChangeStartLoc(e.target.value)}
                        style = {{  backgroundColor: ((indSelected === dictNames.startLoc) ? selectedColors[1] : selectedColors[0]),
                        color: ((indSelected === dictNames.startLoc) ? selectedColors[0] : selectedColors[1])}}
              /> 
              <ChoiceContainer>
                {
                  /*
                  displayDefaultProps(DefaultLocations.startLoc, "startLoc")
                  */
                }
              {
                
                DefaultLocations.startLoc.map((ele, ind) => {
                  return <Button key={ele} variant="outlined" color="primary" onClick={() => {handleClickStartLoc(ele, ind);}} style={{backgroundColor: (isSelected.startLoc[ind] ? selectedColors[1] : selectedColors[0]),
                    color: (isSelected.startLoc[ind] ? selectedColors[0] : selectedColors[1])}}>{ele}</Button>
                })
                
              }
            </ChoiceContainer>
              
            </SearchControl>
          <SearchControl> 
          <label>End Location</label>

          <TextField id="filled-basic" label="Destination" variant="filled" 
                        value={endLoc} 
                        onChange={(e) => handleChangeEndLoc(e.target.value)}
                        style = {{  backgroundColor: ((indSelected === dictNames.endLoc) ? selectedColors[1] : selectedColors[0]),
                        color: ((indSelected === dictNames.endLoc) ? selectedColors[0] : selectedColors[1])}}
          />           
          {/*
          fontFamily: 'Source Sans Pro',fontStyle: 'normal',fontWeight: 'normal',marginLeft: '5vw', display: 'inline-block',
          Adding a button element will trigger onSubmit when it is clicked (idk why)
          */}
          {/*
          <button onClick={() => { console.log("testddd button");}}>Test Button</button>
          */}

            <ChoiceContainer>
              {/*
                displayDefaultProps(DefaultDestinations, "endLoc")
              */}
              {DefaultLocations.endLoc.map((ele, ind) => {
                return <Button key={ele} variant="outlined" color="primary" onClick={() => {handleClickEndLoc(ele, ind);}} style={{backgroundColor: (isSelected.endLoc[ind] ? selectedColors[1] : selectedColors[0]),
                  color: (isSelected.endLoc[ind] ? selectedColors[0] : selectedColors[1])}}>{ele}</Button>
              })}
            </ChoiceContainer>
          
          </SearchControl>
          <SearchControl>
            <label>Date</label>

    {/*
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
                */}
                
                <DateRangePickerComponent placeholder="Enter Date Range"
      startDate={startValue}
      endDate={endValue}
      //min={minDate}
      //max={maxDate}
      //minDays={3}
      ///maxDays={5}
      format="dd-MMM-yy"
      value={dateRange}
      change={(e) => {setDateRange([e.startDate, e.endDate]); console.log("DateRangePickerComponent new e=", e);}}
      //Uncomment below code to show month range picker. Also comment the properties min, max, mindays and maxdays
      //start="Year"
      //depth="Year"
      ></DateRangePickerComponent>

                {/*
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yy'
                margin='normal'
                id='date-picker'
                label='Date Picker'
                value={date}
                onChange={handleChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                />
              </MuiPickersUtilsProvider>
              */}

            {/*
            <MultipleDatesPicker
        open={open}
        selectedDates={[]}
        onCancel={() => setOpen(false)}
        onSubmit={dates => console.log('selected dates', dates)}
      />
            */}
              {/*
            <MultipleDatesPicker className={'datePicker' + ((indSelected === dictNames.date) ? ( ' selected') : (''))}
            open={open}
            selectedDates={[]}
            onCancel={() => setOpen(false)}
            onSubmit={curDate => {handleClickDate(curDate);}}
            />
              */}
          </SearchControl>
          <SearchControl>
            <label>Time</label>
            <TextField
            id="time"
            label="Alarm clock"
            type="time"
            defaultValue={time}
            onChange={(e) => {
              handleChangeTime(e.target.time);
              console.log("Time field e.target=", e.target); console.log("Time field e.target.value=", typeof(e.target.value));
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            
          />
            {/*
            <input
              type='text'
              placeholder='Time'
              value={time}
              onChange={(e) => handleChangeTime(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block', backgroundColor: ((indSelected === dictNames.time) ? selectedColors[1] : selectedColors[0]),
              color: ((indSelected === dictNames.time) ? selectedColors[0] : selectedColors[1])}}
            />
            */}
            
          </SearchControl>
          <SearchControl2>
            <label>Number_People</label>
            <TextField id="number-people" select value={numberPeople} onChange={e => {setNumberPeople(e.target.value); temp=e.target.value; console.log("temp=" + temp)}}>
              { [1,2,3,4,5,6,7,8,9,10,11,12,13].map((ele) => (
                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
              ))}
            </TextField>
            {/*
            <input
              type='text'
              placeholder='Number of People'
              value={numberPeople}
              onChange={(e) => setNumberPeople(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block'}}
            />
            */}
          </SearchControl2>
    
              <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmit}
        >
            Search RIDE
        </Button>

          </FormControl>
            
        </SearchDiv>
            
           </React.Fragment>
      )
}

export default Form
