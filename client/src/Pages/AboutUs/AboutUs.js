import React from "react";
import{
    AllDiv,
    AboutUsHeader,
    Member,
    Picture,
    Info,
    Name,
    Title
} from "./AboutUsstyles";


const AboutUs = () => {

    return (
        <AllDiv>
            <AboutUsHeader>Meet the Team</AboutUsHeader>
                <Member>
                    
                    <Picture image="/membersPictures/shreya.JPG"/>
                    <Info>
                        <Name>Shreya Nidadavolu</Name>
                        <Title>Product Manager | Wiess</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/willy.png"/>
                    <Info>
                        <Name>William Yao</Name>
                        <Title>Team Lead | Will Rice</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/henry.JPG"/>
                    
                    <Info>
                        <Name>Henry Qin</Name>
                        <Title>Team Lead | Will Rice</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/audrey.JPeG"/>
                    <Info>
                        <Name>Audrey Kim</Name>
                        <Title>Developer | Wiess</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/alexis.jpeg"/>
                    <Info>
                        <Name>Alexis Nicolas</Name>
                        <Title>Developer | Jones</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/anya.JPG"/>
                    <Info>
                        <Name>Anya Gu</Name>
                        <Title>Developer | Brown</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/kai.png"/>
                    <Info>
                        <Name>Kai Hung</Name>
                        <Title>Developer | Brown</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/mitchell.JPeG"/>
                    <Info>
                        <Name>Mitchell Osborn</Name>
                        <Title>Developer | Brown</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/shreya.JPG"/>
                    <Info>
                        <Name>Shreyas Minocha</Name>
                        <Title>Developer | Will Ricce</Title>
                    </Info>
                </Member>

                <Member>
                    <Picture image="/membersPictures/katherine.JPG"/>
                    <Info>
                        <Name>Katherine Chui</Name>
                        <Title>Designer | Jones</Title>
                    </Info>
                </Member>
                

        </AllDiv>


    )

}

export default AboutUs;
