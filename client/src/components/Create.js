import React from 'react';
import {useState} from "react";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';

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
        background: '#F4F6F9',
        width: '264px',
        borderRadius: 8,
        border: 0,
        color: '#09101D 55%',
        height: '24px',
        fontFamily: 'Source Sans Pro',
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
        color: 'black',
        height: 36,
        fontFamily: 'Source Sans Pro',
        fontSize: '13px',
        padding: '8px 16px'
    }
})(MenuItem);

const ColorButton = withStyles({
    root: {
        background: '#2075D8',
        width: '367px',
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
        color: '#09101D',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(InputLabel);

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
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
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

        if (!startLoc || !endLoc || !day || !time) { 
            alert('Please fill in fields')
            return
        }

        onCreate({ startLoc, endLoc, day, time, passengers, confirmation })

        setStartLoc('')
        setEndLoc('')
        setDay('')
        setTime('')
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

    return (
        <Form onSubmit = {onSubmit}>

            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing = '4'
            >
                <Grid 
                    item
                    justifyContent='center'
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
                    justifyContent='center'
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

                <div>
                    <label>Day</label>
                    <input type = 'text' placeholder = 'Jan 2'
                    value = {day} onChange = {(e) => setDay(e.target.value)}/>
                </div>
                <div>
                    <label>Passengers</label>
                    <input type = 'number' placeholder = {2}
                    value = {passengers} onChange = {(e) => setPassengers(e.target.value)}/>
                </div>
                <div>
                    <label>Confirmation</label>
                    <input type = 'checkbox' checked = {confirmation}
                    value = {confirmation} onChange = {(e) => setConfirmation(e.currentTarget.checked)}/>
                </div>

                <Grid 
                    item
                    justify-content = 'center'
                >
                    <ColorButton
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