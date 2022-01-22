import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import {
    MenuItem,
    Button, 
    Select, 
    InputLabel,
    FormControlLabel, 
    Checkbox, 
    createTheme
} from '@material-ui/core';

export const customTheme = createTheme({
	palette: {
		primary: {
			main: '#0B3669',
		}
	},
    overrides: {
        MuiInputBase: {
            input: {
                fontFamily: 'Josefin Sans',
                color: '#0B3669',
                padding: '0px 0px 0px 0px'
            }
        }
    },
})

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;
    padding: 40px;
`;

export const SelectBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '55vw',
        borderRadius: 8,
        border: 0,
        borderColor: '#0B3669',
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px 8px 16px'
    }
  })(Select);

export const MenuBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '100%',
        border: 0,
        color: '#0B3669',
        height: 36,
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
})(MenuItem);

export const ColorButton = withStyles({
    root: {
        background: '#2075D8',
        width: '70vw',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
    },
    label: {
      textTransform: 'capitalize',
      fontFamily: 'Josefin Sans'
    },
  })(Button);

  export const InputBox = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(InputLabel);

  export const FormControlLabelBox = withStyles({
    label: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
  })(FormControlLabel);

  export const DateBox = withStyles({
    root: {
        width: '68vw',
        height: '10vh'
    }, 
  })(KeyboardDateTimePicker);

  export const CheckBox = withStyles({
      root: {
        color: '#0B3669', 
        backgroundColor: 'transparent'
      }
  })(Checkbox);

  export const SelectSquare = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        background: 'white',
        width: '5vw',
        borderRadius: 8,
        border: 0,
        borderColor: '#0B3669',
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px 8px 16px'
    }
  })(Select);

  export const MenuSquare = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '15vw',
        border: 0,
        color: '#0B3669',
        height: '2vh',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
  })(MenuItem);

  export const BodyText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 2vh;
    line-height: 2vh;
    color: #0B3669;
    padding: 10px 0px 0px 0px;
  `;
