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
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  padding: 4px;
`
const SeatsLeftText = styled.div`
  font-family: Josefin Sans;
  grid-column: 4;
  grid-row: 1;
  font-weight: 300;
  font-size: 11px;
  line-height: 11px;
  padding-top: 5px;
`
const SocialIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 25px

`
const RideSummaryDiv = styled.div`
  grid-column: 4;
  grid-row: 1;
  color: #2075d8;
  background: #f4f6f9;
  
  display: flex;
  border: 3px solid green;
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
`

const LocationDiv = styled.div`
  margin-top: 5vh;
  background: #FFFFFF;
  border-radius: 17px;
  align-items: center; 
  flex-direction: column;
`
const LocationText = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr 6fr;
  gap: 10px;
  grid-auto-rows: minmax(55px, auto);
  padding-top: 2.5vh;
  font-size: 4.1vh;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;

`// Wrap everything in another div and use padding to make border
const DateDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 2.3vh;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 50px;  
`
const CalendarIcon = styled.div`
  // background-color: pink;
  font-family: Josefin Sans;


  
`
const ClockIcon = styled.div`
font-family: Josefin Sans;

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
  background: #2075d8;
  text-align: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;
  width: 100%;
  height: 48px;
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
  grid-column: 1;
  grid-row: 1;
  font-family: Josefin Sans;


`

const ArrivalDiv = styled.div`
grid-column: 3;
grid-row: 1;
font-family: Josefin Sans;



`
const LocationArrowDiv = styled.div`
grid-column: 2;
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
font-size: 24px


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
  BackArrowDiv
}