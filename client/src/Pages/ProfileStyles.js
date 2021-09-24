import styled from 'styled-components';

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
	padding: 10px 10px 10px 10px;
`;

const UserPic = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 25px;

	width: 220px;
	height: 220px;
	background-image: url("https://www.kindpng.com/picc/m/229-2295555_not-my-art-pikachu-is-eating-pocky-kawaii.png");
	border-radius: 50%;
	background-size: cover;
`;

const UserName = styled.p`
	display: flex; 
	justify-content: center;
	align-items: center;
	padding: 50px 0px 0px 0px;

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
	padding: 10px 0px 25px 0px;

	font-family: Josefin Sans;
	font-weight: 300;
	font-size: 18px;
	line-height: 18px;
	text-align: center;

	color: #002140;
`;

const StyledText = styled.p`
	display: flex; 
	padding: 0px 0px 0px 10px;

	font-family: Josefin Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 18px;
	text-align: center;
	color: #2075D8;
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

	color: #2075D8;
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

export {
	ProfileCard,
	ReturnHeader,
	UserName,
	UserPic,
	PhoneNumber,
	StyledText,
	StyledText2,
	StyledText3
};