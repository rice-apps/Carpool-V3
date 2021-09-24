import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const NavBarDiv = styled.div`
  background-color: #152238;
  height: 80px;
  padding-left: 30px;
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: left;
`

export const MenuBarsLink = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
  to='#'
`

export const NavMenu = styled.nav`
  z-index: 9999;
  left: 0;
  transition: 350ms;
  background-color: #152238;
  width: 250px;
  height: 100vh;
  display: flex-start;
  justify-content: center;
  position: fixed;
  top: 0;
  ${({ sidebar }) =>
    !sidebar &&
    css`
      left: -100%;
      transition: 850ms;
    `}
`

export const NavText = styled.div`
  display: flex-start;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;

  a {
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
  }
`
export const NavMenuItemsContainer = styled.div`
  width: 100%;
`

export const NavbarToggleDiv = styled.div`
  background-color: #152238;
  width: 100%;
  height: 80px;
  display: flex-start;
  justify-content: flex-start;
  align-items: center;
`