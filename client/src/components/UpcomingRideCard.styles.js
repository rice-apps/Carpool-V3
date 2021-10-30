import styled from 'styled-components';

const RideCard = styled.div`
display: grid;
width: 100%;
grid-template-columns: 30% 60% 10%;
background: #FFFFFF;
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;

`;

const RideTimeInfo = styled.div`
grid-column-start: 1;

display: flex;
background: rgba(187, 218, 255, 0.22);
justify-content: center;
align-items: center;
flex-direction: column;
`

const RideDate = styled.div`
font-size: 3vh

`

const RideTime = styled.div`
font-size: 2vh
`

const Locations = styled.div`
grid-column-start: 2;
display: flex;
justify-content: center;
align-content: center;
align-items: center;



`

const Notifications = styled.div`
grid-column-start: 3;

`

export {
	RideCard,
	RideTimeInfo,
	RideDate,
	RideTime,
	Locations,
	Notifications
};