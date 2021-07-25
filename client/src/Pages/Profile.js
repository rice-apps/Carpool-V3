import React from 'react';
import styled from 'styled-components';
import {Grid, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ProfileCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: space-between;
    flex-direction: column;
`;

const ColorButton = withStyles({
    root: {
        background: '#2075D8',
        width: '70vw',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        fontFamily: 'Josefin Sans'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

const UserName = styled.p`
    position: absolute;
    width: 285px;
    height: 19px;
    left: 64px;
    top: 369px;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 30px;
    text-align: center;

    color: #002140;
`;

const PhoneNumber = styled.p`
    position: absolute;
    width: 123px;
    height: 19px;
    left: 145px;
    top: 407px;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 18px;
    text-align: center;

    color: #002140;
`;

const TextBox = styled.div`
    float: left;
    position: absolute;
    width: 249px;
    height: 70px;
    left: 84px;
    top: 472px;

    background: rgba(187, 218, 255, 0.22);
    
`;

const StyledText = styled.p`
    position: absolute;
    width: 147px;
    height: 19px;
    left: 155px;
    top: 498px;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 18px;
    text-align: center;

    background: rgba(187, 218, 255, 0.22);
    border-radius: 9px;
    
    color: #2075D8;
`;

const Profile = () => {
    return(
        <ProfileCard>
            <UserName>Katherine Chui</UserName>
            <PhoneNumber>(123)456-7890</PhoneNumber>
            <ColorButton disabled='true'>kac20@rice.edu</ColorButton>
            {/* <TextBox>
                <StyledText>kac20@rice.edu</StyledText>
            </TextBox>
            <TextBox>
                <StyledText>Venmo @katherinechui</StyledText>
            </TextBox> */}
        </ProfileCard>
    )
}

export default Profile;