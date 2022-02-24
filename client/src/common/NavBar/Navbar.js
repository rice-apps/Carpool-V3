import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import InfoIcon from '@material-ui/icons/PeopleRounded';
import MailIcon from '@material-ui/icons/MailRounded';
import OpenInNewIcon from '@material-ui/icons/OpenInNewRounded';
import { List, ListItem, ListItemIcon, ListItemText, 
  Drawer, IconButton, AppBar, Toolbar, Avatar, Button, Divider } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom'
import { gql, useQuery} from "@apollo/client";
import { useEffect } from 'react';
// SSO imports
import { SERVICE_URL } from '../../config'; 
const casLoginURL = 'https://idp.rice.edu/idp/profile/cas/login'; 
const feedbackURL = 'https://forms.gle/WFqf77FxSy8FVHgb9'

const useStyles = makeStyles((theme) => ({
  appbarRoot: {
    zIndex:"999"
  },
  icon: {
    minWidth: '40px',
    color:"#002140",
  },
  secondaryIcon:{
    fontSize: 'medium',
    color:"#BAC3CE"
  },
  item:{
    height: '8vh',
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  text : {
    fontWeight: 'bold',
    color:"#002140",
  },
  disabledText : {
    fontStyle: 'italic',
  },
  divider :{
    backgroundColor:"#BBDAFF",
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
    maxWidth: 350,
  },
  usernameContainer:{
    gap: "5vw",
    paddingLeft: '24px',
    paddingRight: '24px',
    height: "15vh"
  },
  logInOutContainer:{
    display:"flex", 
    justifyContent:"center",
    paddingLeft: '24px',
    paddingRight: '24px', 
    height: "15vh",
  },
}));

const LogInOutButton = withStyles({
  root: {
      background: '#2075D8',
      width: '100%',
      borderRadius: 25,
      color: 'white',
      margin: '0 1em',
  },
  label: {
    textTransform: 'capitalize',
    fontFamily: 'Josefin Sans'
  },
})(Button);

const GET_USER = gql`
query GetUserInfo ($netID: String)
{
  userOne (filter:{netid : $netID}) {
    firstName
    lastName
  }
}`

export default function ButtonAppBar (props) {
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
    if (location.pathname === "/home" || location.pathname === "/"){
      setShowBar(false)
    }
    else{ 
      setShowBar(true)
    }
  }, [location.pathname])

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

  const openFeedback = () => {
    window.open(feedbackURL, '_blank');
  }

  const showUsername = (toggleDrawer) => (
    <ListItem button component = {Link} to = {"/profile/" + localStorage.getItem('netid')}  className={classes.usernameContainer} onClick = {toggleDrawer}>
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
          <ListItemIcon className= {classes.icon}> <MailIcon/> </ListItemIcon>
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
        <AppBar position="fixed" color="white" elevation="0" className={classes.appbarRoot}> 
          <Toolbar>
            <IconButton edge="start" className={classes.icon} onClick = {toggleDrawer} aria-label="menu">
              <MenuIcon fontSize="large"/>
            </IconButton>
            <Drawer anchor = "left" open = {drawer} onClose = {toggleDrawer}>
                  {drawerItems(toggleDrawer)}
            </Drawer>
          </Toolbar>
        </AppBar>
        <Toolbar/>
    </div>
    : null
  }
  </div>
  );
}