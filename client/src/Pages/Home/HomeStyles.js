import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #002140;
  width: 100vw;
  height: 100vh;
  position: relative;
  backdrop-filter: blur(20px);
`

const FunctionTextTop = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2em;
  color: white;
  line-height:0.90;
  top: 60vh;
  margin-left: 5vw;
  margin-right: 5vw;
`

const FunctionTextBot = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2em;
  color: white;
  line-height:0.90;
  top: 64vh;
  margin-left: 5vw;
  margin-right: 5vw;
`

const SearchButton = styled.button`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  display: flex;
  text-align: center;
  cursor: pointer;

  width:50vw;
  height: 7vh;
  border-radius: 20vw;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #002140;
  top: 70vh;
  left: 25vw;
`

export {
  Header, 
  FunctionTextTop,
  FunctionTextBot,
  SearchButton,
}