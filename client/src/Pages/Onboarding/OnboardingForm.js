import {
  Header,
  ProfileFormContainer,
  Label,
  InputBox,
  SubmitButton,
  CancelButton,
  InputTextField,
  RequiredTextField,
  NonRequiredTextField,
} from "./OnboardingFormStyle.js";
import React, { useState } from "react";

const OnboardingForm = ({ onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [phone, setPhone] = useState("");
  const [venmo, setVenmo] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    return onSubmit({
      firstName,
      lastName,
      college,
      phone,
      venmo,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <NonRequiredTextField
            label="College"
            name="college"
            defaultValue={college}
            required
            onChange={(e) => setCollege(e.target.value)}
          ></NonRequiredTextField>
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
          <InputTextField
            label="Account ID"
            name="venmo"
            defaultValue={venmo}
            value={venmo}
            onChange={(e) => setVenmo(e.target.value)}
          ></InputTextField>
        </InputBox>
        <SubmitButton
          variant="contained"
          onClick={() => {
            onSubmit({
              firstName,
              lastName,
              phone,
              college,
              venmo,
            });
          }}
        >
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
