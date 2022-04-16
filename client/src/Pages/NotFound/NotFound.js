import React from "react";
import '../../App.css';
import { Link } from 'react-router-dom';
import {FunctionTextTop, 
        FunctionTextMiddle,
        FunctionTextBot, 
        HomePage, 
        ImageBox,
        SearchButton} from './NotFoundStyles'

const NotFound = () => {

    return (
        
        <HomePage>
            <ImageBox
                component="img"
                alt="Carpool Logo"
                src="/dark mode.png"
            >
            </ImageBox>
            <FunctionTextTop>
                404
            </FunctionTextTop>
            <FunctionTextMiddle>
                Not Found
            </FunctionTextMiddle>
            <FunctionTextBot>
                Click here to return to search!
            </FunctionTextBot>
            <Link to="/search" style={{ textDecoration:"none" }}><SearchButton>Search</SearchButton></Link>
        </HomePage>
    )
}

export default NotFound;