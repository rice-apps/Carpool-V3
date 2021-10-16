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
  background-color: red;
  display: flex;
  align-items: stretch; /* Default */


`
const SeatsLeftNum = styled.div`
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  padding: 4px;
`
const SeatsLeftText = styled.div`
  grid-column: 4;
  grid-row: 1;
  font-weight: 300;
  font-size: 11px;
  line-height: 11px;
  padding-top: 10px;
`
const SocialIcon = styled.div`

`
const RideSummaryDiv = styled.div`
  grid-column: 4;
  grid-row: 1;
  color: #2075d8;
  background: #f4f6f9;
  background-color: red;
  display: flex;
  align-items: center;
  margin-top: 25px;
`

const LocationDivContainer = styled.div`
  grid-column: 1/5;
  grid-row: 2;
  margin:auto;
`


const LocationDiv = styled.div`
  margin-top: 5vh;
  background: #ffffff;
  border-radius: 35px;
  align-items: center; 
  flex-direction: column;
  background-color: blue;
`
const LocationText = styled.div`
  padding-top: 2.5vh;
  font-size: 4.1vh;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  text-align: center;
`
const DateDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 2.3vh;
  background-color: red;
  text-align: center;
  
`
const CalendarIcon = styled.div`
  background-color: pink;

  
`
const ClockIcon = styled.div`
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
  grid-column: 1 / 4;
  grid-row: 3;
  height: 28vh;
  left: 0px;
  right: 0px;
  text-align: center;
  padding-left: 2vh;
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
  background: #ffffff;
  border-radius: 30px 17px 17px 30px;
  margin: 15px;
  width: 97%;
`
const RiderText = styled.div`
  position: relative;
  left: 20.23%;
  right: 12.24%;
  top: -30px;
  height: 0px;
`
const TextContainer = styled.div`
  
`
const ButtonDiv = styled.button`
  grid-column: 2 / 3;
  grid-row: 4;
  color: #ffffff;
  background: #2075d8;
  text-align: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;
  width: 80%;
  height: 28px;
  onclick='joinRide()';
  
`
const AllDiv = styled.div`
  background: #f4f6f9;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
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
  LocationDivContainer
}