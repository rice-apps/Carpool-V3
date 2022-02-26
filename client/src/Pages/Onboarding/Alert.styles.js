import {
    Button, 
    Dialog,
    DialogActions,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


// X: Button that is styled to be in absolute position at the top right
// Login: Button that is centered and blue

export const LoginButton = withStyles({
    root: {
        display: 'absolute',
        justifyContent: 'center',
        background: '#2075D8',
        width: '55vw',
        borderRadius: 25,
        color: 'white',
        height: '5vh',
    },
    label: {
      textTransform: 'capitalize',
      fontFamily: 'Josefin Sans',
    },
})(Button);

export const LoginDialog = withStyles({
    root: {
        borderRadius: 8, 
        border: 0, 
    }, 
    paper: {
        background: '#FFFFFF',
        width: '75vw',
        height: '20vh',
        padding: '0px'
    }
})(Dialog); 

export const JoinRideDialog = withStyles({
    root: {
        borderRadius: 8, 
        border: 0, 
    }, 
    paper: {
        background: '#FFFFFF',
        width: '75vw',
        height: '25vh',
        padding: '0px'
    }
})(Dialog); 

export const LoginDialogActions = withStyles({
    root: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '2vh 1vw'
    }
})(DialogActions); 

