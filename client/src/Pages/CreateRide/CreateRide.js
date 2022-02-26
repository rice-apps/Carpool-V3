import React from 'react';
import Create from './Create.js';
import { gql, useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

const CreateRide = () => {

    const { addToast } = useToasts();

    const CREATE_RIDE = gql`
        mutation CreateRide (
            $startLoc: MongoID!, $endLoc: MongoID!, $date: Date, $passengers: Float, $users: [MongoID!], $owner: MongoID!, $notes: String) 
        {
            rideCreateOne(record: {
            owner: $owner,
            departureLocation: $startLoc,
            arrivalLocation: $endLoc,
            departureDate: $date,
            riders: $users,
            spots: $passengers,
            notes: $notes,
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

    return (

        <div> 
            <Create onCreate = {addRide} />
        </div>

    )
    
}

export default CreateRide; 

// Should the Button be here or in the Create component instead? 
// What does onCreate do? Is it applicable here? 