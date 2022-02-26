import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const ButtonBox = withStyles({
	label: {
	  textTransform: 'capitalize',
	}
  })(Button);
  
const BackArrow = withStyles({
root: {
	display: 'flex',
	color: '#2075D8',
	justifyContent: 'center',
	alignItems: 'center'
}
})(ChevronLeftIcon);

const TextBox = withStyles({
root: {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '4vh',
	width: '75vw',
	height: '6vh',
	borderRadius: '9px',
	background: 'rgba(187, 218, 255, 0.22)',
	boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.25)',
}, 
label: {
	textTransform: 'none',
}
})(Button);


const MailBox = withStyles({
root: {
	color: '#2075D8'
}
})(MailIcon);


const ProfileCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const TopHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-right: 25px;
	align-items: center;
	padding: 15px;
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
	font-size: 2.2em;
	text-align: center;

	color: #002140;
`;

const StyledText = styled.p`
	display: flex; 
	padding: 0px 0px 0px 1vh;

	font-family: Josefin Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 1.5em;
	text-align: center;
	color: #002140;
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

	color: #002140;
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

	color: #2075D8;
`;

const StyledTextVenmo = styled.p`
	display: flex; 
	padding: 0px 0px 0px 1vh;

	font-family: Josefin Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 1.5em;
	text-align: center;
	color: rgba(32, 117, 216, 1);
`;

export {
	ButtonBox,
	BackArrow,
	TextBox,
	MailBox,
	ProfileCard,
	TopHeader,
	UserName,
	UserPic,
	StyledText,
	StyledText2,
	StyledText3,
	StyledTextVenmo
};