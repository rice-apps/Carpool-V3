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
<<<<<<< HEAD
import { GET_USER } from "../Utils/ApiUtil.js";
import { ProfileImage } from "./ProfileImage.js";
=======
import LoadingDiv from "../../common/LoadingDiv.js";
>>>>>>> master

const Profile = () => {
  const { id } = useParams();

  const { addToast } = useToasts();

<<<<<<< HEAD
=======
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

>>>>>>> master
  const [openDialog, setOpenDialog] = useState(false);

  const [imageVersion, setImageVersion] = useState("");

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

<<<<<<< HEAD
  let paymentType = "";
=======
>>>>>>> master
  return (
    <div>
      <ReturnHeader>
        <ButtonBox onClick={goBack}>
<<<<<<< HEAD
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
=======
          <BackArrow></BackArrow>
          <StyledText3>Back</StyledText3>
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
>>>>>>> master
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
