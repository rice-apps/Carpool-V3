import React from 'react'; 
import { useEffect } from 'react';
import { Redirect, useHistory } from "react-router";
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
    const id = localStorage.get('netid');

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
              history.push('/search');
              // return (
              //   <Redirect path = '/search'/>
              // )
            } else {
              history.push(destination);
              // return (
              //   <Redirect path = {destination}/>
              // )
            }
        }
        
    }, [userData, history, destination])

    return(
      <div>
        The destination is... ${destination}
      </div>
    )
}

export default UserAuth; 