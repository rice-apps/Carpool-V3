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

import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
const theme = createTheme({
    typography: {
      fontFamily: "Josefin Sans"
    }
  });

const helmetContext = {};

export const history = createBrowserHistory();

export const ShorterToast = ({ children, ...props }) => (
    <DefaultToast {...props} style={{width: "250px"}}>
        {children}
    </DefaultToast>
);

render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <HelmetProvider context={helmetContext}>
    <ThemeProvider theme = {theme}>
        <ApolloProvider client={client}>
        <Router history={history} basename={process.env.PUBLIC_URL}>
            <ToastProvider autoDismiss components = {{Toast: ShorterToast}}>
                <Routes />
            </ToastProvider>
        </Router>
    </ApolloProvider>
    </ThemeProvider>
    </HelmetProvider>
    </GoogleOAuthProvider>,
    document.querySelector('#app')
);