import styled from "styled-components";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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

export const ProfileDialogContainer = styled.div`
  display: flex;
  height: 110vh;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const IconBox = styled.div`
  height: 10%;
  width: 100%;
  margin-bottom: 190px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const InputBox = styled.div`
  min-height: 380px;
  height: 16%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ButtonBox = styled.div`
  height: 9vh;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileEditIcon = styled(EditIcon)({
  position: "absolute",
  top: "6%",
  left: "56%",
  color: "#2075D8",
  fontSize: "4vh",
});

export const ProfileIcon = styled(AccountCircleIcon)({
  fontSize: "15vh",
  color: "#002140",
  // top: "6%",
  // left: "30%",
});

export const CloseProfileIcon = styled(CloseIcon)({
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

export const CollegeSelect = styled(Select)({
  borderRadius: "2vw",
  border: "1px solid #2075D8",
});

export const SaveButton = styled(Button)({
  fontFamily: "Josefin Sans",
  fontSize: "max(2vh, 13px)",
  background: "#2075D8",
  color: "white",
  borderRadius: "2vw",
  width: "50vw",
  height: "8%",
  marginTop: "210px",
  textTransform: "none",
  // position: "block",
});

export const ProfileStyles = makeStyles((theme) => ({
  inputContent: {
    background: "rgb(187,218,255,0.22)",
    color: "#2075D8",
    height: "5vh",
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
  const classes = ProfileStyles();
  const { label, name, defaultValue, onChange, value, clearTextField } = props;
  return (
    <TextField
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
          height: "6vh",
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

export function VenmoTextField(props) {
  const classes = ProfileStyles();
  const { label, name, defaultValue, onChange, value, clearTextField } = props;
  return (
    <TextField
      name={name}
      style={{paddingBottom: "1vh"}}
      variant="filled"
      label={label}
      defaultValue={defaultValue}
      fullWidth={true}
      onChange={onChange}
      value={value}
      clearTextField={clearTextField}
      InputLabelProps={{
        className: [classes.inputLabel],
      }}
      InputProps={{
        className: classes.inputContent,
        style: { background: "rgb(187,218,255,0.22)", color: "#2075D8", height: "6vh" },
        startAdornment: (
        <InputAdornment position="start">
          <AlternateEmailIcon fontSize = 'small'/>
        </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <CloseIcon onClick={() => clearTextField()} />
          </InputAdornment>
        ),
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

export function CarBrandTextField(props) {
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