import React from 'react'
import { useState } from 'react'
//import MultipleDatePicker from 'react-multiple-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'

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
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';

import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

//import './Search.css'

const DefaultDestinations = [{text: 'IAH'}, {text: 'Shop1'}, {text: 'Shop2'}];

const Search = () => {
    const dictNames = {dest: 0, date: 1}
    const test = 0;
    
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

    }

    const handleClickDest = (text, ind) => {
      console.log("handleClickDest() run, text=", text);
      setDestination(text);

      //setIsSelectedDestAny(true);
      setIndSelected(dictNames.dest);
      
      const isSelectedDest = Array.from(isSelected.dest);
      isSelectedDest.fill(false);
      isSelectedDest[ind] = true;
      setIsSelected({...isSelected, dest: isSelectedDest, });
      //console.log(JSON.parse(JSON.stringify(isSelected)));
    }

    const handleClickDate = (date) => {
      console.log("handleClickDate() run, date=", date);
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

    return (
        <SearchDiv>
        <form className='search-form' onSubmit={onSubmit}>
          <SearchControl>
            <label>Destination</label>
            
            
            <input
              type='text'
              placeholder='Destination'
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
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
                onChange={handleClickDate}
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
              onChange={(e) => setTime(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block', backgroundColor: 'red'}}
            />
            
          </SearchControl>
          <SearchControl2>
            <label>Number_People</label>
            <TextField id="number-people" select value={numberPeople} onChange={e => {setNumberPeople(e.target.value);}}>
              <MenuItem value='1'>
                1
              </MenuItem>
              <MenuItem value='2'>
                2
              </MenuItem>
              <MenuItem value='3'>
                3
              </MenuItem>
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
