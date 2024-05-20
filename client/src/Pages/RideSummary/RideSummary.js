import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import {
  IoPersonCircleSharp,
} from 'react-icons/io5'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import moment from 'moment'
import { Redirect, useHistory } from 'react-router'
import {
  HeaderDiv,
  SeatsLeftDiv,
  SeatsLeftNum,
  SeatsLeftText,
  RideSummaryDiv,
  LocationDiv,
  LocationDateTime,
  HostDiv,
  RidersDiv,
  LineDiv,
  RidersComponents,
  IoPersonCircleSharpDiv,
  OneRiderContainer,
  RiderText,
  NotesDiv,
  RideNotesHeader,
  ButtonDiv,
  AllDiv,
  LocationDivContainer,
  ButtonContainer,
  BackArrowDiv,
  BackArrow,
  BackText,
  ConfirmationText,
  LocationDepartureTitle,
  LocationDepartureAddress,
  LocationDestinationAddress,
  LocationDestinationTitle,
  LocationAddressStyling,
  LocationDateStyling,
  LocationTitleStyling,
  LocationDepartureIcon,
  LocationDestinationIcon,
  LocationConnect
} from './RideSummaryStyles.js'
import {Grid, IconButton} from '@material-ui/core';
import { LoginButton, JoinRideDialog, LoginDialogActions} from '../Onboarding/Alert.styles.js';
import CloseIcon from '@material-ui/icons/Close';
// SSO imports
import { SERVICE_URL } from '../../config'; 
import LoadingDiv from '../../common/LoadingDiv.js'
import { useToasts } from "react-toast-notifications";
const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 
const confirmationText = "You will still need to contact your fellow riders and order an Uber or Lyft on the day of."

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

const RideSummary = () => {

  document.title = "Ride Summary";

  let { id } = useParams()
  const [newOwner, setNewOwner] = useState({"owner":{_id:""}});
  const [ride, setRide] = useState({
    departureLocation: {title: "Loading", address: "dummy"},
    arrivalLocation: {title: "Loading", address: "dummy"},
    owner: {netid: "Loading"},
    riders: [],
    notes: "",
    spots: -1
  })
  const history = useHistory()
  const { addToast } = useToasts();
  // States to control for Dialog
  const [openLogin, setOpenLogin] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [nextUserID, setNextUserID] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { data, loading, error } = useQuery(GET_RIDE, {
    variables: {id: id},
  })

  
  const JOIN_RIDE = gql`
    mutation JoinRide($rideID: ID!) {
      addRider(rideID: $rideID) {
        riders { _id }
      }
    }
  `

  const REMOVE_RIDER = gql`
  mutation RemoveRider($rideID: ID!) {
      removeRider(rideID: $rideID) {
          _id
      }
  }
`

const DELETE_RIDE = gql`
  mutation DeleteRide($id: MongoID!) {
      rideDeleteOne(_id: $id) {
          recordId
      }
  }
`
// Query ride

// Get ride

// Update ride


const UPDATE_RIDE = gql`
mutation UpdateRideOwner($id: MongoID!, $record: UpdateOneridesInput!){
    rideUpdateOne(filter: { _id: $id }, record: $record){
    recordId
  }
}
`
const [deleteRide] = useMutation(DELETE_RIDE, {
  variables: { id: ride._id }
})

  const [joinRide] = useMutation(JOIN_RIDE, {
    variables: { rideID: id }
  })

  const [leaveRide] = useMutation(REMOVE_RIDER, {
    variables: { rideID: id }
  })

  // console.log("Before mutation:",ride.owner._id);
  const [updateRide] = useMutation(UPDATE_RIDE, {
    variables: {id: ride._id, record: {owner: newOwner.owner._id}}
  })

  useEffect(() => {
    if(newOwner.owner._id !== "") {
      updateRide().then(result => {
        window.location.reload();
      }).catch((err) => {
        console.log(err)
      })
    }
    
  }, [newOwner, updateRide]) 

  // Determine the behavior of button, verify if user is in Rice SSO
  const handleClickOpen = () => {
    // User is logged in already via Rice Verification
    if (localStorage.getItem('token') != null) {
      // Show the confirmation pop-up for joining ride
      setOpenConfirmation(true); 
    } 
    // User is not logged in, prompt them to log in
    else {
      setOpenLogin(true);
    }
  };

  // Close the  box
  const handleCloseLogin= () => {
      setOpenLogin(false);
  };

  // Close the confirmation panel
  const handleCloseConfirmation = () => {
      setOpenConfirmation(false);
  };

  useEffect(() => {
    if (data) {
      let ride;
      if (!data.rideOne) {
        history.push('/404')
      } else if(!data.rideOne.owner){
        ride = {...data.rideOne,owner:{netid:"err",lastName:"owner",firstName:"No"}}
      }
      else {
        ride = {...data.rideOne}
      }
      setRide(ride)
     }
  }, [data, history])

  useEffect(() => {
    localStorage.setItem('lastRide', `ridesummary/${id}`);
  }, [id])

   if (error) return <Redirect to="../404" />
  if (loading) return <LoadingDiv />
  if (!data) return <p>No data...</p>

  const join = () => {
    if (localStorage.getItem('token') == null) {
      localStorage.setItem('joinFromLogin', "true");
      localStorage.setItem('nextPage', `ridesummary/${id}`);
      localStorage.setItem('lastPage', `ridesummary/${id}`);
      let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
      window.open(redirectURL, '_self');
      return
    }
    else if (localStorage.getItem('joinFromLogin') === "true") {
      localStorage.setItem('joinFromLogin', "false");
    }

    joinRide().then((result) => {
      window.location.reload();

    }).catch((err) => {
      addToast("Sorry! This ride is full.", { appearance: 'error'});
    });
  }


  const leave = () => {
    let currentUser = localStorage.getItem('netid');
    leaveRide().then(async (result) => {
      if (ride.riders.length === 1) {
        // DELETE ride - use result (MongoID) to delete
        deleteRide().then(() => {
          history.push('/search');
        }).catch((err) => console.log(err));
      }
      else if (ride.owner.netid === currentUser) {
        // Update owner of ride 
        let newRiders = ride.riders.filter((key) => key.netid !== currentUser);
        setNewOwner({owner:newRiders[0]});
      }
      else {
        window.location.reload();
      }
      return result
    }).catch((err) => {
      console.log(err);
      addToast("Error leaving ride", { appearance: 'error'});

    });
    // If numUsers == 1, show delete ride
    // console.log(result);
    // window.location.reload();
    // console.log(result);
  }

  // console.log(data, loading, error);
  if (localStorage.getItem('joinFromLogin') === "true") {
    if (localStorage.getItem('token')){
      join();
    } else {
      localStorage.setItem('joinFromLogin', 'false');
    }
  }
  
  if (error) return <Redirect to="../404" />
  if (loading) return <p>Loading...</p>
  if (!data) return <p>No data...</p>

 
  const goBack = () => {
    let lastPage = '/' + localStorage.getItem('lastPage');
    localStorage.setItem('lastPage', `ridesummary/${id}`);
    // Any attempts to go back to edit the onboarding form
    // should take you back to the current ride summary page.
    if (lastPage === "/your-rides"){
      history.push(lastPage);
    } else {
      history.push("/search");
    }
  }

  // ==================================== Attempts to Access User Profile ==================================
  const accessUserProfile = (user_id) => {
    if (localStorage.getItem("token") != null){
      // Allow user to direct to profile page 
      localStorage.setItem("lastPage", window.location.pathname.substring(1))
      history.push("/profile/" + user_id);
    } else {
      // Warn the user that they must log in to checkout other user's profiles
      setNextUserID(user_id); 
      setOpenUserProfile(true); 
      // addToast("You must log in to view user profiles.", { appearance: 'warning'});
      // return 
    }
  }

  const handleCloseLoginForUser = () => {
    setOpenUserProfile(false); 
    setNextUserID("");
  }

  const handleLoginForUser = () => {
        localStorage.setItem('nextPage', 'profile/' + nextUserID);
        let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
        window.open(redirectURL, '_self');
  }
  // =======================================================================================================

  const time = moment(ride.departureDate)
  const mon = time.format('MMM').toString()
  const day = time.format('DD').toString()
  const hour = time.format('hh:mm a')

  return (
    <AllDiv>
      <HeaderDiv>
        <BackArrowDiv onClick={() => goBack()}>
          <BackArrow></BackArrow>
          <BackText>{localStorage.getItem("lastPage") === "your-rides" ? "Your Rides" : "Find Rides"}</BackText>
        </BackArrowDiv>

        <RideSummaryDiv>
          <SeatsLeftDiv>
            <SeatsLeftNum>{(ride.spots - ride.riders.length)}</SeatsLeftNum>
            <SeatsLeftText>seat(s) left</SeatsLeftText>
          </SeatsLeftDiv>
        </RideSummaryDiv>
      </HeaderDiv>
      
      <LocationDivContainer>
          <LocationDiv>

            <LocationDateTime>              
              <LocationDateStyling>
                {mon} {day} {hour}
              </LocationDateStyling>
            </LocationDateTime>

            <LocationDepartureIcon>
              <FiberManualRecordOutlinedIcon style={{fontSize:"1em"}}/>
            </LocationDepartureIcon> 

            <LocationDepartureTitle>
                <LocationTitleStyling>
               {ride.departureLocation.title}
               </LocationTitleStyling>
            </LocationDepartureTitle>

            <LocationDestinationIcon>
              <LocationOnOutlinedIcon style={{fontSize:"1.2em"}}/>
            </LocationDestinationIcon>

            <LocationConnect>
              ....
            </LocationConnect>

            <LocationDepartureAddress>
              <LocationAddressStyling>
                  {ride.departureLocation.address}
              </LocationAddressStyling>
            </LocationDepartureAddress>
            
            <LocationDestinationTitle>
              <LocationTitleStyling>
                {ride.arrivalLocation.title}
                </LocationTitleStyling>
            </LocationDestinationTitle>

            <LocationDestinationAddress>
              <LocationAddressStyling>
                  {ride.arrivalLocation.address}
              </LocationAddressStyling>
            </LocationDestinationAddress>
          </LocationDiv>

      </LocationDivContainer>
      
      <RidersDiv>
        <HostDiv>Host</HostDiv>
        <RidersComponents>
          <div onClick={e => accessUserProfile(ride.owner.netid)}>
            <OneRiderContainer>
                <div key={ride.owner.netid}>
                  <IoPersonCircleSharpDiv>
                    <IoPersonCircleSharp></IoPersonCircleSharp>
                  </IoPersonCircleSharpDiv>
                </div>
                <RiderText>
                {ride.owner.firstName}&nbsp;{ride.owner.lastName}
                </RiderText>
              </OneRiderContainer>
            </div>
          <LineDiv>
            <hr></hr>
          </LineDiv>
          {ride.riders.filter((x) => x.netid !== ride.owner.netid).map((person) => (
            <div onClick={e => accessUserProfile(person.netid)}>
              <OneRiderContainer>
                <div key={person.netid}>
                  <IoPersonCircleSharpDiv>
                    <IoPersonCircleSharp></IoPersonCircleSharp>
                  </IoPersonCircleSharpDiv>
                </div>
                <RiderText>
                  {person.firstName}&nbsp;{person.lastName}
                </RiderText>
              </OneRiderContainer>
            </div>
          ))}
        </RidersComponents>
        <RideNotesHeader>Ride Notes</RideNotesHeader> 
        <NotesDiv>
        {ride.notes || 'No ride notes'}
        </NotesDiv>
      </RidersDiv>
            
      <ButtonContainer>
        {ride.riders.map((person) => person.netid).includes(localStorage.getItem('netid')) ?
        <ButtonDiv onClick={leave} leaveRide = {true}>
          Leave Ride
        </ButtonDiv>: 
        <ButtonDiv onClick={handleClickOpen} disabled={ride.spots === ride.riders.length}>
          Join Ride
        </ButtonDiv>}
      </ButtonContainer>

      <JoinRideDialog
                open={openLogin}
                onClose={handleCloseLogin}
            >
            <Grid container spacing = {12} justifyContent = "center">
                <Grid item sm = {11} xs = {10}/>
                <Grid item sm = {1} xs = {2}>
                    <IconButton onClick = {handleCloseLogin} size = "medium">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Grid item xs = {10} justifyContent = "center">
                    <ConfirmationText>{confirmationText}</ConfirmationText>
                    <LoginDialogActions>
                        <LoginButton onClick={join} autoFocus>Got it! Login with Rice SSO</LoginButton>
                    </LoginDialogActions>
                  </Grid>
            </Grid>
      </JoinRideDialog>
      
      <JoinRideDialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
            >
            <Grid container spacing = {12} justifyContent = "center">
                <Grid item sm = {11} xs = {10}/>
                <Grid item sm = {1} xs = {2}>
                    <IconButton onClick = {handleCloseConfirmation} size = "medium">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Grid item xs = {10} justifyContent = "center">
                  <ConfirmationText>{confirmationText}</ConfirmationText>
                    <LoginDialogActions>
                        <LoginButton onClick={join} autoFocus>Got it! Join Ride</LoginButton>
                    </LoginDialogActions>
                  </Grid>
            </Grid>
      </JoinRideDialog>
      <JoinRideDialog
                open={openUserProfile}
                onClose={handleCloseLoginForUser}
            >
            <Grid container spacing = {12} justifyContent = "center">
                <Grid item sm = {11} xs = {10}/>
                <Grid item sm = {1} xs = {2}>
                    <IconButton onClick = {handleCloseLoginForUser} size = "medium">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Grid item xs = {10} justifyContent = "center">
                  <ConfirmationText>{"Log in to view this user's profile."}</ConfirmationText>
                    <LoginDialogActions>
                        <LoginButton onClick={handleLoginForUser} autoFocus>Rice SSO Login</LoginButton>
                    </LoginDialogActions>
                  </Grid>
            </Grid>
      </JoinRideDialog>
    </AllDiv>
  )
}
export default RideSummary
