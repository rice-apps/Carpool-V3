import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const AllDiv = styled.div`
  background: #f4f6f9;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
`

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const SeatsLeftDiv = styled.div`
  background: rgba(187, 218, 255, 0.22);
  border-radius: 5px 0px 0px 5px;
  text-align: left;
  color: #2075d8;
  font-family: Josefin Sans;
  font-style: normal;
  line-height: 11px;
  display: flex;
  padding-right: 6px;
  align-items: stretch; /* Default */
`
const SeatsLeftNum = styled.div`
  font-family: Josefin Sans;
  font-weight: normal;
  font-size: 2em;
  line-height: 24px;
  text-align: center;
  padding: 4px;
  margin-right:2px;
`
const SeatsLeftText = styled.div`
  font-family: Josefin Sans;
  font-weight: 300;
  font-size: 1em;
  line-height: 11px;
  padding-top: 6px;
  padding-right: 6px;
`

const RideSummaryDiv = styled.div`
  color: #2075d8;
  background: #f4f6f9;
  display: flex;
  align-items: center;
  text-align: center;
`

const LocationDivContainer = styled.div`
  margin:auto;
  width:90%;
  height: 100%;
  margin-top: 5vh;
`
const LocationDiv = styled.div`
  display: grid;
  background: white;
  border-radius: 10px;
  grid-template-columns: 15% auto;
  grid-template-rows: auto;
  flex-direction: column;
  height:100%;
`

const LocationDateTime = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: .5em;
  margin-top: .5em;
  flex:1
`
const RideType = styled.div`
  grid-column-start: 2;
  grid-row-start: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: .5em;
  margin-top: .5em;
  flex:1
`

const LocationDepartureTitle = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-row-start: 2;
  align-items:flex-end;
`

const LocationDepartureAddress = styled.div`
  grid-column-start: 2;
  grid-row-start: 3;
`

const LocationDepartureIcon = styled.div`
  grid-column:1/2;
  grid-row:2/3;
  
  display:flex;
  justify-content: center;
  align-items:center;
`

const LocationDestinationTitle = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-row-start: 4;
  align-items:flex-end;
`
const LocationDestinationAddress = styled.div`
  grid-column-start: 2;
  grid-row-start: 5;
  margin-bottom: 2.5em;
`

const LocationDestinationIcon = styled.div`
  grid-column:1/2;
  grid-row:4/5;

  display:flex;
  justify-content: center;
  align-items:center;
`

const LocationConnect = styled.div`
  grid-column: 1/2;
  grid-row:3/4;

  display: flex;
  align-items:center;

  writing-mode: vertical-lr;
  text-orientation: upright;
`

const LocationTitleStyling = styled.span`
  font-family: Josefin Sans;
  weight: 500;
  font-size: 1.8em;
`

const LocationAddressStyling = styled.span`
  background: #BBDAFF38;
  font-family: Josefin Sans;
  color: rgba(0, 33, 64, 0.6);
  font-size: .9em;
  border-radius: 5px;
  padding: .5%;
`

const LocationDateStyling = styled.span`
  background: rgba(187, 218, 255, 0.22);
  font-family: Josefin Sans;
  font-size: 1.1em;

  color: black;
  border-radius: 10px;
  padding: 1.75%;
`

//
const RideTypeStyling = styled.span`
  background: rgba(189, 252, 202, 0.22);
  font-family: Josefin Sans;
  font-size: 1.1em;

  color: black;
  border-radius: 10px;
  padding: 1.75%;
`
const HostDiv = styled.div`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: rgba(187, 199, 221, 0.91);
`
const RidersDiv = styled.div`
  grid-column: 1/5;
  grid-row: 3;
  margin: auto;
  width: 85%;
  padding: 10px;  
  font-family: Monaco;
  font-size: 1.5 vh;
  background: #f4f6f9;
`
const OwnerDiv = styled.div`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  color: #002140;
  background: #ffffff;
  border-radius: 30px 17px 17px 30px;
  text-align: left;
`
const LineDiv = styled.div`
border: 1px solid #FFFFFF;
color: white;
background: white;

`
const RidersComponents = styled.div`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  text-align: left;
  color: #002140;
  border-radius: 30px 17px 17px 30px;
  background: #f4f6f9;
`

const RideNotesHeader = styled.div`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin-top: 3vh;
  line-height: 12px;
  color: rgba(187, 199, 221, 0.91);
`

const IoPersonCircleSharpDiv = styled.span`
  font-size: 43px;
`
const OneRiderContainer = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 30px 17px 17px 30px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin: 15px;
  width: 97%;
  font-family: Josefin Sans;
`
const RiderText = styled.div`
  padding-top: 17px;
  padding-left: 15px;
  font-family: Josefin Sans;
`
const NotesDiv = styled.div`
  grid-column: 1/ 5;
  grid-row: 4;
  overflow-wrap: break-word;
  margin: 15px;
  width: 97%;
  padding: 10px;  
  color: rgba(128, 128, 128, 1);
  background: #ffffff;
  
  font-family: Josefin Sans;
  border-radius: 5px;
`
const ButtonDiv = styled.button`
  color: #ffffff;
  background: ${({ disabled, leaveRide }) => leaveRide ? 'rgba(235, 82, 72, 1)' : !disabled ? '#2075d8' : '#9e9e9e'};
  text-align: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;
  width: 100%;
  height: 48px;
  cursor: ${({ disabled }) => !disabled ? 'pointer' : 'inherit'};
  
`

const ButtonContainer = styled.div`
  grid-column: 1/5;
  grid-row: 5;
  margin: auto;
  width: 95%;
  padding: 20px;
`


const BackArrowDiv = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

color: #2075d8;
background: #f4f6f9;
margin-left: 20px;
font-family: Josefin Sans;
font-style: normal;
cursor: pointer;
`

const BackArrow = withStyles({
root: {
	display: 'flex',
	color: '#2075D8',
	justifyContent: 'center',
	alignItems: 'center'
}
})(ChevronLeftIcon);


const BackText = styled.p`
  width: 35vw;
	display: flex; 
	justify-content: left;
	align-items: center;
	margin-left: 0px;
	margin-top: 3px;

	font-family: Josefin Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 18px;
	text-align: center;

	color: #2075D8;
`;


const InnerLocationDiv = styled.div`
padding: 20px;
`

const ConfirmationText = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-family: Josefin Sans;
font-style: italic;
font-weight: lighter;
font-size: 1.5vh;
line-height: 2vh;
color: #0B3669;
padding: 0px 10px 10px 10px;
`;

export {
  HeaderDiv,
  SeatsLeftDiv,
  SeatsLeftNum,
  SeatsLeftText,
  RideSummaryDiv,
  LocationDiv,
  LocationDateTime,
  LocationDepartureAddress,
  LocationDepartureTitle,
  LocationDepartureIcon,
  LocationDestinationAddress,
  LocationDestinationTitle,
  LocationDestinationIcon,
  LocationConnect,
  LocationTitleStyling,
  LocationAddressStyling,
  LocationDateStyling,
  HostDiv,
  RidersDiv,
  OwnerDiv,
  LineDiv,
  RidersComponents,
  IoPersonCircleSharpDiv,
  OneRiderContainer,
  RiderText,
  RideNotesHeader,
  NotesDiv,
  ButtonDiv,
  AllDiv,
  LocationDivContainer,
  ButtonContainer,
  BackArrow,
  BackText,
  BackArrowDiv,
  InnerLocationDiv,
  ConfirmationText,
  RideType,
  RideTypeStyling
}