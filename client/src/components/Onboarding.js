import React from 'react';
import { useHistory } from "react-router";
import { gql, useMutation } from '@apollo/client';
import ProfileForm from '../pages/ProfileForm';

const Onboarding = () => {
  const history = useHistory();

  const UPDATE_USER = gql`
    mutation UpdateMutation($ticket: String!) {
      updateOne(ticket: $ticket) {
        _id
        netid
        firstName
        lastName
        phone
      }
    }
  `;
  
  const [updateUser] = useMutation(UPDATE_USER);
  
  const onSubmit = (e) => {
    e.preventDefault();
    updateUser();
    
    return history.push(-2);
  };

  return (
    <div>
      <ProfileForm onSubmit={onSubmit} />
    </div>
  );
};

export default Onboarding;
