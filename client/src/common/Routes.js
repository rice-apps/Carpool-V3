import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import Login from '../Pages/Auth/Login.js'
import Onboarding from '../Pages/Onboarding/Onboarding.js'
import Alert from '../Pages/Onboarding/Alert.js'
import Auth from '../Pages/Auth/Auth.js'
import Home from '../Pages/Home/Home.js'
import Search from '../Pages/Search/Search.js'
import UserAuth from '../Pages/Auth/UserAuth.js'
import ProfileForm  from '../Pages/Profile/ProfileForm.js'
import Profile from '../Pages/Profile/Profile.js'
import CreateRide from '../Pages/CreateRide/CreateRide.js'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from '../common/NavBar/Navbar'
import { withRouter } from 'react-router'
import RideSummary from '../Pages/RideSummary/RideSummary.js'
import jwt_decode from "jwt-decode";
import YourRides from '../Pages/YourRides/YourRides.js'
import LoadingDiv from './LoadingDiv.js'

/**
 * Requests to verify the user's token on the backend
 */
const VERIFY_USER = gql`
  query VerifyQuery($token: String!) {
    verifyUser(token: $token) {
      _id
      netid
      token
      recentUpdate
    }
  }
`

/**
 * This simply fetches from our cache whether a recent update has occurred
 */
const GET_RECENT_UPDATE = gql`
  query GetRecentUpdate {
    recentUpdate @client
  }
`
// Checks if the login token has expired. If not, remove it.
const CheckTokenRoute = ({ children, ...rest }) => {
  let token = localStorage.getItem('token');

  if (token) {
    console.log("Token found");
    const {exp} = jwt_decode(token);
    const expirationTime = (exp * 1000) - 60000;
    console.log("Expriration time", expirationTime);
    console.log("Date now", Date.now());
    if (Date.now() >= expirationTime) {
      console.log("Token expired, removing");
      localStorage.removeItem('token');
      localStorage.removeItem('netid');
      localStorage.removeItem('nextPage');
    }
  }

  // Everything looks good! Now let's send the user on their way
  return (
    <Route
      {...rest}
      render={(props) => {
        return children
      }}
    />
  )
}

/**
 * Defines a private route - if the user is NOT logged in or has an invalid token,
 * then we redirect them to the login page.
 */
const PrivateRoute = ({ children, ...rest }) => {
  let token =
    localStorage.getItem('token') != null ? localStorage.getItem('token') : ''

  let client = useApolloClient()

  // Verify that the token is valid on the backend
  let { data, loading, error } = useQuery(VERIFY_USER, {
    variables: { token: token },
    errorPolicy: 'none',
  })

  if (error) {
    // Clear the token because something is wrong with it
    localStorage.removeItem('token')
    // Redirect the user to the login page
    return <Redirect path='login' />
  }
  if (loading) return <LoadingDiv />
  if (!data || !data.verifyUser) {
    // Clear the token
    localStorage.removeItem('token')
    // Redirect the user
    return <Redirect path='login' />
  }

  // Check whether any recent updates have come in
  let { recentUpdate } = data.verifyUser

  // Upon verification, store the returned information
  client.writeQuery({
    query: GET_RECENT_UPDATE,
    data: { recentUpdate: recentUpdate },
  })

  // Everything looks good! Now let's send the user on their way
  return (
    <Route
      {...rest}
      render={(props) => {
        return children
      }}
    />
  )
}

/**
 * Defines all the routes for our system.
 * @param {*} param0
 */
export const Routes = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>
          <CheckTokenRoute path={'/alert'} component={withRouter(Alert)} />
          <CheckTokenRoute path={'/userAuth'} component={withRouter(UserAuth)} />
          <CheckTokenRoute path={'/login'} component={withRouter(Login)} />
          <CheckTokenRoute path={'/onboarding'} component={withRouter(Onboarding)} />
          <CheckTokenRoute path={'/profile/:id'} component={withRouter(Profile)} />
          <CheckTokenRoute path={'/'} exact component={withRouter(Home)} />
          <CheckTokenRoute path={'/home'} component={withRouter(Home)} />
          <PrivateRoute
            path={'/create-ride'}
            component={withRouter(CreateRide)}
          />
          <CheckTokenRoute path={'/ridesummary/:id'}>
            <RideSummary />
          </CheckTokenRoute>
          <CheckTokenRoute path={'/auth'} component={withRouter(Auth)} />
          <CheckTokenRoute path={"/search"} component={withRouter(Search)} />
          <CheckTokenRoute path={"/profileform"} component={withRouter(ProfileForm)} />
          <CheckTokenRoute path={"/your-rides"} component={withRouter(YourRides)} />
        </Switch>
      </Router>
    </div>
  )
}
