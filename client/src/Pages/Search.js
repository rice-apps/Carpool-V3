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

//destArr is Database
const destArr = [{dest: 'IAH', date: new Date("7/13/21"), numberPeople: 3}, {dest: 'Shop1', date: new Date("7/17/21"), numberPeople: 5}, {dest: 'Shop2', date: new Date("7/18/21"), numberPeople: 8}, {dest: 'Shop3', date: new Date("7/25/21"), numberPeople: 10}];

//DefaultDestinations should only contain the deset property of each element ideally (can use map function for this)
const DefaultDestinations = destArr;

const Search = () => {
  let temp = 3;

  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 20);

  const testValue = [new Date("7/12/21"), new Date("7/15/21")]

    const dictNames = {dest: 0, date: 1, time: 2, numberPeople: 3}
    
    const [destination, setDestination] = useState('')

    //const [date, setDate] = useState('2020-09-11T12:00:00')
    const [date, setDate] = useState(new Date())
    const [dateRange, setDateRange] = useState(testValue)

    const [open, setOpen] = useState(false)
    
    const [time, setTime] = useState('')
    const [numberPeople, setNumberPeople] = useState(1)

    const [isSelected, setIsSelected] = useState({dest: [false, false, false], date: [false]})
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
        console.log("Search query = [ dest=" + destination + " dateRange=" + dateRange + " time=" + time + " numberPeople=" + numberPeople + " ]");

        let resultDestArr = destArr.filter((ele) => { return (ele.dest == destination);});
        resultDestArr = resultDestArr.filter((ele) => { return compareDates(ele.date, dateRange[0], true) && !compareDates(ele.date, dateRange[1], false);});
        resultDestArr = resultDestArr.filter((ele) => { return (ele.numberPeople >= numberPeople);});
        console.log(resultDestArr);
    }

    const handleClickDest = (text, ind) => {
      console.log("handleClickDest() run, text=", text);
      setDestination(text);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.dest);
      console.log(JSON.parse(JSON.stringify(indSelected)));

      const isSelectedDest = Array.from(isSelected.dest);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      setIsSelected({...isSelected, dest: isSelectedDest, });
      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const handleChangeDest = (dest) => {
      setDestination(dest);

      setIndSelected(dictNames.dest);
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
    
    return (
      <React.Fragment>
      <div><Header subtitle  ="Search Rides"/></div>
        <SearchDiv>
          <FormControl className= 'search-form'>
          <SearchControl> 
          <TextField id="filled-basic" label="Destination" variant="filled" 
                        value={destination} 
                        onChange={(e) => handleChangeDest(e.target.value)}
                        style = {{  backgroundColor: ((indSelected === dictNames.dest) ? selectedColors[1] : selectedColors[0]),
                        color: ((indSelected === dictNames.dest) ? selectedColors[0] : selectedColors[1])}}
          />           
          {/*
          fontFamily: 'Source Sans Pro',fontStyle: 'normal',fontWeight: 'normal',marginLeft: '5vw', display: 'inline-block',
          Adding a button element will trigger onSubmit when it is clicked (idk why)
          */}
          {/*
          <button onClick={() => { console.log("testddd button");}}>Test Button</button>
          */}

            <div>
              {DefaultDestinations.map((e, ind) => {
                return <Button key={e.dest} variant="outlined" color="primary" onClick={() => {handleClickDest(e.dest, ind);}} style={{backgroundColor: (isSelected.dest[ind] ? selectedColors[1] : selectedColors[0]),
                  color: (isSelected.dest[ind] ? selectedColors[0] : selectedColors[1])}}>{e.dest}</Button>
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
        
        </SearchDiv>
           </React.Fragment>
      )
}

export default Search
