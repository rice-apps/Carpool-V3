import './index.css'

import React from "react"
import {render} from 'react-dom'

import { Router } from 'react-router';
import { Routes } from './common/Routes'

// Setup history
import { createBrowserHistory } from 'history';

// Setup Toast for Notifications
import { ToastProvider } from 'react-toast-notifications'
import { DefaultToast } from 'react-toast-notifications';

// Import apollo client for graphql
import { client } from './apollo';
import { ApolloProvider } from '@apollo/client'

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const theme = createTheme({
    typography: {
      fontFamily: "Josefin Sans"
    }
  });

export const history = createBrowserHistory();

export const ShorterToast = ({ children, ...props }) => (
    <DefaultToast {...props} style={{width: "250px"}}>
        {children}
    </DefaultToast>
);

render(
    <ThemeProvider theme = {theme}>
        <ApolloProvider client={client}>
        <Router history={history}>
            <ToastProvider autoDismiss components = {{Toast: ShorterToast}}>
                <Routes />
            </ToastProvider>
        </Router>
    </ApolloProvider>
    </ThemeProvider>, 
    document.querySelector('#app')
);