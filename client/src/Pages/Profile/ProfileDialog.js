import { Dialog, Paper, List, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  ProfileDialogContainer,
  IconBox,
  ProfileIcon,
//  ProfileEditIcon,
  CloseProfileIcon,
  Label,
  VenmoTextField,
  RequiredTextField,
  InputBox,
  SaveButton,
  StyledDialogContent,
  CollegeSelect,
  ProfileStyles,
  CarBrandTextField
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
    carColor: profileUser.carColor,
    carBrand: profileUser.carBrand,
    carType: profileUser.carType,
    carLicense: profileUser.carLicense,
  });

  const closeDialog = () => {
    setOpenDialog(false);
  };

  function selectCollege(e) {
    const newCollege = e.target.value;
    setUserProps("college", newCollege);
  }

  const classes = ProfileStyles();

  function setCollege(e) {
    const newCollege = e.target.value;
    setUser((prestate) => {
      return {
        ...prestate,
        college: newCollege,
      };
    });
   }
   //new functions for car types
   function selectCarColor(e) {
    const newCarColor = e.target.value;
    setUserProps("car color", newCarColor);
   }
   function setCarColor(e){
    const newCarColor = e.target.value;
    setUser((prestate) => {
      return {
        ...prestate,
        carColor: newCarColor,
      };
    });
   }

   function selectCarType(e) {
    const newCarType = e.target.value;
    setUserProps("car type", newCarType);
   }
   function setCarType (e){
    const newCarType = e.target.value;
    setUser((prestate) => {
      return {
        ...prestate,
        carType: newCarType,
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

  let { loading, error } = useMutation(UPDATE_USER, {
    variables: {
      user,
    },
  });

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;

  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <Paper style={{ maxHeight: 700, overflow: "auto" }}>
        <List>
          <StyledDialogContent>
            <ProfileDialogContainer>
              <IconBox>
                <ProfileIcon />
                {/* <ProfileEditIcon /> */}
                <CloseProfileIcon onClick={closeDialog} />
              </IconBox>

              <InputBox>
                <Label>Name:</Label>
                <RequiredTextField
                  label="First Name"
                  defaultValue={user.firstName}
                  name="firstName"
                  required
                  onChange={(e) => {
                    setUserProps("firstName", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("firstName");
                    setChangesMade(true);
                  }}
                ></RequiredTextField>
                <RequiredTextField
                  label="Last Name"
                  name="lastName"
                  defaultValue={user.lastName}
                  required
                  onChange={(e) => {
                    setUserProps("lastName", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("lastName");
                    setChangesMade(true);
                  }}
                ></RequiredTextField>

                <Label>College:</Label>
                <CollegeSelect
                  variant="outlined"
                  margin="dense"
                  defaultValue={user.college}
                  classes={{ root: classes.inputLabelProps }}
                  onChange={(e) => {
                    selectCollege(e);
                    setCollege(e);
                    setChangesMade(true);
                  }}
                >
                  <MenuItem value="Baker">Baker</MenuItem>
                  <MenuItem value="Will Rice">Will Rice</MenuItem>
                  <MenuItem value="Hanszen">Hanszen</MenuItem>
                  <MenuItem value="Wiess">Wiess</MenuItem>
                  <MenuItem value="Jones">Jones</MenuItem>
                  <MenuItem value="Brown">Brown</MenuItem>
                  <MenuItem value="Lovett">Lovett</MenuItem>
                  <MenuItem value="Sid Rich">Sid Rich</MenuItem>
                  <MenuItem value="Martel">Martel</MenuItem>
                  <MenuItem value="McMurtry">McMurtry</MenuItem>
                  <MenuItem value="Duncan">Duncan</MenuItem>
                </CollegeSelect>

                <Label>Contact:</Label>
                <RequiredTextField
                  label="Phone #"
                  defaultValue={user.phone}
                  name="phone"
                  required
                  onChange={(e) => {
                    setUserProps("phone", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("phone");
                    setChangesMade(true);
                  }}
                ></RequiredTextField>

                <Label>Venmo:</Label>
                <VenmoTextField
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
                ></VenmoTextField>

               <Label>Car Color:</Label>
                <CollegeSelect
                  variant="outlined"
                  margin="dense"
                  defaultValue={user.carColor}
                  classes={{ root: classes.inputLabelProps }}
                  onChange={(e) => {
                    selectCarColor(e);
                    setCarColor(e);
                    setChangesMade(true);
                  }}
                >
                  <MenuItem value="White">White</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="Gray">Gray</MenuItem>
                  <MenuItem value="Silver">Silver</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                  <MenuItem value="Red">Red</MenuItem>
                  <MenuItem value="Brown">Brown</MenuItem>
                  <MenuItem value="Green">Green</MenuItem>
                  <MenuItem value="Gold">Gold</MenuItem>
                </CollegeSelect>
                
                <Label>Car Brand:</Label>
                <CarBrandTextField
                  label="e.g. Toyota, Honda, KIA"
                  defaultValue={user.carBrand}
                  name="car brand"
                  onChange={(e) => {
                    setUserProps("car brand", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("car license");
                    setChangesMade(true);
                  }}
                ></CarBrandTextField>

                <Label>Car Type:</Label>
                <CollegeSelect
                  variant="outlined"
                  margin="dense"
                  defaultValue={user.carType}
                  classes={{ root: classes.inputLabelProps }}
                  onChange={(e) => {
                    selectCarType(e);
                    setCarType(e);
                    setChangesMade(true);
                  }}
                >
                  <MenuItem value="Sedan">Sedan</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Minivan">Minivan</MenuItem>
                  <MenuItem value="Truck">Truck</MenuItem>
                </CollegeSelect>

                <Label>Car Lisence Plate Number:</Label>
                <CarBrandTextField
                  defaultValue={user.carLicense}
                  name="car license"
                  onChange={(e) => {
                    setUserProps("car license", e.target.value);
                    setChangesMade(true);
                  }}
                  clearTextField={() => {
                    clearTextField("car license");
                    setChangesMade(true);
                  }}
                ></CarBrandTextField>
              </InputBox>

                <SaveButton
                  variant="contained"
                  onClick={() => {
                    // trim out "-" from number
                    setUserProps("phone", user.phone.replace(/[ +-]/g, '')); 

                    if (user.firstName === "" || user.lastName === "") { 
                      addToast("Please fill in your full name.", { appearance: 'error' });
                      return
                    }   
            
                    if (user.phone === "") { 
                        addToast("Please fill in your phone number.", { appearance: 'error' });
                        return
                    } 

                    if (/^[0-9]+$/.test(user.phone) === false) {
                      addToast("Phone number must only contain digits.", { appearance: 'error' });
                      return
                    }

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
            </ProfileDialogContainer>
          </StyledDialogContent>
        </List>
      </Paper>
    </Dialog>
  );
}
