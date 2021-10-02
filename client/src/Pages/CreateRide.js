import React from 'react';
import Create from '../components/Create.js'; 
import Alert from '../components/Alert.js';
import { gql, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

const CreateRide = () => {

    const { addToast } = useToasts();

    const CREATE_RIDE = gql`
        mutation CreateRide (
            $startLoc: MongoID!, $endLoc: MongoID!, $date: Date, $passengers: Float, $users: [MongoID!]) 
        {
            rideCreateOne(record: {
            owner: "60dd1f128211a44ac40b33ee",
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
        console.log("Ride Create: ", ride);
        console.log("The date is ", ride.date);
        console.log("User: ", localStorage.getItem('netid'))
        createRide({
            variables: ride
        })
        .then(() => {
            addToast("Congratulations! Your ride has been successfully created.", { appearance: 'success'});
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
            <Alert />
        </div>

    )
}

export default CreateRide; 

// Should the Button be here or in the Create component instead? 
// What does onCreate do? Is it applicable here? 