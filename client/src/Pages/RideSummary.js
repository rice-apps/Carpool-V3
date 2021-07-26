import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
// import { graphql } from 'react-apollo'
import { useParams } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import { IoLocationSharp, IoShareSocialSharp } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import { AiTwotoneCalendar } from 'react-icons/ai'

//styling
const SeatsLeftDiv = styled.div`
  position: absolute;
  left: 68.36%;
  right: 0%;
  top: 5.03%;
  bottom: 88.04%;
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
  right: 25.93%;
  top: 30%;
  bottom: 12%;

  font-weight: 300;
  font-size: 11px;
  line-height: 11px;
`
const SocialIcon = styled.div`
  position: absolute;
  left: 70%;
  right: 0%;
  top: 30%;
  bottom: 0%;
`

const RideSummaryDiv = styled.div`
  margin-top: 4vh;
  padding-left: 2vh;
  color: #2075d8;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  text-align: left;
`

const LocationDiv = styled.div`
  margin-top: 10vh;
  // text-align: center;
  // padding-left: 2vh;
  color: #00004d;
  font-size: 3 vh;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 35px;
  text-align: center;
`

const RidersDiv = styled.div`
  position: absolute;
  height: 213px;
  left: 15px;
  right: 15px;
  top: 296px;
  margin-top: 4vh;
  text-align: center;
  padding-left: 2vh;
  font-family: Monaco;
  font-size: 1.5 vh;
  background: rgba(228, 233, 241, 0.31);
  border-radius: 9px;
`

const DateDiv = styled.div`
  margin-top: 4vh;
  text-align: center;
  padding-left: 2vh;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  color: #002140;
`

//graphql
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
      }
      riders {
        netid
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
  const time = ride.departureDate
  // const formattedTime = time.format('MMMM Do YYYY, h:mm:ss a')
  // console.log(formattedTime)

  return (
    <div>
      <RideSummaryDiv>
        <IoIosArrowBack></IoIosArrowBack>&nbsp;Ride Summary
      </RideSummaryDiv>
      <SeatsLeftDiv>
        <SeatsLeftNum>{ride.spots}</SeatsLeftNum>
        <SeatsLeftText>seat(s) left</SeatsLeftText>
        <SocialIcon>
          <IoShareSocialSharp></IoShareSocialSharp>
        </SocialIcon>
      </SeatsLeftDiv>
      <LocationDiv>
        <IoLocationSharp></IoLocationSharp>&nbsp;
        {ride.departureLocation.title}&nbsp;
        <BsArrowRight></BsArrowRight>&nbsp;
        {ride.arrivalLocation.title}
      </LocationDiv>
      <DateDiv>{ride.departureDate}</DateDiv>
      <AiTwotoneCalendar></AiTwotoneCalendar>
      <RidersDiv> Riders {ride.riders.firstName}</RidersDiv>
    </div>
  )
}

export default RideSummary
