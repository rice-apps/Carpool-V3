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

    localStorage.removeItem('nextPage'); 

    const {data: userData, loading, error} = useQuery(GET_USER, 
        {
          variables: 
          {
            netID: id
          }
        }
    );

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    useEffect(() => {
        if (userData) {
            const user = userData.userOne; 
            if (!user.firstName) {
                // Route to onboarding prompt.. need to be replaced with proper component
                history.push('/search') 
            } else {
                history.push(destination);
            }
        }
        
    }, [userData, history, destination])

    
}

export default UserAuth; 