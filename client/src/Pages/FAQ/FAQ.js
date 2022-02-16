import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    AllDiv,
    FAQHeader,
    Questions,
    QuestionAccordion
} from './FAQstyles.js';

const FAQ = () => {

    return(
        <AllDiv>
            <FAQHeader>
                FAQ
            </FAQHeader>

            <Questions>
                    
                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Who can use Carpool?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Carpool was created for the Rice University Community. A Net ID is required.
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>



                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Do I need to download Carpool on my phone?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    No, Carpool is not a mobile app. It was created as a mobile-friendly website to be accessible to all devices, with desktop support coming soon. You can add a bookmark/shortcut to the Carpool site to your phone homepage for quicker access!
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>



                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>How do I sign up for Carpool?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    All you need is your Rice Net ID to log onto the site: carpool.riceapps.org
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>


                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>I've signed in for the first time, now what?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Fill out your profile with your name, phone number, email, and payment information. Now you can view, join, and create rides!
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>


                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>How do I see my past and upcoming rides?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>You can find the rides you’ve taken in the past and the rides you’ve scheduled listed on your profile.
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Where can I travel?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>Currently, the location options are limited to airports and Rice only. Let us know what other locations you’d like to carpool to via this: https://forms.gle/WFqf77FxSy8FVHgb9 
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>If I leave a ride, will the ride disappear?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>If you created a ride and were the only one on the ride, the ride will be deleted. If you joined a ride with other existing riders, the ride will exist but you will no longer be listed as a rider.
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>How can I delete a ride?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>You can only leave a ride. If you are the last rider to leave, the ride will automatically be deleted.
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Is my information shared with outside parties?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>No, your information is not shared outside the application. It is only used for coordinating rides with your fellow Rice Owls.
                    </Typography>
                    </AccordionDetails>
                </QuestionAccordion>

            </Questions>

            
        </AllDiv>
    
    )

}


export default FAQ