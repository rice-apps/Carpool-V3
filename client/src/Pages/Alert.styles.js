import {
    Button, 
    Dialog,
    DialogActions,
    IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


// X: Button that is styled to be in absolute position at the top right
// Login: Button that is centered and blue

export const LoginButton = withStyles({
    root: {
        display: 'absolute',
        justifyContent: 'center',
        background: '#2075D8',
        width: '50vw',
        borderRadius: 25,
        color: 'white',
        height: '5vh',
    },
    label: {
      textTransform: 'capitalize',
      fontFamily: 'Josefin Sans'
    },
})(Button);

export const LoginDialog = withStyles({
    root: {
        background: '#FFFFFF',
        borderRadius: 8, 
        border: 0, 
    }, 
    paper: {
        display: 'flex',
        justifyContent: 'align-start',
        background: '#FFFFFF',
        width: '75vw',
        height: '20vh',
    }
})(Dialog); 

export const LoginDialogActions = withStyles({
    root: {
        justifyContent: 'center',
    }
})(DialogActions); 

export const LoginIconButton = withStyles({
    root: {
        display: 'absolute',
        justifyContent: 'right'
    }
})(IconButton);
