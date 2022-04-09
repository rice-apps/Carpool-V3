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
  const previous = localStorage.getItem('lastPage');

  const {data: userData} = useQuery(GET_USER, 
    {
      variables: 
      {
        netID: id
      }
    }
  );
  
  // Check to see if the user came here via going back from onboarding
  if (previous === 'onboarding'){
    localStorage.clear();
    // Go back further
    history.goBack();
  } 

  // If the user returned to UserAuth from profile page, let them go further back
  if (previous && previous.includes("profile")){
    history.goBack();
  }

  // Determining where to route to
  useEffect(() => {

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
            // No specified destination after userAuth? To homepage. 
            window.open("/search", "_self");
          }
          
        }
    }
  }, [userData, history, destination]);

  return(
    // Loading icon until the query is complete... in which case, the user is redirected 
    // to the appropriate page. 
    <LoadingDiv />
  )
}

export default UserAuth; 