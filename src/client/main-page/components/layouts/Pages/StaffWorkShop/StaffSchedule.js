import React, { useContext } from 'react';
import {
  Accordion,
  AccordionContext,
  Alert,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Container,
  useAccordionButton,
} from 'react-bootstrap';
import { FaInfo } from 'react-icons/fa';
import RozkladContext from '../../../../context/RozkladContext';
import SheduleWeek from './SheduleWeek';
import ScheduleInfoByGroup from './ScheduleInfoByGroup';

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
const StaffSchedule = () => {
  const { state, setActiveId } = useContext(RozkladContext);

  const {
    academicloadfond,
    currentSemester,
    currentAcademicYear,
    activeId,
  } = state;

  if (!academicloadfond || !academicloadfond[currentSemester.name]) return null;

  const toggleActive = e => {
    const { eventkey } = e.currentTarget.dataset;

    if (activeId === eventkey) {
      setActiveId(null);
    } else {
      setActiveId(eventkey);
    }
  };

  const groups = [
    ...new Set([
      ...academicloadfond[currentSemester.name].data
        .map(r => r[1])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();

  const AllGroups = () => {
    return (
      <Accordion defaultActiveKey={activeId}>
        {groups.map((gr, idx) => {
          return (
            <Accordion.Item key={idx} eventKey={`${idx}`}>
              <Accordion.Header>
                <Container data-eventkey={`${idx}`} onClick={toggleActive}>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h3 className="h3">{gr}</h3>
                    {academicloadfond[currentSemester.name].data
                      .filter(r => r[1].includes(gr))
                      .filter(r => +r[6] - +r[7] !== 0).length > 0 && (
                      <Alert variant="warning">
                        <FaInfo /> Є не виставлені заняття
                      </Alert>
                    )}
                  </div>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <SheduleWeek wn={'НТ'} group={gr} />
                <SheduleWeek wn={'ПТ'} group={gr} />
                <ScheduleInfoByGroup group={gr} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Усі групи</h1>
      </div>

      <AllGroups />
    </>
  );
};

export default StaffSchedule;
