import React from 'react';
import {
  Box,
  BoxText,
  BoxTitle,
  Container,
  EventsGroupLine,
  EventsLine,
  GlobalStyle,
  MainFrame, ParaDiv,
  ParaLine,
  Rotate,
  TopInfoLine,
} from './styles/ScheduleCSS';

const lorem =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sed iure blanditiis voluptatum nulla quidem minus quam tempora obcaecati necessitatibus inventore! Vitae totam quam pariatur facilis fugit maxime adipisci eaque.';

const data = [
  {
    id: Math.random(),
    title: 'ПОНЕДІЛОК',
    text: lorem,
    bgColor: '#D5CAFA',
  },
  {
    id: Math.random(),
    title: 'ВІВТОРОК',
    text: lorem,
    bgColor: '#EDA9A9',
  },
  {
    id: Math.random(),
    title: 'СЕРЕДА',
    text: lorem,
    bgColor: '#F2EE8D',
  },
  {
    id: Math.random(),
    title: 'ЧЕТВЕР',
    text: lorem,
    bgColor: '#9FEACD',
  },
  {
    id: Math.random(),
    title: 'П`ЯТНИЦЯ',
    text: lorem,
    bgColor: '#900ACD',
  },
];

const Schedule = () => {
  return (
    <>
      <Container>
        {data.map(box => (
          <Box key={box.id} bgColor={box.bgColor}>
            <BoxTitle>{box.title}</BoxTitle>
            <BoxText>{box.text}</BoxText>
            <ParaDiv> 1 п.</ParaDiv>
            <ParaDiv> 2 п.</ParaDiv>
            <ParaDiv> 3 п.</ParaDiv>
            <ParaDiv> 4 п.</ParaDiv>
            <ParaDiv> 5 п.</ParaDiv>
            <ParaDiv> 6 п.</ParaDiv>
          </Box>
        ))}
      </Container>
      {/* <MainFrame> */}
      {/*  <Rotate>&lt; 💅🏾 &gt;</Rotate> */}
      {/*  <ParaLine> */}
      {/*    <ul> */}
      {/*      <li> */}
      {/*        <span>08:20</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>09:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>09:40</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>10:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>11:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>11:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>12:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>12:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>13:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>13:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>14:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>14:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>15:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>15:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>16:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>16:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>17:00</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>17:30</span> */}
      {/*      </li> */}
      {/*      <li> */}
      {/*        <span>18:00</span> */}
      {/*      </li> */}
      {/*    </ul> */}
      {/*  </ParaLine> */}
      {/*  <EventsLine> */}
      {/*    <EventsGroupLine> */}
      {/*      <TopInfoLine> */}
      {/*        <span>ПОНЕДІЛОК</span> */}
      {/*      </TopInfoLine> */}

      {/*    </EventsGroupLine> */}

      {/*    <EventsGroupLine> */}
      {/*      <TopInfoLine> */}
      {/*        <span>ВІВТОРОК</span> */}
      {/*      </TopInfoLine> */}

      {/*    </EventsGroupLine> */}

      {/*    <EventsGroupLine> */}
      {/*      <TopInfoLine> */}
      {/*        <span>СЕРЕДА</span> */}
      {/*      </TopInfoLine> */}

      {/*    </EventsGroupLine> */}

      {/*    <EventsGroupLine> */}
      {/*      <TopInfoLine> */}
      {/*        <span>ЧЕТВЕР</span> */}
      {/*      </TopInfoLine> */}

      {/*    </EventsGroupLine> */}

      {/*    <EventsGroupLine> */}
      {/*      <TopInfoLine> */}
      {/*        <span>П`ЯТНИЦЯ</span> */}
      {/*      </TopInfoLine> */}

      {/*    </EventsGroupLine> */}

      {/*  </EventsLine> */}
      {/* </MainFrame> */}
    </>
  );
};

export default Schedule;
