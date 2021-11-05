import styled from 'styled-components';

const RideCard = styled.div`
display: grid;
width: 100%;
grid-template-columns: 10% 50% 40%;
background: #FFFFFF;
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;
height: 10vh;
`;

const RideTimeInfo = styled.div`
grid-column-start: 1;
display: flex;
background: rgba(187, 218, 255, 0.22);
justify-content: space-between;
align-items: center;
flex-direction: column;
border-radius: 9px;
padding: 10%;
margin: 5%
`

const RideDate = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 2.8vh;
`

const RideTime = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: 300;
font-size: 2vh
`

const Locations = styled.div`
font-family: Josefin Sans;
padding: 5%;
grid-column-start: 2;
font-size: 3.5vh;
display: flex;
justify-content: space-between;
align-content: center;
align-items: center;
margin: 5%
`

const Origin = styled.div`
text-size: 3vh;
font-family: Josefin Sans;
`

const Destination = styled.div`
text-size: 3vh;
font-family: Josefin Sans;
`

const PaidPaymentInfo = styled.div`
grid-column-start: 3;
display: flex;
background: #EB5248;
justify-content: space-between;
align-items: center;
border-radius: 0px 9px 9px 0px;
padding: 10%;
`

const UnpaidPaymentInfo = styled.div`
grid-column-start: 3;
display: flex;
background: #BBDAFF;
justify-content: space-between;
align-items: center;
border-radius: 0px 9px 9px 0px;
padding: 10%;
`
const PaymentText = styled.div`
text-size: 3vh;
font-family: Josefin Sans;

`


export {
	RideCard,
	RideTimeInfo,
	RideDate,
	RideTime,
	Origin,
	Destination,
	Locations,
	PaidPaymentInfo,
	UnpaidPaymentInfo,
	PaymentText
};