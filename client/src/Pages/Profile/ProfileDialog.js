import { Dialog, Paper, List, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import {
  ProfileDialogContainer,
  IconBox,
  ProfileIcon,
 ProfileEditIcon,
  CloseProfileIcon,
  Label,
  VenmoTextField,
  RequiredTextField,
  InputBox,
  SaveButton,
  StyledDialogContent,
  CollegeSelect,
  ProfileStyles,
  StyledImage,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv";
import {Avatar, Tooltip} from "@material-ui/core";
import {
  UPDATE_USER,
  GET_SIGNATURE,
  toCloudinary,
  imageExists,
} from "../Utils/ApiUtil.js"
import { useRef } from "react";
import {useLazyQuery} from "@apollo/client";

import { ProfileImage } from "./ProfileImage.js";
import { useLocation } from "react-router";

import { Image } from "cloudinary-react";
import Axios from "axios";

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
  const { openDialog, setOpenDialog, profileUser, setImageVersion } = props;
  const [changesMade, setChangesMade] = useState(false);

  const [user, setUser] = useState({
    firstName: profileUser.firstName,
    lastName: profileUser.lastName,
    college: profileUser.college,
    phone: profileUser.phone,
    email: profileUser.netid + "@rice.edu",
    venmo: profileUser.venmo,
    imageVersion: profileUser.imageVersion,
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

  //for image
  // const ImageStyle = {
  //   borderRadius: "50%",
  //   width: "25vw",
  //   height: "11vh",
  // };

  const [imageSelected, setImageSelected] = useState("");
  // const [previewSource, setPreviewSource] = useState("");
  const [id, setid] = useState("");

  // const uploadPic = useRef(null);
  // const onUploadPic = () => {
  //   uploadPic.current.click();
  // };

  const uploadImage = () => {
    //constructing the form data we are uploading to cloudinary
    const formData = new FormData();
    formData.append("file", imageSelected);
    //upload preset
    formData.append("upload_preset", "gx855d5s");
    //send information
    //endpoint where data is sent
    Axios.post(
      "https://api.cloudinary.com/v1_1/dnsw4xdiz/image/upload",
      formData
    ).then((response) => {
      console.log("RESPONSE", response);
      console.log(response["data"]["public_id"]);
      setid(response["data"]["public_id"]);
    });
  }

  // function selectImage(e) {
  //   const file = e.target.files[0];
  //   setImageSelected(file);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // }

  //this function is used in saveUserWithImage, which is used in saveUser
  // const [uploadImage] = useLazyQuery(GET_SIGNATURE, {
  //   onCompleted: (sigData) => {
  //     //uploads image to cloudinary with the image version
  //     toCloudinary(imageSelected, profileUser.netid, sigData.signature)
  //       .then((imageVersion) => {
  //         setImageVersion(imageVersion); //update imageVersion
  //         setUserProps("imageVersion", imageVersion); //update imageVersion for user
  //         updateUser({ variables: user }); //update the rest of the user
  //       })
  //       .catch((e) => {
  //         console.log("error in uploading to cloudinary", e);
  //       });
  //   },
  //   onError: (e) => {
  //     console.log("error: ", e);
  //   },
  // });
  
  //this function is used in saveUser
  // function saveUserWithImage() {
  //   const timestamp = Math.round(new Date().getTime() / 1000);
  //   const folder = process.env.REACT_APP_CLOUDINARY_FOLDER;
  //   uploadImage({
  //     variables: {
  //       publicId: profileUser.netid,
  //       timestamp: timestamp,
  //       folder: folder,
  //     },
  //   });
  // }

  //uses all helper functions to save user
  // function saveUser() {
  //   if (imageSelected) {
  //     //save image and update user if there is image
  //     saveUserWithImage();
  //   } else {
  //     updateUser({ variables: user }); //else update all other variables
  //   }
  //   const reader = new FileReader(); //set new preview source
  //   reader.onloadend = () => {
  //     setPreviewSource(imageSelected);
  //   };
  // }
  const location = useLocation();
  // const hasImage = imageExists(
  //   location.pathname.substring(9), //netid
  //   user.imageVersion
  // );

  // const showAvatar = !hasImage;
  // const showOriginal = hasImage && !previewSource;

  

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;
  console.log("ID", id);

  return (
    <Dialog open={openDialog} fullWidth={true} maxWidth="xl">
      <Paper style={{ maxHeight: 700, overflow: "auto" }}>
        <List>
          <StyledDialogContent>
            <ProfileDialogContainer>
              <IconBox>
                <ProfileIcon />
                <ProfileEditIcon />
                {/* {showOriginal ? ( //original version, no preview
                  <ProfileImage
                    netid={localStorage.getItem("netid")}
                    imageStyle={ImageStyle}
                    imageVersion={profileUser.imageVersion}
                  />
                ) :
                  <StyledImage src={previewSource}></StyledImage> //show preview source
                }
                <Tooltip title="Upload profile picture">
                  <ProfileEditIcon onClick={onUploadPic}>
                    <ProfileEditIcon/>
                  </ProfileEditIcon>
                </Tooltip>
                <input
                  type="file"
                  ref={uploadPic}
                  style={{display: "none"}}
                  onChange={selectImage}
                /> */}
                <CloseProfileIcon onClick={closeDialog} />
                <input
                  type="file"
                  onChange={(e) => {
                  setImageSelected(e.target.files[0]);
                  setid(e.target.getAttribute("public-id"));
              }}
            />
            <button onClick={() => uploadImage()}>Upload Image</button>
              </IconBox>
              
              <Image
                style={{ width: 200 }}
                cloudName="dnsw4xdiz"
                publicId={"https://res.cloudinary.com/dnsw4xdiz/image/upload/" + id}
              />

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
              </InputBox>
                <SaveButton
                  variant="contained"
                  onClick={() => {
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
                      // saveUser();
                      // uploadImage();
                    }
                    updateUserInfo();
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
