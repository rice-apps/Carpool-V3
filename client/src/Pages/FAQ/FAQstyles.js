import styled from "styled-components";
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';


const AllDiv = styled.div`

`

const FAQHeader = styled.div`

`

const QuestionAccordion = withStyles({
	label: {
	  textTransform: 'capitalize',
	}
  })(Accordion);
  


export {
  AllDiv,
  FAQHeader,
  QuestionAccordion
}