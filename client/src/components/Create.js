import React from 'react';
import {useState} from "react";
import { gql, useQuery } from "@apollo/client";
import Header from '../components/Header.js';
import styled from 'styled-components';
import {
    MenuItem,
    Grid, 
    Button, 
    Select, 
    InputLabel,
    FormControlLabel, 
    Checkbox, 
    MuiThemeProvider, 
    createMuiTheme
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#0B3669',
		}
	},
    overrides: {
        MuiInputBase: {
            input: {
                fontFamily: 'Josefin Sans',
                color: '#0B3669',
                padding: '0px 0px 0px 0px'
            }
        }
    },
})

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;

    padding: 40px;
`;

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
        width: '65vw',
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

  const DateBox = withStyles({
    root: {
        width: '68vw',
        height: '10vh'
    }, 
  })(KeyboardDateTimePicker);

  const CheckBox = withStyles({
      root: {
        color: '#0B3669', 
        backgroundColor: 'transparent'
      }
  })(Checkbox);

  const SelectSquare = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: 'white',
        width: '5vw',
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

  const MenuSquare = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '15vw',
        border: 0,
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
  })(MenuItem);

  const BodyText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 2vh;
    line-height: 2vh;

    color: #0B3669;
    padding: 10px 0px 0px 0px;
  `;

const Create = ({onCreate}) => {

    const seats = [
        {
            value: 1
        }, 
        {
            value: 2
        }, 
        {
            value: 3
        }, 
        {
            value: 4
        }, 
        {
            value: 5
        }
    ]

    // Variables for Tracking Attributes of the Form
    const [startLoc, setStartLoc] = useState('')
    const [endLoc, setEndLoc] = useState('')
    const [date, setDate] = useState(new Date())
    const [passengers, setPassengers] = useState(1)
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
        setPassengers(1)
        setConfirmation(false)
    }

    // OnChange Functions 

    const onStartLocChange = (e) => {
        e.preventDefault()

        console.log("Changed Start Locations!")
        console.log("It is now at ", e.target.key, ' and the ID is ', e.target.value)

        setStartLoc(e.target.value);
    };


    const onEndLocChange = (e) => {
        e.preventDefault()

        console.log("Changed End Locations!")
        console.log("It is now at ", e.target.key, ' and the ID is ', e.target.value)

        setEndLoc(e.target.value);
    };

    const onCheck = (e) => {

        console.log("Confirmation changed to " + e.target.checked)

        setConfirmation(e.target.checked);
    };

    const onPassengerChange = (e) => {
        e.preventDefault()

        console.log("Changed Passengers")

        setPassengers(e.target.value);
    };

    // Access Locations List with GraphQL Query

    const GET_LOCATIONS = gql`
    query GetLocations {
        locationMany {
            _id
            title
        }
    }`

    const {data: locationData, loading, error} = useQuery(GET_LOCATIONS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const {locationMany: locations} = locationData

    // Form Construction

    return (
        <Form onSubmit = {onSubmit}>

            <Grid
                container
                direction='column'
                justifyContent='space-evenly'
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
                                <MenuBox key = {option.title} value = {option._id}>
                                    {option.title}
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
                                <MenuBox key = {option.title} value = {option._id}>
                                    {option.title}
                                </MenuBox>
                            ))
                        }
                    </SelectBox>
                </Grid>

                <Grid
                    item
                    xs = {12}
                >
                    <InputBox id = 'Date and Time'>Date and Time</InputBox>
                    <MuiThemeProvider theme={customTheme}>
                        <MuiPickersUtilsProvider utils={LuxonUtils}>
                            <DateBox
                                labelId='Date and Time'
                                inputVariant='outlined'
                                format="MM/dd/yyyy"
                                value={date}
                                onChange={setDate}
                            >
                            </DateBox>
                        </MuiPickersUtilsProvider>
                    </MuiThemeProvider>
                </Grid>

                <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing = '1'
                >
                    <Grid item>   
                        <SelectSquare
                            id="Number of Passengers Occupied"
                            value={passengers}
                            onChange={onPassengerChange}
                            variant='outlined'
                            size='small'
                        >
                            {
                                seats.map((option) => (
                                    <MenuSquare key = {option.value} value = {option.value}>
                                        {option.value}
                                    </MenuSquare>
                                ))
                            }
                        </SelectSquare> 
                    </Grid>
                    <Grid item>
                        <BodyText>{"passengers (s)"}</BodyText> 
                    </Grid>

                </Grid>

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