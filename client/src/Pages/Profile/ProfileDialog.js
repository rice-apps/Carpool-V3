import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  ProfileDialogContainer,
  IconBox,
  StyledDialogContent,
  ButtonBox,
  ProfileIcon,
  ProfileEditIcon,
  CloseProfileIcon,
  Label,
  InputTextField,
  InputBox,
  SaveButton,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";

export default function ProfileDialog(props) {
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $firstName: String!
      $lastName: String!
      $phone: String!
      $venmo: String
    ) {
      userUpdateOne(
        record: {
          firstName: $firstName
          lastName: $lastName
          phone: $phone
          venmo: $venmo
        }
      ) {
        record {
          _id
          firstName
          lastName
          phone
          venmo
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
  });

  const closeDialog = () => {
    setOpenDialog(false);
  };

  function setUserPayment(e) {
    const newPayment = e.target.value;
    setUser((prestate) => {
      return {
        ...prestate,
        venmo: newPayment,
      };
    });
  }

  function clearUserPayment() {
    setUser((prestate) => {
      return {
        ...prestate,
        venmo: undefined,
      };
    });
  }

  const [updateUser] = useMutation(UPDATE_USER);
  const updateUserInfo = () => {
    updateUser({ variables: user });
  };
  function setUserProps(key, value) {
    user[key] = value;
  }

  const clearTextField = (key) => {
    setUserProps(key, "");
    document.getElementsByName(key)[0].value = "";
  };

  let {
    loading,
    error,
  } = useMutation(UPDATE_USER, {
    variables: {
      user,
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  

  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <StyledDialogContent>
        <ProfileDialogContainer>
          <IconBox>
            <ProfileIcon />
            <ProfileEditIcon />
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
          </InputBox>

          <InputBox>
            <Label>Venmo:</Label>
            <InputTextField
              label="Account ID"
              name="venmo"
              defaultValue={user.venmo}
              value={user.venmo}
              onChange={(e) => {
                setUserPayment(e);
              }}
              clearTextField={() => {
                clearUserPayment();
                console.log(user.venmo);
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
