import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
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

import {
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
} from './RideSummaryStyles.js'

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
