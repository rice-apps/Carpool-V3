import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { gql, useMutation } from "@apollo/client";
import OnboardingForm from "./OnboardingForm";

const Onboarding = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const previous = localStorage.getItem("lastPage");

  const UPDATE_USER = gql`
    mutation UpdateMutation(
      $firstName: String!
      $lastName: String!
      $college: String!
      $phone: String!
      $venmo: String!
    ) {
      userUpdateOne(
        record: {
          firstName: $firstName
          lastName: $lastName
          college: $college
          phone: $phone
          venmo: $venmo
        }
      ) {
        record {
          _id
          firstName
          lastName
          college
          phone
          venmo
        }
      }
    }
  `;

  const [updateUser] = useMutation(UPDATE_USER);

  const updateUserInfo = async (formData) => {
    console.log(formData);

    await updateUser({ variables: formData });

    const nextPage = localStorage.getItem("nextPage");
    if (nextPage) {
      localStorage.removeItem("nextPage");
      localStorage.setItem("lastPage", "onboarding");
      window.open(nextPage, "_self");
    } else {
      history.push("/search");
    }
  };

  const cancelOnboarding = () => {
    localStorage.clear();
    if (previous) {
      window.open(previous, "_self");
    }
    // default behavior is to route to home page
    history.push("/search");
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Do you want to navigate away? It is recommended to complete the form to prevent unexpected errors."
      )
    ) {
      // Clear the localStorage to ensure that the user starts on a fresh profile
      localStorage.clear();
      // Notify UserAuth that it is navigated via a back command.
      localStorage.setItem("lastPage", "onboarding");
      history.goBack();
    } else {
      window.history.pushState(null, null, window.location.pathname);
    }
  };

  useEffect(() => {
    addToast(
      'If you would not like to onboard, please use the "Cancel" button below.',
      {
        appearance: "warning",
        autoDismiss: true,
        autoDismissTimeout: 12000,
      }
    );
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <OnboardingForm onSubmit={updateUserInfo} onCancel={cancelOnboarding} />
    </div>
  );
};

export default Onboarding;
