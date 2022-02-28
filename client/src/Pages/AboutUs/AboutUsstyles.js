import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Accordion from '@material-ui/core/Accordion';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNewRounded';


const AllDiv = styled.div`
  background-color: #012E62;
  padding-top: 6vh;
  padding: 2vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Josefin Sans;
`

const PageHeader = styled.div`
  align-text: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 3.4em;
  display: flex;
  color: white;
`

const Divider = styled.div`
width: 80vw;
border-bottom: 2px solid #fff;
margin: 5% 5% 10% 5%;
`

const FeedbackButton = styled(Button)`
  z-index: 999;
  position: fixed;
  bottom: 3vh;
  right: -10px;
  background: #C1CCE0;
  border-radius: 8px 0px 0px 8px;
  width: 2vw;
`

const FeedbackText = styled.div`
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  justify-content: space-between;
  filter: drop-shadow(2px 2px 2px 0px #002140);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  height: 18vh;
`

const FeedbackIcon = styled(OpenInNewIcon)`
  transform: rotate(90deg);
`

const FAQHeader = styled.div`
  align-text: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5em;
  display: flex;
  color: white;
`

const Bold = styled.div`
  display: inline-block;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: bold;
`

const Questions = styled.div`
  position: relative;
  padding-top: 3%;
`

const QuestionAccordion = styled(Accordion)`
  border-radius: 10px;
  margin: 4%;
  filter: drop-shadow(2px 2px 2px #002140);
`


export const Answer = withStyles({
  root: {
      color: '#6688B2',
  }
})(Typography);

const AboutUsHeader = styled.div`
  padding-top: 5%;
  align-text: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 2em;
  display: flex;
  color: white;
  padding-bottom: 3%;
`

const Member = styled(Card)({
  display: "grid",
  gridTemplateColumns: "125px",
  borderRadius: "8px",
  backgroundColor: "white",
  width: "85vw",
  margin: "3%",
  padding: "1%",
})

const Picture = styled(CardMedia)({
  gridColumn: "1",
  width:'125px',
  height:'150px',
  padding: "3%",
  alignItems: "center",
  borderRadius: "8px",
})


const Info = styled.div`
  grid-column: 2;
  display: flex;
  row-gap: 5px;
  flex-direction: column;
  padding-left: 5%;
  align-self: center;

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

const AcknowledgementsHeader = styled.div`
  padding-top: 5%;
  align-text: center;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5em;
  display: flex;
  color: white;
  padding-bottom: 3%;
`

const AcknowledgedGroup = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 1.5em;
color: white;
margin-bottom: 3%;
margin-top: 5%;
text-decoration: underline;
`

const AcknowledgedNames = styled.div`
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: .8em;
color: white;
padding: 0% 10% 0% 10%;
text-align: center;
`

export {
  AllDiv,
  PageHeader,
  Divider,
  FeedbackButton,
  FeedbackText,
  FeedbackIcon,
  FAQHeader,
  Questions,
  Bold,
  QuestionAccordion,
  AboutUsHeader,
  Member,
  Picture,
  Info,
  Name,
  Title,
  AcknowledgementsHeader,
  AcknowledgedGroup,
  AcknowledgedNames
} 