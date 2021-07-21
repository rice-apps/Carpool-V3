import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
// import { graphql } from 'react-apollo'
import { useParams } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { AiTwotoneCalendar } from 'react-icons/ai'

//styling
const SeatsLeftDiv = styled.div`
  text-align: right;
  color: #4b6dd1;
  padding-right: 1vh;
`
const SeatsLeftNum = styled.div`
  margin-top: 4vh;
  padding-left: 2vh;
  color: #4b6dd1;
  font-size: 4vh;
`
const RideSummaryDiv = styled.div`
  margin-top: 4vh;
  padding-left: 2vh;
  color: #4b6dd1;
  font-size: 4vh;
`

const LocationDiv = styled.div`
  margin-top: 4vh;
  text-align: center;
  padding-left: 2vh;
  color: #00004d;
  font-family: Monaco;
  font-weight: bold;
  font-size: 3 vh;
`

const RidersDiv = styled.div`
  margin-top: 4vh;
  text-align: center;
  padding-left: 2vh;
  font-family: Monaco;
  font-size: 1.5 vh;
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
  console.log('id', id)
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
  console.log('data', data)

  let {
    owner,
    riders,
    departureDate,
    departureLocation,
    arrivalLocation,
    spots,
  } = data

  return (
    <div>
      <RideSummaryDiv>Ride Summary</RideSummaryDiv>
      <SeatsLeftDiv>
        <SeatsLeftNum>{ride.spots}</SeatsLeftNum>
        seats left
      </SeatsLeftDiv>
      <LocationDiv>
        <IoLocationSharp></IoLocationSharp>&nbsp;
        {ride.departureLocation.title}&nbsp;
        <BsArrowRight></BsArrowRight>&nbsp;
        {ride.arrivalLocation.title}
      </LocationDiv>
      <p>{ride.departureDate}</p>
      <AiTwotoneCalendar></AiTwotoneCalendar>
      <RidersDiv> Riders {ride.riders}</RidersDiv>
    </div>
  )
}

// export default graphql(getRideQuery)(RideSummary
export default RideSummary
