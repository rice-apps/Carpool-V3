import React from "react";
import { Redirect, useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import ProfileDialog from "./ProfileDialog.js";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PhoneIcon from "@material-ui/icons/PhoneInTalkOutlined";

import {
  AllDiv,
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
  StyledText4,
  EditProfileButton,
  College,
  ProfileIcon,
  StyledTextVenmo,
} from "./ProfileStyles.js";
import { useState } from "react";
import LoadingDiv from "../../common/LoadingDiv.js";

const Profile = () => {

  document.title = "Profile";

  const { id } = useParams();

  const { addToast } = useToasts();

  //query car color, brand, type
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
  if (error) return <Redirect to="../404" />;

  let { userOne: user } = JSON.parse(JSON.stringify(data));

  if (!user) return <Redirect to="../404" />;

  function goBack() {
    // Check for LastPage and that there is NO record of profile -> profile loop
    if (localStorage.getItem("lastPage") && !(localStorage.getItem("repeatProfiles"))){
      const previous = localStorage.getItem("lastPage"); 
      if (previous === "onboarding"){
        localStorage.setItem("skipOnboarding", "true");
      }
      localStorage.setItem('lastPage', 'profile/' + user.netid);
      // Stuck on the same profile page...
      if (previous === 'profile/' + user.netid){
        window.open("/search", "_self");
      }
      // If the last page and current page are BOTH profile pages
      if (previous.includes("profile")){
        localStorage.setItem("repeatProfiles", "true"); 
      }
      window.open("/" + previous, '_self');
    } else {
      if (localStorage.getItem("repeatProfiles")){
        localStorage.removeItem("repeatProfiles");
      }
      window.open("/search", "_self");
    }
    
  }

  return (
    <AllDiv>
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
              <EditIcon style={{color: "rgba(32, 117, 216, 1)"}}/>
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
        <ProfileIcon />
        <UserName>{user.firstName + " " + user.lastName}</UserName>
        <College>{user.college}</College>
        <TextBox
          onClick={async () => {
            if (user.phone) {
              navigator.clipboard.writeText(user.phone).then(
                addToast("Phone Number Copied to Clipboard!", {
                  appearance: "success",
                })
              );
            }
          }}
        >
          <PhoneIcon />
          <StyledText>
            {" "}
            {user.phone ? user.phone : "Phone Number Unavailable"}{" "}
          </StyledText>
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
          <MailBox style={{ color: "#002140" }} />
          <StyledText>{user.netid}@rice.edu</StyledText>
        </TextBox>
        <TextBox
          onClick={async () => {
            if (user.venmo) {
              window.open("https://venmo.com/" + user.venmo + "?txn=pay&note=for%20carpool!");
            } 
          }}
        >
          <StyledText2>Venmo</StyledText2>
          <StyledTextVenmo>
            {user.venmo ? `@${user.venmo}` : "Not Specified"}
          </StyledTextVenmo>
        </TextBox>

        <TextBox>
          <StyledText>Personal Car: </StyledText><StyledText4> Gray Toyota SUV SGR 7747</StyledText4>
        </TextBox>

      </ProfileCard>
    </AllDiv>
  );
};
export default Profile;
