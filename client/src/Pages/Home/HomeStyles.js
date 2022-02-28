import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';

const HomePage = withStyles({
  root:{
    display: 'flex',
    flexDirection: 'column', 
    alignItems: "center",
    background: "#002140",
    backdropFilter: "blur(20px)",
    borderRadius: "0",
    height: "100vh", 
    width: "100vw",
    overflow: "hidden",
  }
})(Paper); 

const ImageBox = withStyles({
  root:{
    display: 'flex',
    flexDirection: 'column', 
    alignItems: "center",
    background: "#002140",
    height: "50vh", 
    width: "50vh",
    maxWidth: "100em",
    marginTop: "10vh"
  }
})(Box); 

const FunctionTextTop = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5vh;
  color: white;
  line-height:0.90;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 1vh;
`

const FunctionTextBot = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5vh;
  color: white;
  line-height: 0.90;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-bottom: 5vh;
`

const SearchButton = styled.button`
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  display: flex;
  text-align: center;
  cursor: pointer;

  width: 50vw;
  max-width: 25em;
  height: 7vh;
  border-radius: 20vw;

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 2.5vh;
  line-height: 3vh;
  margin-bottom: 10vh;
`

export {
  HomePage, 
  ImageBox,
  FunctionTextTop,
  FunctionTextBot,
  SearchButton,
}