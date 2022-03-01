import React from "react";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import{
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
    Answer,
    AboutUsHeader,
    Member,
    Picture,
    Info,
    Name,
    Title,
    AcknowledgementsHeader,
    AcknowledgedGroup,
    AcknowledgedNames
} from "./AboutUsstyles";


const AboutUs = () => {

    document.title = "About Us";

    return (
        <AllDiv>
            <FeedbackButton
                variant="contained"
                onClick={() => {
                    window.open("https://tinyurl.com/carpool-feedback")
                }}>
                <FeedbackText>
                    Feedback? &nbsp;
                    <FeedbackIcon fontSize = "small" />
                    
                    </FeedbackText>
            </FeedbackButton>
            
            

            <PageHeader>
                About Us
            </PageHeader>
            
            <Divider />

            <FAQHeader>
                Frequently Asked Questions
            </FAQHeader>

            

            <Questions>
                
                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>What is Rice Carpool?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Answer>
                    Rice Carpool is a platform for the Rice community to coordinate ride-sharing - specifically, to and from the Houston airports. 
                    </Answer>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>How does Rice Carpool work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Answer>
                    Through our mobile-friendly site, it’s easy to find rides to create or join. Then use the riders’ contact information to arrange a meetup with your fellow carpoolers, hop in an Uber or Lyft together, and split the cost. 
                    </Answer>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Who can use Carpool?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Answer>
                    Carpool was created for the Rice University Community. A Net ID is required.
                    </Answer>
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
                    <Answer>
                    No, Carpool is not a mobile app. It was created as a mobile-friendly website to be accessible to all devices, with desktop support coming soon. You can add a bookmark/shortcut to the Carpool site to your phone homepage for quicker access!
                    </Answer>
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
                    <Answer>
                    All you need is your Rice Net ID to log onto the site: carpool.riceapps.org
                    </Answer>
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
                    <Answer>
                    Fill out your profile with your name, phone number, email, and payment information. Now you can view, join, and create rides!
                    </Answer>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>What are the <Bold>terms</Bold> of using Rice Carpool?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Answer>
                    Creating or joining a ride on Carpool will connect you to other Rice students looking to ride and split cost together. You will still need to manually communicate with your fellow Carpoolers to meet up, order an Uber or Lyft to ride, and split payment accordingly - Carpool does not currently have support for those features. 
                    </Answer>
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
                    <Answer>You can find the rides you’ve taken in the past and the rides you’ve scheduled listed on your profile.
                    </Answer>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>Do I need to have a car?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Answer>No, you don’t need to have or use your own car. You can split an Uber or Lyft with your carpool instead. If you do have a car and want to drive other people, just mention that when creating a ride!
                    </Answer>
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
                    <Answer>Currently, the location options are limited to airports and Rice only. Let us know what other locations you’d like to carpool to via this: https://tinyurl.com/carpool-feedback 
                    </Answer>
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
                    <Answer>If you created a ride and were the only one on the ride, the ride will be deleted. If you joined a ride with other existing riders, the ride will exist but you will no longer be listed as a rider.
                    </Answer>
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
                    <Answer>You can only leave a ride. If you are the last rider to leave, the ride will automatically be deleted.
                    </Answer>
                    </AccordionDetails>
                </QuestionAccordion>

                <QuestionAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography>How can I edit my ride?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Answer>In our current version, you cannot edit a ride because other people will have signed up assuming the existing information. If you need to change the details on an empty ride, just leave (delete) the ride and create it again.
                    </Answer>
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
                    <Answer>No, your information is not shared outside the application. It is only used for coordinating rides with your fellow Rice Owls.
                    </Answer>
                    </AccordionDetails>
                </QuestionAccordion>

            </Questions>

            <AboutUsHeader>Meet the Team</AboutUsHeader>
                <Member>
                    
                    <Picture image="/membersPictures/shreya.JPG"/>
                    <Info>
                        <Name>Shreya Nidadavolu</Name>
                        <Title>Product Manager | Wiess College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/willy.png"/>
                    <Info>
                        <Name>William Yao</Name>
                        <Title>Team Lead | Will Rice College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/henry.JPG"/>
                    
                    <Info>
                        <Name>Henry Qin</Name>
                        <Title>Team Lead | Will Rice College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/audrey.JPeG"/>
                    <Info>
                        <Name>Audrey Kim</Name>
                        <Title>Developer | Wiess College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/alexis.jpeg"/>
                    <Info>
                        <Name>Alexis Nicolas</Name>
                        <Title>Developer | Jones College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/anya.JPG"/>
                    <Info>
                        <Name>Anya Gu</Name>
                        <Title>Developer | Brown College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/kai.png"/>
                    <Info>
                        <Name>Kai Hung</Name>
                        <Title>Developer | Brown College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/mitchell.JPeG"/>
                    <Info>
                        <Name>Mitchell Osborn</Name>
                        <Title>Developer | Brown College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/shreyas.JPG"/>
                    <Info>
                        <Name>Shreyas Minocha</Name>
                        <Title>Developer | Will Rice College</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/katherine.JPG"/>
                    <Info>
                        <Name>Katherine Chui</Name>
                        <Title>Designer | Jones College</Title>
                    </Info>
                </Member>
                
                <Member>
                    <Picture image="/membersPictures/jessica.JPG"/>
                    <Info>
                        <Name>Jessica Huang</Name>
                        <Title>Designer | Wiess College</Title>
                    </Info>
                </Member>

                <AcknowledgementsHeader>Acknowledgements</AcknowledgementsHeader>

                <AcknowledgedGroup>Carpool v1 Team</AcknowledgedGroup>

                <AcknowledgedNames>Diksha Gupta, Myra Ramdenbourg, Katherine Ngo, Angela Hwang, Emmett Bertram, Gerald Wang, Josie Garza, Lingyin Wu
                </AcknowledgedNames>

                <AcknowledgedGroup>Carpool v2 Team</AcknowledgedGroup>

                <AcknowledgedNames>Winnie Li, Will Mundy, Guancong Jia, Shryans Goyal, Helena Hu, Cloris Cai
                </AcknowledgedNames>

                <AcknowledgedGroup>OSA Carpool Team</AcknowledgedGroup>

                <AcknowledgedNames>Shourya Munjal, Zachary Katz, Freda Zhang
                </AcknowledgedNames>
  
                <AcknowledgedGroup>Rice Apps Chairs/Mentors</AcknowledgedGroup>

                <AcknowledgedNames>Adam Zawierucha, Cloris Cai
                </AcknowledgedNames>
        </AllDiv>

    )

}

export default AboutUs;
