import React from 'react';
import Create from '../components/Create.js'; 
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";

const CreateRide = () => {

    const CREATE_RIDE = gql`
        mutation CreateRide(
            $owner: MongoID!, $deptLoc: MongoID!, $arrLoc: MongoID!, $deptDate: Date, 
            $spots: Float, $note: String, $ownerDriving: Boolean) {
            rideCreateOne(record: {
                owner: $owner,
                departureLocation: $deptLoc,
                arrivalLocation: $arrLoc,
                departureDate: $deptDate,
                spots: $spots,
                note: $note,
                ownerDriving: $ownerDriving
            }) {
                recordId
                record {
                    _id
                    __typename
                }
            }
        }
    `

    const [createRide, { data, loading, error }] = useMutation(
        CREATE_RIDE,
    );

    const addRide = (ride) => {
        console.log("Ride Create: ", ride);
        createRide({
            variables: ride
        })
        .catch((error) => {
            console.log("error", error);
            addToast("Sorry, an error occurred processing your new ride. Please try again later.", { appearance: 'error' });
        });
        addToast("Congratulations! Your ride has been successfully created. Make sure to wear a mask, sanitize hands, and follow all safety protocols from the Culture of Care Agreement.", { appearance: 'success'});
        console.log("success!");
    }

    return (

        <div> 
            <Create onCreate = {addRide} />
            {/* <Button variant = 'contained' color = 'primary' onClick = {handleOpen}>
                Create New Ride
            </Button> */}
        </div>

    )
}

export default CreateRide; 

// Should the Button be here or in the Create component instead? 
// What does onCreate do? Is it applicable here? 