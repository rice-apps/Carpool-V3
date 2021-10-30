import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import {
  IoShareSocialSharp,
  IoPersonCircleSharp,
} from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import { AiTwotoneCalendar, AiFillClockCircle } from 'react-icons/ai'
import moment from 'moment'
import { useHistory } from 'react-router'

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
  LineDiv,
  RidersComponents,
  IoPersonCircleSharpDiv,
  OneRiderContainer,
  RiderText,
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
  // let { id } = useParams()
  const [getVariables, setVariables] = useState({})
  const history = useHistory()

  const { data, loading, error } = useQuery(GET_RIDE, {
    variables: getVariables,
  })

  const JOIN_RIDE = gql`
    mutation JoinRide($rideID: ID!) {
      addRider(rideID: $rideID) {
        riders { _id }
      }
    }
  `

  const [joinRide] = useMutation(JOIN_RIDE, {
    variables: { rideID: id }
  })

  if (error) return <p>Error.</p>
  if (loading) return <p>Loading...</p>
  if (!data) return <p>No data...</p>

  const { rideOne: ride } = data

  const join = () => {
    if (localStorage.getItem('token') == null) {
      history.replace('/login')
      return
    }

    joinRide()
  }

  const time = moment(ride.departureDate)
  const mon = time.format('MMM').toString()
  const day = time.format('DD').toString()
  const hour = time.format('hh:mm a')

  return (
    <AllDiv>
      <BackArrowDiv>
        <IoIosArrowBack></IoIosArrowBack>
      </BackArrowDiv>
      <RideSummaryDiv>
        <SeatsLeftDiv>
          <SeatsLeftNum>{ride.spots}</SeatsLeftNum>
          <SeatsLeftText>seat(s) <br/>left</SeatsLeftText>
          <SocialIcon>
            <IoShareSocialSharp></IoShareSocialSharp>
          </SocialIcon>
      </SeatsLeftDiv>
      </RideSummaryDiv>
      <LocationDivContainer>
        <LocationDiv>
          <InnerLocationDiv>
            <LocationText>
              <DepartureIconDiv style={{ fontSize: '7vw' }}></DepartureIconDiv>
              <DepartureDiv>
                {/* Rice Univ */}
                {ride.departureLocation.title}
              </DepartureDiv>
              <LocationArrowDiv>
                <BsArrowRight></BsArrowRight>
              </LocationArrowDiv>
              <ArrivalDiv>
                {ride.arrivalLocation.title}
              </ArrivalDiv>
            </LocationText>
            <DateDiv>
              <CalendarIcon>
                <AiTwotoneCalendar></AiTwotoneCalendar> 
              </CalendarIcon>
              <CalendarText>
                {mon}-{day}
              </CalendarText>
              <ClockIcon>
                <AiFillClockCircle></AiFillClockCircle>
              </ClockIcon>
              <TimeText>
                {hour}
              </TimeText>
            </DateDiv>
          </InnerLocationDiv>
        </LocationDiv>
      </LocationDivContainer>
      <RidersDiv>
        <HostDiv>Host</HostDiv>
        <RidersComponents>
        <OneRiderContainer>
                <div key={ride.owner.netid}>
                  <IoPersonCircleSharpDiv>
                    <IoPersonCircleSharp></IoPersonCircleSharp>
                  </IoPersonCircleSharpDiv>
                </div>
                <RiderText>
                {ride.owner.firstName}&nbsp;{ride.owner.lastName}
                </RiderText>
          </OneRiderContainer>
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
      <ButtonDiv onClick={join}>Join Ride</ButtonDiv>
    </AllDiv>
  )
}
export default RideSummary
