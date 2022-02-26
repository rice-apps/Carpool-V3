import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import {
  IoPersonCircleSharp,
} from 'react-icons/io5'
import { AiTwotoneCalendar, AiFillClockCircle } from 'react-icons/ai'
import moment from 'moment'
import { useHistory } from 'react-router'
import {
  SeatsLeftDiv,
  SeatsLeftNum,
  SeatsLeftText,
  RideSummaryDiv,
  LocationDiv,
  LocationText,
  DateDiv,
  CalendarIcon,
  ClockIcon,
  HostDiv,
  RidersDiv,
  LineDiv,
  RidersComponents,
  IoPersonCircleSharpDiv,
  OneRiderContainer,
  RiderText,
  NotesDiv,
  ButtonDiv,
  AllDiv,
  LocationDivContainer,
  ButtonContainer,
  DepartureDiv,
  ArrivalDiv,
  LocationArrowDiv,
  BackArrowDiv,
  BackArrow,
  BackText,
  InnerLocationDiv,
  DepartureIconDiv,
  CalendarText,
  TimeText, 
  ConfirmationText
} from './RideSummaryStyles.js'
import { Grid, IconButton } from '@material-ui/core';
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
      }
      arrivalLocation {
        title
      }
      notes
      owner {
        netid
        firstName
        lastName
        phone
      }
      riders {
        netid
        firstName
        lastName
        phone
      }
    }
  }
`

const RideSummary = () => {
  let { id } = useParams()
  const [ride, setRide] = useState({
    departureLocation: {title: "Loading"},
    arrivalLocation: {title: "Loading"},
    owner: {netid: "Loading"},
    riders: []
  })
  const history = useHistory()
  const { addToast } = useToasts();
  // States to control for Dialog
  const [openLogin, setOpenLogin] = useState(false);
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

// const UPDATE_OWNER = gql`
// mutation UpdateOwner($fillthisIn){
//   rideUpdateOne (record:{
//     owner:
//   })
// }
// `

  const [joinRide] = useMutation(JOIN_RIDE, {
    variables: { rideID: id }
  })

  const [leaveRide] = useMutation(REMOVE_RIDER, {
    variables: { rideID: id }
  })

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
      if(!data.rideOne.owner){
        ride = {...data.rideOne,owner:{netid:"err",lastName:"owner",firstName:"No"}}
      }
      else {
        ride = {...data.rideOne}
      }
      setRide(ride)
      console.log(ride)
    }
  }, [data])
  console.log(data, loading, error);
  if (error) return <p>Error.</p>
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
      console.log("Inside login, join loop");
    }

    joinRide().then((result) => {
      console.log(result);
      window.location.reload();
      console.log(result);

    }).catch((err) => {
      console.log("Caught error: Ride is full");
      addToast("Sorry! This ride is full.", { appearance: 'error'});

    });
  }


  const leave = () => {
    console.log("This is my id: " +id);
    const returned = leaveRide().then((result) => {
      console.log(result);
      window.location.reload();
      console.log(result);

    }).catch((err) => {
      console.log(err);
      addToast("Error leaving ride", { appearance: 'error'});

    });
    // If numUsers == 1, show delete ride
    console.log(returned);
  }
  
  console.log(data, loading, error);
  if (localStorage.getItem('joinFromLogin') === "true") join();
  if (error) return <p>Error.</p>
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

  const time = moment(ride.departureDate)
  const mon = time.format('MMM').toString()
  const day = time.format('DD').toString()
  const hour = time.format('hh:mm a')

  return (
    <AllDiv>
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
      <LocationDivContainer>
        <LocationDiv>
          <InnerLocationDiv>
            <LocationText>
              <DepartureIconDiv style={{ fontSize: '7vw' }}></DepartureIconDiv>
              <DepartureDiv>
                {ride.departureLocation.title}
              </DepartureDiv>
              <LocationArrowDiv>
                <BsArrowRight></BsArrowRight>
              </LocationArrowDiv>
              <ArrivalDiv>
                {ride.arrivalLocation.title}
              </ArrivalDiv>
            </LocationText>
            <DateDiv>
              <CalendarIcon>
                <AiTwotoneCalendar></AiTwotoneCalendar> 
              </CalendarIcon>
              <CalendarText>
                {mon}-{day}
              </CalendarText>
              <ClockIcon>
                <AiFillClockCircle></AiFillClockCircle>
              </ClockIcon>
              <TimeText>
                {hour}
              </TimeText>
            </DateDiv>
          </InnerLocationDiv>
        </LocationDiv>
      </LocationDivContainer>
      <RidersDiv>
        <HostDiv>Host</HostDiv>
        <RidersComponents>
          <div onClick={e => history.push("/profile/" + ride.owner.netid)}>
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
            <div onClick={e => history.push("/profile/" + person.netid)}>
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
      </RidersDiv>

      <NotesDiv>
        {ride.notes || 'No ride notes'}
      </NotesDiv>

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
    </AllDiv>
  )
}
export default RideSummary
