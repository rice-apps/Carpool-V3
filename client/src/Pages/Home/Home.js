import React from "react";
import '../../App.css';
import { Link } from 'react-router-dom';
import {FunctionTextTop, 
        FunctionTextBot, 
        HomePage, 
        ImageBox,
        SearchButton} from './HomeStyles.js'

const Home = () => {

    return (
        
        <HomePage>
            <ImageBox
                component="img"
                alt="Carpool Logo"
                src="/dark mode.png"
            >
            </ImageBox>
            <FunctionTextTop>
                Find and coordinate rides with 
            </FunctionTextTop>
            <FunctionTextBot>
                other students - all in one place.
            </FunctionTextBot>
            <Link to="/search" style={{ textDecoration:"none" }}><SearchButton>Start Riding</SearchButton></Link>
        </HomePage>
        
        
    )
}

export default Home;