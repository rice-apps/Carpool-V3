import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import {
    MenuItem,
    Select, 
    InputLabel,
    Button
} from '@material-ui/core';

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;
    padding: 40px;
    border-radius: 25px;
    background: #E4E9F187;
    ;


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

export const StyledButton = withStyles({
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

export const MenuBox = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: '65vw',
        border: 0,
        color: '#0B3669',
        height: 36,
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
        padding: '8px 16px'
    }
})(MenuItem);

export const InputBox = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: '#0B3669',
        fontFamily: 'Josefin Sans',
        fontSize: '13px',
    }
})(InputLabel);

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

