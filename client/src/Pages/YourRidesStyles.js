import { DialogContent } from '@material-ui/core';
import styled from 'styled-components';

const OverallPage = styled.div`
display: flex;
align-items: center;
flex-direction: column;
font-family: Josefin Sans;

`;

const Title = styled.div`
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
border-radius: 5px;

`;

const PastRidesandPayments = styled.div`
display: flex;
width: 80vw;
justify-content: space-between
font-family: Josefin Sans;

`;

const PastRideCard = styled.div`
font-family: Josefin Sans;

`;

const Unpaid = styled.div`
font-family: Josefin Sans;

`;

const Paid = styled.div`
font-family: Josefin Sans;

`;



export {
	Title,
    UpcomingRidesSection,
    PastRidesandPayments,
    OverallPage,
    PastRideCard,
    Unpaid,
    Paid
};