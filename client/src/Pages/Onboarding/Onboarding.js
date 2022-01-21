import React from "react";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";
import ProfileForm from "../Profile/ProfileForm";

const Onboarding = () => {
  const history = useHistory();

  const UPDATE_USER = gql`
    mutation UpdateMutation(
      $firstName: String!
      $lastName: String!
      $phone: String!
      $payment: JSON!
    ) {
      userUpdateOne(
        record: {
          firstName: $firstName,
          lastName: $lastName,
          phone: $phone,
          payment: $payment,
        }
      ) {
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
    console.log(formData);
    
    updateUser({ variables: formData });

    const nextPage = localStorage.getItem("nextPage");
    if (nextPage) {
      localStorage.removeItem("nextPage");
      window.open(nextPage, "_self");
    } else {
      history.push("/search");
    }
  };

  return (
    <div>
      <ProfileForm onSubmit={updateUserInfo} />
    </div>
  );
};

export default Onboarding;
