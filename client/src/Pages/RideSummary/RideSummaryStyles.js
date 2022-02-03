import LocationOn from '@material-ui/icons/LocationOn'
import styled from 'styled-components'

const SeatsLeftDiv = styled.div`
  grid-column: 4;
  grid-row: 1;
  background: rgba(187, 218, 255, 0.22);
  border-radius: 5px 0px 0px 5px;
  text-align: left;
  color: #2075d8;
  font-family: Josefin Sans;
  font-style: normal;
  line-height: 11px;
  display: flex;
  align-items: stretch; /* Default */
`
const SeatsLeftNum = styled.div`
  font-family: Josefin Sans;
  font-weight: normal;
  font-size: 8vw;
  line-height: 24px;
  text-align: center;
  padding: 4px;
  margin-right:2px;
  padding-top: 7px;
`
const SeatsLeftText = styled.div`
  font-family: Josefin Sans;
  grid-column: 4;
  grid-row: 1;
  font-weight: 300;
  font-size: 3vw;
  line-height: 11px;
  padding-top: 6px;
`
const SocialIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 25px;
  cursor: pointer;

`
const RideSummaryDiv = styled.div`
  grid-column: 4;
  grid-row: 1;
  color: #2075d8;
  background: #f4f6f9;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`

const LocationDivContainer = styled.div`
  grid-column: 1/5;
  grid-row: 2;
  margin:auto;
  padding-bottom:20px;
  width:90%;
  // border: 3px solid green;
  margin-top: 5vh;


`

const LocationDiv = styled.div`
  background: #FFFFFF;
  border-radius: 17px;
  align-items: center; 
  flex-direction: column;
  // border: 3px solid red;

`
const LocationText = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr 5fr .5fr;
  gap: 15px;
  grid-auto-rows: minmax(25px, auto);
  padding-top: 2.5vh;
  font-size: 6.8vw;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 30px;
  align-items: center;

`// Wrap everything in another div and use padding to make border
const DateDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 2fr;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 5vw;
  text-align: left;
  padding-bottom: 20px;  
`
const CalendarIcon = styled.div`
  grid-column: 1;
  grid-row: 1;
  font-family: Josefin Sans;
  text-align: center;
  

`
const CalendarText = styled.div`
  grid-column: 2;
  font-family: Josefin Sans;
  grid-row: 1;
`


const ClockIcon = styled.div`
  grid-column: 4;
  grid-row: 1;
  font-family: Josefin Sans;
  text-align: center;


`

const TimeText = styled.div`
  grid-column: 5;
  font-family: Josefin Sans;
  grid-row: 1;
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
  grid-column: 1/ 5;
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

const IoPersonCircleSharpDiv = styled.span`
  font-size: 43px;
`
const OneRiderContainer = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 30px 17px 17px 30px;
  margin: 15px;
  width: 97%;
  font-family: Josefin Sans;
`
const RiderText = styled.div`
  padding-top: 17px;
  padding-left: 15px;
  font-family: Josefin Sans;
`
const TextContainer = styled.div`
  
`
const ButtonDiv = styled.button`
  color: #ffffff;
  background: ${({ disabled }) => !disabled ? '#2075d8' : '#9e9e9e'};
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
  onclick='joinRide()';
  
`
const AllDiv = styled.div`
  background: #f4f6f9;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  `

const ButtonContainer = styled.div`
  grid-column: 1/5;
  grid-row: 4;
  margin: auto;
  width: 95%;
  padding: 20px;
`

const DepartureDiv = styled.div`
  grid-column: 2;
  grid-row: 1;
  font-family: Josefin Sans;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DepartureIconDiv = styled(LocationOn)`
  grid-column: 1;
  grid-row: 1;
  fontSize: large;
`

const ArrivalDiv = styled.div`
grid-column: 4;
grid-row: 1;
font-family: Josefin Sans;
text-overflow: ellipsis;
`
const LocationArrowDiv = styled.div`
grid-column: 3;
grid-row: 1;
display: flex;
justify-content: center;
align-items: center;
`
const BackArrowDiv = styled.div`
width:30px;
height: 30px;
grid-column: 1;
grid-row: 1;
color: #2075d8;
background: #f4f6f9;
margin-top: 30px;
margin-left: 20px;
font-family: Josefin Sans;
font-style: normal;
line-height: 11px;
font-size: 24px;
cursor: pointer;
`

const InnerLocationDiv = styled.div`
padding: 20px;
`


export {
  SeatsLeftDiv,
  SeatsLeftNum,
  SeatsLeftText,
  SocialIcon,
  RideSummaryDiv,
  LocationDiv,
  LocationText,
  DateDiv,
  CalendarIcon,
  ClockIcon,
  HostDiv,
  RidersDiv,
  OwnerDiv,
  LineDiv,
  RidersComponents,
  IoPersonCircleSharpDiv,
  OneRiderContainer,
  RiderText,
  TextContainer,
  ButtonDiv,
  AllDiv,
  LocationDivContainer,
  ButtonContainer,
  DepartureDiv,
  ArrivalDiv,
  LocationArrowDiv,
  BackArrowDiv,
  InnerLocationDiv,
  DepartureIconDiv,
  CalendarText,
  TimeText
}