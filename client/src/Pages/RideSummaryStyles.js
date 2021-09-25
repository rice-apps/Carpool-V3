import styled from 'styled-components'

const SeatsLeftDiv = styled.div`
  position: absolute;
  left: 68.36%;
  right: 0%;
  top: 12.03%;
  bottom: 82.04%;
  background: rgba(187, 218, 255, 0.22);
  border-radius: 5px 0px 0px 5px;
  text-align: left;
  color: #2075d8;
  padding-right: 1vh;
  font-family: Josefin Sans;
  font-style: normal;
  line-height: 11px;
`
const SeatsLeftNum = styled.div`
  position: absolute;
  left: -64.3%;
  right: -7.17%;
  top: 30%;
  bottom: -65.22%;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
`
const SeatsLeftText = styled.div`
  position: absolute;
  left: 35%;
  right: 23.93%;
  top: 30%;
  font-weight: 300;
  font-size: 11px;
  line-height: 11px;
`
const SocialIcon = styled.div`
  position: absolute;
  left: 70%;
  right: 0%;
  top: 30%;
`
const RideSummaryDiv = styled.div`
  padding-top: 4vh;
  padding-left: 2vh;
  color: #2075d8;
  background: #f4f6f9;
`

const LocationDiv = styled.div`
  position: absolute;
  top: 25%;
  height: 190px;
  background: #ffffff;
  border-radius: 35px;
  margin-left: 2.2vh;
  margin-right: 2.2vh;
`
const LocationText = styled.div`
  position: relative;
  padding: 10% 0;
  font-size: 3 vh;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 35px;
  text-align: center;
`
const DateDiv = styled.div`
  position: relative;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
`
const CalendarIcon = styled.div`
  position: absolute;
  left: 25%;
  right: 0%;
  top: 40%;
`
const ClockIcon = styled.div`
  position: absolute;
  left: 55%;
  right: 0%;
  top: 40%;
`
const HostDiv = styled.div`
  position: absolute;
  left: 13%;
  top: 15%;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: rgba(187, 199, 221, 0.91);
`
const RidersDiv = styled.div`
  position: absolute;
  height: 213px;
  left: 0px;
  right: 0px;
  top: 360px;
  margin-top: 4vh;
  text-align: center;
  padding-left: 2vh;
  font-family: Monaco;
  font-size: 1.5 vh;
  background: #f4f6f9;
`
const OwnerDiv = styled.div`
  position: absolute;
  left: 10.23%;
  right: 10.24%;
  top: 23.25%;
  bottom: 47%;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  color: #002140;
  background: #ffffff;
  border-radius: 30px 17px 17px 30px;
  text-align: left;
  margin: 10px;
`
const LineDiv = styled.div`
`
const RidersComponents = styled.div`
  position: absolute;
  left: 8.23%;
  right: 12.24%;
  top: 58.25%;
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
  width: 280px;
`
const RiderText = styled.div`
  position: relative;
  left: 20.23%;
  right: 12.24%;
  top: -30px;
  height: 0px;
`
const TextContainer = styled.div`
  position: absolute;
  left: 20.23%;
  right: 12.24%;
  top: 40.25%;
`
const ButtonDiv = styled.button`
  position: absolute;
  left: 6%;
  right: 8%;
  top: 90%;
  bottom: 15%;
  color: #ffffff;
  background: #2075d8;
    text-align: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;
  width: 330px;
  height: 48px;
  onclick='joinRide()';
`
const AllDiv = styled.div`
  background: #f4f6f9;
  height: 100vh;
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
  AllDiv
}