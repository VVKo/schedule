import React, {useContext, useState} from 'react';
import {
  Button,
  Card,
  Carousel,
  Container,
  Nav,
  Navbar,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import RozkladContext from '../../../context/RozkladContext';

const Groups = () => {
  const { state, setCurrentGroup, setCurrentTeacher } = useContext(
    RozkladContext
  );


  const {
    currentSemester,
    user,
    currentGroup,
    currentTeacher,
    academicloadfond,
    disciplinefond,
  } = state;

  if (!currentSemester || !academicloadfond) return null;

  const groups = [
    ...new Set([
      ...academicloadfond[currentSemester.name].data
        .map(r => r[1])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();

  return (
    <>
      <Tabs
        defaultActiveKey="1 курс"
        className="mb-3"
      >
        <Tab eventKey="1 курс" title="1 курс">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {groups
              .filter(gr => gr[0] === '1')
              .map((gr, idx) => (
                <Card key={idx} style={{ width: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{gr}</Card.Title>
                    <Link to={'/publicschedule'}>
                      <Button
                        variant={'outline-dark'}
                        title={gr}
                        onClick={() => {
                          setCurrentGroup(gr);
                          setCurrentTeacher(undefined);
                        }}
                      >
                        Показати
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Tab>
        <Tab eventKey="2 курс" title="2 курс">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {groups
              .filter(gr => gr[0] === '2')
              .map((gr, idx) => (
                <Card key={idx} style={{ width: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{gr}</Card.Title>
                    <Link to={'/publicschedule'}>
                      <Button
                        variant={'outline-dark'}
                        title={gr}
                        onClick={() => {
                          setCurrentGroup(gr);
                          setCurrentTeacher(undefined);
                        }}
                      >
                        Показати
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Tab>
        <Tab eventKey="3 курс" title="3 курс">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {groups
              .filter(gr => gr[0] === '3')
              .map((gr, idx) => (
                <Card key={idx} style={{ width: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{gr}</Card.Title>
                    <Link to={'/publicschedule'}>
                      <Button
                        variant={'outline-dark'}
                        title={gr}
                        onClick={() => {
                          setCurrentGroup(gr);
                          setCurrentTeacher(undefined);
                        }}
                      >
                        Показати
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Tab>
        <Tab eventKey="4 курс" title="4 курс">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {groups
              .filter(gr => gr[0] === '4')
              .map((gr, idx) => (
                <Card key={idx} style={{ width: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{gr}</Card.Title>
                    <Link to={'/publicschedule'}>
                      <Button
                        variant={'outline-dark'}
                        title={gr}
                        onClick={() => {
                          setCurrentGroup(gr);
                          setCurrentTeacher(undefined);
                        }}
                      >
                        Показати
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Tab>
        <Tab eventKey="Інші" title="Інші">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {groups
              .filter(
                gr =>
                  gr[0] !== '1' &&
                  gr[0] !== '2' &&
                  gr[0] !== '3' &&
                  gr[0] !== '4'
              )
              .map((gr, idx) => (
                <Card key={idx} style={{ width: '8rem' }}>
                  <Card.Body>
                    <Card.Title>{gr}</Card.Title>
                    <Link to={'/publicschedule'}>
                      <Button
                        variant={'outline-dark'}
                        title={gr}
                        onClick={() => {
                          setCurrentGroup(gr);
                          setCurrentTeacher(undefined);
                        }}
                      >
                        Показати
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Groups;
