import PropTypes from 'prop-types';
import React from 'react';
import {
    Heading,
    Subheading
} from './Header.styles'

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