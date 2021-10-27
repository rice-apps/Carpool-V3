import { styled, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'

export const GridT = styled(Grid)({
    backgroundColor: 'clear',
})

export const BoxRide = styled(Box)({
    width: '10vw',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

export const StyledButton = withStyles({
    root: {
        fontSize: "2.5vh"
    },
    label: {
        fontFamily: "Josefin Sans",
        textTransform: "none",
    }  
})(Button);
