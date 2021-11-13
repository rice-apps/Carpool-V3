import React from 'react'; 
import { useEffect } from 'react';
import { useHistory } from "react-router";
import { gql, useQuery } from "@apollo/client";

    // Backend Query to Confirm User
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
  
    
const UserAuth = () => {

    const destination = localStorage.getItem('nextPage'); 
    const history = useHistory();
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
        if (userData) {
            if (!userData.userOne.firstName) {
              // Route to onboarding prompt.. need to be replaced with proper component
              console.log('Going to Onboarding!')
              history.push('/onboarding');
            } else {
              localStorage.removeItem('nextPage'); 
              console.log('You exist! Go to where you want to!')
              window.open(destination, '_self'); 
            }
        }
        
    }, [userData, history, destination])

    return(
      <div>
        Loading...
      </div>
    )
}

export default UserAuth; 