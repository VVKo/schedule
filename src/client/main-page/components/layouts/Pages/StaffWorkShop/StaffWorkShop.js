import React, { useContext, useState } from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { Collapse } from 'react-bootstrap';
import {
  Route,
  NavLink,
  useParams,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import RozkladContext from '../../../../context/RozkladContext';
import {
  StaffHeader,
  StaffSidebar,
} from '../../../Styled/StaffWorkShop/STYLED';
import StaffMain from './StaffMain';

const StaffWorkShop = () => {
  const match = useRouteMatch();
  const params = useParams();
  const [setting, setSetting] = useState(false);
  const { state } = useContext(RozkladContext);

  const { currentSemester, user } = state;


  if (
    user.role !== 'staff' ||
    typeof currentSemester === 'undefined' ||
    currentSemester.name === 'Виберіть семестр'
  )
    return null;

  return (
    <>
      <StaffHeader className="navbar sticky-top flex-md-nowrap p-0 shadow bg-light">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-dark">
          Розклад
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-dark"></span>
        </button>
      </StaffHeader>
      <div className="container-fluid">
        <div className="row">
          <StaffSidebar
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <h6
                className="sidebar-heading d-flex justify-content-between align-items-center px-3 my-1 text-muted text-uppercase"
                onClick={() => setSetting(!setting)}
                aria-controls="collapse-navbar"
                aria-expanded={setting}
              >
                <span>НАЛАШТУВАННЯ: </span>
                {setting ? (
                  <FiMinusCircle size={'24px'} />
                ) : (
                  <FiPlusCircle size={'24px'} />
                )}
              </h6>
              <Collapse in={setting}>
                <ul className="nav flex-column" id="collapse-navbar">
                  <li className="nav-item">
                    <NavLink
                      to={`${match.url}/addload`}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Навантаження
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={`${match.url}/adddisc`}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Дисципліни
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={`${match.url}/addgroup`}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Груповий фонд
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={`${match.url}/addteacher`}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Викладацький фонд
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={`${match.url}/addaud`}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      Аудиторний фонд
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 my-1 text-muted text-uppercase">
                <span>РОЗКЛАД: </span>
              </h6>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    to={`${match.url}/totalschedule`}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    Весь розклад
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`${match.url}/teacherschedule`}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    Викладачі
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      to={`${match.url}/busyauds`}
                      className={({ isActive }) =>
                          isActive ? 'nav-link active' : 'nav-link'
                      }
                  >
                    Зайнятість аудиторій
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`${match.url}/printer`}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    ПДФ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`${match.url}/dropdown`}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    dropdown
                  </NavLink>
                </li>
              </ul>
            </div>
          </StaffSidebar>
          <Switch>
            <Route path={`${match.path}/:func`} component={StaffMain} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default StaffWorkShop;
