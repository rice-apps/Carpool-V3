import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import { List, ListItem, ListItemIcon, ListItemText, 
  Drawer, IconButton, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { gql, useQuery} from "@apollo/client";


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
  loginContainer:{
    display:"flex", 
    justifyContent:"center", 
    height: "15vh",
  },
}));

const LoginButton = withStyles({
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

export default function ButtonAppBar() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const loggedIn = localStorage.getItem('token') != null;

  const toggleDrawer = () => setDrawer(!drawer);

  const {data: userData, loading, error} = useQuery(GET_USER, 
    {
      variables: 
      {
        netID: localStorage.getItem('netid'),
      }
    }
  );
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (!userData) return "User not found!"; 

  const {userOne: user} = userData;

  const showUsername = () => (
    <ListItem button component = {Link} to = "/profile" className={classes.usernameContainer}>
      <Avatar className = {classes.avatarIcon}/>
      <ListItemText className = {classes.text} primary = {user.firstName + " " + user.lastName}/>
    </ListItem>
  )

  const showLogin = () => (
      <ListItem className={classes.loginContainer} divider = "true" disableGutters = "true">
        <LoginButton component = {Link} to = "/login">Login</LoginButton>
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
      </List>
    </div>
  );

  return (
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
      {/* Makes the app bar sticky while not covering up the content on the page */}
      <Toolbar/>
    </div>
  );
}