import React from "react";
import logo from '../logo.svg';
import '../App.css';
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import {SearchButton, SearchButtonDiv} from './HomeStyles.js'
import { ColorButton } from "../components/Create.styles";
const Home = () => {
    const MainHeader = styled.header`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        min-height: 100vh;
        background-color: #282c34;
        color: white;
        @media (max-width: 480px) {
            background-color: #553d67;
        }

    `
    const toSearch = () => {
        window.location.replace("/search");
    }
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
            <SearchButtonDiv>
                <SearchButton onClick={() => toSearch()}>
                    Search for Rides
                </SearchButton>
            </SearchButtonDiv>
        </MainHeader>
        
        
        </div>
    )
}

export default Home;