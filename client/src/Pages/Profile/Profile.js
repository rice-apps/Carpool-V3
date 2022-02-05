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
} from "./ProfileStyles.js";
import { useState } from "react";
import LoadingDiv from "../../common/LoadingDiv.js";

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
        venmo
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

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;

  let { userOne: user } = JSON.parse(JSON.stringify(userData));
  if (!user) return <div>Invalid User ID</div>;

  function goBack() {
    window.history.back();
  }

  return (
    <div>
      <ReturnHeader>
        <ButtonBox onClick={goBack}>
          <BackArrow></BackArrow>
          <StyledText3>Ride Summary</StyledText3>
        </ButtonBox>
      </ReturnHeader>
      <EditProfileButton>
        <IconButton
          aria-label="edit"
          onClick={() => setOpenDialog(true)}
          variant="outlined"
        >
          <EditIcon />
        </IconButton>
      </EditProfileButton>
      <ProfileDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        profileUser={user}
      ></ProfileDialog>
      <ProfileCard>
        <UserPic></UserPic>
        <UserName>{user.firstName + " " + user.lastName}</UserName>
        <PhoneNumber>
          {user.phone ? user.phone : "Phone Number Unavailable"}
        </PhoneNumber>
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
          onClick={async () => {
            if (user.venmo) {
              navigator.clipboard.writeText(user.venmo).then(
                addToast("Venmo ID Copied to Clipboard!", {
                  appearance: "success",
                })
              );
            } else {
              addToast("Venmo ID Not Specified", {
                appearance: "error",
              })
            }
          }}
        >
          <StyledText2>
            Venmo
          </StyledText2>
          <StyledText>
            {user.venmo ? `@${user.venmo}` : "Not Specified"}
          </StyledText>
        </TextBox>
      </ProfileCard>
    </div>
  );
};

export default Profile;
