import React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { gql, useMutation } from '@apollo/client';
import ProfileForm from '../Profile/ProfileForm';

const Onboarding = () => {

  const history = useHistory();
  const { addToast } = useToasts();
  const previous = localStorage.getItem('from');
  console.log("Previous page is registered as: ", previous);

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
  
  const cancelOnboarding = () => {
    localStorage.clear();
    if (previous){
      history.push(previous);
    }
    history.push('/search');
  };
  


  const onBackButtonEvent = (e) => {
    console.log('Back Button detected.')
    e.preventDefault();
    if (window.confirm("Do you want to navigate away? It is recommended to complete the form to prevent unexpected errors.")) {
        // Clear the localStorage to ensure that the user starts on a fresh profile
        localStorage.clear();
        // Notify UserAuth that it is navigated via a back command. 
        localStorage.setItem('from', 'onboarding'); 
        history.goBack();
    } else {
        console.log('Directing back since user wants to navigate away!')
        window.history.pushState(null, null, window.location.pathname);
    }
  }

  useEffect(() => {
    addToast("If you would not like to onboard, please use the \"Cancel\" button. Going back could cause unexpected issues.", {
      appearance: 'warning', 
    })
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <ProfileForm onSubmit={updateUserInfo} onCancel={cancelOnboarding} />
    </div>
  );
};

export default Onboarding;


