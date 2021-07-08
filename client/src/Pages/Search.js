import React from 'react'
import { useState } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'

import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';


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
const destArr = [{text: 'IAH', numberPeople: 3}, {text: 'Shop1', numberPeople: 5}, {text: 'Shop2', numberPeople: 8}, {text: 'Shop3', numberPeople: 10}];

//DefaultDestinations should only contain the text property of each element ideally (can use map function for this)
const DefaultDestinations = destArr;

const Search = () => {
  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 20);

    const dictNames = {dest: 0, date: 1, time: 2, numberPeople: 3}
    
    const [destination, setDestination] = useState('')

    //const [date, setDate] = useState('2020-09-11T12:00:00')
    const [date, setDate] = useState(new Date())
    
    const [open, setOpen] = useState(false)
    
    const [time, setTime] = useState('')
    const [numberPeople, setNumberPeople] = useState(1)

    const [isSelected, setIsSelected] = useState({dest: [false, false, false], date: [false]})
    const [selectedColors, setSelectedColors] = useState(['white', 'blue'])

    //const [isSelectedDestAny, setIsSelectedDestAny] = useState(false)

    const [indSelected, setIndSelected] = useState(-1)

    const SearchDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid #FFFF00;
    padding: 10vw;
    display: flex;
    align-content: space-between;;
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

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Search form submitted.");

        const resultDestArr = destArr.filter((ele) => { return (ele.numberPeople > numberPeople);});
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
      setTime(time);

      setIndSelected(dictNames.time);
    }
    
    return (
        <SearchDiv>
        <form className='search-form' onSubmit={onSubmit}>
          <SearchControl>
            <label>Destination</label>
            
            
            <input
              type='text'
              placeholder='Destination'
              value={destination} 
              onChange={(e) => handleChangeDest(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block', backgroundColor: ((indSelected === dictNames.dest) ? selectedColors[1] : selectedColors[0]),
              color: ((indSelected === dictNames.dest) ? selectedColors[0] : selectedColors[1])}}
            />
          
          {/*
          Adding a button element will trigger onSubmit when it is clicked (idk why)
          */}
          {/*
          <button onClick={() => { console.log("testddd button");}}>Test Button</button>
          */}

            <div>
              {DefaultDestinations.map((e, ind) => {
                return <Button key={e.text} variant="outlined" color="primary" onClick={() => {handleClickDest(e.text, ind);}} style={{backgroundColor: (isSelected.dest[ind] ? selectedColors[1] : selectedColors[0]),
                  color: (isSelected.dest[ind] ? selectedColors[0] : selectedColors[1])}}>{e.text}</Button>
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
      min={minDate}
      max={maxDate}
      minDays={3}
      maxDays={5}
      format="dd-MMM-yy"
      //Uncomment below code to show month range picker. Also comment the properties min, max, mindays and maxdays
      // start="Year"
      // depth="Year"
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
            <TextField id="number-people" select value={numberPeople} onChange={e => {setNumberPeople(e.target.value);}}>
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
    
          <input type='submit' value='Search Ride' className='btn btn-block' />
        </form>
        
        </SearchDiv>
           
      )
}

export default Search
