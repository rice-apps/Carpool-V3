import {
  Header,
  ProfileFormContainer,
  Label, 
  InputBox, 
  SubmitButton,
  CancelButton,
  InputTextField,
  RequiredTextField
} from "./OnboardingFormStyle.js";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";

const OnboardingForm = ({ onSubmit, onCancel }) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [venmo, setVenmo] = useState(undefined);
  const { addToast } = useToasts();

    const handleSubmit = () => {

        console.log(firstName);

        if (firstName === "" || lastName === "") { 
            addToast("Please fill in your full name.", { appearance: 'error' });
            return
        }   

        if (phone === "") { 
            addToast("Please fill in your phone number.", { appearance: 'error' });
            return
        }  

        return onSubmit({
            firstName, lastName,
            phone, venmo
        });
    };

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
                        required onChange={(e) => setFirstName(e.target.value)}
                    ></RequiredTextField>
                    <RequiredTextField
                        label="Last Name"
                        name="lastName"
                        defaultValue={lastName}
                        required onChange={(e) => setLastName(e.target.value)}
                    ></RequiredTextField>
                </InputBox>
                <InputBox>
                    <Label>Contact</Label>
                    <RequiredTextField
                        label="Phone #"
                        defaultValue={phone}
                        name="phone"
                        required onChange={(e) => setPhone(e.target.value)}
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
                    onClick={() => { handleSubmit()}}>
                        Submit
                </SubmitButton>
                <CancelButton
                    variant="contained"
                    onClick={() => { onCancel()}}>
                        Cancel
                </CancelButton>
            </ProfileFormContainer>
        </form>
    ) 
}

export default OnboardingForm;
