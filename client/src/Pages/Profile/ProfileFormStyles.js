import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  min-height: 10vh;
  background-color: white;
  color: navy;
`;
export const EditName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1vh;
  background-color: white;
  color: navy;
`;

export const EditContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
  background-color: white;
  color: navy;
`;

export const EditPaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3vh;
  background-color: white;
  color: navy;
`;

export const SubmitButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 10vh;
  width: 70vw;
  margin: auto;
  top: 29vh;
  left: 0.3vw;
  position: relative;
`;

export const Popup = styled.div`
  width: 77vw;
  height: 77vh;
  border-radius: 25px;
  color: white;
  left: 20vw;
  position: 0vw;
`;
export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0vh;
`;

export const AccountIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  top: 0vh;
`

export const EditIconContainer = styled.div`
  position: relative;
  left: 20vw;
  top: 0vh;
`
export const NameSectionHeader = styled.header`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 3px;
  color: #2075d8;
  position: relative;
  top: 2.5vh;
  left: 10vw;
`;
export const FirstNameTextBox = styled.div`
  position: relative;
  width: 58vw;
  height: 5vh;
  top: 5vh;
  left: 9vw;
  border-radius: 2em;
`;
export const LastNameTextBox = styled.div`
  position: relative;
  width: 58vw;
  height: 5vh;
  top: 6vh;
  left: 9vw;
  border-radius: 2em;
  margin-top: 1vh;
`;

export const ContactSectionHeader = styled.header`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 3px;
  color: #2075d8;
  position: relative;
  top: 11vh;
  left: 10vw;
`;

export const PhoneTextBox = styled.div`
  position: relative;
  width: 58vw;
  height: 5vh;
  top: 13vh;
  left: 9vw;
  border-radius: 2em;
`;
export const EmailTextBox = styled.div`
  position: relative;
  width: 58vw;
  height: 5vh;
  top: 14.5vh;
  left: 9vw;
  border-radius: 2em;
  margin-top: .5h;
`;

export const PaymentSectionHeader = styled.header`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 3px;
  color: #2075d8;
  position: relative;
  top: 24vh;
  left: 10vw;
`;

export const PaymentDropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 21.5vh;
  left: 14vw;

  background-color: white;
  color: navy;
  position: absolute;
  width: 54vw;
`;

export const PaymentTextBox = styled.div`
  position: relative;
  width: 58vw;
  height: 5vh;
  top: 29.5vh;
  left: 9vw;
  border-radius: 2em;
  margin-top: vh;
`;

export const SaveButtonContainer = styled.div`
  position: relative;
  top: 0vh;
  left: 3vw;
  justify-content: center;
`;

export const CloseIconContainer = styled.div`
  top: 1vh;
  position: relative;
  left: 65vw;
`