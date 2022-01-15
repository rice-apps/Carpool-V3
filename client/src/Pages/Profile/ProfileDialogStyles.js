import styled from "styled-components";
import React from "react";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Button,
  DialogContent,
  InputLabel,
  makeStyles,
  TextField,
  Select,
} from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";

export const StyledDialogContent = styled(DialogContent)({
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const ProfileDialogContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const IconBox = styled(Box)({
  height: "22%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
});

export const InputBox = styled(Box)({
  height: "16%",
  width: "75%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
});

export const ButtonBox = styled(Box)({
  height: "14%",
  width: "90%",
  display: "flex",
});

export const ProfileEditIcon = styled(EditIcon)({
  position: "absolute",
  top: "9%",
  left: "56%",
  color: "#2075D8",
  fontSize: "4vh",
});

export const ProfileIcon = styled(AccountCircleIcon)({
  fontSize: "14vh",
  color: "#002140",
});

export const CloseProfileIcon = styled(CloseIcon)({
  position: "absolute",
  top: "2%",
  right: "5%",
});

export const Label = styled(InputLabel)({
  fontFamily: "Josefin Sans",
  color: "#2075d8",
});

export const PaymentSelect = styled(Select)({
  borderRadius: "2vw",
  border: "1px solid #2075D8",
});

export const SaveButton = styled(Button)({
  background: "#2075D8",
  color: "white",
  borderRadius: "1.5vw",
  width: "100%",
  height: "60%",
});

export const ProfileStyles = makeStyles((theme) => ({
  inputContent: {
    background: "rgb(187,218,255,0.22)",
    color: "#2075D8",
    height: "5vh",
  },
  inputLabel: {
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
      InputProps={{ className: classes.inputContent }}
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
        style: { background: "rgb(187,218,255,0.22)", color: "#2075D8" },
        endAdornment: (
          <InputAdornment position="end">
            <CloseIcon onClick={() => clearTextField()} />
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}
