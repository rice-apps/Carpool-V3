import React from 'react';
import {useState} from "react";
import Header from '../components/Header.js';
import styled from 'styled-components';
import {
    TextField,
    MenuItem,
    Grid, 
    Button, 
    Select, 
    InputLabel,
    FormControlLabel, 
    Checkbox
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;

    padding: 40px;
`;

// const TextBox = styled(TextField)`
//     display: flex
//     align-items: center;
//     width: 300px;
//     background: #F4F6F9;
//     padding: 50px;
// `;

// const MenuBox = styled(MenuItem)`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     padding: 8px 16px;

//     position: static;
//     width: 264px;
//     height: 36px;
//     left: 0px;
//     top: 0px;

//     font-family: Source Sans Pro;
//     background: #F4F6F9;
//     border-radius: 8px;
// `; 

const SelectBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '55vw',
        borderRadius: 8,
        border: 0,
        borderColor: '#0B3669',
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px 8px 16px'
    }
  })(Select);

const MenuBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '264px',
        border: 0,
        color: '#0B3669',
        height: 36,
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
})(MenuItem);

const ColorButton = withStyles({
    root: {
        background: '#2075D8',
        width: '70vw',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        fontFamily: 'Josefin Sans'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  const InputBox = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(InputLabel);

  const FormControlLabelBox = withStyles({
    label: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(FormControlLabel);

  const DateBox = styled(DateTimePickerComponent)`

    &&{
        font-family: Josefin Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 24px;

        color: #0B3669;
    }
  `; 

  const CheckBox = withStyles({
      root: {
        color: '#0B3669', 
        backgroundColor: 'transparent'
      }
  })(Checkbox);

const Create = ({onCreate}) => {

    const locations = [
        {
            id: 1, 
            value: 'IAH'
        },
        {
            id: 2, 
            value: 'Greenbriar Lot'
        },
        {
            id: 3, 
            value: 'Rice Village'
        }
    ]

    // Variables for Tracking Attributes of the Form
    const [startLoc, setStartLoc] = useState('')
    const [endLoc, setEndLoc] = useState('')
    const [date, setDate] = useState(new Date)
    const [passengers, setPassengers] = useState(0)
    const [confirmation, setConfirmation] = useState(false)

    // const textfield = styled(TextField)`
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // padding: 8px 16px;

    // position: static;
    // width: 264px;
    // height: 36px;
    // left: 0px;
    // top: 0px;

    // background: #F4F6F9;
    // border-radius: 8px;
    // `;

    // On Submitting the Fields aka. Button is Clicked...
    const onSubmit = (e) => {
        e.preventDefault()

        console.log("Submitted!")

        if (!startLoc || !endLoc) { 
            alert('Please fill in fields')
            return
        }

        onCreate({ startLoc, endLoc, date, passengers, confirmation })

        setStartLoc('')
        setEndLoc('')
        setDate(new Date)
        setPassengers(0)
        setConfirmation(false)
    }

    const onStartLocChange = (e) => {
        e.preventDefault()

        console.log("Changed Start Locations!")

        setStartLoc(e.target.value);
    };


    const onEndLocChange = (e) => {
        e.preventDefault()

        console.log("Changed Destinations!")

        setEndLoc(e.target.value);
    };

    const onDateChange = (e) => {

        console.log("Date is changed to " + e.target.value)

        setDate(e.target.value);
    };

    const onCheck = (e) => {

        console.log("Confirmation changed to " + e.target.checked)

        setConfirmation(e.target.checked);
    };

    return (
        <Form onSubmit = {onSubmit}>

            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing='4'
            >
                <Header subtitle = {'Create Ride'}/> 
                <Grid 
                    item
                    xs = {12}
                >   
                    <InputBox id = 'StartLoc'>Departure Location</InputBox>
                    <SelectBox
                        id="Start Location Search Bar"
                        labelId='StartLoc'
                        value={startLoc}
                        onChange={onStartLocChange}
                        variant='outlined'
                        size='small'
                    >
                        {
                            locations.map((option) => (
                                <MenuBox key = {option.value} value = {option.value}>
                                    {option.value}
                                </MenuBox>
                            ))
                        }
                    </SelectBox>

                </Grid>
                
                <Grid
                    item
                    xs = {12}
                >
                    <InputBox id = 'EndLoc'>Destination</InputBox>
                    <SelectBox
                        id="End Location Search Bar"
                        labelId='Endloc'
                        value={endLoc}
                        onChange={onEndLocChange}
                        variant="outlined"
                        size='small'
                    >
                        {
                            locations.map((option) => (
                                <MenuBox key = {option.value} value = {option.value}>
                                    {option.value}
                                </MenuBox>
                            ))
                        }
                    </SelectBox>
                </Grid>

                <Grid
                    item
                    xs = {12}
                >
                    <DateBox
                        placeholder='Select Date and Time'
                        value={date}
                        onChange={onDateChange}
                    >
                    </DateBox>
                </Grid>

                {/* <div>
                    <label>Day</label>
                    <input type = 'text' placeholder = 'Jan 2'
                    value = {day} onChange = {(e) => setDay(e.target.value)}/>
                </div>
                <div>
                    <label>Passengers</label>
                    <input type = 'number' placeholder = {2}
                    value = {passengers} onChange = {(e) => setPassengers(e.target.value)}/>
                </div> */}

                <Grid
                    item
                    xs = {12}
                >
                    <FormControlLabelBox
                        control={<CheckBox color='primary' checked={confirmation} onChange={onCheck}/>}
                        label="Confirm for leading the ride, etc."
                    />
                </Grid>

                <Grid 
                    item
                    xs = {12}
                >
                    <ColorButton
                        type='submit'
                        variant='contained'
                        size='medium'
                    >
                        Create New Ride
                    </ColorButton>
                </Grid>

            </Grid>
        </Form>
    )
}

export default Create