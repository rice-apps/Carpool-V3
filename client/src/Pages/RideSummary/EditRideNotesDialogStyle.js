import styled from "styled-components";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import { TextareaAutosize } from '@mui/base';
import {
  Button,
  DialogContent,
  InputLabel,
  makeStyles,
  TextField,
  Select,
  InputAdornment,
} from "@material-ui/core";

export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
});

export const EditRideNotesDialogContainer = styled.div`
  display: flex;
  height: 60vh;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const IconBox = styled.div`
  height: 10%;
  width: 100%;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const InputBox = styled.div`
  min-height: 90px;
  height: 50%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CloseEditRideNotesIcon = styled(CloseIcon)({
  position: "absolute",
  top: "2%",
  right: "5%",
});

export const Label = styled(InputLabel)({
  paddingTop: "1vh",
  fontFamily: "Josefin Sans",
  color: "#2075d8",
  paddingBottom: "1vh",
});

export const SaveButton = styled(Button)({
  fontFamily: "Josefin Sans",
  fontSize: "max(2vh, 13px)",
  background: "#2075D8",
  color: "white",
  borderRadius: "2vw",
  width: "50vw",
  height: "8%",
  marginTop: "15px",
  textTransform: "none",
  // position: "block",
});

export const EditRideNotesStyles = makeStyles((theme) => ({
  inputContent: {
    background: "rgb(187,218,255,0.22)",
    color: "#2075D8",
    height: "10vh",
    minHeight: "50px",
    marginBottom: "8px"
  },
  inputLabel: {
    background: "rgb(187,218,255,0.22)",
    fontSize: 15,
    color: "#2075D8",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(5),
    top: theme.spacing(4),
    color: theme.palette.grey[500],
  },
}));

export function InputTextField(props) {
  const classes = EditRideNotesStyles();
  const { label, name, defaultValue, onChange, value, clearTextField } = props;
  return (
   
    // <TextField
    //   placeholder="hello world"
    //   multiline 
    //   rows = {2}
    //   maxRows={4}
    // />
    <TextField
      multiline 
      rows = {1}
      maxRows={2}
      name={name}
      style={{ paddingBottom: "1vh" }}
      variant="filled"
      label={label}
      defaultValue={defaultValue}
      // fullWidth={true}
      onChange={onChange}
      value={value}
      clearTextField={clearTextField}
      InputLabelProps={{
        className: classes.inputLabel,
      }}
      InputProps={{
        className: classes.inputContent,
        style: {
          background: "rgb(187,218,255,0.22)",
          color: "#2075D8",
          height: "10vh",
        },
        endAdornment: (
          <InputAdornment position="end">
            <CloseIcon onClick={() => clearTextField()} />
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}