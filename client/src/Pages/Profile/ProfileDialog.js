import {
  Popup,
  NameSectionHeader,
  ContactSectionHeader,
  PaymentSectionHeader,
  PhoneTextBox,
  EmailTextBox,
  SubmitButton,
  FirstNameTextBox,
  LastNameTextBox,
  PaymentDropdown,
  IconContainer,
  PaymentTextBox,
  SaveButtonContainer,
  EditIconContainer,
  AccountIconContainer
} from "./ProfileDialogStyles.js";
import React, { useState } from "react";
import { Dialog, InputAdornment, TextField } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIcon from '@material-ui/icons/Edit'
import { blue } from '@material-ui/core/colors'


const useStyles = makeStyles((theme) => ({
  input: {
    width: "55vw",
  },
  inputLabel: {
    fontSize: 15,
    color: "#2075D8",
  },
  inputContent: {
    background: "rgb(187,218,255,0.22)",
    color: "#2075D8",
  },
  center: {
    display: "flex",
    justifycontent: "center",
    alignItems: "center",
  },
  multiLineColor: {
    color: "#2075D8",
  },
  saveButton: {
    background: "#2075D8",
    color: "white",
    width: "59vw",
    borderRadius: 25,
  },
}));

export default function ProfileDialog(props) {
  const classes = useStyles();
  const [payment, setPaymentOption] = useState("Venmo");

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const { openDialog, setOpenDialog } = props;

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        className={[classes.dialog, classes.center]}
        fullWidth={true}
        maxWidth="lg"
        id="dialog"
      >

      <IconContainer>
          <EditIconContainer>
            <EditIcon style={{ color: "#2075D8",fontSize: 50 }} />
        </EditIconContainer>
        <AccountCircleIcon style={{ color: "#002140", fontSize: 130 }} />
      </IconContainer>
        <Popup>
          <NameSectionHeader> Name </NameSectionHeader>
          <FirstNameTextBox>
            <TextField
              id="filled-basic"
              label="First Name"
              variant="filled"
              size="small"
              fullWidth={true}
              className={classes.input}
              InputProps={{
                className: classes.inputContent,
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: [classes.multiLineColor, classes.inputLabel],
              }}
            />
          </FirstNameTextBox>
          <LastNameTextBox>
            <TextField
              id="filled-basic"
              label="Last Name"
              variant="filled"
              size="small"
              fullWidth={true}
              className={classes.input}
              InputProps={{
                className: classes.inputContent,
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: [classes.multiLineColor, classes.inputLabel],
              }}
            />
          </LastNameTextBox>
          <ContactSectionHeader>Contact</ContactSectionHeader>
          <PhoneTextBox>
            <TextField
              id="filled-basic"
              label="Phone #"
              variant="filled"
              size="small"
              fullWidth={true}
              className={classes.input}
              InputProps={{
                className: classes.inputContent,
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: [classes.multiLineColor, classes.inputLabel],
              }}
            />
          </PhoneTextBox>
          <PaymentSectionHeader>Payment</PaymentSectionHeader>

          <EmailTextBox>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              size="small"
              fullWidth={true}
              className={classes.input}
              InputProps={{
                className: classes.inputContent,
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: [classes.multiLineColor, classes.inputLabel],
              }}
            />
          </EmailTextBox>
          <PaymentDropdown>
            <FormControl fullWidth variant="outlined">
              <Select
                defaultValue={payment}
                onChange={handleChange}
                classes={{
                  root: classes.multiLineColor,
                }}
              >
                <MenuItem value="Venmo" className={classes.multiLineColor}>
                  Venmo
                </MenuItem>
                <MenuItem value="Zelle" className={classes.multiLineColor}>
                  Zelle
                </MenuItem>
                <MenuItem value="Other" className={classes.multiLineColor}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          </PaymentDropdown>
          <PaymentTextBox>
            <TextField
              id="filled-basic"
              label="@ VenmoID"
              variant="filled"
              size="small"
              fullWidth={true}
              className={classes.input}
              InputProps={{
                className: classes.inputContent,
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: [classes.multiLineColor, classes.inputLabel],
              }}
            />
          </PaymentTextBox>
          <SubmitButton>
            <SaveButtonContainer>
              <Button className={classes.saveButton} variant="contained">
                Save
              </Button>
            </SaveButtonContainer>
          </SubmitButton>
          <DialogActions></DialogActions>
        </Popup>
      </Dialog>
    </div>
  );
}
