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
  IconButton,
} from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { imageExists } from "../Utils/ApiUtil";

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
  height: "15%",
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

export const ProfileEditButton = styled(IconButton)({
  position: "absolute",
  top: "6%",
  left: "53%",
  color: "#2075D8",
});

export const ProfileEditIcon = styled(EditIcon)({
  fontSize: "4vh",
});

export const StyledImage = styled.img`
  border-radius: 50%;
  width: 20vw;
  height: 14vh;
`;

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
  paddingBottom: "1vh",
});

export const PaymentSelect = styled(Select)({
  borderRadius: "2vw",
  border: "1px solid #2075D8",
});

export const SaveButton = styled(Button)({
  fontFamily: "Josefin Sans",
  fontSize: "2vh",
  background: "#2075D8",
  color: "white",
  borderRadius: "2vw",
  width: "100%",
  height: "50%",
  textTransform: "none",
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
  imageStyle: {
    borderRadius: "50%",
    width: "20vw",
    height: "14vh",
  },
}));

export const ProfileImage = (props) => {
  const { netid } = props;
  const classes = ProfileStyles();
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
    },
  });

  const hasImage = imageExists(netid);
  console.log("hasImage=", hasImage);
  const profileImage = cld.image(netid);

  profileImage.format("jpg");
  // .resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))
  // .roundCorners(byRadius(50));

  return (
    <div>
      {hasImage ? (
        <AdvancedImage className={classes.imageStyle} cldImg={profileImage} />
      ) : (
        <ProfileIcon />
      )}
    </div>
  );
};

export const InputTextField = (props) => {
  const classes = ProfileStyles();
  const { label, name, defaultValue, onChange, value, clearTextField } = props;
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
};
