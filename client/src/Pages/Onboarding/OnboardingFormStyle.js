import styled from "styled-components";
import React from "react";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import { Button, InputLabel, makeStyles, TextField } from "@material-ui/core";
import { InputAdornment, Select } from "@material-ui/core";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5vh;
  line-height: 2vh;
  color: #2075d8; 
  padding-bottom: 3vh;
`;

export const Label = styled(InputLabel)({
  fontFamily: "Josefin Sans",
  color: "#2075d8",
  paddingBottom: "1vh",
});

export const InputBox = styled(Box)({
  height: "16%",
  width: "76%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
});

export const CollegeSelect = styled(Select)({
  borderRadius: "2vw",
  border: "1px solid #2075D8",
});

export const ProfileFormContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 8vh;
`;

export const ProfileStyles = makeStyles(() => ({
  inputContent: {
    background: "rgb(187,218,255,0.22)",
    color: "#2075D8",
    height: "5vh",
  },
  inputLabel: {
    fontSize: 15,
    color: "#2075D8",
  },
}));

export function InputTextField(props) {
  const classes = ProfileStyles();
  const { label, name, defaultValue, onChange, value } = props;
  return (
    <TextField
      name={name}
      style={{ paddingBottom: "1vh" }}
      variant="filled"
      label={label}
      defaultValue={defaultValue}
      fullWidth={true}
      onChange={onChange}
      value={value}
      InputLabelProps={{
        className: [classes.inputLabel],
      }}
      InputProps={{
        className: classes.inputContent,
        style: {
          background: "rgb(187,218,255,0.22)",
          color: "#2075D8",
          height: "6vh",
        },
        endAdornment: <InputAdornment position="end"></InputAdornment>,
      }}
    ></TextField>
  );
}



export function VenmoTextField(props) {
  const classes = ProfileStyles();
  const { label, name, defaultValue, onChange, value } = props;
  return (
    <TextField
      name={name}
      style={{ paddingBottom: "1vh" }}
      variant="filled"
      label={label}
      defaultValue={defaultValue}
      fullWidth={true}
      onChange={onChange}
      value={value}
      InputLabelProps={{
        className: [classes.inputLabel],
      }}
      InputProps={{
        className: classes.inputContent,
        style: {
          background: "rgb(187,218,255,0.22)",
          color: "#2075D8",
          height: "6vh",
        },
        startAdornment: (
          <InputAdornment position="start" >
            <AlternateEmailIcon fontSize="small"/>
          </InputAdornment>
          ),
        endAdornment: <InputAdornment position="end"></InputAdornment>,
      }}
    ></TextField>
  );
}

export function RequiredTextField(props) {
  const classes = ProfileStyles();
  const { label, name, defaultValue, onChange, value } = props;
  return (
    <TextField
      required
      name={name}
      style={{ paddingBottom: "1vh" }}
      variant="filled"
      label={label}
      defaultValue={defaultValue}
      fullWidth={true}
      onChange={onChange}
      value={value}
      InputLabelProps={{
        className: [classes.inputLabel],
      }}
      InputProps={{
        className: classes.inputContent,
        style: {
          background: "rgb(187,218,255,0.22)",
          color: "#2075D8",
          height: "6vh",
        },
        endAdornment: <InputAdornment position="end"></InputAdornment>,
      }}
    ></TextField>
  );
}

export const SubmitButton = withStyles({
  root: {
    background: "#2075D8",
    width: "75vw",
    borderRadius: 8,
    border: 0,
    color: "white",
    height: 48,
  },
  label: {
    textTransform: "capitalize",
    fontFamily: "Josefin Sans",
  },
})(Button);

export const CancelButton = withStyles({
  root: {
    background: "#EB5248",
    width: "75vw",
    borderRadius: 8,
    border: 0,
    color: "white",
    height: 48,
  },
  label: {
    textTransform: "capitalize",
    fontFamily: "Josefin Sans",
  },
})(Button);
