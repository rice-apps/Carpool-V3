import { DialogContent } from '@material-ui/core';
import styled from 'styled-components';

const OverallPage = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`;

const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 80vw;

`;

const UpcomingRidesSection = styled.div`
dislay: flex;
width: 80vw;

background: #F4F6F9;        /* light mode background */
border-radius: 5px;

`;

const PastRidesandPayments = styled.div`
display: flex;
width: 80vw;
justify-content: space-between
`;

export {
	Title,
    UpcomingRidesSection,
    PastRidesandPayments,
    OverallPage
};