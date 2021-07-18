import React from 'react';
import Create from '../components/Create.js'; 
import { gql, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

const CreateRide = () => {

    const { addToast } = useToasts();

    const CREATE_RIDE = gql`
        mutation CreateRide(
            $startLoc: Float, $endLoc: Float, $date: Date, $passengers: Float) 
            {
                rideCreateOne(record: {
                    departureLocation: 1,
                    arrivalLocation: 2,
                    departureDate: $date,
                    spots: $passengers,
                }) 
            }
    `

    const [createRide, { data, loading, error }] = useMutation(
        CREATE_RIDE
    );

    const addRide = (ride) => {
        console.log("Ride Create: ", ride);
        createRide({
            variables: ride
        })
        .then(() => {
            addToast("Congratulations! Your ride has been successfully created. Make sure to wear a mask, sanitize hands, and follow all safety protocols from the Culture of Care Agreement.", { appearance: 'success'});
            console.log("success!");
        })
        .catch((error) => {
            console.log("error", error);
            addToast("Sorry, an error occurred processing your new ride. Please try again later.", { appearance: 'error' });
        });
    }

    return (

        <div> 
            <Create onCreate = {addRide} />
        </div>

    )
}

export default CreateRide; 

// Should the Button be here or in the Create component instead? 
// What does onCreate do? Is it applicable here? 