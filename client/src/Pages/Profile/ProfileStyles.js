import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export const ButtonBox = withStyles({
  label: {
    textTransform: "capitalize",
  },
})(Button);

export const BackArrow = withStyles({
  root: {
    display: "flex",
    color: "#2075D8",
    justifyContent: "center",
    alignItems: "center",
  },
})(ChevronLeftIcon);

export const TextBox = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4vh",
    width: "75vw",
    height: "6vh",
    borderRadius: "9px",
    background: "rgba(187, 218, 255, 0.22)",
  },
  label: {
    textTransform: "none",
  },
})(Button);

export const MailBox = withStyles({
  root: {
    color: "#2075D8",
  },
})(MailIcon);


export const AllDiv = styled.div`
  background: #f4f6f9;
  height: calc(100% - 64px);
`

export const EditProfileButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Josefin Sans;
  font-weight: 600;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
`;

export const ProfileCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
	padding-bottom: 10vh;
`;

export const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const ProfileIcon = styled(AccountCircleIcon)({
  display: "flex",
  justifyContent: "center",
  marginTop: "1vh",
  width: "25vh",
  height: "25vh",
  fontSize: "30vh",
  color: "#002140",
  position: "relative",
  top: "6%",
});

export const College = styled.p`
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

export const UserName = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vh 0px 0px 0px;

  font-family: Josefin Sans;
  font-weight: 600;
  font-size: 2.2em;
  text-align: center;

  color: #002140;
`;

export const StyledText = styled.p`
  display: flex;
  padding: 0px 0px 0px 1vh;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5em;
  text-align: center;
  color: #002140;
`;

export const StyledText2 = styled.p`
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

  color: #002140;
`;

export const StyledText3 = styled.p`
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

export const StyledText4 = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 5px 10px;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 13px;
  text-align: center;

  color: #002140;
`;
export const StyledTextVenmo = styled.p`
  display: flex;
  padding: 0px 0px 0px 1vh;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5em;
  text-align: center;
  color: rgba(32, 117, 216, 1);
`;

