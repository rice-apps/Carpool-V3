import React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router";
import { gql, useMutation } from '@apollo/client';
import ProfileForm from '../Profile/ProfileForm';

const Onboarding = () => {

  const history = useHistory();
  const previous = localStorage.getItem('from');

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

  const updateUserInfo = (formData) => {
    updateUser({ variables: formData });

    const nextPage = localStorage.getItem('nextPage');
    if (nextPage) {
      localStorage.removeItem('nextPage');
      localStorage.setItem('from', 'onboardingCompletion');
      window.open(nextPage, '_self');
    } else {
      history.push('/search');
    }
  };
  

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!previous) {
      if (window.confirm("Do you want to navigate away? It is recommended to complete the form to prevent unexpected errors.")) {
          // Clear the localStorage to ensure that the user starts on a fresh profile
          localStorage.clear();
          // Notify UserAuth that it is navigated via a back command. 
          localStorage.setItem('from', 'onboarding'); 
          history.goBack();
      } else {
          window.history.pushState(null, null, window.location.pathname);
      }
    } else {
      // There is another page that this page is returning from
      history.goBack();
    }
  }

  useEffect(() => {

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    };
  }, []);

  return (
    <div>
      <ProfileForm onSubmit={updateUserInfo} />
    </div>
  );
};

export default Onboarding;
