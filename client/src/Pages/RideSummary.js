import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { graphql } from 'react-apollo'
// import { useQuery } from '@apollo/react-hooks'

// {
//   rideOne {
//     departureDate
//     departureLocation {
//       title
//     }
//     arrivalLocation {
//       title
//     }
//     owner {
//       firstName
//       lastName
//     }
//     riders {
//       firstName
//     }
//     note
//     spots
//     _id
//   }
// }

const getRideQuery = gql`
  query {
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
const RideSummary = () => {
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
// export default graphql(getRideQuery)(RideSummary)
export default RideSummary()

// import { gql, useQuery } from '@apollo/client'

// const GET_DOGS = gql`
//   query GetDogs {
//     dogs {
//       id
//       breed
//     }
//   }
// `

// function Dogs() {
//   const { loading, error, data } = useQuery(GET_DOGS)

//   if (loading) return 'Loading...'
//   if (error) return `Error! ${error.message}`

//   return (
//     <select name='dog'>
//       {data.dogs.map((dog) => (
//         <option key={dog.id} value={dog.breed}>
//           {dog.breed}
//         </option>
//       ))}
//     </select>
//   )
// }

// export default Dogs()
