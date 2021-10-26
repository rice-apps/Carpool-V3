import React from 'react'
import HomeIcon from '@material-ui/icons/HomeRounded';
import CarIcon from '@material-ui/icons/DirectionsCarRounded';

export const newNavbarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <HomeIcon/>,
    cName: 'nav-text',
  },
  {
    title: 'Your Rides',
    path: '/search',
    icon: <CarIcon/>,
    cName: 'nav-text',
  },
]
