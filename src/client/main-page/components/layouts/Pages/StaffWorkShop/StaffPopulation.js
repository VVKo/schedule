import React, { useContext, useState } from 'react';
import { ButtonToolbar, Container, Dropdown } from 'react-bootstrap';
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import ScheduleWeekPopulation from './ScheduleWeekPopulation';
import RozkladContext from '../../../../context/RozkladContext';

const StaffPopulation = () => {
  const match = useRouteMatch();
  const { state } = useContext(RozkladContext);
  const [btnName, setBtnName] = useState('Оберіть корпус');

  const { academicloadfond, currentSemester, audfond } = state;

  if (!academicloadfond || !academicloadfond[currentSemester.name]) return null;

  const korpuses = [
    ...new Set(audfond[currentSemester.name].data.map(r => r[0])),
  ].sort();
  const changeButtonName = e => {
    setBtnName(e.currentTarget.text);
  };
  const Population = () => {
    const params = useParams();
    const { korpusID } = params;
    const korpus = korpuses[+korpusID];

    return (
      <>
        <Container>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3 className="h3">{korpus}</h3>
          </div>
        </Container>
        <ScheduleWeekPopulation wn={'НТ'} korpus={korpus} />
        <ScheduleWeekPopulation wn={'ПТ'} korpus={korpus} />
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Популяція</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: '120px', overflowY: 'scroll' }}>
              {korpuses.map((aud, idx) => {
                return (
                  <Dropdown.Item as="button" key={`${aud}`}>
                    <NavLink
                      to={`${match.url}/${idx}`}
                      onClick={changeButtonName}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      {aud}
                    </NavLink>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
      </div>
      <Switch>
        <Route path={`${match.path}/:korpusID`}>
          <Population />
        </Route>
      </Switch>
    </>
  );
};

export default StaffPopulation;
