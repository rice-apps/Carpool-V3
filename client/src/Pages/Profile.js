import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

    const ProfileCard = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;

    const ReturnHeader = styled.div`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 10px 10px 10px;
    `;

    const ButtonBox = withStyles({
        label: {
            textTransform: 'capitalize',
        }
    })(Button);

    const BackArrow = withStyles({
        root: {
            display: 'flex',
            color: '#2075D8',
            justifyContent: 'center',
            alignItems: 'center'
        }
      })(ChevronLeftIcon);

    const UserPic = styled.img`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;

        width: 220px;
        height: 220px;
        background-image: url("https://profiles.rice.edu/sites/g/files/bxs3881/files/2020-08/LuayNakhleh600x600.jpg");
        border-radius: 50%;
        background-size: cover;
    `;

    const UserName = styled.p`
        display: flex; 
        justify-content: center;
        align-items: center;
        padding: 50px 0px 0px 0px;

        font-family: Josefin Sans;
        font-weight: 600;
        font-size: 30px;
        line-height: 30px;
        text-align: center;

        color: #002140;
    `;

    const PhoneNumber = styled.p`
        display: flex; 
        justify-content: center;
        align-items: center;
        padding: 10px 0px 25px 0px;

        font-family: Josefin Sans;
        font-weight: 300;
        font-size: 18px;
        line-height: 18px;
        text-align: center;

        color: #002140;
    `;

    const TextBox = withStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '25px',
            width: '75vw',
            height: '10vh',
            borderRadius: '9px',
            background: 'rgba(187, 218, 255, 0.22)'
        }, 
        label: {
            textTransform: 'none',
        }
    })(Button);

    // const TextBox = styled.div`
    //     display: flex; 
    //     justify-content: center;
    //     align-items: center;
    //     margin-top: 25px;
    //     width: 75vw;
    //     height: 10vh;
    //     border-radius: 9px;

    //     background: rgba(187, 218, 255, 0.22);
        
    // `;

    const StyledText = styled.p`
        display: flex; 
        padding: 0px 0px 0px 10px;

        font-family: Josefin Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #2075D8;
    `;

    const StyledText2 = styled.p`
        display: flex; 
        justify-content: center;
        align-items: center;
        padding: 0px 0px 0px 0px;

        font-family: Josefin Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 13px;
        text-align: center;
        letter-spacing: 0.07em;

        color: #2075D8;
    `;

    const StyledText3 = styled.p`
        display: flex; 
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        margin-top: 3px;

        font-family: Josefin Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 18px;
        text-align: center;

        color: #2075D8;
    `;

    const MailBox = withStyles({
        root: {
            color: '#2075D8'
        }
      })(MailIcon);

const Profile = () => {

    return(
        <div>
            <ReturnHeader>
                <ButtonBox>
                    <BackArrow></BackArrow>
                    <StyledText3>Ride Summary</StyledText3>
                </ButtonBox>
            </ReturnHeader>
            <ProfileCard>
                <UserPic></UserPic>
                <UserName>Luay Nakhleh</UserName>
                <PhoneNumber>(123)456-7890</PhoneNumber>
                <TextBox>
                    <MailBox></MailBox>
                    <StyledText>dontemailme@rice.edu</StyledText>
                </TextBox>
                <TextBox>
                    <StyledText2>Venmo</StyledText2>
                    <StyledText>@comp182Luay</StyledText>
                </TextBox>
            </ProfileCard>
        </div>
    )
}

export default Profile;