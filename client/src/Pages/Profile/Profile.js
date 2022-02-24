import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
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
  PhoneNumber,
  StyledText,
  StyledText2,
  StyledText3,
  EditProfileButton,
  College,
  ImageStyle,
} from "./ProfileStyles.js";
import { useState } from "react";
import { GET_USER } from "../Utils/ApiUtil.js";
import { ProfileImage } from "./ProfileImage.js";

const Profile = () => {
  const { id } = useParams();

  const { addToast } = useToasts();

  const [openDialog, setOpenDialog] = useState(false);

  const [imageVersion, setImageVersion] = useState("");

  let { data, loading, error } = useQuery(GET_USER, {
    variables: { netID: id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let { userOne: user } = JSON.parse(JSON.stringify(data));

  if (!user) return <div>Invalid User ID</div>;

  function goBack() {
    window.history.back();
  }

  let paymentType = "";
  return (
    <div>
      <ReturnHeader>
        <ButtonBox onClick={goBack}>
          <BackArrow></BackArrow> <StyledText3>Ride Summary</StyledText3>{" "}
        </ButtonBox>{" "}
      </ReturnHeader>{" "}
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
        setImageVersion={setImageVersion}
      ></ProfileDialog>
      <ProfileCard>
        <ProfileImage
          imageStyle={ImageStyle}
          netid={user.netid}
          imageVersion={user.imageVersion}
        ></ProfileImage>
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
          <MailBox></MailBox> <StyledText>{user.netid}@rice.edu</StyledText>{" "}
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
