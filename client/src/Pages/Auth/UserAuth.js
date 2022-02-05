import React from 'react'; 
import { useEffect } from 'react';
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";
import LoadingDiv from '../../common/LoadingDiv';

// Backend Query to Retrieve User Information
const GET_USER = gql`
query GetUserInfo ($netID: String)
{
  userOne (filter:{netid : $netID}) {
    _id
    firstName
    lastName
    netid
    phone
  }
}`
  
// Function to verify if the user is part of the Carpool MongoDB, and redirect accordingly.     
const UserAuth = () => {

  const history = useHistory();

  // If UserAuth is triggered, then localStorage should already have the user's netID (logged into SSO already), 
  // and the user's next destination (where to route to if user has a registered Carpool account). 
  const destination = localStorage.getItem('nextPage'); 
  const id = localStorage.getItem('netid');  

  const {data: userData} = useQuery(GET_USER, 
    {
      variables: 
      {
        netID: id
      }
    }
  );

  useEffect(() => {
    // Do not trigger until Query result returns
    if (userData) {
        if (!userData.userOne.firstName) {
          // User's information is incomplete, direct to onboarding page
          history.push('/onboarding');
        } else {
          // Route to next page since user is verified
          localStorage.removeItem('nextPage'); 
          window.open(destination, '_self'); 
        }
    }
  }, [userData, history, destination])

  return(
    // Loading icon until the query is complete... in which case, the user is redirected 
    // to the appropriate page. 
    <LoadingDiv />
  )
}

export default UserAuth; 