import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import { BiLogIn } from 'react-icons/bi'

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Authentification',
    path: '/auth',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },
  {
    title: 'Login',
    path: '/login',
    icon: <BiLogIn />,
    cName: 'nav-text',
  },
]
