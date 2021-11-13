import styled from 'styled-components';

const UnpaidPastRide = styled.div`
display: grid;
width: 90vw;
grid-template-columns: 65% 35%;
background: #FFFFFF;
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;
height: 10vh;
margin-top: 2vh;
margin-bottom: 2vh;
`;

const PaidPastRide = styled.div`
display: grid;
width: 90vw;
grid-template-columns: 65% 35%;
background: rgba(187, 218, 255, 0.22);
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;
height: 10vh;
margin-top: 2vh;
margin-bottom: 2vh;
`;

const TimeLocationData = styled.div`
display: grid;
grid-column-start: 1;
grid-template-columns: 30% 70%;
margin-top: 1vh;
margin-bottom: 1vh;
margin-left: 1vh;
padding: 1vh;
`

const RideTimeInfo = styled.div`
grid-column-start: 1;
display: flex;
background: #F0F7FF;
justify-content: space-between;
align-items: center;
flex-direction: column;
border-radius: 9px;
margin-top: 1vh;
margin-bottom: 1vh;
margin-left: 1vh;
padding: 1vh;

`;

const RideDate = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 2.5vh;
`

const RideTime = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: 300;
font-size: 2vh;
`;

const Locations = styled.div`
grid-column-start: 2;
font-family: Josefin Sans;
padding: 10%;
max-height: 10vh;
display: flex;
justify-content: space-between;
align-content: center;
align-items: center;
`

const LocationText = styled.div`
font-size: 3vh;
font-family: Josefin Sans;
`

const PaidPaymentInfo = styled.div`
grid-column-start: 2;
max-height: 10vh;
display: flex;
background: #BBDAFF;
justify-content: space-between;
align-items: center;
border-radius: 0px 9px 9px 0px;
padding: 10%;
`;

const UnpaidPaymentInfo = styled.div`
grid-column-start: 2;
display: flex;
max-height: 10vh;
background: #EB5248;
justify-content: space-between;
align-items: center;
border-radius: 0px 9px 9px 0px;
padding: 10%;
`

const PaymentText = styled.div`
font-size: 2vh;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
color: #FFFFFF;
`

export {
	UnpaidPastRide,
	PaidPastRide,
	TimeLocationData,
	RideTimeInfo,
	RideDate,
	RideTime,
	Locations,
	LocationText,
	PaidPaymentInfo,
	UnpaidPaymentInfo,
	PaymentText
};