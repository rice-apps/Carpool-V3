import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
import { graphql } from 'react-apollo'

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

//graphql
const GET_RIDES = gql`
  query GetRides($deptLoc: MongoID, $arrLoc: MongoID) {
    rideMany(
      filter: { departureLocation: $deptLoc, arrivalLocation: $arrLoc }
    ) {
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

// const GET_USER_INFO = gql`
//   query GetUserInfo {
//     user {
//       _id
//       firstName
//       lastName
//       netid
//       phone
//     }
//   }
// `

// const GET_LOCATIONS = gql`
//   query GetLocations {
//     locationMany {
//       _id
//       title
//     }
//   }
// `

const RideSummary = ({ ride }) => {
  const [getVariables, setVariables] = useState({})
  console.log(getVariables)
  const { data, loading, error } = useQuery(GET_RIDES, {
    variables: getVariables,
  })

  if (error) return <p>Error.</p>
  if (loading) return <p>Loading...</p>
  if (!data) return <p>No data...</p>

  const { rideMany: rides } = data

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
        <SeatsLeftNum>{rides[0].spots}</SeatsLeftNum>
        seats left
      </SeatsLeftDiv>
      <ul>
        <li>Departure Location: {rides[0].departureLocation.title}</li>
        <li>Arrival Location: {rides[0].arrivalLocation.title}</li>
        <li>Departure Time: {rides[0].departureDate}</li>
        <li>riders: {rides[0].riders}</li>
      </ul>
    </div>
  )
}

// export default graphql(getRideQuery)(RideSummary
export default RideSummary
