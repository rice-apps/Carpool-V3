import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
import { gql, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
    ProfileCard,
	ReturnHeader,
	UserName,
	UserPic,
	PhoneNumber,
	StyledText,
	StyledText2,
	StyledText3
} from './ProfileStyles.js';

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

const MailBox = withStyles({
    root: {
        color: '#2075D8'
    }
})(MailIcon);

const Profile = () => {

    const {id} = useParams()

    const { addToast } = useToasts();

    const GET_USER = gql`
    query GetUserInfo ($netID: String)
    {
        userOne (filter:{netid : $netID}) {
            _id
    				firstName
    				lastName
    				netid
                    phone
        }
    }`

    const {data: userData, loading, error} = useQuery(GET_USER, 
        {
            variables: 
            {
              netID: id,
            }
        }
    );
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const {userOne: user} = userData;
    if (!user) return <div>Invalid User ID</div>

    function goBack() {
        window.history.back();
    }

    return(
        <div>
            <ReturnHeader>
                <ButtonBox
                onClick = {goBack}>
                    <BackArrow></BackArrow>
                    <StyledText3>Ride Summary</StyledText3>
                </ButtonBox>
            </ReturnHeader>
            <ProfileCard>
                <UserPic></UserPic>
                <UserName>{user.firstName + ' ' + user.lastName}</UserName>
                <PhoneNumber>{user.phone ? user.phone : 'Phone Number Unavailable'}</PhoneNumber>
                <TextBox
                    onClick={() => {navigator.clipboard.writeText(user.netid + '@rice.edu').then(addToast("Email Copied to Clipboard!", { appearance: 'success'}))}}>
                    <MailBox></MailBox>
                    <StyledText>{user.netid}@rice.edu</StyledText>
                </TextBox>
                <TextBox
                    onClick={() => {navigator.clipboard.writeText('@comp182Luay').then(addToast("Venmo ID Copied to Clipboard!", { appearance: 'success'}))}}
                >
                    <StyledText2>Venmo</StyledText2>
                    <StyledText>@kaihung7</StyledText>
                </TextBox>
            </ProfileCard>
        </div>
    )
}

export default Profile;