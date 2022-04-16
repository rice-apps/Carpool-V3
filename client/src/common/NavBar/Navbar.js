import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import InfoIcon from '@material-ui/icons/PeopleRounded';
import FeedbackIcon from '@material-ui/icons/ChatRounded';
import OpenInNewIcon from '@material-ui/icons/OpenInNewRounded';
import { List, ListItem, ListItemIcon, ListItemText, 
  Drawer, IconButton, AppBar, Toolbar, Avatar, Button, Divider } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom'
import { gql, useQuery} from "@apollo/client";
import { useEffect } from 'react';
// SSO imports
import { SERVICE_URL } from '../../config'; 
const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 
const feedbackURL = 'https://tinyurl.com/carpool-feedback'


const GET_USER = gql`
query GetUserInfo ($netID: String)
{
  userOne (filter:{netid : $netID}) {
    firstName
    lastName
  }
}`

export default function ButtonAppBar (props) {

    // set appbar colour
  const currURL = window.location.pathname;
  const [appbarColor, setAppbarColor] = useState((currURL === "/about" || currURL === "/FAQ") ? "#012E62" : 
  ((currURL.includes("/ridesummary") || currURL.includes("/profile")) ? "rgb(244, 246, 249)" : "white"))

  const [hamburgerColor, setHamburgerColor] = useState((currURL === "/about" || currURL === "/FAQ") ? "white" : "#002140")

  const useStyles = makeStyles((theme) => ({
    appbarRoot: {
      zIndex:"999",
      background: appbarColor,
    },
    icon: {
      color: "#002140"
    },
    secondaryIcon: {
      fontSize: 'medium',
      color: '#BAC3CE'
    },
    burgerIcon: {
      minWidth: '40px',
      color: hamburgerColor,
    },
    item: {
      height: '8vh',
      paddingLeft: '24px',
      paddingRight: '24px'
    },
    text : {
      color:"#002140",
    },
    disabledText: {
      fontStyle: 'italic'
    },
    divider: {
      backgroundColor: '#BBDAFF',
      margin: '10px 30px 10px 30px',
      height: '2px'
    },
    avatarIcon : {
      width: "8vh",
      height: "8vh"
    },
    bottomItem : {
      marginTop: "auto"
    },
    list: {
      display: "flex",
      flexDirection: "column",
      width: "66vw",
      height: "100vh",
      maxWidth: '350px',
    },
    usernameContainer:{
      gap: "15%",
      height: "15vh",
      paddingLeft: '24px',
      paddingRight: '24px'
    },
    logInOutContainer:{
      display:"flex", 
      justifyContent:"center", 
      height: "15vh",
      paddingLeft: '24px',
      paddingRight: '24px'
    },
  }));
  
  const LogInOutButton = withStyles({
    root: {
        background: '#2075D8',
        width: '33vw',
        borderRadius: 25,
        color: 'white',
    },
    label: {
      textTransform: 'capitalize',
      fontFamily: 'Josefin Sans'
    },
  })(Button);

  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const loggedIn = localStorage.getItem('token') != null;
  const [showBar, setShowBar] = useState(false);

  const toggleDrawer = () => setDrawer(!drawer);

  const {data: userData, loading, error} = useQuery(GET_USER, 
    {
      variables: 
      {
        netID: localStorage.getItem('netid'),
      }
    }
  );
  const location = useLocation();
  useEffect(() => {
    if (["/", "/home", "/userAuth", "/onboarding", "/404"].includes(location.pathname)){
      setShowBar(false)
    }
    else { 
      setShowBar(true)
    }

    setAppbarColor((currURL === "/about" || currURL === "/FAQ") ? "#012E62" : 
    ((currURL.includes("/ridesummary") || currURL.includes("/profile")) ? "rgb(244, 246, 249)" : "white"))

    setHamburgerColor((currURL === "/about" || currURL === "/FAQ") ? "white" : "#002140")

    
  }, [location.pathname, currURL])

  // if (loading) return <LoadingDiv height={'9vh'} />;
  // if (error) return `Error! ${error.message}`;
  // if (!userData) return "User not found!"; 

  var user = {
    firstName: "Loading",
    lastName: " ",
  }

  if (!(loading || error || !userData)) {
    user = userData.userOne
  }

  // const {userOne: user} = userData;

  const logout = () => {
    localStorage.clear();
    //window.location.reload()
    window.location.replace("/home")
    

  }

  const login = () => {
    localStorage.setItem('nextPage', window.location.pathname); 
  }

  const redirect = () => {
    let redirectURL = casLoginURL + '?service=' + SERVICE_URL;
    window.open(redirectURL, '_self');
  }

  const routeToProfile = () => {
    localStorage.setItem("lastPage", window.location.pathname.substring(1));
    window.open("/profile/" + localStorage.getItem('netid'), "_self");
    toggleDrawer();
  }

  const openFeedback = () => {
    window.open(feedbackURL, '_blank');
  }

  const showUsername = (toggleDrawer) => (
    <ListItem button className={classes.usernameContainer} onClick = {routeToProfile}>
      <Avatar className = {classes.avatarIcon}/>
      <ListItemText className = {classes.text} primary = {user.firstName + " " + user.lastName}/>
    </ListItem>
  )

  const showLogin = (toggleDrawer) => (
      <ListItem className={classes.logInOutContainer} disableGutters = "true">
        <LogInOutButton onClick = {() => {toggleDrawer(); login(); redirect();}}>Login</LogInOutButton>
      </ListItem>
  )

  const showLogout = (toggleDrawer) => (
    <ListItem className={classes.logInOutContainer}>
      <LogInOutButton onClick = {() => {toggleDrawer(); logout();}}>Logout</LogInOutButton>
    </ListItem>
  )




  // Eventually should make this extensible
  const drawerItems = (toggleDrawer) => (
    <div>
      <List className = {classes.list}>
        {loggedIn ? showUsername(toggleDrawer) : showLogin(toggleDrawer)}
        <ListItem button  className = {classes.item} component = {Link} to = "/search" onClick = {toggleDrawer}>
          <ListItemIcon className= {classes.icon}> <HomeIcon/> </ListItemIcon>
          <ListItemText className = {classes.text} primary = "Home"/>
        </ListItem>
        <ListItem button classes = {{root: classes.item, disabled: classes.disabledText}} disabled = {!loggedIn} component = {Link} to = "/your-rides" onClick = {toggleDrawer}>
          <ListItemIcon className = {classes.icon}> <CarIcon/> </ListItemIcon>
          <ListItemText classes = {classes.text} primary = "Your Rides"/>
        </ListItem>
        <Divider variant="middle" classes = {{root: classes.divider}}/>
        <ListItem button className = {classes.item} component = {Link} to = "/about" onClick = {toggleDrawer}>
          <ListItemIcon className= {classes.icon}> <InfoIcon/> </ListItemIcon>
          <ListItemText  className = {classes.text} primary = "About Us"/>
        </ListItem>
        <ListItem button className = {classes.item} onClick = {openFeedback}>
          <ListItemIcon className= {classes.icon}> <FeedbackIcon/> </ListItemIcon>
          <ListItemText classses = {classes.text} primary = "Give us feedback!"/> 
          <OpenInNewIcon className= {classes.secondaryIcon}/> 
        </ListItem>
        {loggedIn ? showLogout(toggleDrawer) : null}
      </List>
    </div>
  );

  return (
    <div>
    {showBar ?
    <div>
        <AppBar 
          position="fixed" 
          color= "black" 
          elevation="0" 
          className={classes.appbarRoot}> 
          <Toolbar style ={{height: "64px"}}>
            <IconButton edge="start" className={classes.burgerIcon} onClick = {toggleDrawer} aria-label="menu">
              <MenuIcon fontSize="large"/>
            </IconButton>
            <Drawer anchor = "left" open = {drawer} onClose = {toggleDrawer}>
                  {drawerItems(toggleDrawer)}
            </Drawer>
          </Toolbar>
        </AppBar>
        <Toolbar style ={{height: "64px"}}/>
    </div>
    : null
  }
  </div>
  );
}