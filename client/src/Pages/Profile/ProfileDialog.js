import { Dialog, MenuItem, Tooltip } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { UPDATE_USER, GET_SIGNATURE, toCloudinary } from "../Utils/ApiUtil.js";

import {
  ProfileDialogContainer,
  IconBox,
  StyledDialogContent,
  ButtonBox,
  ProfileEditIcon,
  ProfileEditButton,
  CloseProfileIcon,
  Label,
  InputTextField,
  InputBox,
  PaymentSelect,
  ProfileStyles,
  // ImageStyle,
  SaveButton,
  StyledImage,
} from "./ProfileDialogStyles";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ProfileImage } from "./ProfileImage.js";

export default function ProfileDialog(props) {
  const classes = ProfileStyles();
  const { addToast } = useToasts();

  const { openDialog, setOpenDialog, profileUser, setImageVersion } = props;
  const closeDialog = () => {
    setOpenDialog(false);
  };

  let payment = profileUser.payment ? profileUser.payment : {};

  const [user, setUser] = useState({
    //initialize user
    selectedPaymentMethod: "Venmo",
    selectedPayment: payment["Venmo"] ? payment["Venmo"] : "",
    firstName: profileUser.firstName,
    lastName: profileUser.lastName,
    phone: profileUser.phone,
    email: profileUser.netid + "@rice.edu",
    payment: profileUser.payment ? profileUser.payment : {},
    college: profileUser.college,
  });

  function setUserProps(key, value) {
    user[key] = value;
  }

  //for image
  const [imageSelected, setImageSelected] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const uploadPic = useRef(null);
  const onUploadPic = () => {
    uploadPic.current.click();
  };

  function selectPayment(e) {
    setUser((prestate) => {
      const newPaymentMethod = e.target.value;
      const newPayment = prestate.payment[newPaymentMethod]
        ? prestate.payment[newPaymentMethod]
        : "";
      return {
        ...prestate,
        selectedPaymentMethod: newPaymentMethod,
        selectedPayment: newPayment,
      };
    });
  }

  function setUserPayment(e) {
    const newPayment = e.target.value;
    setUser((prestate) => {
      return {
        ...prestate,
        payment: {
          ...prestate.payment,
          [prestate.selectedPaymentMethod]: newPayment,
        },
        selectedPayment: newPayment,
      };
    });
  }

  function clearUserPayment(type) {
    console.log("type", type);
    setUser((prestate) => {
      return {
        ...prestate,
        payment: {
          ...prestate.payment,
          [type]: "",
        },
        selectedPayment: "",
      };
    });
  }

  function clearTextField(key) {
    setUserProps(key, "");
    document.getElementsByName(key)[0].value = "";
  }

  function selectImage(e) {
    const file = e.target.files[0];
    setImageSelected(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const [updateUser, { loading: mutateLoading, error: mutateError }] =
    useMutation(UPDATE_USER);

  //this function is used in saveUserWithImage, which is used in saveUser
  const [uploadImageAndSaveUser] = useLazyQuery(GET_SIGNATURE, {
    onCompleted: (sigData) => {
      //uploads image to cloudinary with the image version
      toCloudinary(imageSelected, profileUser.netid, sigData.signature)
        .then((imageVersion) => {
          setImageVersion(imageVersion); //update imageVersion
          setUserProps("imageVersion", imageVersion); //update imageVersion for user
          updateUser({ variables: user }); //update the rest of the user
        })
        .catch((e) => {
          console.log("error in uploading to cloudinary", e);
        });
    },
    onError: (e) => {
      console.log("error: ", e);
    },
  });

  if (mutateLoading) return "Updating user...";
  if (mutateError) return `Updating user error! ${mutateError.message}`;

  //this function is used in saveUser
  function saveUserWithImage() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = process.env.REACT_APP_CLOUDINARY_FOLDER;
    uploadImageAndSaveUser({
      variables: {
        publicId: profileUser.netid,
        timestamp: timestamp,
        folder: folder,
      },
    });
  }

  //uses all helper functions to save user
  function saveUser() {
    if (imageSelected) {
      //save image and update user if there is image
      saveUserWithImage();
    } else {
      updateUser({ variables: user }); //else update all other variables
    }
    const reader = new FileReader(); //set new preview source
    reader.onloadend = () => {
      setPreviewSource(imageSelected);
    };
  }

  const ImageStyle = {
    borderRadius: "50%",
    width: "25vw",
    height: "11vh",
  };

  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <StyledDialogContent>
        <ProfileDialogContainer>
          <IconBox>
            {previewSource ? (
              <StyledImage src={previewSource}></StyledImage>
            ) : (
              <ProfileImage
                netid={profileUser.netid}
                imageStyle={ImageStyle}
                imageVersion={profileUser.imageVersion}
              />
            )}
            <Tooltip title="Upload profile picture">
              <ProfileEditButton onClick={onUploadPic}>
                <ProfileEditIcon />
              </ProfileEditButton>
            </Tooltip>
            <input
              type="file"
              ref={uploadPic}
              style={{ display: "none" }}
              onChange={selectImage}
            />
            <CloseProfileIcon onClick={closeDialog} />
          </IconBox>

          <InputBox>
            <Label>Name:</Label>
            <InputTextField
              label="First Name"
              defaultValue={user.firstName}
              name="firstName"
              onChange={(e) => setUserProps("firstName", e.target.value)}
              clearTextField={() => clearTextField("firstName")}
            ></InputTextField>
            <InputTextField
              label="Last Name"
              name="lastName"
              defaultValue={user.lastName}
              onChange={(e) => setUserProps("lastName", e.target.value)}
              clearTextField={() => clearTextField("lastName")}
            ></InputTextField>
          </InputBox>

          <InputBox>
            <Label>Contact:</Label>
            <InputTextField
              label="Phone #"
              defaultValue={user.phone}
              name="phone"
              onChange={(e) => setUserProps("phone", e.target.value)}
              clearTextField={() => clearTextField("phone")}
            ></InputTextField>
            <InputTextField
              label="Email"
              disabled={true}
              defaultValue={user.email}
              clearTextField={() => {}}
            ></InputTextField>
            <InputTextField
              label="College"
              defaultValue={user.college}
              name="college"
              onChange={(e) => setUserProps("college", e.target.value)}
              clearTextField={() => clearTextField("college")}
            ></InputTextField>
          </InputBox>

          <InputBox>
            <Label>Payments:</Label>
            <PaymentSelect
              variant="outlined"
              margin="dense"
              defaultValue={user.selectedPaymentMethod}
              classes={{ root: classes.inputLabel }}
              onChange={(e) => selectPayment(e)}
            >
              <MenuItem value="Venmo">Venmo</MenuItem>
              <MenuItem value="Zelle">Zelle</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </PaymentSelect>
            <InputTextField
              label="Account ID"
              name="selectedPayment"
              value={user.selectedPayment}
              onChange={(e) => {
                setUserPayment(e);
              }}
              clearTextField={() => {
                clearUserPayment(user.selectedPaymentMethod);
                console.log(user.payment);
              }}
            ></InputTextField>
          </InputBox>
          <ButtonBox>
            <SaveButton
              variant="contained"
              onClick={() => {
                saveUser();
                // uploadImage();
                // updateUser({ variables: user });
                setOpenDialog(false);
                addToast("User Information Updated", {
                  appearance: "success",
                });
              }}
            >
              Save
            </SaveButton>
          </ButtonBox>
        </ProfileDialogContainer>
      </StyledDialogContent>
    </Dialog>
  );
}
