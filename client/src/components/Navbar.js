import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import styled, { css } from 'styled-components'

//working
const NavBarDiv = styled.div`
  background-color: #152238;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: left;
`

//working
const MenuBarsLink = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
  to='#'
`

const NavMenu = styled.nav`
  left: 0;
  transition: 350ms;
  ${(sidebar) =>
    !sidebar &
    css`
      background-color: #152238;
      width: 250px;
      height: 100vh;
      display: flex-start;
      justify-content: center;
      position: fixed;
      top: 0;
      left: -100%;
      transition: 850ms;
    `}
`

//nav text etc
const NavText = styled.div`
  display: flex-start;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;
`
const NavTextA = styled.a`
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex-start;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  &:hover {
    background-color: #0058ab;
  }
`

const NavMenuItemsContainer = styled.div`
  width: 100%;
`
const spanDiv = styled.div`
  margin-left: 16px;
`
const NavbarToggleDiv = styled.div`
  background-color: #152238;
  width: 100%;
  height: 80px;
  display: flex-start;
  justify-content: flex-start;
  align-items: center;
`

function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <NavBarDiv>
          <MenuBarsLink>
            <FaIcons.FaBars onClick={showSidebar} />
          </MenuBarsLink>
        </NavBarDiv>
        <NavMenu sidebar={sidebar}>
          <NavMenuItemsContainer>
            <ul onClick={showSidebar}>
              <NavbarToggleDiv>
                <li>
                  <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
              </NavbarToggleDiv>
              {SidebarData.map((item, index) => {
                return (
                  <NavText>
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <spanDiv>{item.title}</spanDiv>
                      </Link>
                    </li>
                  </NavText>
                )
              })}
            </ul>
          </NavMenuItemsContainer>
        </NavMenu>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
