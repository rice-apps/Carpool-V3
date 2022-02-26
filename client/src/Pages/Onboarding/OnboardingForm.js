import {
  Header,
  ProfileFormContainer,
  Label,
  InputBox,
  SubmitButton,
  CancelButton,
  VenmoTextField,
  RequiredTextField,
  CollegeSelect,
  ProfileStyles,
} from "./OnboardingFormStyle.js";
import React, { useState } from "react";
import { MenuItem } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

const OnboardingForm = ({ onSubmit, onCancel }) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [phone, setPhone] = useState("");
  const [venmo, setVenmo] = useState("");
  const { addToast } = useToasts();

    const handleSubmit = () => {

 
        if (firstName === "" || lastName === "") { 
            addToast("Please fill in your full name.", { appearance: 'error' });
            return
        }   

        if (phone === "") { 
            addToast("Please fill in your phone number.", { appearance: 'error' });
            return
        }  

    return onSubmit({
      firstName,
      lastName,
      college,
      phone,
      venmo,
    });
  };

  const classes = ProfileStyles();

  return (
    <form>
      <ProfileFormContainer>
        <Header> Sign up to use Carpool</Header>
        <InputBox>
          <Label>Name</Label>
          <RequiredTextField
            label="First Name"
            defaultValue={firstName}
            name="firstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
          ></RequiredTextField>
          <RequiredTextField
            label="Last Name"
            name="lastName"
            defaultValue={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          ></RequiredTextField>
        </InputBox>
        <InputBox>
          <Label>Contact</Label>
          <RequiredTextField
            label="Phone #"
            defaultValue={phone}
            name="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          ></RequiredTextField>
        </InputBox>
        <InputBox>
          <Label>Venmo</Label>
          <VenmoTextField
            label="Account ID"
            name="venmo"
            defaultValue={venmo}
            value={venmo}
            onChange={(e) => setVenmo(e.target.value)}
          ></VenmoTextField>
          <Label>College:</Label>
          <CollegeSelect
            variant="outlined"
            margin="dense"
            defaultValue={college}
            classes={{ root: classes.inputLabel }}
            onChange={(e) => {
              setCollege(e.target.value);
            }}
          >
            <MenuItem value="Brown">Brown</MenuItem>
            <MenuItem value="Jones">Jones</MenuItem>
            <MenuItem value="Duncan">Duncan</MenuItem>
            <MenuItem value="McMurtry">McMurtry</MenuItem>
            <MenuItem value="Martel">Martel</MenuItem>
            <MenuItem value="Baker">Baker</MenuItem>
            <MenuItem value="Will Rice">Will Rice</MenuItem>
            <MenuItem value="Sid Rich">Sid Rich</MenuItem>
            <MenuItem value="Wiess">Wiess</MenuItem>
            <MenuItem value="Hanszen">Brown</MenuItem>
            <MenuItem value="Lovett">Lovett</MenuItem>
          </CollegeSelect>
        </InputBox>
        <SubmitButton
          variant="contained"
          onClick={() => { handleSubmit()}}>
          Submit
        </SubmitButton>
        <CancelButton
          variant="contained"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </CancelButton>
      </ProfileFormContainer>
    </form>
  );
};

export default OnboardingForm;
