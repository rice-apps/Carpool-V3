import styled from 'styled-components'


const MainHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(20pw + 2vmin);
  min-height: 100vh;
  background-color: #282c34;
  color: white;
  @media (max-width: 50vw) {
      background-color: #553d67;
  }
`

export {
  MainHeader
}
