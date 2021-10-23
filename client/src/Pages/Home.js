import React from "react";
import '../App.css';
import logo from '../logo.svg';
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import {MainHeader} from './HomeStyles.js'

const Home = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

    return (
        <div className="App">
        
        <MainHeader>
            
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Welcome to Carpool!
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React { isTabletOrMobile && <p>Yo we on mobile</p>}
            </a>
            <Link to= "/search">
                <Button variant="contained">Search for Rides</Button>
                
            </Link>
        </MainHeader>
        
        
        </div>
    )
}

export default Home;