import React from 'react'
import logo from '../logo.svg'
import '../App.css'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

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

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 480px)' })

  return (
    <div className='App'>
      <MainHeader>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/Pages/Hoome/index.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React {isTabletOrMobile && <p>Yo we on mobile</p>}
        </a>
      </MainHeader>
    </div>
  )
}

export default Home
