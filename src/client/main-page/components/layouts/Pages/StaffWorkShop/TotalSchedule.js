import React, { useContext } from 'react';
import {Accordion, Col, Container, Row} from 'react-bootstrap';
import RozkladContext from '../../../../context/RozkladContext';
import SheduleWeek from './SheduleWeek';
import ScheduleInfoByGroup from "./ScheduleInfoByGroup";

const TotalSchedule = () => {
  const { state } = useContext(RozkladContext);

  const { academicloadfond, currentSemester, currentAcademicYear } = state;

  if (!academicloadfond) return null;

  console.log(
    'academicloadfond',
    academicloadfond,
    currentSemester,
    currentAcademicYear
  );

  const groups = [
    ...new Set([
      ...academicloadfond[currentSemester.name].data
        .map(r => r[1])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();
  console.log(groups);

  return (
    <Accordion defaultActiveKey={'0'}>
      {groups.map((gr, idx) => {
        return (
          <Accordion.Item key={idx} eventKey={`${idx}`}>
            <Accordion.Header><Container><h3 className="h3">{gr}</h3></Container></Accordion.Header>
            <Accordion.Body>
              <SheduleWeek wn={'НТ'} group={gr} />
              <SheduleWeek wn={'ПТ'} group={gr} />
              <ScheduleInfoByGroup group={gr}/>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default TotalSchedule;
