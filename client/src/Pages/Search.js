import React from 'react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'


const Search = () => {
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [numberPeople, setNumberPeople] = useState(1)

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

    const SearchControl = styled.div`
    margin-top: 10vw;
    margin-bottom: 10vw;
    white-space: nowrap;
    overflow-x: auto;
    text-align: right;
    `;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Search form submitted.");

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
              style = {{ marginLeft: '5vw', display: 'inline-block'}}
            />
            
          </SearchControl>
          <SearchControl>
            <label>Date</label>
            <DatePicker selected={date} onChange={curDate => setDate(curDate)} style = {{ marginLeft: '5vw', display: 'inline-block'}}
 />
            
          </SearchControl>
          <SearchControl>
            <label>Time</label>
            <input
              type='text'
              placeholder='Time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block'}}
            />
          </SearchControl>
          <SearchControl>
            <label>Number_People</label>
            <input
              type='text'
              placeholder='Number of People'
              value={numberPeople}
              onChange={(e) => setNumberPeople(e.target.value)}
              style = {{ marginLeft: '5vw', display: 'inline-block'}}
            />
          </SearchControl>
    
          <input type='submit' value='Search Ride' className='btn btn-block' />
        </form>
        
        </SearchDiv>
           
      )
}

export default Search
