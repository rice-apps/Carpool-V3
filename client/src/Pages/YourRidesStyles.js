import { DialogContent } from '@material-ui/core';
import styled from 'styled-components';

const OverallPage = styled.div`
display: flex;
align-items: center;
flex-direction: column;
font-family: Josefin Sans;
`;

const OverallPageTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 80vw;
height: 10vh;
font-family: Josefin Sans;
font-size: 6vh;
font-style: normal;
font-weight: 100;
text-align: center;
`;

const UpcomingRidesSection = styled.div`
dislay: flex;
flex-direction: column;
width: 90vw;
padding: 3%;
background: #F4F6F9;        /* light mode background */
border-radius: 9px;
`;

const UpcomingRideTitle = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 3vh;
margin-top: 2vh;
margin-bottom: 2vh;
`;

const PastRidesSection = styled.div`
display: flex;
width: 90vw;
justify-content: space-between
font-family: Josefin Sans;
flex-direction: column;
padding: 3%;
border-radius: 9px;
`;


const Unpaid = styled.div`
font-family: Josefin Sans;
`;

const Paid = styled.div`
font-family: Josefin Sans;

`;





export {
	OverallPageTitle,
    UpcomingRidesSection,
    UpcomingRideTitle,
    PastRidesSection,
    OverallPage,
    Unpaid,
    Paid
};