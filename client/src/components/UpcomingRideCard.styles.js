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
background: #FF0000;

flex-direction: column;
justify-content: center;
`

const RideDate = styled.div`
// font size + style

`

const RideTime = styled.div`
// font size + style

`

const Locations = styled.div`
grid-column-start: 2;
background: #00FF00;


`

const Notifications = styled.div`
grid-column-start: 3;
background: #0000FF;

`

export {
	RideCard,
	RideTimeInfo,
	RideDate,
	RideTime,
	Locations,
	Notifications
};