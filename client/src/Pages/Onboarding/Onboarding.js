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
      window.open(nextPage, '_self');
    } else {
      history.push('/search');
    }
  };

  // // TODO: This is supposed to display a confirmation message if the user attempts to "go back", 
  // // but for some reason it doesn't quite work. 
  // function beforeUnloadListener(event) {
  //   event.preventDefault();
  //   console.log('back button detected');
  //   var ans = window.confirm("Are you sure you want to go back? This may cause unexpected error. It is highly recommended to complete the form.");
  //   if (ans) {
  //       // Let the userAuth page know that the page is initiated from back button. 
  //       localStorage.setItem('from', 'onboarding'); 
  //       history.goBack();
  //   }
  // };

  // // Include safety net for when user accidentally tries to go back
  // if (previous) {
  //   history.goBack();
  // } else {
  //   window.addEventListener("beforeunload", beforeUnloadListener);
  // }

  
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!previous) {
        if (window.confirm("Do you want to go back ?")) {
            // your logic
            localStorage.clear();
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
