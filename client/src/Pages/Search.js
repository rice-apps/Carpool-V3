import React from 'react'
import { useState } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'
import { useMediaQuery } from 'react-responsive'
import Header from '../components/Header';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import "@fontsource/source-sans-pro";

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

import './Search.css'

const PossibleLocations = ['IAH', 'Greenbriar Lot', 'Rice Village', 'S1', 'S2', 'S3', 'S4', 'Shop1', 'Shop2', 'Shop3']

//destArr is Database
const destArr = [{startLoc: 'S2', endLoc: 'IAH', date: new Date("7/13/21"), numberPeople: 3}, {startLoc: 'S1', endLoc: 'Shop1', date: new Date("7/17/21"), numberPeople: 5}, {startLoc: 'S3', endLoc: 'Shop2', date: new Date("7/18/21"), numberPeople: 8}, {startLoc: 'S4', endLoc: 'Shop3', date: new Date("7/25/21"), numberPeople: 10}];

//DefaultDestinations should only contain the dest property of each element ideally (can use map function for this)
const DefaultLocations = {
  startLoc: PossibleLocations,
  endLoc: PossibleLocations
};

function Search() {
  let resultDestArr = null;

  let temp = 3;

  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 20);

  const testValue = [new Date("7/12/21"), new Date("7/15/21")]

    const dictNames = {startLoc: 0, endLoc: 1, date: 2, time: 3, numberPeople: 4}
    
    const [startLoc, setStartLoc] = useState('')
    const [endLoc, setEndLoc] = useState('')

    //const [date, setDate] = useState('2020-09-11T12:00:00')
    const [date, setDate] = useState(new Date())
    const [dateRange, setDateRange] = useState(testValue)

    const [open, setOpen] = useState(false)
    
    const [time, setTime] = useState('')
    const [numberPeople, setNumberPeople] = useState(1)

    const [isSelected, setIsSelected] = useState({startLoc: new Array(DefaultLocations.startLoc.length).fill(false), endLoc: new Array(DefaultLocations.endLoc.length).fill(false), date: [false]})
    const selectedColors = ['white', 'blue']

    const [indSelected, setIndSelected] = useState(-1)

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

    const SearchDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid #FFFF00;
    padding: 10vw;
    display: flex;
    align-content: space-between ;;
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
    display: block;
    `;

    const compareDates = (date1, date2, equals) => {
      //date1 = 1st date, date2 = 2nd date, equals = boolean variable if equals is true then the function returns true for date1 >= date2, not just date1 > date2
      const d1 = [date1.getDate(), date1.getMonth(), date1.getFullYear()]
      const d2 = [date2.getDate(), date2.getMonth(), date2.getFullYear()]

      if (d1[2] == d2[2]) {
        if (d1[1] == d2[1]) {
          return d1[0] > d2[0] || (equals && d1[0] == d2[0]);
        }
        return d1[1] > d2[1] || (equals && d1[1] == d2[1]);
      }

      return d1[2] > d2[2] || (equals && d1[2] == d2[2]);
    }
    
    //console.log(compareDates(testValue[1], testValue[0], true));
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Search form submitted.");
        console.log("Search query = [ startLoc=" + startLoc + " endLoc=" + endLoc + " dateRange=" + dateRange + " time=" + time + " numberPeople=" + numberPeople + " ]");

        resultDestArr = destArr.filter((ele) => { return (ele.startLoc == startLoc);});
        resultDestArr = destArr.filter((ele) => { return (ele.endLoc == endLoc);});
        resultDestArr = resultDestArr.filter((ele) => { return compareDates(ele.date, dateRange[0], true) && !compareDates(ele.date, dateRange[1], false);});
        resultDestArr = resultDestArr.filter((ele) => { return (ele.numberPeople >= numberPeople);});
        console.log(resultDestArr);
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

    const handleChangeDate = (date) => {
      console.log("handleChangeDate() run, date=", date);
      setDate(date);

      setIndSelected(dictNames.date);

      /*
      const isSelectedDate = Array.from(isSelected.date);
      isSelectedDate.fill(false);
      isSelectedDate[0] = true;
      setIsSelected({...isSelected, date: isSelectedDate});
      console.log(isSelected);
      */
    }

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

    const displayRides = (rides) => {
      return rides.map((ride, ind) => (<div key={ride.uid}>
        {"Ride #" + ride.uid + " startLoc=" + ride.startLoc + " endLoc=" + ride.endLoc + " date=" + ride.date + " time=" + ride.time + " numberPeople=" + ride.numberPeople}
        </div>))
    }

    return (
      <React.Fragment>
      <div><Header subtitle  ="Search Rides"/></div>
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

            <div>
              {/*
                displayDefaultProps(DefaultDestinations, "endLoc")
              */}
              {DefaultLocations.endLoc.map((ele, ind) => {
                return <Button key={ele} variant="outlined" color="primary" onClick={() => {handleClickEndLoc(ele, ind);}} style={{backgroundColor: (isSelected.endLoc[ind] ? selectedColors[1] : selectedColors[0]),
                  color: (isSelected.endLoc[ind] ? selectedColors[0] : selectedColors[1])}}>{ele}</Button>
              })}
            </div>
          
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
      change={(e) => {setDateRange([e.startDate, e.endDate]); console.log(e);}}
      //Uncomment below code to show month range picker. Also comment the properties min, max, mindays and maxdays
      start="Year"
      depth="Year"
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
            
            <input
              type='text'
              placeholder='Time'
              value={time}
              onChange={(e) => handleChangeTime(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block', backgroundColor: ((indSelected === dictNames.time) ? selectedColors[1] : selectedColors[0]),
              color: ((indSelected === dictNames.time) ? selectedColors[0] : selectedColors[1])}}
            />
            
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
            
            {
            !(resultDestArr==null) &&
            <div id="display-filtered-rides">
              {
                displayRides(resultDestArr)
              }
            </div>
            }
        </SearchDiv>
           </React.Fragment>
      )
}

export default Search
