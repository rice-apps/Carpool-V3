import styled from 'styled-components'


const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    min-height: 10vh;
    background-color: white;
    color: navy;
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
    padding-left: 40vw;
    padding-right: 40vw;
`

export {
    Header,
    EditName,
    EditContactInfo,
    EditPaymentOptions,
    SubmitButton
}