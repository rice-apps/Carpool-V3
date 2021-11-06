import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #002140;
  width: 100vw;
  height: 100vh;
  position:absolute;
  backdrop-filter: blur(20px);
`
const WelcomeHeader = styled.header`
  align-items: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 3.4em;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  top: 0vh;
`

const CarpoolHeader = styled.header`
  position: absolute;
  align-items: center;
  justify-content: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 5.6em;
  color: white;
  padding-top: 25vh;
`

const SearchButton = styled.button`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  display: flex;
  text-align: center;

  width:50vw;
  height: 7vh;
  border-radius: 20vw;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #002140;
`

const ButtonContainer = styled.button`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: white;
  display: flex;
  top: 83vh;
  left: 25vw;
`

export {
  Header,
  CarpoolHeader, 
  WelcomeHeader,
  SearchButton,
  ButtonContainer
}
