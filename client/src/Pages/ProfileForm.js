import {Header, EditName, EditContactInfo, EditPaymentOptions, SubmitButton} from './ProfileFormStyles.js';
import React, { useState} from 'react';
import {TextField} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const ProfileForm = () => {

    const[payment, setPaymentOption] = React.useState('');

    const handleChange = (event) => {
        setPaymentOption(event.target.value);
    }
    
    return (
        <div>
            <Header>
                <p>
                    Edit Profile Information
                </p>
            </Header>
            <EditName>
                Name
                <TextField id = "outlined-filled" label = "First Name" variant = "filled"/>
                <TextField id = "outlned-filled" label = "Last Name" variant = "filled"/>
            </EditName>
            <EditContactInfo>
                Contact Information
                <TextField id = "outlined-filled" label = "Email" variant = "filled"/>
                <TextField id = "outlined-filled" label = "Phone #" variant = "filled"/>
            </EditContactInfo>    
            <EditPaymentOptions>
                Payment
                <Box sx = {{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Options</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={payment}
                            label="Options"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Venmo</MenuItem>
                            <MenuItem value={20}>Zelle</MenuItem>
                            <MenuItem value={30}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <br></br>
                <TextField id = "outlined-filled" label = "Pay to @" variant = "filled"/>
            </EditPaymentOptions>
            <SubmitButton>
                <Button variant="contained">Submit</Button>
            </SubmitButton>
        </div>
    ) 
}

export default ProfileForm