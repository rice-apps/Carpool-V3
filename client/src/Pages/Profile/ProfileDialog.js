import { Dialog, Paper, List } from "@material-ui/core";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  ProfileDialogContainer,
  IconBox,
  ButtonBox,
  ProfileIcon,
  ProfileEditIcon,
  CloseProfileIcon,
  Label,
  InputTextField,
  InputBox,
  SaveButton,
  StyledDialogContent,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv";

export default function ProfileDialog(props) {
  const UPDATE_USER = gql`
    mutation UpdateUser(
      $firstName: String!
      $lastName: String!
      $college: String!
      $phone: String!
      $venmo: String!
    ) {
      userUpdateOne(
        record: {
          firstName: $firstName
          lastName: $lastName
          college: $college
          phone: $phone
          venmo: $venmo
        }
      ) {
        record {
          _id
          firstName
          lastName
          college
          phone
          venmo
        }
      }
    }
  `;

  const { addToast } = useToasts();
  const { openDialog, setOpenDialog, profileUser } = props;
  const [changesMade, setChangesMade] = useState(false);

  const [user, setUser] = useState({
    firstName: profileUser.firstName,
    lastName: profileUser.lastName,
    college: profileUser.college,
    phone: profileUser.phone,
    email: profileUser.netid + "@rice.edu",
    venmo: profileUser.venmo,
  });

  const closeDialog = () => {
    setOpenDialog(false);
  };

  // function setUserPayment(e) {
  //   const newPayment = e.target.value;
  //   setUser((prestate) => {
  //     return {
  //       ...prestate,
  //       venmo: newPayment,
  //     };
  //   });
  // }

  // function clearUserPayment() {
  //   setUser((prestate) => {
  //     return {
  //       ...prestate,
  //       venmo: undefined,
  //     };
  //   });
  // }

  const [updateUser] = useMutation(UPDATE_USER);
  const updateUserInfo = () => {
    console.log("user", user);
    updateUser({ variables: user });
  };
  function setUserProps(key, value) {
    user[key] = value;
  }

  const clearTextField = (key) => {
    setUserProps(key, "");
    document.getElementsByName(key)[0].value = "";
  };

  let { loading, error } = useMutation(UPDATE_USER, {
    variables: {
      user,
    },
  });

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;

  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <Paper style={{ maxHeight: 600, overflow: "auto" }}>
        <List>
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
                  onChange={(e) => {
                    setUserProps("firstName", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("firstName");
                    setChangesMade(true);
                  }}
                ></InputTextField>
                <InputTextField
                  label="Last Name"
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={(e) => {
                    setUserProps("lastName", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("lastName");
                    setChangesMade(true);
                  }}
                ></InputTextField>
                <InputTextField
                  label="College"
                  name="college"
                  defaultValue={user.college}
                  onChange={(e) => {
                    setUserProps("college", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("college");
                    setChangesMade(true);
                  }}
                ></InputTextField>
                <Label>Contact:</Label>
                <InputTextField
                  label="Phone #"
                  defaultValue={user.phone}
                  name="phone"
                  onChange={(e) => {
                    setUserProps("phone", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("phone");
                    setChangesMade(true);
                  }}
                ></InputTextField>
                <Label>Venmo:</Label>
                <InputTextField
                  label="Account ID"
                  name="venmo"
                  defaultValue={user.venmo}
                  onChange={(e) => {
                    setUserProps("venmo", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("venmo");
                    setChangesMade(true);
                  }}
                ></InputTextField>
              </InputBox>
              <ButtonBox>
                <SaveButton
                  variant="contained"
                  onClick={() => {
                    if (changesMade) {
                      updateUserInfo();
                    }
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
        </List>
      </Paper>
    </Dialog>
  );
}
