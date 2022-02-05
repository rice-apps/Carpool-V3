import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import {
  IoShareSocialSharp,
  IoPersonCircleSharp,
} from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import { AiTwotoneCalendar, AiFillClockCircle } from 'react-icons/ai'
import moment from 'moment'
import { useHistory } from 'react-router'
import {
  SeatsLeftDiv,
  SeatsLeftNum,
  SeatsLeftText,
  SocialIcon,
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
  ButtonDiv,
  AllDiv,
  LocationDivContainer,
  ButtonContainer,
  DepartureDiv,
  ArrivalDiv,
  LocationArrowDiv,
  BackArrowDiv,
  InnerLocationDiv,
  DepartureIconDiv,
  CalendarText,
  TimeText
} from './RideSummaryStyles.js'
// SSO imports
import { SERVICE_URL } from '../../config'; 
import LoadingDiv from '../../common/LoadingDiv.js'
import { useToasts } from "react-toast-notifications";

const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 

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

  const [joinRide] = useMutation(JOIN_RIDE, {
    variables: { rideID: id }
  })

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
    if (lastPage === "/onboarding"){
      localStorage.setItem('nextPage', `ridesummary/${id}`); 
    }
    history.push(lastPage);
  }

  const time = moment(ride.departureDate)
  const mon = time.format('MMM').toString()
  const day = time.format('DD').toString()
  const hour = time.format('hh:mm a')

  return (
    <AllDiv>
      <BackArrowDiv onClick={() => goBack()}>
        <IoIosArrowBack></IoIosArrowBack>
      </BackArrowDiv>
      <RideSummaryDiv>
        <SeatsLeftDiv>
          <SeatsLeftNum>{(ride.spots - ride.riders.length)}</SeatsLeftNum>
          <SeatsLeftText>seat(s) left</SeatsLeftText>
          <SocialIcon>
            <IoShareSocialSharp></IoShareSocialSharp>
          </SocialIcon>
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
          {ride.riders.filter((x) => x.firstName + " " + x.lastName !== ride.owner.firstName + " " + ride.owner.lastName).map((person) => (
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
      <ButtonContainer>
        <ButtonDiv onClick={join} disabled={ride.spots === ride.riders.length}>
          Join Ride
        </ButtonDiv>
      </ButtonContainer>
    </AllDiv>
  )
}
export default RideSummary
