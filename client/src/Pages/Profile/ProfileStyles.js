import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const ButtonBox = withStyles({
  label: {
    textTransform: "capitalize",
  },
})(Button);

const BackArrow = withStyles({
  root: {
    display: "flex",
    color: "#2075D8",
    justifyContent: "center",
    alignItems: "center",
  },
})(ChevronLeftIcon);

const TextBox = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4vh",
    width: "75vw",
    height: "10vh",
    borderRadius: "9px",
    background: "rgba(187, 218, 255, 0.22)",
  },
  label: {
    textTransform: "none",
  },
})(Button);

const MailBox = withStyles({
  root: {
    color: "#2075D8",
  },
})(MailIcon);

const ImageStyle = {
  borderRadius: "50%",
  width: "52vw",
  height: "24vh",
};

const EditProfileButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  font-family: Josefin Sans;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
`;

const ProfileCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ReturnHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px 10px 0;
`;

const UserPic = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vh;

  width: 25vh;
  height: 25vh;
  background-image: url("https://www.kindpng.com/picc/m/229-2295555_not-my-art-pikachu-is-eating-pocky-kawaii.png");
  border-radius: 50%;
  background-size: cover;
`;

const UserName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vh 0px 0px 0px;

  font-family: Josefin Sans;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  text-align: center;

  color: #002140;
`;

const PhoneNumber = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vh 0px 25px 0px;

  font-family: Josefin Sans;
  font-weight: 300;
  font-size: 18px;
  line-height: 18px;
  text-align: center;

  color: #002140;
`;

const College = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh 0px 25px 0px;

  font-family: Josefin Sans;
  font-weight: 300;
  font-size: 18px;
  line-height: 18px;
  text-align: center;

  color: #002140;
`;

const StyledText = styled.p`
  display: flex;
  padding: 0px 0px 0px 1vh;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  color: #2075d8;
`;

const StyledText2 = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 0px;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
  text-align: center;
  letter-spacing: 0.07em;

  color: #2075d8;
`;

const StyledText3 = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 3px;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  text-align: center;

  color: #2075d8;
`;

export {
  ButtonBox,
  BackArrow,
  TextBox,
  MailBox,
  EditProfileButton,
  ProfileCard,
  ReturnHeader,
  UserName,
  UserPic,
  PhoneNumber,
  College,
  StyledText,
  StyledText2,
  StyledText3,
  ImageStyle,
};
