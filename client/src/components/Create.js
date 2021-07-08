import React from 'react';
import {useState} from "react";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;

    padding: 40px;
`;

const TextBox = styled(TextField)`
    display: flex
    align-items: center;
    width: 250px;
    background: #F4F6F9;
    padding: 50px;
`;

const MenuBox = styled(MenuItem)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 16px;

    position: static;
    width: 264px;
    height: 36px;
    left: 0px;
    top: 0px;

    background: #F4F6F9;
    border-radius: 8px;
`; 

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

            <TextBox
                id="Start Location Search Bar"
                select
                value={startLoc}
                onChange={onStartLocChange}
                variant="outlined"
                label='Your Location'
            >
                {
                    locations.map((option) => (
                        <MenuBox key = {option.value} value = {option.value}>
                            {option.value}
                        </MenuBox>
                    ))
                }
            </TextBox>

            <TextBox
                id="End Location Search Bar"
                select
                value={endLoc}
                onChange={onEndLocChange}
                variant="outlined"
                label='Destination'
            >
                {
                    locations.map((option) => (
                        <MenuBox key = {option.value} value = {option.value}>
                            {option.value}
                        </MenuBox>
                    ))
                }
            </TextBox>

            {/* <DateTimePicker
                id='Date and Time Picker'
            >
                console.log("Date and time is picked")
            </DateTimePicker> */}

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

            <input type = 'submit' value = 'Create New Ride' /> 
        </Form>
    )
}

export default Create