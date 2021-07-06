import React from 'react';
import {useState} from "react";
// import TextField from '@material-ui/core/TextField';

const Create = ({onCreate}) => {

    // Variables for Tracking Attributes of the Form
    const [startLoc, setStartLoc] = useState('')
    const [endLoc, setEndLoc] = useState('')
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [passengers, setPassengers] = useState(0)
    const [confirmation, setConfirmation] = useState(false)

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

    return (
        <form onSubmit = {onSubmit}>
            {/* With Material UI */}

            {/* <TextField label = "Start Location" variant = "filled" required/>
            <TextField label = "End Location" variant = "filled" required/>
            <TextField label = "Day" variant = "filled" required/>
            <TextField label = "Time" variant = "filled" required/>
            <TextField label = "Passengers" variant = "filled" required/> */}

            {/* Without Material UI */}
            <div>
                <label>StartLocation</label>
                <input type = 'text' placeholder = 'IAH'
                value = {startLoc} onChange = {(e) => setStartLoc(e.target.value)}/>
            </div>
            <div>
                <label>EndLocation</label>
                <input type = 'text' placeholder = 'Greenbriar Lot'
                value = {endLoc} onChange = {(e) => setEndLoc(e.target.value)}/>
            </div>
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
        </form>
    )
}

export default Create