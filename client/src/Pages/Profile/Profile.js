import React from "react";
import { useLocation, useParams } from "react-router";
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
  EditProfileButton,
  College,
  ProfileIcon,
  StyledTextVenmo,
} from "./ProfileStyles.js";
import { useState } from "react";
import LoadingDiv from "../../common/LoadingDiv.js";
import { ProfileImage } from "./ProfileImage.js";

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
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [imageVersion, setImageVersion] = useState("");

  let { data, loading, error } = useQuery(GET_USER, {
    variables: { netID: id },
  });

  if (loading) return <LoadingDiv />;
  if (error) return `Error! ${error.message}`;

  let { userOne: user } = JSON.parse(JSON.stringify(data));
  const hasImage = user.imageVersion !== null && user.imageVersion != ""

  if (!user) return <div>Invalid User ID</div>;

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



  const ImageStyle = {
    borderRadius: "50%",
    width: "25vw",
    height: "11vh",
  };

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
        setImageVersion={setImageVersion}
      ></ProfileDialog>
      <ProfileCard>
        {hasImage ? (
          <ProfileImage
            imageStyle={ImageStyle}
            netid={location.pathname.substring(9)}
            imageVersion={user.imageVersion}
          ></ProfileImage>
        ): (
          <ProfileIcon/>
        )}
        {/* <ProfileIcon />
        <UserName>{user.firstName + " " + user.lastName}</UserName> */}
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
          <StyledText2>Venmo</StyledText2>
          <StyledTextVenmo>
            {user.venmo ? `@${user.venmo}` : "Not Specified"}
          </StyledTextVenmo>
        </TextBox>
      </ProfileCard>
    </AllDiv>
  );
};
export default Profile;
