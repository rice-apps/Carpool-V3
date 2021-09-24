import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'
import {
  NavBarDiv,
  MenuBarsLink,
  NavMenu,
  NavText,
  NavMenuItemsContainer,
  NavbarToggleDiv
} from './Navbar.styles'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <NavBarDiv>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </NavBarDiv>

        <NavMenu sidebar={sidebar}>
          <NavMenuItemsContainer>
            <ul onClick={showSidebar}>
              <NavbarToggleDiv>
                <li>
                  <MenuBarsLink to='#'>
                    <AiIcons.AiOutlineClose />
                  </MenuBarsLink>
                </li>
              </NavbarToggleDiv>

              {SidebarData.map((item, index) => {
                return (
                  <NavText>
                    <li key={index}>
                      <Link to={item.path}>
                        {item.icon}&nbsp;
                        {item.title}
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
