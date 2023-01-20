import React, { useContext, useState } from 'react';
import {
  Accordion,
  Alert,
  ButtonToolbar,
  Container,
  Dropdown,
} from 'react-bootstrap';
import { FaInfo } from 'react-icons/fa';
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import RozkladContext from '../../../../context/RozkladContext';
import SheduleWeek from './SheduleWeek';
import ScheduleInfoByGroup from './ScheduleInfoByGroup';
import SheduleWeekTeacher from './SheduleWeekTeacher';
import ScheduleInfoByTeacher from './ScheduleInfoByTeacher';
import { Hello } from './DropDownList';

const StaffTeacherSchedule = () => {
  const match = useRouteMatch();

  const { state } = useContext(RozkladContext);
  const [activeId, setActiveId] = useState(null);
  const [btnName, setBtnName] = useState('Виберіть викладача');

  const changeButtonName = e => {
    setBtnName(e.currentTarget.text);
  };

  const {
    academicloadfond,
    teacherfond,
    currentSemester,
    currentAcademicYear,
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

  const teachers = [
    ...new Set([...academicloadfond[currentSemester.name].data.map(r => r[4])]),
  ].sort();

  const Teacher = () => {
    const params = useParams();
    const { teacherID } = params;
    const teacher = teachers[+teacherID];
    return (
      <>
        <Container>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3 className="h3">{teacher}</h3>
            {academicloadfond[currentSemester.name].data
              .filter(r => r[4] === teacher)
              .filter(r => +r[6] - +r[7] !== 0).length > 0 && (
              <Alert variant="warning">
                <FaInfo /> Є не виставлені заняття
              </Alert>
            )}
          </div>
        </Container>
        <SheduleWeekTeacher wn={'НТ'} teacher={teacher} />
        <SheduleWeekTeacher wn={'ПТ'} teacher={teacher} />
        <ScheduleInfoByTeacher teacher={teacher} />
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Викладачі</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {teachers.map((teacher, idx) => {
                return (
                  <Dropdown.Item as="button" key={`${teacher}`}>
                    <NavLink
                      to={`${match.url}/${idx}`}
                      onClick={changeButtonName}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      {teacher}
                    </NavLink>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
      </div>

      <Switch>
        <Route path={`${match.path}/:teacherID`}>
          <Teacher />
        </Route>
      </Switch>
    </>
  );
};

export default StaffTeacherSchedule;
