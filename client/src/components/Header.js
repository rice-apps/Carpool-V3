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
    font-size: 48px;
    line-height: 48px;

    color: #002140;
`;

const Subheading = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 20px;

    color: #BBDAFF;
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