import {Popup, NameSectionHeader, ContactSectionHeader,
    PaymentSectionHeader, PhoneTextBox, EmailTextBox, 
    SubmitButton, FirstNameTextBox, LastNameTextBox, PaymentDropdown, 
    IconContainer, PaymentTextBox} from './ProfileDialogStyles.js';
import React, {useState} from 'react';
import {Dialog, InputAdornment, TextField} from '@material-ui/core';
import {DialogActions} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles, ThemeProvider, createTheme} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) =>({
    input :{
        width: "55vw",
    },
    inputLabel: {
        fontSize: 15,
        color: "#2075D8",
    },
    inputContent: {
        height: 30,
        marginTop: 6,
        background: "rgb(187,218,255,0.22)"
    },
    center: {
        display: "flex",
        justifycontent: "center",
        alignItems: "center",
    },
    closeButton: {
        positin: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    multiLineColor:{
        color: "#2075D8"
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            main: orange[500],
        }
    }
})

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
        <ThemeProvider theme = {theme}>
        <div>
            <Dialog open={openDialog}
            onClose={closeDialog} 
            className={(classes.dialog, classes.center)}
            fullWidth={true} 
            maxWidth="lg"
            id="dialog"
            >
            <IconContainer>
            <AccountCircleIcon style={{fontSize: 130}}/>
            </IconContainer>
            <Popup>
                <NameSectionHeader> Name </NameSectionHeader>
                <FirstNameTextBox>
                    <TextField 
                    id = "filled-basic" 
                    label = "First Name"
                    variant = "filled"
                    fullWidth={true}
                    className = {classes.input}
                    InputProps={{
                        className: classes.inputContent,
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon/>
                            </InputAdornment>
                        ),
                        }}
                    InputLabelProps={{className:(classes.multiLineColor, classes.inputLabel)}}
                    />
                </FirstNameTextBox>
                <LastNameTextBox>
                <TextField 
                    id = "filled-basic" 
                    label = "Last Name"
                    variant = "filled"
                    fullWidth={true}
                    className = {classes.input}
                    InputProps={{
                        className: classes.inputContent,
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon/>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{className:(classes.multiLineColor, classes.inputLabel)}}
                    />
                </LastNameTextBox>
                <ContactSectionHeader>Contact</ContactSectionHeader>
                <PhoneTextBox> 
                <TextField 
                    id = "filled-basic" 
                    label = "Phone #"
                    variant = "filled"
                    fullWidth={true}
                    className = {classes.input}
                    InputProps={{
                        className: classes.inputContent,
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon/>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{className:(classes.multiLineColor, classes.inputLabel)}}
                    />
                </PhoneTextBox>
                <PaymentSectionHeader>Payment</PaymentSectionHeader>

                <EmailTextBox>
                <TextField 
                    id = "filled-basic" 
                    label = "Email"
                    variant = "filled"
                    fullWidth={true}
                    className = {classes.input}
                    InputProps={{
                        className: classes.inputContent,
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon/>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{className:(classes.multiLineColor, classes.inputLabel)}}
                    />
                </EmailTextBox>
                <PaymentDropdown>
                    <Box sx = {{minWidth: 210, maxHeight: 20}}>
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
                </PaymentDropdown>
                <PaymentTextBox>
                <TextField 
                    id = "filled-basic" 
                    label = "@ VenmoID"
                    variant = "filled"
                    fullWidth={true}
                    className = {classes.input}
                    InputProps={{
                        className: classes.inputContent,
                        endAdornment: (
                            <InputAdornment position="end">
                                <CloseIcon/>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{className:(classes.multiLineColor, classes.inputLabel)}}
                    />
                </PaymentTextBox>
            <SubmitButton>
                <Button variant="contained"
                style={{
                    fontSize: 16
                }}>Save</Button>
            </SubmitButton>
            <DialogActions></DialogActions>
            </Popup>
            </Dialog>
        </div>
        </ThemeProvider>
    )
}