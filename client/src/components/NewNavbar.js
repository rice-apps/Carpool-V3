import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import { List, ListItemAvatar, ListItem, ListItemIcon, ListItemText, 
  Drawer, Divider, IconButton, AppBar, Toolbar, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import { gql, useQuery } from "@apollo/client";

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

  const toggleDrawer = () => setDrawer(!drawer);

  const {id} = useParams()

  const GET_USER = gql`
  query GetUserInfo ($netID: String)
  {
    userOne (filter:{netid : $netID}) {
      _id
      firstName
      lastName
    }
  }`

  const {data: userData, loading, error} = useQuery(GET_USER, 
    {
      variables: 
      {
        netID: id,
      }
    }
  );
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const {userOne: user} = userData;
  if (!user) return <div>Invalid User ID</div>

  // Eventually should make this extensible
  const drawerItems = () => (
      <div>
        <List className = {classes.list} style = {{width: "66vw", height: "100vh"}}>
          <ListItem button component = {Link} to = "/profile" style = {{gap: "5vw"}}>
            <Avatar className = {classes.large}/>
            <ListItemText className = {classes.text} primary = {user.firstName + ' ' + user.lastName}/>
          </ListItem>
          <ListItem button component = {Link} to = "/home">
            <ListItemIcon className= {classes.icon}> <HomeIcon/> </ListItemIcon>
            <ListItemText className = {classes.text} primary = "Home"/>
          </ListItem>
          <ListItem button component = {Link} to = "/search">
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
      <AppBar position="static" color="white" elevation="0">
        <Toolbar>
          <IconButton edge="start" className={classes.icon} onClick = {toggleDrawer} aria-label="menu">
            <MenuIcon fontSize="large"/>
              <Drawer anchor = "left" open = {drawer} onClose = {toggleDrawer}>
                {drawerItems()}
              </Drawer>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}