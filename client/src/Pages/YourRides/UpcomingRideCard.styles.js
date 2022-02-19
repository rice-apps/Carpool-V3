import styled from 'styled-components';

const RideCard = styled.div`
display: grid;
width: 100%;
grid-template-columns: 30% 60% 10%;
background: #FFFFFF;
box-shadow: 3px 3px 12px -1px rgba(187, 218, 255, 0.98);
border-radius: 9px;
margin: 1em 0;
`;


const RideTimeInfo = styled.div`
grid-column-start: 1;
display: flex;
background: rgba(187, 218, 255, 0.22);
justify-content: space-between;
align-items: center;
flex-direction: column;
border-radius: 9px;
padding-top: 1em;
padding-bottom: 1em;
`

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
`

const Locations = styled.div`
font-family: Josefin Sans;
padding: 1em;
grid-column-start: 2;
display: flex;
justify-content: space-between;
align-content: center;
align-items: center;
`

const LocationText = styled.div`
font-size: 3vh;
font-family: Josefin Sans;
`

const Notifications = styled.div`
grid-column-start: 3;
`

export {
	RideCard,
	RideTimeInfo,
	RideDate,
	RideTime,
	LocationText,
	Locations,
	Notifications
};