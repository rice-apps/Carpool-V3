import styled from 'styled-components';

const UnpaidPastRide = styled.div`
display: grid;
width: 90vw;
grid-template-columns: 65% 35%;
background: #FFFFFF;
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;
margin-top: 2em;
margin-bottom: 2em;
`;

const PaidPastRide = styled.div`
display: grid;
width: 90vw;
grid-template-columns: 65% 35%;
background: rgba(187, 218, 255, 0.22);
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;
margin-top: 2em;
margin-bottom: 2em;
`;

const PastRideCardData = styled.div`
display: grid;
grid-column-start: 1;
margins: 5px;
padding: 3px;
grid-template-columns: 30% 70%;
`

const RideTimeInfo = styled.div`
grid-column-start: 1;
display: flex;
background: #F0F7FF;
justify-content: space-between;
align-items: center;
flex-direction: column;
border-radius: 9px;
padding-top: 20%;
padding-bottom: 20%;

`;

const RideDate = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 1rem;
`

const RideTime = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: 300;
font-size: 1rem;
`;

const Locations = styled.div`
font-family: Josefin Sans;
padding: 10%;
grid-column-start: 2;
display: flex;
justify-content: space-between;
align-content: center;
align-items: center;
`

const LocationText = styled.div`
font-size: 1rem;
font-family: Josefin Sans;
`

const PaidPaymentInfo = styled.div`
grid-column-start: 2;
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
background: #EB5248;
justify-content: space-between;
align-items: center;
border-radius: 0px 9px 9px 0px;
padding: 10%;
`
const PaymentText = styled.div`
fornt-size: 2em;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
color: #FFFFFF;
`


export {
	UnpaidPastRide,
	PaidPastRide,
	PastRideCardData,
	RideTimeInfo,
	RideDate,
	RideTime,
	LocationText,
	Locations,
	PaidPaymentInfo,
	UnpaidPaymentInfo,
	PaymentText
};