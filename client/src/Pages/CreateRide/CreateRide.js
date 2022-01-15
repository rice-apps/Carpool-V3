import React from 'react';
import Create from './Create.js';
import { useEffect } from 'react'; 
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

const CreateRide = () => {

    const history = useHistory();
    const { addToast } = useToasts();
    const previous = localStorage.getItem('from');

    const CREATE_RIDE = gql`
        mutation CreateRide (
            $startLoc: MongoID!, $endLoc: MongoID!, $date: Date, $passengers: Float, $users: [MongoID!], $owner: MongoID!) 
        {
            rideCreateOne(record: {
            owner: $owner,
            departureLocation: $startLoc,
            arrivalLocation: $endLoc,
            departureDate: $date,
            riders: $users,
            spots: $passengers,
            }) {
            record {
                _id
            }
            }
        }
    `

    const [createRide] = useMutation(
        CREATE_RIDE
    );

    const addRide = (ride) => {
        createRide({
            variables: ride
        })
        .then((obj) => {
            addToast("Congratulations! Your ride has been successfully created.", { appearance: 'success'});
            const rideID = obj.data.rideCreateOne.record._id;
            console.log("success!");
            window.open('/ridesummary/' + rideID, '_self');
        })
        .catch((error) => {
            addToast("Sorry, an error occurred processing your new ride. Please try again later.", { appearance: 'error' });
        });
    }

    // In case of returning to onboarding prompt, 
    // the user needs to be warned that navigating to search via navbar is the expected action. 
    const onBackButtonEvent = (e) => {
        e.preventDefault();
        if (previous === 'onboardingCompletion'){
            if (window.confirm("Do you want to navigate back to onboarding form? It is advised to navigate back to the search page with the sidebar.")) {
                // Clear the localStorage to ensure that the user starts on a fresh profile
                localStorage.clear();
                localStorage.setItem('from', 'createRide');
                history.goBack();
            } else {
                window.history.pushState(null, null, window.location.pathname);
            }
        }
        
      }

    // Track back button behavior
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (

        <div> 
            <Create onCreate = {addRide} />
        </div>

    )
    
}

export default CreateRide; 

// Should the Button be here or in the Create component instead? 
// What does onCreate do? Is it applicable here? 