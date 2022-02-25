import styled from "styled-components";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Accordion from '@material-ui/core/Accordion';
import { Button } from '@material-ui/core';

const AllDiv = styled.div`
  background-color: #012E62;
  padding-top: 6vh;
  padding: 2vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Josefin Sans;
`

const FeedbackButton = styled(Button)`
  // top: 75vh;
  // bottom: 75vh;
  background: #C1CCE0;
  border-radius: 10px 10px 0px 10px;
  height: 6vh;
  width: 16vh;
  justify-content: space-between;

`

const FeedbackText = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 1em;

`

const FAQHeader = styled.div`
  align-text: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 3.4em;
  display: flex;
  color: white;
`

const Questions = styled.div`
  padding-top: 5%;
`

const QuestionAccordion = styled(Accordion)`
  border-radius: 10px;
  margin: 4%;
  filter: drop-shadow(2px 2px 2px #002140);
`

const AboutUsHeader = styled.div`
  padding-top: 4vh;
  align-text: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 3em;
  display: flex;
  color: white;
  margin-bottom: 10%;
`

const Member = styled(Card)({
  display: "grid",
  gridTemplateColumns: "30% 70%",
  borderRadius: "8px",
  backgroundColor: "white",
  width: "85vw",
  margin: "3%",
  padding: "1%",
})

const Picture = styled(CardMedia)({
  gridColumn: "1",
  padding: "3%",
  alignItems: "center",
  borderRadius: "8px",
})


const Info = styled.div`
  grid-column: 2;
  display: flex;
  row-gap: 5px;
  flex-direction: column;
  padding: 5%;
  
`

const Name = styled.div`

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4em;

`

const Title = styled.div`

  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: .8em;

`


export {
  AllDiv,
  FeedbackButton,
  FeedbackText,
  FAQHeader,
  Questions,
  QuestionAccordion,
  AboutUsHeader,
  Member,
  Picture,
  Info,
  Name,
  Title
} 