import React from 'react';
import Create from './Create.js';
import { gql, useMutation,useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
//import { TWILIO_ACCOUNT_SID } from '../../../../api/config.js';
//import { TWILIO_AUTH_TOKEN } from '../../../../api/config.js';

import LoadingDiv from '../../common/LoadingDiv.js';


const CreateRide = () => {

    const { addToast } = useToasts();

    const id = localStorage.getItem('netid')
    console.log('netid is',id)
    const GET_USER = gql`
        query GetUserInfo($netID: String) {
            userOne(filter: { netid: $netID }) {
            _id
            firstName
            lastName
            netid
            phone
            college
            venmo
            notif_preference
            
        }
        }
    `;
    
    
    const GET_RIDE = gql`
  query getRide($id: MongoID) {
    rideOne(filter: { _id: $id }) {
      _id
      departureDate
      spots
      departureLocation {
        title
        address
      }
      arrivalLocation {
        title
        address
      }
      notes
      owner {
        _id
        netid
        firstName
        lastName
        phone
      }
      riders {
        _id
        netid
        firstName
        lastName
        phone
      }
    }
  }
`
    
    
    //console.log('sdsss',data)
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
    
    const CREATE_SMS = gql`
        mutation sendSMS (
            $message: String!, $phoneTo: String!

        )
        {
            sendSMS(
                message: $message
                phoneTo: $phoneTo
            ){
                message
            }
        }
    
    `
    
    const [sendSMS] = useMutation(
        CREATE_SMS
    )
    
    let { data, loading, error } = useQuery(GET_USER, {
        variables: { netID: id },
        });
    
    
    const addRide = (ride,start_loc,end_loc) => {
        console.log("Vars for createRide: " + ride);
        
        
        
        createRide({
            variables: ride
        })
        

        .then((obj) => {
            addToast("Congratulations! Your ride has been successfully created.", { appearance: 'success'});
            const rideID = obj.data.rideCreateOne.record._id;
            console.log(ride,"ride is")
            
            
            //console.log(user.phone,'insidesss')
            console.log(ride)
            console.log(end_loc)
            console.log(start_loc)
            let msg = "Your ride from " + start_loc + " to " + end_loc + " is now live! \n Notes:"
             + ride.notes + "\n" + "Riders: " + ride.passengers + " \n Updates for this ride will be sent via this number"
            console.log(msg)
            //console.log('sasasasasasa')
            
            if(data){
                console.log(data)
                let { userOne: user } = JSON.parse(JSON.stringify(data));
                let { userOne: notif_preference } = JSON.parse(JSON.stringify(data))

                console.log(user.phone,'da phone is lol')
                sendSMS({
                    variables:{
                        message: "Wart",
                        phoneTo: user.phone
                    }
                });
            }

            //window.open('/ridesummary/' + rideID, '_self');

            
        
            

            
            
            
            
        })
        .catch((error) => {
            addToast("Sorry, an error occurred processing your new ride. Please try again later.", { appearance: 'error' });
        });
    }
    if(loading){
        return <LoadingDiv/>
    }
    //let { userOne: user } = JSON.parse(JSON.stringify(data));
    //console.log(user.phone)
    return (

        <div> 
            <Create onCreate = {addRide} />
        </div>

    )
    
}

export default CreateRide; 

// Should the Button be here or in the Create component instead? 
// What does onCreate do? Is it applicable here? 