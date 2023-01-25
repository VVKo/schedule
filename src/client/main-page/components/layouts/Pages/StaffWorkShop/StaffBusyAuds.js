import React, { useContext, useState } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { ButtonToolbar, Container, Dropdown } from 'react-bootstrap';
import RozkladContext from '../../../../context/RozkladContext';
import ScheduleWeekAud from './ScheduleWeekAud';

const StaffBusyAuds = () => {
  const match = useRouteMatch();
  const { state } = useContext(RozkladContext);
  const [btnName, setBtnName] = useState('Оберіть аудиторію');

  const { academicloadfond, currentSemester, audfond } = state;

  if (!academicloadfond || !academicloadfond[currentSemester.name]) return null;

  const auds = audfond[currentSemester.name].data.map(r => r[4]);
  const changeButtonName = e => {
    setBtnName(e.currentTarget.text);
  };

  const Aud = () => {
    const params = useParams();
    const { audID } = params;
    const aud = auds[+audID];

    return (
      <>
        <Container>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3 className="h3">{aud}</h3>
          </div>
        </Container>
        <ScheduleWeekAud aud={aud} wn={'НТ'} />
        <ScheduleWeekAud aud={aud} wn={'ПТ'} />
      </>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Аудиторний фонд</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: '250px', overflowY: 'scroll' }}>
              {auds.map((aud, idx) => {
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
        <Route path={`${match.path}/:audID`}>
          <Aud />
        </Route>
      </Switch>
    </>
  );
};

export default StaffBusyAuds;
