import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import styled, { css } from 'styled-components';

const DayContainer = styled.div`
  align-items: flex-start;
  background-color: #3179ba;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px;
  width: 100%;
`;

const WeekContainer = styled.div`
  width: 100%;
  flex-direction: row;
  min-height: 150px;
  border-radius: 4px;
  border: solid;
  flex-grow: 0;
  ${props => {
    return props.bgprimary
      ? css`
          background: #007bff;
          color: black;
        `
      : props.bgsecondary
      ? css`
          background: #6c757d;
          color: black;
        `
      : null;
  }}
  border-color: wheat;
`;

const RowContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const WeekTitle = styled.div`
  padding: 12px 16px 12px;
  font-weight: bold;
  width: 100%;
  border: solid;
  border-radius: 4px;
  overflow-wrap: anywhere;
  ${props => {
    return props.bgprimary
      ? css`
          background: #007bff;
          color: black;
        `
      : props.bgsecondary
      ? css`
          background: #6c757d;
          color: black;
        `
      : null;
  }}
  border-color: wheat;
`;

const ParaContainer = styled.div`
  cursor: pointer;
  color: white;
  box-shadow: #091e4240 0px 1px 0px 0px;
  flex-grow: 1;
  border: solid;
  border-radius: 4px;
  overflow-wrap: anywhere;
  ${props => {
    return props.bgprimary
      ? css`
          background-color: #007bff;
        `
      : props.bgsecondary
      ? css`
          background-color: #6c757d;
        `
      : null;
  }}
  border-color: wheat;
`;

const ParaTitle = styled.div`
  color: white;
  ${props => {
    return props.bgprimary
      ? css`
          background-color: #007bff;
        `
      : props.bgsecondary
      ? css`
          background-color: #6c757d;
        `
      : null;
  }}
`;

const ParaPrepod = styled.div`
  color: white;
  font-size: 1.25rem;
  ${props => {
    return props.bgprimary
      ? css`
          background-color: #007bff;
        `
      : props.bgsecondary
      ? css`
          background-color: #6c757d;
        `
      : null;
  }}
`;

const ParaAud = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  ${props => {
    return props.bgprimary
      ? css`
          background-color: #007bff;
        `
      : props.bgsecondary
      ? css`
          background-color: #6c757d;
        `
      : null;
  }}
`;

const ParaGroup = styled.div`
  color: white;
  font-size: 1.3rem;
  font-style: italic;
  ${props => {
    return props.bgprimary
      ? css`
          background-color: #007bff;
        `
      : props.bgsecondary
      ? css`
          background-color: #6c757d;
        `
      : null;
  }}
`;

const PrettyCardOfLesson = props => {
  const CardContainer = () => {
    return (
      <DayContainer>
        <WeekTitle bgprimary> 1 тиждень </WeekTitle>
        <WeekContainer bgprimary>
          <RowContainer>
            {props.firstweek.map(o => {
              return (
                <>
                  <ParaContainer bgprimary>
                    <ParaTitle bgprimary> {o.name.split('(')[0]} </ParaTitle>
                    <ParaPrepod bgprimary>
                      {' '}
                      {o.prepod
                        .split(' ')
                        .map((val, idx) =>
                          idx === 0 ? val : `${val.slice(0, 1)}.`
                        )
                        .join(' ')}{' '}
                    </ParaPrepod>
                    <ParaGroup bgprimary>{o.group}</ParaGroup>
                    {o.type}
                    <ParaAud bgprimary> {o.aud} </ParaAud>
                  </ParaContainer>
                </>
              );
            })}
          </RowContainer>
        </WeekContainer>
        <WeekTitle bgsecondary> 2 тиждень </WeekTitle>
        <WeekContainer bgsecondary>
          <RowContainer>
            {props.secondweek.map(o => {
              return (
                <>
                  <ParaContainer bgsecondary>
                    <ParaTitle bgsecondary> {o.name.split('(')[0]} </ParaTitle>
                    <ParaPrepod bgsecondary>
                      {' '}
                      {o.prepod
                        .split(' ')
                        .map((val, idx) =>
                          idx === 0 ? val : `${val.slice(0, 1)}.`
                        )
                        .join(' ')}{' '}
                    </ParaPrepod>
                    <ParaGroup bgsecondary>{o.group}</ParaGroup>
                    {o.type}
                    <ParaAud bgsecondary> {o.aud} </ParaAud>
                  </ParaContainer>
                </>
              );
            })}
          </RowContainer>
        </WeekContainer>
      </DayContainer>
    );
  };
  return props.firstweek.length + props.secondweek.length > 0 ? (
    <CardContainer />
  ) : null;
};

export default PrettyCardOfLesson;
