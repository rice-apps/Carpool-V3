import React from "react";
import '../../App.css';
import { Link } from 'react-router-dom';
import {FunctionTextTop, FunctionTextBot, Header, SearchButton} from './HomeStyles.js'

const Home = () => {

    return (
        <div className="App">
        <Header>
            <img alt='Carpool Logo' src="/dark mode.png" width="400" height="400"/>
            <FunctionTextTop>
                Find and coordinate rides with 
            </FunctionTextTop>
            <FunctionTextBot>
                other students - all in one place.
            </FunctionTextBot>
            <Link to="/search"><SearchButton>Start Riding</SearchButton></Link>

        </Header>
    
        </div>
    )
}

export default Home;