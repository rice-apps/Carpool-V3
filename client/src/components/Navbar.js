import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import { List, ListItem, ListItemIcon, ListItemText, 
  Drawer, Divider, IconButton, AppBar, Toolbar, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { gql, useQuery} from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  icon: {
    color:"#002140",
  },
  text : {
    color:"#002140",
  },
  large : {
    width: "8vh",
    height: "8vh"
  },
  bottom : {
    marginTop: "auto"
  },
  list: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const loggedIn = localStorage.getItem('netid') != null;

  const toggleDrawer = () => setDrawer(!drawer);

  const showUsername = () => (
    <ListItem button component = {Link} to = "/profile" style = {{gap: "5vw"}}>
      <Avatar className = {classes.large}/>
      <ListItemText className = {classes.text} primary = "Filler Name"/>
    </ListItem>
  )

  const showLogin = () => (
    <div>
      <ListItem button component = {Link} to = "/login" style = {{}}>
        <ListItemText className = {classes.text}  primary = "Login"/>
      </ListItem>
      <Divider/>
    </div>
  )

  // Eventually should make this extensible
  const drawerItems = () => (
    <div>
      <List className = {classes.list} style = {{width: "66vw", height: "100vh"}}>
        {loggedIn ? showUsername() : showLogin()}
        <ListItem button component = {Link} to = "/home">
          <ListItemIcon className= {classes.icon}> <HomeIcon/> </ListItemIcon>
          <ListItemText className = {classes.text} primary = "Home"/>
        </ListItem>
        <ListItem button disabled = {!loggedIn} component = {Link} to = "/search">
          <ListItemIcon className = {classes.icon}> <CarIcon/> </ListItemIcon>
          <ListItemText className = {classes.text} primary = "Your Rides"/>
        </ListItem>
        <ListItem button className = {classes.bottom} component = {Link} to = "/about">
          <ListItemText className = {classes.text} primary = "About"/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
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