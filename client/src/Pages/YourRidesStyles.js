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
margin-top: 2vh;
margin-bottom: 2vh;
`;

const UpcomingRidesSection = styled.div`
dislay: flex;
flex-direction: column;
width: 90vw;
padding: 5%;
background: #F4F6F9;        /* light mode background */
border-radius: 9px;
`;

const UpcomingRideTitle = styled.div`
margin-top: 2vh;
margin-bottom: 2vh;
`;

const PastRidesSection = styled.div`
display: flex;
width: 100vw;
justify-content: space-between;
font-family: Josefin Sans;
flex-direction: column;
padding: 3%;
border-radius: 9px;
margin-top: 3vh;
`;

const PastRideTitle = styled.div`
display: flex;
width: 90vw;
justify-content: space-between;
margin-top: 2vh;
margin-bottom: 1vh;
`;

const TitleText = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
color: #002140;
font-size: 2.5vh;
`;



export {
	OverallPageTitle,
    UpcomingRidesSection,
    UpcomingRideTitle,
    PastRidesSection,
    PastRideTitle,
    TitleText,
    OverallPage    
};