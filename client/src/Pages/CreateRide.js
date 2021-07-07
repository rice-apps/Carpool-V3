import React from 'react';
import Header from '../components/Header.js';
import Create from '../components/Create.js'; 
// import Button from '@material-ui/core/Button'; 

const CreateRide = () => {

    const addRide = (ride) => {
        console.log(ride)
    }

    return (

        <div> 
            <Header subtitle = {'Create Ride'}/> 
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