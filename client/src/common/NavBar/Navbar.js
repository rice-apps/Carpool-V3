import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import { List, ListItem, ListItemIcon, ListItemText, 
  Drawer, IconButton, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom'
import { gql, useQuery} from "@apollo/client";
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  icon: {
    color:"#002140",
  },
  text : {
    color:"#002140",
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
  },
  usernameContainer:{
    gap: "5vw",
    height: "15vh"
  },
  logInOutContainer:{
    display:"flex", 
    justifyContent:"center", 
    height: "15vh",
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

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (!userData) return "User not found!"; 

  const {userOne: user} = userData;

  const logout = () => {
    localStorage.clear();
    window.location.reload()
  }

  const showUsername = () => (
    <ListItem button component = {Link} to = {"/profile/" + localStorage.getItem('netid')}  className={classes.usernameContainer}>
      <Avatar className = {classes.avatarIcon}/>
      <ListItemText className = {classes.text} primary = {user.firstName + " " + user.lastName}/>
    </ListItem>
  )

  const showLogin = () => (
      <ListItem className={classes.logInOutContainer} divider = "true" disableGutters = "true">
        <LogInOutButton component = {Link} to = "/login">Login</LogInOutButton>
      </ListItem>
  )

  const showLogout = () => (
    <ListItem className={classes.logInOutContainer}>
      <LogInOutButton onClick = {() => {logout()}}>Logout</LogInOutButton>
    </ListItem>
  )

  // Eventually should make this extensible
  const drawerItems = () => (
    <div>
      <List className = {classes.list}>
        {loggedIn ? showUsername() : showLogin()}
        <ListItem button component = {Link} to = "/home">
          <ListItemIcon className= {classes.icon}> <HomeIcon/> </ListItemIcon>
          <ListItemText className = {classes.text} primary = "Home"/>
        </ListItem>
        <ListItem button disabled = {!loggedIn} component = {Link} to = "/your-rides">
          <ListItemIcon className = {classes.icon}> <CarIcon/> </ListItemIcon>
          <ListItemText className = {classes.text} primary = "Your Rides"/>
        </ListItem>
        <ListItem button className = {classes.bottomItem} component = {Link} to = "/about">
          <ListItemText className = {classes.text} primary = "About"/>
        </ListItem>
        {loggedIn ? showLogout() : null}
      </List>
    </div>
  );

  return (
    <div>
    {showBar ?
    <div>
        <AppBar position="fixed" color="white" elevation="0"> 
          <Toolbar>
            <IconButton edge="start" className={classes.icon} onClick = {toggleDrawer} aria-label="menu">
              <MenuIcon fontSize="large"/>
                <Drawer anchor = "left" open = {drawer} onClose = {toggleDrawer}>
                  {drawerItems()}
                </Drawer>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar/>
    </div>
    : null
  }
  </div>
  );
}