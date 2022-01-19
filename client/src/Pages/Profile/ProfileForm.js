import {
  Header,
  EditName,
  EditContactInfo,
  EditPaymentOptions,
  SubmitButton,
} from "./ProfileFormStyles";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ProfileForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [paymentAccount, setPaymentAccount] = useState("");

  return (
    <div>
      <Header>
        <p>Edit Profile Information</p>
      </Header>
      <EditName>
        Name
        <TextField
          id="outlined-filled"
          label="First Name"
          variant="filled"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="outlned-filled"
          label="Last Name"
          variant="filled"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </EditName>
      <EditContactInfo>
        Contact Information
        <TextField
          id="outlined-filled"
          label="Email"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-filled"
          label="Phone #"
          variant="filled"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </EditContactInfo>
      <EditPaymentOptions>
        Payment
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Options</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentOption}
              label="Options"
              onChange={(e) => setPaymentOption(e.target.value)}
            >
              <MenuItem value="Venmo">Venmo</MenuItem>
              <MenuItem value="Zelle">Zelle</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br></br>
        <TextField
          id="outlined-filled"
          label="Pay to @"
          variant="filled"
          value={paymentAccount}
          onChange={(e) => setPaymentAccount(e.target.value)}
        />
      </EditPaymentOptions>
      <SubmitButton>
        <Button
          variant="contained"
          onClick={() => {
            onSubmit({
              firstName,
              lastName,
              phone,
              payment: { [paymentOption]: paymentAccount }
            });
          }}
        >
          Submit
        </Button>
      </SubmitButton>
    </div>
  );
};

export default ProfileForm;
