import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
// Semantic UI
import {Grid, Header, Container, Icon, Table, Button} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';
import ModularAccordion from '../../components/Accordion';
// Custom components
import SocialButton from '../../components/SocialButton';
import VolleyballScene from '../../components/VolleyballScene';
import WoodButton from '../../components/Button';

// Import image assets
import sunnyDock from '../../resources/images/background.svg';
import cloud1 from '../../resources/images/cloud1.svg';
import cloud2 from '../../resources/images/cloud2.svg';
// Flare
import sun from '../../resources/images/sun.svg';
import yellowFlare from '../../resources/images/yellowFlare.svg';
import smallYellowFlare from '../../resources/images/smallYellowFlare.svg';
import redFlare from '../../resources/images/redFlare.svg';
import flare from '../../resources/images/flare.svg';
import sandToWater from '../../resources/images/sandToWater.svg';
import water from '../../resources/images/water.png';
import rocksWall from '../../resources/images/rocksWall.png';
import gatorSwan from '../../resources/images/gatorSwan.svg';
import fbLogo from '../../resources/images/fbLogo.png';
import mainTitle from '../../resources/images/mainTitle.svg';
import sponsorsComingSoon from '../../resources/images/sponsorsComingSoon.svg';
import sailing from '../../resources/images/sailing.svg';

const images = [sunnyDock, cloud1, cloud2, flare];

// For flare animation
// TODO: Separate flare animation into separate circles + into component
// Make the background move with it
const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const sunTrans = (x, y) => `translate3d(${x / 24 - 200}px,${y / 36 + 100}px,0)`;
const redTrans = (x, y) => `translate3d(${x / 15 - 50}px,${y / 24 + 100}px,0)`;
const yelTrans = (x, y) => `translate3d(${x / 15 - 100}px,${y / 24 + 100}px,0)`;
const smallYelTrans = (x, y) =>
  `translate3d(${x / 15 - 250}px,${y / 24 - 120}px,0)`;
const cloud1Trans = (x, y) =>
  `translate3d(${x / 12 - 500}px,${y / 17 - 300}px,0)`;
const cloud2Trans = (x, y) =>
  `translate3d(${x / 12 + 500}px,${y / 19 - 250}px,0)`;

// Styled components
const RootContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const SunnyDock = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 1;
  align-items: center;
  justify-content: flex-end;
  background-image: url(${sunnyDock});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  display: flex;
  flex-direction: column;
`;

const Cloud1 = styled(animated.img).attrs(props => ({
  src: cloud1
}))`
  width: 400px;
  z-index: 3;
`;

const Cloud2 = styled(animated.img).attrs(props => ({
  src: cloud2
}))`
  width: 400px;
  z-index: 3;
`;

const ButtonContainer = styled.div`
  padding: 40px 0;
  margin-bottom: 20vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right top;
  flex-direction: column;
`;

const ContentBlock = styled(Container)`
  padding: 60px 0;
`;

const FooterContainer = styled.footer`
  background-color: #586f52;
  width: 100vw;
  color: white;
`;

const TransitionImage = styled.img`
  width: 100vw;
`;

const Heart = styled.svg`
  fill: red;
  position: relative;
  top: 8px;
  width: 25px;
  animation: pulse 1.5s ease infinite;
  @keyframes pulse {
    0% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.7);
    }
  }
`;

const FooterLink = styled.a.attrs(props => ({
  target: '_blank'
}))`
  color: white;
  display: block;
  :hover {
    text-decoration: underline;
    color: white;
  }
`;

const createEvent = (name, time) => ({
  name,
  time
});

const events = [
  {
    day: 'Friday',
    events: [
      createEvent('Test1', '8:30 AM'),
      createEvent('Test2', '8:30 AM'),
      createEvent('Test3', '8:30 AM')
    ]
  },
  {
    day: 'Saturday',
    events: [
      createEvent('Test1', '8:30 AM'),
      createEvent('Test2', '8:30 AM'),
      createEvent('Test3', '8:30 AM')
    ]
  },
  {
    day: 'Sunday',
    events: [
      createEvent('Test1', '8:30 AM'),
      createEvent('Test2', '8:30 AM'),
      createEvent('Test3', '8:30 AM')
    ]
  }
];

const faq = [
  {
    title: 'What is a hackathon?',
    content: (
      <p>
        A hackathon is a weekend long event where students come together to
        build computer science projects. Hackathons teach students about
        software development by letting them make their own products. They
        create a space for students to learn new skills and eliminate coding
        road-blocks. Swamphacks VI provides resources such as hardware,
        workshops, and mentors to support all student endeavors.
      </p>
    )
  },
  {
    title: 'Where is Swamphacks?',
    content: (
      <p>
        Collaboration Commons in the Marston Science Library at the University
        of Florida. Address is 444 Newell Dr, Gainesville, FL 32611.
      </p>
    )
  },
  {
    title: 'What should I bring?',
    content: (
      <p>
        Any hacking gear you need (laptop, hardware, chargers, batteries, etc.),
        comfortable clothes, toiletries (toothpaste, toothbrush, deodorant,
        etc.), a photo ID for registration, a government ID to rent hardware,
        and most importantly, yourself!
      </p>
    )
  },
  {
    title: 'Help, this is my first hackathon!',
    content: (
      <p>
        Amazing! SwampHacks VI welcomes everyone regardless of major or skill
        level. So long as you have a passion for development and a willingness
        to learn we can guide you with our numerous mentors and beginner
        workshops.
      </p>
    )
  },
  {
    title: 'How much will I spend?',
    content: (
      <p>
        Swamphacks VI is free! Everything from the food, swag, and prizes has
        been covered by our generous sponsors.
      </p>
    )
  },
  {
    title: 'Who is Swamphacks for?',
    content: (
      <p>
        Swamphacks VI is for everyone! All students currently enrolled in
        university and interested in development are eligible.
      </p>
    )
  },
  {
    title: 'Can high school students attend?',
    content: (
      <p>
        Our venue does not allow minors to stay overnight. High school students
        and others below legal age are unable to participate.
      </p>
    )
  },
  {
    title: 'How can I volunteer or mentor?',
    content: (
      <p>
        We start volunteer and mentor recruitment in December. Please note that
        if you choose to either mentor or volunteer, you cannot participate in
        the hackathon or submit a project.
      </p>
    )
  },
  {
    title: 'What happens after I apply?',
    content: (
      <p>
        After we receive your application, we send an email regarding your
        participant status. That email will contain instructions to set up your
        dashboard account. This account will contain your event registration
        information. Your dashboard will also indicate your application status.
      </p>
    )
  },
  {
    title: 'What if I don’t have a team?',
    content: (
      <p>
        Swamphacks VI allows you plus a max of 3 others (4 total) to form a team
        and participate. You can either form your own team or attend our team
        formation workshop at the beginning of the hackathon. You can also work
        by yourself. We strive to let students forge new connections with people
        from other states and encourage you to work with people you don’t know.
      </p>
    )
  },
  {
    title: 'How do I get there?',
    content: (
      <p>
        We provide a charter bus to and from the Georgia Institute of
        Technology. We also provide travel reimbursements for applications that
        request travel support before December 1st. Additional travel routes and
        buses may be announced depending on interest.
      </p>
    )
  },
  {
    title: 'Will I be sitting at my computer all weekend?',
    content: (
      <p>
        The event will have many activities for participants including
        networking sessions, tech talks, engineering workshops, and much more.
        Feel free to attend as many or as few of these activities as you want in
        addition to coding your project.
      </p>
    )
  },
  {
    title: 'Will Swamphacks provide travel reimbursement?',
    content: (
      <p>
        SwampHacks VI provides a limited number of travel reimbursements. The
        deadline for applications seeking travel reimbursement is December 1st,
        2019.
      </p>
    )
  },
  {
    title: 'When do applications close?',
    content: <p>Applications will close on December 21st.</p>
  },
  {
    title: 'Is there a Code of Conduct?',
    content: (
      <p>
        All hackers must adhere to the{' '}
        <a
          href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
          target='_blank'
        >
          MLH Code of Conduct
        </a>
        .
      </p>
    )
  }
];

const MainPage = props => {
  // TODO: This is intended to preload image assets. Make sure this actually works.
  // https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
  useEffect(() => {
    console.log('Loading images...');
    for (const image in images) {
      let i = new Image();
      i.src = image;
    }
    console.log('Done.');
  }, []);
  // For flare animation
  const [flareProps, setFlareProps] = useSpring(() => ({
    xy: [0, 0],
    config: {mass: 10, tension: 550, friction: 140}
  }));
  const [cloudProps, setCloudProps] = useSpring(() => ({
    xy: [0, 0],
    config: {mass: 7, tension: 350, friction: 60}
  }));
  const [sunProps, setSunProps] = useSpring(() => ({
    xy: [0, 0],
    config: {mass: 50, tension: 1000, friction: 300}
  }));
  return (
    <RootContainer>
      <SunnyDock
        onMouseMove={e => {
          setFlareProps({xy: calc(e.clientX, e.clientY)});
          setCloudProps({xy: calc(e.clientX, e.clientY)});
          setSunProps({xy: calc(e.clientX, e.clientY)});
        }}
      >
        {/* For flare animation */}
        <animated.img
          src={sun}
          style={{
            transform: sunProps.xy.interpolate(sunTrans),
            width: '300px',
            zIndex: 2
          }}
        />
        <animated.img
          src={smallYellowFlare}
          style={{
            transform: flareProps.xy.interpolate(smallYelTrans),
            width: '85px',
            zIndex: 3
          }}
        />
        <animated.img
          src={yellowFlare}
          style={{
            transform: flareProps.xy.interpolate(yelTrans),
            width: '125px',
            zIndex: 3
          }}
        />
        <animated.img
          src={redFlare}
          style={{
            transform: flareProps.xy.interpolate(redTrans),
            width: '50px',
            zIndex: 3
          }}
        />
        <Cloud1 style={{transform: cloudProps.xy.interpolate(cloud1Trans)}} />
        <Cloud2 style={{transform: cloudProps.xy.interpolate(cloud2Trans)}} />
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'column'
          }}
        >
          <img
            src={mainTitle}
            style={{zIndex: 2, width: '40vw', minWidth: 350}}
          />
          <ButtonContainer>
            <WoodButton
              onClick={() => {
                props.history.push('/application');
              }}
            >
              Register
            </WoodButton>
            <br />
            <WoodButton
              onClick={() => {
                window.location.href = 'mailto:sponsors@swamphacks.com';
              }}
            >
              Sponsor Us
            </WoodButton>
          </ButtonContainer>
        </div>
      </SunnyDock>
      {/* Welcome to the swamp */}
      <ContentContainer
        style={{
          backgroundColor: '#FFD59A'
        }}
      >
        <Grid container padded>
          <Grid.Column>
            <ContentBlock text>
              <Header size='huge'>Welcome to the Swamp!</Header>
              <p>
                Swamphacks VI is 36 hours of learning, coding, and creativity.
                For a whole weekend, over 650 students nationwide come together
                as developers, engineers, and designers. We welcome all people
                with a desire to build and learn by making.
              </p>
              <p>
                Experience software development in sunny Gainesville, Florida
                through our hackathon! No experience is necessary to
                participate; we welcome everyone regardless of year in school.
                From seasoned mentors to intriguing workshops, Swamphacks VI
                supports all student activities and encourages “outside the box”
                thinking. Join us to meet some of the brightest minds in the
                South and have an awesome weekend in our swamp.
              </p>
              <p>
                This year, Swamphacks VI aims to make our event more sustainable
                by reducing our waste and carbon output. Our goal is to use more
                compostable material, encourage our Sponsors to travel
                sustainably, and provide hackers with eco-friendly swag.
              </p>
              <VolleyballScene />
            </ContentBlock>
          </Grid.Column>
        </Grid>
      </ContentContainer>
      <TransitionImage src={sandToWater} style={{backgroundColor: '#FFD59A'}} />
      {/* Schedule of Events */}
      <ContentContainer
        style={{backgroundImage: `url(${water})`, alignItems: 'flex-end'}}
      >
        <img
          src={sailing}
          style={{width: 400, position: 'absolute', left: 0}}
        />
        <Grid container padded>
          <Grid.Column>
            <ContentBlock text>
              <Header size='huge' inverted>
                Schedule of Events
              </Header>

              <Table>
                {events.map(obj => (
                  <React.Fragment key={obj.day}>
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>{obj.day}</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {obj.events.map(event => (
                        <Table.Row key={event.name}>
                          <Table.Cell>{event.name}</Table.Cell>
                          <Table.Cell textAlign='right'>
                            {event.time}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </React.Fragment>
                ))}
              </Table>
            </ContentBlock>
          </Grid.Column>
        </Grid>
      </ContentContainer>
      {/* FAQ */}
      <ContentContainer
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(20,117,188,1) 9.34%, rgba(64,199,244,1) 49.4%, rgba(255,255,253,1) 91.26%)'
        }}
      >
        <ContentContainer
          style={{
            backgroundImage: `url(${rocksWall})`,
            alignItems: 'flex-start'
          }}
        >
          <Grid container padded>
            <Grid.Column>
              <ContentBlock text style={{minHeight: '100vh'}}>
                <Header size='huge' inverted>
                  Frequently Asked Questions
                </Header>
                <ModularAccordion items={faq} />
              </ContentBlock>
            </Grid.Column>
          </Grid>
        </ContentContainer>
      </ContentContainer>
      {/* Sponsors */}
      <ContentContainer
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(119,107,102,1) 9.34%, rgba(250,164,70,1) 49.4%, rgba(252,212,91,1) 91.26%)'
        }}
      >
        <Grid container padded>
          <Grid.Column>
            <ContentBlock style={{height: '100vh'}}>
              {/* <Header size='huge' textAlign='center' inverted>
                Our Amazing Sponsors
              </Header> */}
              <Grid stackable columns='equal' textAlign='center'>
                <Grid.Row>
                  <Grid.Column>
                    <img
                      src={sponsorsComingSoon}
                      style={{width: '100%', maxWidth: 700}}
                    />
                  </Grid.Column>
                </Grid.Row>
                {/* <Grid.Row>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                  <Grid.Column>
                    <img src={fbLogo} style={{width: '100%'}} />
                  </Grid.Column>
                </Grid.Row> */}
              </Grid>
            </ContentBlock>
          </Grid.Column>
        </Grid>
        <img src={gatorSwan} style={{width: '100%'}} />
      </ContentContainer>
      {/* Footer */}
      <FooterContainer>
        <ContentBlock>
          <Grid
            container
            padded
            stackable
            columns='equal'
            textAlign='center'
            verticalAlign='middle'
          >
            <Grid.Row>
              <Grid.Column>
                <SocialButton
                  facebook
                  link='https://www.facebook.com/SwampHacks/?ref=br_rs'
                />
                <SocialButton
                  instagram
                  link='https://www.instagram.com/ufswamphacks/'
                />
                <SocialButton
                  twitter
                  link='https://twitter.com/swamphacks?lang=en'
                />
                <SocialButton
                  snapchat
                  link='https://www.snapchat.com/add/swamphackssnaps'
                />
              </Grid.Column>
              <Grid.Column>
                <p>
                  Made with{' '}
                  <Heart viewBox='0 0 32 29.6'>
                    <path
                      d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'
                    />
                  </Heart>{' '}
                  in Gainesville.
                </p>
              </Grid.Column>
              <Grid.Column>
                <FooterLink href='http://mlh.io/code-of-conduct'>
                  MLH Code of Conduct
                </FooterLink>
                <FooterLink href='https://2019.swamphacks.com'>
                  Last Year's Site
                </FooterLink>
                <FooterLink href='http://www.google.com'>
                  Last Year's Devpost
                </FooterLink>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </ContentBlock>
      </FooterContainer>
    </RootContainer>
  );
};

export default withRouter(MainPage);
