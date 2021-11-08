import styled from 'styled-components'

const Popup = styled.div`
  width: 77vw;
  height: 77vh;
  border-radius: 25px;
  color: white;
`

const SectionHeader = styled.header`
    left: 22.46%;
    right: 48.96%;
    top: 20%
    bottom: 68.61%;

    font-family: Josefin Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;

    display: flex;
    align-items: center;
    color: #2075D8
`
const TextBox = styled.div`
    position: absolute;
    width: 60.9vw;
    height: 5vh;
    left: 12vw;;
    top: 15vh;;

    background: rgba(187, 218, 255, 0.22);
    border-radius: 9px;
    padding-top: 1vh;
    
`
const EditName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1vh;
    background-color: white;
    color: navy;
`

const EditContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3vh;
    background-color: white;
    color: navy;
`

const EditPaymentOptions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3vh;
    background-color: white;
    color: navy;
`

const SubmitButton = styled.div`
    display: flex;
    flex-direction: column;
    aligh-items: center;
    justify-content: center;
    padding-top: 6vh;
    height:10vh;
    width:20vw;
    margin: auto;
`

export {
    EditName,
    EditContactInfo,
    EditPaymentOptions,
    SubmitButton,
    SectionHeader,
    TextBox,
    Popup
}