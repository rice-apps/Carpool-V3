import { Dialog, MenuItem, Tooltip } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { uploadImage } from "../Utils/ApiUtil.js";
import {
  ProfileDialogContainer,
  IconBox,
  StyledDialogContent,
  ButtonBox,
  ProfileEditIcon,
  ProfileEditButton,
  ProfileImage,
  CloseProfileIcon,
  Label,
  InputTextField,
  InputBox,
  PaymentSelect,
  ProfileStyles,
  SaveButton,
  StyledImage,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";

export default function ProfileDialog(props) {
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $firstName: String!
      $lastName: String!
      $phone: String!
      $payment: JSON!
      $college: String!
    ) {
      userUpdateOne(
        record: {
          firstName: $firstName
          lastName: $lastName
          phone: $phone
          payment: $payment
          college: $college
        }
      ) {
        record {
          _id
          firstName
          lastName
          phone
          payment
          college
        }
      }
    }
  `;

  const { addToast } = useToasts();
  const { openDialog, setOpenDialog, profileUser } = props;

  let payment = profileUser.payment ? profileUser.payment : {};

  const [user, setUser] = useState({
    selectedPaymentMethod: "Venmo",
    selectedPayment: payment["Venmo"] ? payment["Venmo"] : "",
    firstName: profileUser.firstName,
    lastName: profileUser.lastName,
    phone: profileUser.phone,
    email: profileUser.netid + "@rice.edu",
    payment: profileUser.payment ? profileUser.payment : {},
    college: profileUser.college,
  });

  const [imageSelected, setImageSelected] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const uploadPic = useRef(null);

  const classes = ProfileStyles();

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const onUploadPic = () => {
    uploadPic.current.click();
  };

  const selectPayment = (e) => {
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
  };

  const setUserPayment = (e) => {
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
  };

  const clearUserPayment = (type) => {
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
  };

  const [updateUser] = useMutation(UPDATE_USER);

  const updateUserInfo = () => {
    updateUser({ variables: user });
    if (imageSelected) {
      uploadImage(imageSelected, profileUser.netid);
    }
  };

  const setUserProps = (key, value) => {
    user[key] = value;
  };

  const clearTextField = (key) => {
    setUserProps(key, "");
    document.getElementsByName(key)[0].value = "";
  };

  const { loading, error, data } = useMutation(UPDATE_USER, {
    variables: {
      user,
    },
  });

  const selectImage = (e) => {
    const file = e.target.files[0];
    setImageSelected(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <StyledDialogContent>
        <ProfileDialogContainer>
          <IconBox>
            {previewSource ? (
              <StyledImage src={previewSource}></StyledImage>
            ) : (
              <ProfileImage netid={profileUser.netid} /> //this one
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
                updateUserInfo();
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
