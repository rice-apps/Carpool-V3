import PropTypes from 'prop-types';
import React from 'react';

const Header = ({title, subtitle}) => {
    return (
        <header className='header'>
            <h1>{title} </h1>
            <h2>{subtitle}</h2>
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