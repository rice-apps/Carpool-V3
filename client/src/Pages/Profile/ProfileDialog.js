import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
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
  SaveButton,
  StyledImage,
} from "./ProfileDialogStyles";
import { gql, useMutation } from "@apollo/client";
import LoadingDiv from "../../common/LoadingDiv";

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

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;
  

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
