import {
  Header,
  EditName,
  EditContactInfo,
  EditPaymentOptions,
  SubmitButton,
} from "./ProfileFormStyles";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const ProfileForm = ({ onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [venmo, setVenmo] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();

        return onSubmit({
            firstName, lastName,
            phone, venmo
        });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <TextField id="outlined-filled" label="Phone #" variant="filled" value={phone} required onChange={(e) => setPhone(e.target.value)}/>
            </EditContactInfo>    
            <EditPaymentOptions>
                Payment
                <br></br>
                <TextField id = "outlined-filled" label = "Venmo Account" variant = "filled" value={venmo} onChange={(e) => setVenmo(e.target.value)}/>
            </EditPaymentOptions>
            <SubmitButton>
                <Button
                    variant="contained"
                    onClick={() => {
                        onSubmit({
                        firstName,
                        lastName,
                        phone,
                        venmo,
                        });
                    }}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    onClick={() => { onCancel() }}>
                    Cancel
                </Button>
            </SubmitButton>
        </form>
    ) 
}

export default ProfileForm;
