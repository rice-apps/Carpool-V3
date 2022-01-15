import React from 'react'; 
import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";

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
  const previous = localStorage.getItem('from');

  const {data: userData} = useQuery(GET_USER, 
    {
      variables: 
      {
        netID: id
      }
    }
  );

  console.log('the destination is: ', destination);
  console.log('the previous page is: ', previous);
  
  // Determining where to route to
  useEffect(() => {
    // Check to see if the user came here via going back
    if (previous){
      // Clear the localstorage for items
      localStorage.removeItem('from');
      // If previous was from onboarding, must clear user netID to prevent access to restricted pages
      if (previous === 'onboarding'){
        localStorage.removeItem('netid');
      } 
      // Go back further
      history.goBack();
    }
    // Do not trigger until Query result returns
    if (userData) {
        if (!userData.userOne.firstName) {
          // User's information is incomplete, direct to onboarding page
          history.push('/onboarding');
        } else {
          // Check to see that there is a specified destination
          if (destination){
            // Route to next page since user is verified
            window.open(destination, '_self'); 
          } else {
            window.alert('Unexpected Behavior');
          }
          
        }
    }
  }, [userData, history, destination])

  return(
    // Loading icon until the query is complete... in which case, the user is redirected 
    // to the appropriate page. 
    <div>
      Loading...
    </div>
  )
}

export default UserAuth; 