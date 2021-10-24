import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/MenuRounded';
import { Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white" elevation="0">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="002140" aria-label="menu">
            <MenuIcon fontSize="large"/>
              <Drawer anchor = "left" open>
                <div>
                  A
                </div>
                <div>
                  B
                </div>
              </Drawer>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}