import styled from 'styled-components'

const Popup = styled.div`
   width: 77vw;
   height: 77vh;
  border-radius: 25px;
  color: white;
  left: 20vw;
  position:0vw;
`
const IconContainer = styled.div`
    position: relative;
    top: 3.5vh;
    left: 29.45vw;
`
const NameSectionHeader = styled.header`
    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 3px;
    color: #2075D8;
    position: relative;
    top: 9vh;
    left: 10vw;
`
const FirstNameTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 10vh;
    left: 9vw;
    border-radius:2.0em;    
`
const LastNameTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 11vh;
    left: 9vw;
    border-radius:2.0em;
`

const ContactSectionHeader = styled.header`
    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 3px;
    color: #2075D8;
    position: relative;
    top: 16vh;
    left: 10vw;
`

const PhoneTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 17vh;
    left: 9vw;
    border-radius:2.0em;
`
const EmailTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 17vh;
    left: 9vw;
    border-radius:2.0em;
`

const PaymentSectionHeader = styled.header`
    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 3px;
    color: #2075D8;
    position: relative;
    top: 26vh;
    left: 10vw;
`

const PaymentDropdown = styled.div`
    display: flex;    
    flex-direction: column;    
    align-items: center;    
    justify-content: center;    
    top: 60vh;
    left: 9.5vw;

    background-color: white;    
    color: navy;
    position: absolute;
`

const PaymentTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 30vh;
    left: 9vw;
    border-radius:2.0em;
`

const SubmitButton = styled.div`
    display: flex;
    flex-direction: column;
    aligh-items: center;
    justify-content: center;
    height:10vh;
    width: 70vw;
    margin: auto;
    top: 29vh;
    left: 0.3vw;
    position: relative;
`
const HideAppBar = styled.div`
`

export {
    SubmitButton,
    NameSectionHeader,
    ContactSectionHeader,
    PaymentSectionHeader,
    FirstNameTextBox,
    LastNameTextBox,
    PhoneTextBox,
    EmailTextBox,
    PaymentTextBox,
    Popup,
    PaymentDropdown,
    IconContainer,
    HideAppBar
}