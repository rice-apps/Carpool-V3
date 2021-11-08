import {Popup, EditName, TextBox, SectionHeader, EditContactInfo, EditPaymentOptions, SubmitButton} from './ProfileDialogStyles.js';
import React, {useState} from 'react';
import {Dialog, DialogContent, TextField} from '@material-ui/core';
import {DialogActions} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>({
    root: {
        "& .MuiFilledInput-root": {
            background:"rgb(232,241,250)"
        }
    }
}));

export default function ProfileDialog (props) {
    const classes = useStyles();

    const[payment, setPaymentOption] = useState('');
    
    const handleChange = (event) => {
        setPaymentOption(event.target.value);
    }

    const {openDialog, setOpenDialog} = props;

    const closeDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Dialog open={openDialog} onClose={closeDialog} fullWidth={true} fullHeight={true}>
            <Popup>
            <DialogContent>
                <EditName>
                    <SectionHeader> Name </SectionHeader>
                    <TextBox>
                        <TextField 
                        id = "small" 
                        size="small"
                        label = "First Name"
                        variant = "filled"
                        color = "white" 
                        margin="normal"
                        fullWidth={true}
                        />
                    </TextBox>
                        {/* <TextBox>
                            <TextField id = "filled-hidden-labe-small" label = "Last Name" variant = "filled"/>
                        </TextBox> */}
                </EditName>
                {/* <EditContactInfo>
                    <SectionHeader> Contact </SectionHeader>
                    <TextBox>
                        <TextField id = "outlined-filled" label = "Email" variant = "filled"/>
                        <TextField id = "outlined-filled" label = "Phone #" variant = "filled"/>
                    </TextBox>
                </EditContactInfo>
                <EditPaymentOptions>
                    <SectionHeader> Payment </SectionHeader>
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
                    <TextField id = "outlined-filled" label = "@VenmoID" variant = "filled"/>
                </EditPaymentOptions>
            <SubmitButton>
                <Button variant="contained">Save</Button>
            </SubmitButton> */}
            </DialogContent>
            <DialogActions></DialogActions>
            </Popup>
            </Dialog>
        </div>
    )
}