import {
    Button, 
    Dialog,
    DialogActions
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


// X: Button that is styled to be in absolute position at the top right
// Login: Button that is centered and blue

export const LoginButton = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        background: '#2075D8',
        width: '5vw',
        borderRadius: 8,
        border: 0,
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
        width: '30vw', 
        height: '40vh',
        border: 0
    }, 
    paper: {
        display: 'absolute',
        justifyContent: 'center',
        background: '#FFFFFF',
        borderRadius: 8, 
        width: '30vw', 
        height: '40vh',
        border: 0
    }
})(Dialog); 
