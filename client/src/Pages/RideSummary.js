import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
// import { graphql } from 'react-apollo'
import { useParams } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import {
  IoLocationSharp,
  IoShareSocialSharp,
  IoPersonCircleSharp,
} from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import { AiTwotoneCalendar, AiFillClockCircle } from 'react-icons/ai'
import moment from 'moment'
//styling
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
  //can't set the color
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

const GET_RIDE = gql`
  query getRide($id: MongoID) {
    rideOne(filter: { _id: $id }) {
      _id
      departureDate
      spots
      departureLocation {
        title
      }
      arrivalLocation {
        title
      }
      owner {
        netid
        firstName
        lastName
      }
      riders {
        netid
        firstName
        lastName
        phone
      }
    }
  }
`
const RideSummary = () => {
  let { id } = useParams()
  // console.log('id', id)
  const [getVariables, setVariables] = useState({})
  const [rideId, setRideId] = React.useState(null)
  React.useEffect(() => {
    fetch(`http://localhost:3000/ridesummary/${id}`).then(setRideId)
  }, id)
  const { data, loading, error } = useQuery(GET_RIDE, {
    variables: getVariables,
  })
  if (error) return <p>Error.</p>
  if (loading) return <p>Loading...</p>
  if (!data) return <p>No data...</p>
  const { rideOne: ride } = data
  const time = moment(ride.departureDate)
  const mon = time.format('MMM').toString()
  const day = time.format('DD').toString()
  const hour = time.format('hh:mm a')
  const joinRide = () => {
    console.log('joinRide clicked')
  }

  return (
    <AllDiv>
      <RideSummaryDiv>
        <IoIosArrowBack></IoIosArrowBack>
      </RideSummaryDiv>
      <SeatsLeftDiv>
        <SeatsLeftNum>{ride.spots}</SeatsLeftNum>
        <SeatsLeftText>seat(s) left</SeatsLeftText>
        <SocialIcon>
          <IoShareSocialSharp></IoShareSocialSharp>
        </SocialIcon>
      </SeatsLeftDiv>
      <LocationDiv>
        <LocationText>
          <IoLocationSharp></IoLocationSharp>&nbsp;
          {ride.departureLocation.title}&nbsp;
          <BsArrowRight></BsArrowRight>&nbsp;
          {ride.arrivalLocation.title}
        </LocationText>
        <DateDiv>
          <CalendarIcon>
            <AiTwotoneCalendar></AiTwotoneCalendar> {mon}-{day}
          </CalendarIcon>
          <ClockIcon>
            <AiFillClockCircle></AiFillClockCircle> {hour}
          </ClockIcon>
        </DateDiv>
      </LocationDiv>
      <RidersDiv>
        <HostDiv>Host</HostDiv>
        <OwnerDiv>
          <IoPersonCircleSharpDiv>
            <IoPersonCircleSharp></IoPersonCircleSharp>
          </IoPersonCircleSharpDiv>
          <TextContainer>
            {ride.owner.firstName}&nbsp;{ride.owner.lastName}
          </TextContainer>
        </OwnerDiv>
        <RidersComponents>
          <LineDiv>
            <hr></hr>
          </LineDiv>
          {ride.riders.slice(0, 3).map((person) => (
            <div>
              <OneRiderContainer>
                <div key={person.netid}>
                  <IoPersonCircleSharpDiv>
                    <IoPersonCircleSharp></IoPersonCircleSharp>
                  </IoPersonCircleSharpDiv>
                </div>
                <RiderText>
                  {person.firstName}&nbsp;{person.lastName}
                </RiderText>
              </OneRiderContainer>
            </div>
          ))}
        </RidersComponents>
      </RidersDiv>
      <ButtonDiv onClick='joinRide()'>Join Ride</ButtonDiv>
    </AllDiv>
  )
}
export default RideSummary
