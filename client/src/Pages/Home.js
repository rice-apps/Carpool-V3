import React from "react";
import '../App.css';
import { Link } from 'react-router-dom';
import {WelcomeHeader, CarpoolHeader, Header, SearchButton, ButtonContainer} from './HomeStyles.js'

const Home = () => {

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