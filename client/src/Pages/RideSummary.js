import React from 'react'
import { gql } from '@apollo/client'
import { graphql } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'

const getRideQuery = gql`
  {
    rideOne {
      departureDate
      departureLocation {
        title
      }
      arrivalLocation {
        title
      }
      owner {
        firstName
        lastName
      }
      riders {
        firstName
      }
      note
      spots
      _id
    }
  }
`
function RideSummary() {
  const { loading, error, data } = useQuery(getRideQuery)
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>
  // console.log(props)

  return (
    <div>
      <ul>
        <li>start location:{data.departureLocation.title}</li>
        <li>destination</li>
        <li>date/time</li>
        <li>ride type(Uber, Lyft, Driver)</li>
      </ul>
    </div>
  )
}
export default graphql(getRideQuery)(RideSummary)
// export default RideSummary()
