import React from 'react';
import { useHistory } from "react-router";
import { gql, useMutation } from '@apollo/client';
import ProfileForm from '../Pages/ProfileForm';

const Onboarding = () => {
  const history = useHistory();

  const UPDATE_USER = gql`
    mutation UpdateMutation($firstName: String!, $lastName: String!, $phone: String!) {
      userUpdateOne(record: { firstName: $firstName, lastName: $lastName, phone: $phone }) {
        record {
          _id
          firstName
          lastName
          phone
        }
      }
    }
  `;
  
  const [updateUser] = useMutation(UPDATE_USER);

  const updateUserInfo = (data) => {
    updateUser({
      variables: data
    });

    return history.push(-2);
  };

  return (
    <div>
      <ProfileForm onSubmit={updateUserInfo} />
    </div>
  );
};

export default Onboarding;
