import React from 'react';
import styled from 'styled-components';

const Profile = () => {

    const ProfileCard = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        align-items: space-between;
        flex-direction: column;
    `;

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

    // const ColorButton = withStyles({
    //     root: {
    //         background: '#2075D8',
    //         width: '70vw',
    //         borderRadius: 8,
    //         border: 0,
    //         color: 'white',
    //         height: 48,
    //         fontFamily: 'Josefin Sans'
    //     },
    //     label: {
    //       textTransform: 'capitalize',
    //     },
    //   })(Button);

    const PhoneNumber = styled.p`
        display: flex; 
        justify-content: center;
        align-items: center;
        padding: 10px 0px 25px 0px;

        font-family: Josefin Sans;
        font-weight: 100;
        font-size: 18px;
        line-height: 18px;
        text-align: center;

        color: #002140;
    `;

    const TextBox = styled.div`
        display: flex; 
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        width: 75vw;
        height: 10vh;
        border-radius: 9px;

        background: rgba(187, 218, 255, 0.22);
        font-family: Josefin Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #2075D8;
    `;



    return(
        <ProfileCard>
            <UserPic></UserPic>
            <UserName>Luay Nakhleh</UserName>
            <PhoneNumber>(123)456-7890</PhoneNumber>
            <TextBox>dontemailme@rice.edu</TextBox>
            <TextBox>@godamongus</TextBox>
        </ProfileCard>
    )
}

export default Profile;