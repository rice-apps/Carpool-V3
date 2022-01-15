import { Dialog, MenuItem } from "@material-ui/core";
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
  PaymentSelect,
  ProfileStyles,
  SaveButton,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";

export default function ProfileDialog(props) {
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $firstName: String!
      $lastName: String!
      $phone: String!
    ) {
      userUpdateOne(
        record: { firstName: $firstName, lastName: $lastName, phone: $phone }
      ) {
        record {
          _id
          firstName
          lastName
          phone
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

  const classes = ProfileStyles();

  const closeDialog = () => {
    setOpenDialog(false);
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

  function saveUser() {
    console.log(user);
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
            <InputTextField
              label="Email"
              disabeled
              defaultValue={user.email}
              clearTextField={() => {}}
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
              defaultValue={user.selectedPayment}
              value={user.selectedPayment}
              onChange={(e) => {
                setUserPayment(e);
              }}
              clearTextField={() => {
                clearTextField("selectedPayment");
                user.payment[user.selectedPaymentMethod] = "";
              }}
            ></InputTextField>
          </InputBox>
          <ButtonBox>
            <SaveButton
              variant="contained"
              onClick={() => {
                saveUser();
                updateUserInfo();
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
