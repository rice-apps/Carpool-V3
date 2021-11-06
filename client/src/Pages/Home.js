import React from "react";
import '../App.css';
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom';
import {WelcomeHeader, CarpoolHeader, Header, SearchButton, ButtonContainer} from './HomeStyles.js'

const Home = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

    return (
        <div className="App">
        <Header>
            <WelcomeHeader>
                Welcome to
            </WelcomeHeader>
            <CarpoolHeader>
                Rice Carpool
            </CarpoolHeader>
        </Header>
        <ButtonContainer>
                <Link to="/search"><SearchButton>Start Riding</SearchButton></Link>
        </ButtonContainer>
        
        </div>
    )
}

export default Home;