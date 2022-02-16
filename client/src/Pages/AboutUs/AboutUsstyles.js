import styled from "styled-components";
import Card from '@material-ui/core/Card';


const AllDiv = styled.div`
  background-color: #012E62;
  padding-top: 6vh;
  padding: 2vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: Josefin Sans;
`

const AboutUsHeader = styled.div`
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
  padding: "5%",
  margin: "3%"
})

const Picture = styled.div`
  grid-column: 1;


`

const Info = styled.div`
  grid-column: 2;
  display: flex;
  row-gap: 5px;
  flex-direction: column;

  
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
  AboutUsHeader,
  Member,
  Picture,
  Info,
  Name,
  Title
} 