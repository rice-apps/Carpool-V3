import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';
import { List, ListItemAvatar, ListItem, ListItemIcon, ListItemText, 
  Drawer, Divider, IconButton, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  icon: {
    color:"#002140",
  },
  text : {
    color:"#002140",
  }
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => setDrawer(!drawer);

  const drawerItems = () => (
      <div>
        <List>
          <ListItem button component = {Link} to = "/home">
            <ListItemIcon className= {classes.icon}> <HomeIcon/> </ListItemIcon>
            <ListItemText className = {classes.text} primary = "Home"/>
          </ListItem>
          <ListItem button component = {Link} to = "/search">
            <ListItemIcon className = {classes.icon}> <CarIcon/> </ListItemIcon>
            <ListItemText className = {classes.text} primary = "Your Rides"/>
          </ListItem>
          <ListItem button component = {Link} to = "/about">
            <ListItemText className = {classes.text} primary = "About"/>
          </ListItem>
        </List>
      </div>
  );

  // {newNavbarData.map((item, index) => {
  //   return (
  //     <List>
  //         <ListItem button component = {Link} to = {item.path}>
  //           <ListItemIcon className = {classes.icon}> {item.icon} </ListItemIcon>
  //           <ListItemText className =  {classes.text} primary = {item.title}/>
  //         </ListItem>
  //     </List>
  //   )
  // })}

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