import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import ProfileDialog from "./ProfileDialog.js";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {
  ButtonBox,
  BackArrow,
  TextBox,
  MailBox,
  ProfileCard,
  ReturnHeader,
  UserName,
  UserPic,
  PhoneNumber,
  StyledText,
  StyledText2,
  StyledText3,
  EditProfileButton,
  College,
  StyledImage,
  ProfileImage,
} from "./ProfileStyles.js";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

import { imageExists } from "../Utils/ApiUtil.js";

const Profile = () => {
  const { id } = useParams();

  const { addToast } = useToasts();

  const GET_USER = gql`
    query GetUserInfo($netID: String) {
      userOne(filter: { netid: $netID }) {
        _id
        firstName
        lastName
        netid
        phone
        payment
        college
      }
    }
  `;

  const [openDialog, setOpenDialog] = useState(false);

  let {
    data: userData,
    loading,
    error,
  } = useQuery(GET_USER, {
    variables: {
      netID: id,
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let { userOne: user } = JSON.parse(JSON.stringify(userData));
  if (!user) return <div>Invalid User ID</div>;

  function goBack() {
    window.history.back();
  }

  const paymentKeys = user.payment ? Object.keys(user.payment) : undefined; //["Venmo", "Zelle", "Other"]
  let paymentType = "";

  //set paymentType to Venmo or Zelle or Other, in that order of priority
  if (paymentKeys) {
    if (user.payment["Venmo"] && user.payment["Venmo"] !== "") {
      paymentType = "Venmo";
    } else if (user.payment["Zelle"] && user.payment["Zelle"] !== "") {
      paymentType = "Zelle";
    } else {
      paymentType = "Other";
    }
  }
  console.log("paymentType", paymentType);

  //profile image
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
    },
  });

  // const ProfileImage = () => {
  //   const netid = user.netid;
  //   const classes = ProfileStyles();
  //   const cld = new Cloudinary({
  //     cloud: {
  //       cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
  //     },
  //   });
  // };
  // const profileImage = cld.image(user.netid);

  return (
    <div>
      <ReturnHeader>
        <ButtonBox onClick={goBack}>
          <BackArrow></BackArrow>
          <StyledText3>Ride Summary</StyledText3>
        </ButtonBox>
      </ReturnHeader>
      {localStorage.getItem("netid") === user.netid && (
        <EditProfileButton>
          <IconButton
            aria-label="edit"
            onClick={() => setOpenDialog(true)}
            variant="outlined"
          >
            <EditIcon />
          </IconButton>
        </EditProfileButton>
      )}
      <ProfileDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        profileUser={user}
      ></ProfileDialog>
      <ProfileCard>
        {imageExists ? (
          <ProfileImage netid={user.netid}></ProfileImage>
        ) : (
          console.log("image does not exist")
        )}
        <UserName>{user.firstName + " " + user.lastName}</UserName>
        <PhoneNumber>
          {user.phone ? user.phone : "Phone Number Unavailable"}
        </PhoneNumber>
        <College>{user.college}</College>
        <TextBox
          onClick={() => {
            navigator.clipboard.writeText(user.netid + "@rice.edu").then(
              addToast("Email Copied to Clipboard!", {
                appearance: "success",
              })
            );
          }}
        >
          <MailBox></MailBox>
          <StyledText>{user.netid}@rice.edu</StyledText>
        </TextBox>
        <TextBox
          onClick={() => {
            navigator.clipboard.writeText("@comp182Luay").then(
              addToast("Venmo ID Copied to Clipboard!", {
                appearance: "success",
              })
            );
          }}
        >
          <StyledText2>
            {user.payment[paymentType] !== ""
              ? paymentType
              : "No Payment Specified"}
          </StyledText2>
          <StyledText>
            {user.payment[paymentType] !== "" ? user.payment[paymentType] : ""}
          </StyledText>
        </TextBox>
      </ProfileCard>
    </div>
  );
};

export default Profile;
