import {Header, EditName, EditContactInfo, EditPaymentOptions, SubmitButton} from './ProfileDialogStyles';
import React, { useState} from 'react';
import {TextField} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ProfileForm = ({ onSubmit }) => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[paymentOption, setPaymentOption] = useState('');
    const[paymentAccount, setPaymentAccount] = useState('');

    return (
        <form onSubmit={() => onSubmit({
            firstName, lastName,
            email, phone,
            paymentOption, paymentAccount
        })}>
            <Header>
                <p>
                    Edit Profile Information
                </p>
            </Header>
            <EditName>
                Name
                <TextField id="outlined-filled" label="First Name" variant="filled" value={firstName} required onChange={(e) => setFirstName(e.target.value)}/>
                <TextField id="outlned-filled" label="Last Name" variant="filled" value={lastName} required onChange={(e) => setLastName(e.target.value)}/>
            </EditName>
            <EditContactInfo>
                Contact Information
                <TextField id="outlined-filled" label="Email" variant="filled" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="outlined-filled" label="Phone #" variant="filled" value={phone} required onChange={(e) => setPhone(e.target.value)}/>
            </EditContactInfo>    
            <EditPaymentOptions>
                Payment
                <Box sx = {{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Options</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={paymentOption}
                            label="Options"
                            required
                            onChange={(e) => setPaymentOption(e.target.value)}
                        >
                            <MenuItem value={10}>Venmo</MenuItem>
                            <MenuItem value={20}>Zelle</MenuItem>
                            <MenuItem value={30}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <br></br>
                <TextField id = "outlined-filled" label = "Pay to @" variant = "filled" value={paymentAccount} required onChange={(e) => setPaymentAccount(e.target.value)}/>
            </EditPaymentOptions>
            <SubmitButton>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </SubmitButton>
        </form>
    ) 
}

export default ProfileForm