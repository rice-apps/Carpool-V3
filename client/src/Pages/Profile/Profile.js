import React from "react";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import ProfileDialog from "./ProfileDialog.js";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PhoneIcon from '@material-ui/icons/PhoneInTalkOutlined';

import {
  ButtonBox,
  BackArrow,
  TextBox,
  MailBox,
  ProfileCard,
  TopHeader,
  UserName,
  StyledText,
  StyledText2,
  StyledText3,
  EditProfileButton,
  College,
  UserPic,
  StyledTextVenmo
} from "./ProfileStyles.js";
import { useState } from "react";
import LoadingDiv from "../../common/LoadingDiv.js";

const Profile = () => {

  document.title = "Profile";

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
        college
        venmo
      }
    }
  `;

  const [openDialog, setOpenDialog] = useState(false);

  let { data, loading, error } = useQuery(GET_USER, {
    variables: { netID: id },
  });

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;

  let { userOne: user } = JSON.parse(JSON.stringify(data));

  if (!user) return <div>Invalid User ID</div>;

  function goBack() {
    window.history.back();
  }

  return (
    <div>
      <TopHeader>
        <ButtonBox onClick={goBack}>
          <BackArrow></BackArrow>
          <StyledText3>Back</StyledText3>
        </ButtonBox>
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
      </TopHeader>
      <ProfileDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        profileUser={user}
      ></ProfileDialog>
      <ProfileCard>
        <UserPic></UserPic>
        <UserName>{user.firstName + " " + user.lastName}</UserName>
        <College>{user.college}</College>
        <TextBox onClick={async () => {
            if (user.phone) {
              navigator.clipboard.writeText(user.phone).then(
                addToast("Phone Number Copied to Clipboard!", {
                  appearance: "success",
                })
              );
            }
          }}>
            <PhoneIcon/>
           <StyledText> {user.phone ? user.phone : "Phone Number Unavailable"} </StyledText>
        </TextBox>
        <TextBox
          onClick={() => {
            navigator.clipboard.writeText(user.netid + "@rice.edu").then(
              addToast("Email Copied to Clipboard!", {
                appearance: "success",
              })
            );
          }}
        >
          <MailBox style={{color:"#002140"}}/>
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
              });
            }
          }}
        >
          <StyledText2>
            Venmo
          </StyledText2>
          <StyledTextVenmo>
            {user.venmo ? `@${user.venmo}` : "Not Specified"}
          </StyledTextVenmo>
        </TextBox>
      </ProfileCard>
    </div>
  );
};
export default Profile;
