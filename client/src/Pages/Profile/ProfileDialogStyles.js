import styled from 'styled-components'

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    min-height: 10vh;
    background-color: white;
    color: navy;
`
export const EditName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1vh;
    background-color: white;
    color: navy;
`

export const EditContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3vh;
    background-color: white;
    color: navy;
`

export const EditPaymentOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3vh;
    background-color: white;
    color: navy;
`

export const SubmitButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:10vh;
    width: 70vw;
    margin: auto;
    top: 29vh;
    left: 0.3vw;
    position: relative;
`

export const Popup = styled.div`
   width: 77vw;
   height: 77vh;
  border-radius: 25px;
  color: white;
  left: 20vw;
  position:0vw;
`
export const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
`
export const NameSectionHeader = styled.header`
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
export const FirstNameTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 10vh;
    left: 9vw;
    border-radius:2.0em;    
`
export const LastNameTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 11vh;
    left: 9vw;
    border-radius:2.0em;
`

export const ContactSectionHeader = styled.header`
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

export const PhoneTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 17vh;
    left: 9vw;
    border-radius:2.0em;
`
export const EmailTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 17vh;
    left: 9vw;
    border-radius:2.0em;
`

export const PaymentSectionHeader = styled.header`
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

export const PaymentDropdown = styled.div`
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

export const PaymentTextBox = styled.div`
    position: relative;
    width: 58vw;
    height: 5vh;
    top: 30vh;
    left: 9vw;
    border-radius:2.0em;
`

export const HideAppBar = styled.div`
`

// export {
//     Header,
//     EditName,
//     EditContactInfo,
//     EditPaymentOptions,
//     SubmitButton,
//     HideAppBar,
//     SubmitButton,
//     NameSectionHeader,
//     ContactSectionHeader,
//     PaymentSectionHeader,
//     FirstNameTextBox,
//     LastNameTextBox,
//     PhoneTextBox,
//     EmailTextBox,
//     PaymentTextBox,
//     Popup,
//     PaymentDropdown,
//     IconContainer,
// }