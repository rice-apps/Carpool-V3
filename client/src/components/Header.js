import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 6vh;
    line-height: 5vh;

    color: #002140;
    padding: 40px 0px 0px 0px;
`;

const Subheading = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 3vh;
    line-height: 0px;

    color: #BBDAFF;
    padding: 0px 0px 20px 0px;
`;

const Header = ({title, subtitle}) => {
    return (
        <header className='header'>
            <Heading>{title} </Heading>
            <Subheading>{subtitle}</Subheading>
        </header>
    )
}

Header.defaultProps = {
    title: 'Rice Carpool',
    subtitle: ''
}

Header.propTypes = {
    title: PropTypes.string, 
    subtitle: PropTypes.string
}

export default Header; 